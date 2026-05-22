((window) => {
  const ResourceChat = (props) => {
    const application = props && props.application;
    const resource = props && props.resource;
    const appName = application && application.metadata && application.metadata.name;
    const resourceName =
      (resource && resource.name) ||
      (resource && resource.metadata && resource.metadata.name) ||
      "";
    const resourceNamespace =
      (resource && resource.namespace) ||
      (resource && resource.metadata && resource.metadata.namespace) ||
      (application && application.spec && application.spec.destination && application.spec.destination.namespace) ||
      "";
    const resourceKind =
      (resource && resource.kind) ||
      (resource && resource.metadata && resource.metadata.kind) ||
      "";
    const resourceGroup = resource && resource.group;

    const [assistantUrl, setAssistantUrl] = React.useState(
      () => window.localStorage.getItem("argoChatAssistantUrl") || "https://n8n.opencd.opsmx.org/webhook/050c1ae2-6cd1-4b93-b25e-08eefb970351"
    );
    const [messages, setMessages] = React.useState([]);
    const [input, setInput] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [apiRequest, setApiRequest] = React.useState(null);
    const [apiOutput, setApiOutput] = React.useState(null);
    const [apiSuccess, setApiSuccess] = React.useState(false);
    const [prefillQuestion, setPrefillQuestion] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [sessionId, setSessionId] = React.useState("");

    React.useEffect(() => {
      if (assistantUrl) {
        window.localStorage.setItem("argoChatAssistantUrl", assistantUrl);
      }
    }, [assistantUrl]);

    React.useEffect(() => {
      fetch(`${window.location.origin}/api/v1/session/userinfo`)
        .then(res => res.json())
        .then(data => setUsername(data.username || "unknown"))
        .catch(console.error);
    }, []);

    const isValidUrl = (url) => {
      try {
        const u = new URL(url);
        return u.protocol === "http:" || u.protocol === "https:";
      } catch (_) {
        return false;
      }
    };

    const renderText = (text) => {
      const inputText = String(text || "");
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const parts = inputText.split(urlRegex);
      return parts.map((part, idx) => {
        if (urlRegex.test(part)) {
          return React.createElement(
            "a",
            { key: idx, href: part, target: "_blank", rel: "noopener noreferrer" },
            part
          );
        }
        return part;
      });
    };

    React.useEffect(() => {
      if (!appName || !resourceKind) return;
      const question = "get the manifest of the resource\n"
        + `kind: ${resourceKind || "-"}\n`
        + `name: ${resourceName || "-"}\n`
        + `namespace: ${resourceNamespace || "-"}`;
      const timestamp = Math.floor(Date.now() / 1000);
      const sid = `${username || "unknown"}_${timestamp}`;
      setSessionId(sid);
      setPrefillQuestion(question);
      if (!input.trim()) {
        setInput(question);
      }
    }, [appName, resourceKind, resourceName, resourceGroup, resourceNamespace, username]);

    const sendToAgent = (text) => {
      if (!isValidUrl(assistantUrl)) {
        alert("Please enter a valid Assistant URL");
        return;
      }
      setMessages((m) => [...m, { user: "You", text }]);
      setInput("");
      setLoading(true);

      const body = {
        message: text,
        sessionId: sessionId,
        application: appName,
        appData: {
          status: application && application.status,
        },
      };

      fetch(assistantUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          const out = data.output || {};
          setMessages((m) => [...m, { user: "Agent", text: out.comment || JSON.stringify(out) }]);
          if (out.shouldRun && out.url && out.method) {
            setApiRequest({ method: out.method, url: out.url, body: out.body });
          }
        })
        .catch(() => {
          setMessages((m) => [...m, { user: "Agent", text: "Assistant request failed." }]);
        })
        .finally(() => setLoading(false));
    };

    const handleSend = () => {
      if (!input.trim()) return;
      sendToAgent(input.trim());
    };

    const runSuggestedRequest = () => {
      if (!apiRequest) return;
      const fullUrl = apiRequest.url.startsWith("http")
        ? apiRequest.url
        : `${window.location.origin}${apiRequest.url}`;

      fetch(fullUrl, {
        method: apiRequest.method,
        headers: { "Content-Type": "application/json" },
        body: apiRequest.body ? JSON.stringify(apiRequest.body) : null,
      })
        .then((res) => res.json())
        .then((data) => {
          const payload = JSON.stringify(data, null, 2);
          setApiOutput(payload);
          setApiSuccess(true);
          setApiRequest(null);
        })
        .catch(() => {
          setApiOutput("API request failed.");
          setApiSuccess(false);
        });
    };

    const sendOutputToAgent = () => {
      if (!apiOutput) return;
      if (!isValidUrl(assistantUrl)) {
        alert("Please enter a valid Assistant URL");
        return;
      }

      const userMessage = apiSuccess
        ? "I executed the API successfully and have sent you the response. Please analyze the API response."
        : "I executed the API unsuccessfully.";

      setMessages((m) => [...m, { user: "You", text: userMessage }]);
      setLoading(true);

      const body = {
        message: userMessage,
        sessionId: sessionId,
        application: appName,
        appData: {
          status: application && application.status,
          apiResult: apiOutput,
        },
      };

      fetch(assistantUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          const out = data.output || {};
          setMessages((m) => [...m, { user: "Agent", text: out.comment || JSON.stringify(out) }]);
        })
        .catch(() => {
          setMessages((m) => [...m, { user: "Agent", text: "Failed to send output to assistant." }]);
        })
        .finally(() => {
          setApiOutput(null);
          setLoading(false);
        });
    };

    return React.createElement(
      "div",
      { className: "resource-chat" },
      React.createElement("style", {}, `
        .resource-chat {
          padding: 12px;
          font-family: 'Segoe UI', sans-serif;
        }
        .resource-chat-title {
          font-size: 18px;
          margin-bottom: 10px;
          font-weight: 600;
          color: #003366;
        }
        .resource-chat-input {
          width: 100%;
          padding: 8px;
          border: 1px solid #bbb;
          border-radius: 6px;
          margin-bottom: 10px;
          box-sizing: border-box;
        }
        .resource-chat-messages {
          border: 1px solid #ddd;
          background: #fff;
          padding: 10px;
          border-radius: 6px;
          max-height: 320px;
          overflow-y: auto;
          margin-bottom: 10px;
        }
        .resource-chat-message {
          margin-bottom: 10px;
          padding: 8px 10px;
          border-radius: 12px;
          max-width: 90%;
          font-size: 13px;
          line-height: 1.4;
        }
        .resource-chat-message.user {
          background: #daf0e5;
          color: #0f5132;
          margin-left: auto;
        }
        .resource-chat-message.agent {
          background: #f1f3f5;
          color: #333;
          margin-right: auto;
        }
        .resource-chat-footer {
          display: flex;
          gap: 8px;
        }
        .resource-chat-textarea {
          flex: 1;
          min-height: 50px;
          padding: 8px;
          border: 1px solid #bbb;
          border-radius: 6px;
          resize: vertical;
        }
        .resource-chat-button {
          background-color: #004085;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          height: fit-content;
        }
        .resource-chat-note {
          font-size: 12px;
          color: #555;
          margin-bottom: 10px;
        }
      `),
      React.createElement("div", { className: "resource-chat-title" }, "Resource Chat"),
      React.createElement("div", { className: "resource-chat-note" }, `Application: ${appName || "-"}`),
      React.createElement("input", {
        className: "resource-chat-input",
        placeholder: "Enter Assistant URL",
        value: assistantUrl,
        onChange: (e) => setAssistantUrl(e.target.value),
      }),
      React.createElement("div", { className: "resource-chat-messages" },
        messages.length === 0
          ? React.createElement("div", { className: "resource-chat-note" }, "No messages yet.")
          : messages.map((msg, idx) =>
              React.createElement(
                "div",
                { key: idx, className: `resource-chat-message ${msg.user === "You" ? "user" : "agent"}` },
                React.createElement("strong", null, `${msg.user}: `),
                renderText(msg.text)
              )
            )
      ),
      apiRequest && React.createElement(
        "div",
        { className: "resource-chat-note" },
        `Suggested: ${apiRequest.method} ${apiRequest.url} `,
        React.createElement(
          "button",
          { className: "resource-chat-button", onClick: runSuggestedRequest, style: { marginLeft: "8px" } },
          "Run API"
        )
      ),
      apiOutput && React.createElement(
        "div",
        { className: "resource-chat-messages" },
        React.createElement("pre", null, apiOutput),
        React.createElement(
          "button",
          { className: "resource-chat-button", onClick: sendOutputToAgent, style: { marginTop: "8px" } },
          "Send Output to AI"
        )
      ),
      React.createElement("div", { className: "resource-chat-footer" },
        React.createElement("textarea", {
          className: "resource-chat-textarea",
          placeholder: "Ask about this resource",
          value: input,
          onChange: (e) => setInput(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend()),
        }),
        React.createElement(
          "button",
          { className: "resource-chat-button", onClick: handleSend, disabled: loading },
          loading ? "Sending..." : "Send"
        )
      )
    );
  };

  window.extensionsAPI.registerResourceExtension(
    ResourceChat,
    "**",
    "*",
    "Resource Chat"
  );
})(window);
