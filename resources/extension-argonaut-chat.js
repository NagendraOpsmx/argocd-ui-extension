((window) => {
  "use strict";

  if (!window.extensionsAPI || !window.React) {
    return;
  }

  const React = window.React;

  const ensureStyles = (() => {
    let injected = false;
    return () => {
      if (injected) {
        return;
      }
      injected = true;
      const style = document.createElement("style");
      style.id = "argonaut-chat-styles";
      style.textContent = `
        .argonaut-chat-container {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 120px);
          padding: 16px;
          gap: 12px;
          background: #f8f9fb;
          color: #1b1f23;
          font-family: "Segoe UI", Tahoma, sans-serif;
        }
        .argonaut-chat-header {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .argonaut-chat-title {
          font-size: 18px;
          font-weight: 600;
        }
        .argonaut-chat-subtitle {
          font-size: 12px;
          color: #5a6370;
        }
        .argonaut-chat-error {
          padding: 8px 12px;
          border: 1px solid #d9534f;
          background: #fbe9e8;
          color: #a94442;
          border-radius: 4px;
          font-size: 12px;
        }
        .argonaut-chat-warning {
          padding: 8px 12px;
          border: 1px solid #f0ad4e;
          background: #fff7e5;
          color: #8a6d3b;
          border-radius: 4px;
          font-size: 12px;
        }
        .argonaut-chat-messages {
          flex: 1;
          overflow-y: auto;
          background: #ffffff;
          border: 1px solid #e1e4e8;
          border-radius: 6px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .argonaut-chat-bubble {
          max-width: 75%;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 13px;
          line-height: 1.4;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .argonaut-chat-bubble.user {
          align-self: flex-end;
          background: #e7f1ff;
          border: 1px solid #c7ddf7;
        }
        .argonaut-chat-bubble.assistant {
          align-self: flex-start;
          background: #f1f3f5;
          border: 1px solid #e2e5e9;
        }
        .argonaut-chat-bubble.system {
          align-self: center;
          background: #f5f5f5;
          border: 1px dashed #cfd4da;
          font-size: 12px;
          color: #5a6370;
        }
        .argonaut-chat-loading {
          align-self: flex-start;
          font-size: 12px;
          color: #5a6370;
        }
        .argonaut-chat-input-row {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }
        .argonaut-chat-select {
          min-width: 240px;
          padding: 6px 10px;
          border: 1px solid #cfd4da;
          border-radius: 4px;
          font-size: 12px;
          background: #ffffff;
        }
        .argonaut-chat-select-row {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .argonaut-chat-input {
          flex: 1;
          min-height: 60px;
          max-height: 160px;
          resize: vertical;
          padding: 8px 10px;
          border: 1px solid #cfd4da;
          border-radius: 4px;
          font-size: 13px;
          font-family: inherit;
          background: #ffffff;
        }
        .argonaut-chat-button {
          padding: 8px 14px;
          border-radius: 4px;
          border: none;
          background: #0052cc;
          color: #ffffff;
          font-size: 13px;
          cursor: pointer;
        }
        .argonaut-chat-button:disabled {
          background: #9aa4b2;
          cursor: not-allowed;
        }
        .argonaut-proposal-card {
          border: 1px solid #e1e4e8;
          border-radius: 6px;
          padding: 10px;
          background: #fafbfc;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .argonaut-proposal-title {
          font-size: 13px;
          font-weight: 600;
        }
        .argonaut-proposal-command {
          margin: 0;
          padding: 8px;
          background: #1b1f23;
          color: #f6f8fa;
          border-radius: 4px;
          font-size: 12px;
          overflow-x: auto;
        }
        .argonaut-proposal-actions {
          display: flex;
          gap: 8px;
        }
        .argonaut-proposal-button {
          padding: 6px 10px;
          border-radius: 4px;
          border: 1px solid #cfd4da;
          background: #ffffff;
          font-size: 12px;
          cursor: pointer;
        }
        .argonaut-proposal-button.approve {
          border-color: #2e8540;
          color: #2e8540;
        }
        .argonaut-proposal-button.reject {
          border-color: #c9302c;
          color: #c9302c;
        }
      `;
      document.head.appendChild(style);
    };
  })();

  const getUtils = () => window.ArgonautExtensionUtils || null;

  const ArgonautChatExtension = (props) => {
    const [messages, setMessages] = React.useState([]);
    const [input, setInput] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [applications, setApplications] = React.useState([]);
    const [selectedAppKey, setSelectedAppKey] = React.useState("");
    const [user, setUser] = React.useState({
      id: "unknown",
      displayName: "unknown",
    });
    const [appContext, setAppContext] = React.useState(null);
    const [sessionKey, setSessionKey] = React.useState("");
    const [sessionId, setSessionId] = React.useState("");
    const messagesEndRef = React.useRef(null);

    React.useEffect(() => {
      ensureStyles();
    }, []);

    React.useEffect(() => {
      const Utils = getUtils();
      if (!Utils) {
        setError("Argonaut utilities are not loaded.");
        return;
      }
      Utils.getUserInfo().then(setUser);
      fetch("/api/v1/applications")
        .then((res) => (res.ok ? res.json() : { items: [] }))
        .then((data) => {
          const items = Array.isArray(data?.items) ? data.items : [];
          const mapped = items.map((item) => ({
            name: item?.metadata?.name || "",
            namespace: item?.metadata?.namespace || "",
            project: item?.spec?.project || "",
          }));
          setApplications(mapped);
        })
        .catch(() => {
          setError("Failed to load application list.");
        });
    }, [props]);

    React.useEffect(() => {
      const Utils = getUtils();
      if (!Utils) {
        return;
      }
      const { sessionId: sid, key } = Utils.getSessionId(
        appContext,
        user?.id
      );
      setSessionKey(key);
      setSessionId(sid);
    }, [appContext, user?.id]);

    React.useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages, loading]);

    const getArgocdToken = () => {
      const match = document.cookie.match(/(?:^|; )argocd\.token=([^;]+)/);
      return match ? decodeURIComponent(match[1]) : "";
    };

    const extractArgocdCommand = (text) => {
      if (!text) {
        return "";
      }
      const fenced = text.match(/```[\s\r\n]*(argocd[\s\S]*?)```/i);
      if (fenced && fenced[1]) {
        const line = fenced[1]
          .split(/\r?\n/)
          .map((value) => value.trim())
          .find((value) => value);
        return line && line.toLowerCase().startsWith("argocd ") ? line : "";
      }
      return "";
    };

    const appendArgocdFlags = (command, server, token) => {
      let updated = command;
      if (!/--server\b/i.test(updated)) {
        updated += ` --server ${server}`;
      }
      if (!/--auth-token\b/i.test(updated)) {
        updated += ` --auth-token ${token}`;
      }
      return updated;
    };

    const appendMessages = (items) => {
      if (!items || !items.length) {
        return;
      }
      setMessages((prev) => prev.concat(items));
    };

    const sendMessage = () => {
      const text = input.trim();
      if (!text || loading) {
        return;
      }
      const Utils = getUtils();
      if (!Utils) {
        setError("Argonaut utilities are not loaded.");
        return;
      }
      if (!appContext?.name || !appContext?.namespace) {
        setError("Select an application to start the session.");
        return;
      }
      let activeSessionId = sessionId;
      if (!activeSessionId) {
        const session = Utils.getSessionId(appContext, user?.id);
        activeSessionId = session.sessionId;
        setSessionKey(session.key);
        setSessionId(activeSessionId);
      }
      setError("");
      setInput("");
      appendMessages([{ role: "user", text }]);
      setLoading(true);

      const isFirstMessage = messages.length === 0;
      const messageText = isFirstMessage
        ? `application name is "${appContext.name}"\n${text}`
        : text;
      const payload = Utils.buildChatRequest({
        messageText,
        user,
        sessionId: activeSessionId,
        isFirstMessage,
      });

      Utils.postArgonautMessage(payload, appContext)
        .then(() =>
          Utils.pollThread(
            activeSessionId,
            { intervalMs: 2000, timeoutMs: 30000 },
            appContext
          )
        )
        .then((data) => {
          const text = Utils.extractTextFromResponse(data);
          appendMessages([
            {
              role: "assistant",
              text: text || "No response from Argonaut.",
            },
          ]);
        })
        .catch((err) => {
          setError(err?.message || "Request failed.");
          appendMessages([
            { role: "assistant", text: "Request failed. Please try again." },
          ]);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    const runCommand = (command) => {
      if (!command || loading) {
        return;
      }
      const Utils = getUtils();
      if (!Utils) {
        setError("Argonaut utilities are not loaded.");
        return;
      }
      if (!appContext?.name || !appContext?.namespace) {
        setError("Select an application to start the session.");
        return;
      }
      const token = getArgocdToken();
      if (!token) {
        setError("Unable to read argocd.token from browser cookies.");
        return;
      }
      const server = window.ArgocdServer || "argocd.opencd.opsmx.org";
      const fullCommand = appendArgocdFlags(command, server, token);
      let activeSessionId = sessionId;
      if (!activeSessionId) {
        const session = Utils.getSessionId(appContext, user?.id);
        activeSessionId = session.sessionId;
        setSessionKey(session.key);
        setSessionId(activeSessionId);
      }

      setError("");
      appendMessages([{ role: "user", text: "RUN" }]);
      setLoading(true);

      const payload = Utils.buildChatRequest({
        messageText: fullCommand,
        user,
        sessionId: activeSessionId,
        isFirstMessage: false,
      });

      Utils.postArgonautMessage(payload, appContext)
        .then(() =>
          Utils.pollThread(
            activeSessionId,
            { intervalMs: 2000, timeoutMs: 30000 },
            appContext
          )
        )
        .then((data) => {
          const text = Utils.extractTextFromResponse(data);
          appendMessages([
            {
              role: "assistant",
              text: text || "No response from Argonaut.",
            },
          ]);
        })
        .catch((err) => {
          setError(err?.message || "Request failed.");
          appendMessages([
            { role: "assistant", text: "Request failed. Please try again." },
          ]);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    const handleKeyDown = (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
      }
    };

    const renderMessage = (msg, idx) => {
      const command =
        msg.role === "assistant" ? extractArgocdCommand(msg.text) : "";
      return React.createElement(
        "div",
        {
          key: `msg-${idx}`,
          className: `argonaut-chat-bubble ${msg.role || "assistant"}`,
        },
        msg.text,
        command
          ? React.createElement(
              "div",
              { className: "argonaut-proposal-actions" },
              React.createElement(
                "button",
                {
                  className: "argonaut-proposal-button approve",
                  onClick: () => runCommand(command),
                  disabled: loading,
                },
                "RUN"
              )
            )
          : null
      );
    };

    return React.createElement(
      "div",
      { className: "argonaut-chat-container" },
      React.createElement(
        "div",
        { className: "argonaut-chat-header" },
        React.createElement("div", { className: "argonaut-chat-title" }, "Argonaut Chat"),
        React.createElement(
          "div",
          { className: "argonaut-chat-subtitle" },
          `Logged in as ${user.displayName}`
        )
      ),
      error
        ? React.createElement("div", { className: "argonaut-chat-error" }, error)
        : null,
      React.createElement(
        "div",
        { className: "argonaut-chat-select-row" },
        React.createElement(
          "select",
          {
            className: "argonaut-chat-select",
            value: selectedAppKey,
            onChange: (event) => {
              const key = event.target.value;
              setSelectedAppKey(key);
              const match = applications.find(
                (app) => `${app.namespace}:${app.name}` === key
              );
              if (match) {
                setAppContext(match);
                setError("");
              } else {
                setAppContext(null);
              }
            },
          },
          React.createElement(
            "option",
            { value: "", disabled: true },
            "Select application"
          ),
          applications.map((app) =>
            React.createElement(
              "option",
              {
                key: `${app.namespace}:${app.name}`,
                value: `${app.namespace}:${app.name}`,
              },
              `${app.namespace}/${app.name}`
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "argonaut-chat-messages" },
        messages.map(renderMessage),
        loading
          ? React.createElement(
              "div",
              { className: "argonaut-chat-loading" },
              "Waiting for Argonaut..."
            )
          : null,
        React.createElement("div", { ref: messagesEndRef })
      ),
      React.createElement(
        "div",
        { className: "argonaut-chat-input-row" },
        React.createElement("textarea", {
          className: "argonaut-chat-input",
          value: input,
          placeholder: "Ask Argonaut...",
          onChange: (event) => setInput(event.target.value),
          onKeyDown: handleKeyDown,
          disabled: loading,
        }),
        React.createElement(
          "button",
          {
            className: "argonaut-chat-button",
            onClick: sendMessage,
            disabled: loading || !appContext?.name || !appContext?.namespace,
          },
          loading ? "Sending..." : "Send"
        )
      )
    );
  };

  window.extensionsAPI.registerSystemLevelExtension(
    ArgonautChatExtension,
    "Debug",
    "/debug",
    "fa-bug"
  );
})(window);
