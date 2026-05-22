((window) => {
  "use strict";

  if (window.ArgonautExtensionUtils) {
    return;
  }

  const Utils = {};

  const getString = (value, fallback = "") =>
    typeof value === "string" && value.trim() ? value : fallback;

  const generateUUID = () => {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    // Simple UUIDv4 fallback
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const parseAppFromUrl = () => {
    const parts = window.location.pathname.split("/").filter(Boolean);
    const idx = parts.indexOf("applications");
    if (idx === -1 || idx + 1 >= parts.length) {
      return null;
    }
    // Support /applications/<app> or /applications/<namespace>/<app>
    const remaining = parts.slice(idx + 1);
    if (remaining.length >= 2) {
      return { namespace: remaining[0], name: remaining[1] };
    }
    return { namespace: null, name: remaining[0] };
  };

  Utils.getApplicationContext = (application) => {
    const name = getString(application?.metadata?.name);
    const namespace = getString(application?.metadata?.namespace);
    const project = getString(application?.spec?.project);
    const clusterServer =
      getString(application?.spec?.destination?.server) || null;

    if (name) {
      return { name, namespace, project, clusterServer };
    }

    const fromUrl = parseAppFromUrl();
    if (!fromUrl) {
      return null;
    }
    return {
      name: getString(fromUrl.name),
      namespace: getString(fromUrl.namespace),
      project: "",
      clusterServer: null,
    };
  };

  Utils.getUserInfo = () =>
    fetch("/api/v1/session/userinfo")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const id =
          getString(data?.sub) ||
          getString(data?.username) ||
          getString(data?.name) ||
          "unknown";
        const displayName =
          getString(data?.username) || getString(data?.name) || id;
        return { id, displayName };
      })
      .catch(() => ({ id: "unknown", displayName: "unknown" }));

  Utils.buildSessionKey = (app, userId) => {
    const appName = getString(app?.name, "global");
    const appNamespace = getString(app?.namespace, "global");
    const user = getString(userId);
    const base = `argonautSession:${appNamespace}:${appName}`;
    return user ? `${base}:${user}` : base;
  };

  Utils.getSessionId = (app, userId) => {
    const key = Utils.buildSessionKey(app, userId);
    let sessionId = localStorage.getItem(key);
    if (!sessionId) {
      sessionId = generateUUID();
      localStorage.setItem(key, sessionId);
    }
    return { sessionId, key };
  };

  Utils.persistSessionId = (key, sessionId) => {
    if (key && sessionId) {
      localStorage.setItem(key, sessionId);
    }
  };

  Utils.argonautProxyBase =
    window.ArgonautProxyBase || "/extensions/argonaut";

  Utils.buildProxyHeaders = (app) => {
    const headers = { "Content-Type": "application/json" };
    const appName = getString(app?.name, "global");
    const appNamespace = getString(app?.namespace, "global");
    const project = getString(app?.project, "default");

    headers["Argocd-Application-Name"] = `${appNamespace}:${appName}`;
    headers["Argocd-Project-Name"] = project;
    return headers;
  };

  Utils.buildChatRequest = ({ messageText, user, sessionId, isFirstMessage }) => ({
    user: getString(user?.id, "unknown"),
    type: "message",
    thread_ts: sessionId,
    channel: "argocd",
    text: messageText,
    IO_type: "ui-extension",
    isFirstMessage: Boolean(isFirstMessage),
  });

  const fetchJson = (url, options) => {
    const opts = { credentials: "same-origin", ...options };
    return fetch(url, opts).then((res) => {
      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`);
      }
      return res.json();
    });
  };

  Utils.postArgonautMessage = (payload, app) =>
    fetchJson(`${Utils.argonautProxyBase}/webhook`, {
      method: "POST",
      headers: Utils.buildProxyHeaders(app),
      body: JSON.stringify(payload),
    });

  const isResponseReady = (data) => {
    if (!data) {
      return false;
    }
    if (typeof data === "string") {
      return data.trim().length > 0;
    }
    if (Array.isArray(data)) {
      return data.length > 0;
    }
    if (data.text || data.message || data.output) {
      return true;
    }
    if (Array.isArray(data.messages) && data.messages.length > 0) {
      return true;
    }
    return Object.keys(data).length > 0;
  };

  Utils.extractTextFromResponse = (data) => {
    if (!data) {
      return "";
    }
    if (typeof data === "string") {
      return data;
    }
    if (data.text) {
      return String(data.text);
    }
    if (data.message?.text) {
      return String(data.message.text);
    }
    if (Array.isArray(data.messages)) {
      const lastAssistant = [...data.messages]
        .reverse()
        .find((msg) => msg?.role === "assistant");
      if (lastAssistant?.content) {
        return String(lastAssistant.content);
      }
      if (data.messages[0]?.text) {
        return String(data.messages[0].text);
      }
    }
    if (data.output) {
      return typeof data.output === "string"
        ? data.output
        : JSON.stringify(data.output, null, 2);
    }
    return JSON.stringify(data, null, 2);
  };

  Utils.pollThread = (threadId, options = {}, app) => {
    const intervalMs = options.intervalMs || 2000;
    const timeoutMs = options.timeoutMs || 30000;
    const start = Date.now();

    return new Promise((resolve, reject) => {
      const poll = () => {
        fetchJson(
          `${Utils.argonautProxyBase}/threads/${encodeURIComponent(threadId)}`,
          {
            method: "GET",
            headers: Utils.buildProxyHeaders(app),
          }
        )
          .then((data) => {
            if (isResponseReady(data)) {
              resolve(data);
              return;
            }
            if (Date.now() - start >= timeoutMs) {
              reject(new Error("Timed out waiting for Argonaut response."));
              return;
            }
            setTimeout(poll, intervalMs);
          })
          .catch((err) => {
            if (Date.now() - start >= timeoutMs) {
              reject(err);
              return;
            }
            setTimeout(poll, intervalMs);
          });
      };
      poll();
    });
  };

  window.ArgonautExtensionUtils = Utils;
})(window);
