((window) => {
  const ChatFlyout = (props) => {
    const appName =
      (props && props.application && props.application.metadata && props.application.metadata.name) ||
      (props && props.app && props.app.metadata && props.app.metadata.name) ||
      "";

    const [apps, setApps] = React.useState([]);
    const [selectedApp, setSelectedApp] = React.useState(appName || "");
    const [messages, setMessages] = React.useState([]);
    const [input, setInput] = React.useState("what is wrong with this app?");
    const [loading, setLoading] = React.useState(false);
    const [backendUrl, setBackendUrl] = React.useState(
      () => window.localStorage.getItem("argoChatBackendUrl") || "https://n8n.opencd.opsmx.org/webhook/050c1ae2-6cd1-4b93-b25e-08eefb970351"
    );
    const [apiRequest, setApiRequest] = React.useState(null);
    const [appJson, setAppJson] = React.useState(null);
    const [apiOutput, setApiOutput] = React.useState(null);
    const [username, setUsername] = React.useState("");
    const [sessionId, setSessionId] = React.useState("");
    const [apiSuccess, setApiSuccess] = React.useState(false);

    React.useEffect(() => {
      fetch(`${window.location.origin}/api/v1/applications`)
        .then(res => res.json())
        .then(data => setApps(data.items.map(i => i.metadata.name)))
        .catch(console.error);

      fetch(`${window.location.origin}/api/v1/session/userinfo`)
        .then(res => res.json())
        .then(data => setUsername(data.username || "unknown"))
        .catch(console.error);
    }, []);

    React.useEffect(() => {
      if (backendUrl) {
        window.localStorage.setItem("argoChatBackendUrl", backendUrl);
      }
    }, [backendUrl]);

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

    const selectApp = (nextApp, opts = {}) => {
      const timestamp = Math.floor(Date.now() / 1000);
      const sid = `${username}_${timestamp}`;
      setSessionId(sid);
      setSelectedApp(nextApp);
      setMessages([]);
      setInput("");
      setApiRequest(null);
      setApiOutput(null);

      if (!isValidUrl(backendUrl)) {
        if (!opts.silent) {
          alert("Please enter a valid backend URL");
        }
        return;
      }

      setLoading(true);
      fetch(`${window.location.origin}/api/v1/applications/${nextApp}`)
        .then(res => res.json())
        .then(setAppJson)
        .catch(err => {
          console.error(err);
          setMessages(m => [...m, { user: "Agent", text: "Error getting analysis." }]);
        })
        .finally(() => setLoading(false));
    };

    React.useEffect(() => {
      if (!appName || appJson || !isValidUrl(backendUrl)) return;
      selectApp(appName, { silent: true });
    }, [appName, backendUrl, username, appJson]);

    const handleAppChange = (e) => {
      const nextApp = e.target.value;
      selectApp(nextApp);
    };

    const handleSend = () => {
      if (!input.trim()) return;
      setMessages(m => [...m, { user: "You", text: input }]);
      setInput("");
      if (!isValidUrl(backendUrl)) return alert("Invalid backend URL");

      const body = {
        message: input,
        sessionId: sessionId,
        application: selectedApp,
        appData: {
          status: appJson.status,
          spec: appJson.spec
        }
      };

      fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(data => {
          const out = data.output || {};
          setMessages(m => [...m, { user: "Agent", text: out.comment || JSON.stringify(out) }]);
          if (out.shouldRun && out.url && out.method) {
            setApiRequest({ method: out.method, url: out.url, body: out.body });
            setApiOutput(null);
          }
        })
        .catch(err => {
          console.error(err);
          setMessages(m => [...m, { user: "Agent", text: "Chat error." }]);
        });
    };

    const runSuggestedRequest = () => {
      if (!apiRequest) return alert("No request");
      const fullUrl = apiRequest.url.startsWith("http")
        ? apiRequest.url
        : `${window.location.origin}${apiRequest.url}`;

      fetch(fullUrl, {
        method: apiRequest.method,
        headers: { "Content-Type": "application/json" },
        body: apiRequest.body ? JSON.stringify(apiRequest.body) : null
      })
        .then(res => res.json())
        .then(data => {
          setApiOutput(JSON.stringify(data, null, 2));
          setApiSuccess(true);
        })
        .catch(err => {
          console.error(err);
          setApiSuccess(false);
          setApiOutput("Failed to send request.");
        });
    };

    const sendOutputToAI = () => {
      const userMessage = apiSuccess
        ? "I executed the API in my browser successfully and have sent you the response. Please analyze the API response."
        : "I executed the API in my browser unsuccessfully.";
      if (!apiOutput) return;
      setMessages(m => [...m, { user: "You", text: userMessage }]);
      setApiOutput(null);

      const body = {
        message: userMessage,
        sessionId: sessionId,
        application: selectedApp,
        appData: {
          apiResult: apiOutput
        }
      };

      fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(data => {
          const out = data.output || {};
          setMessages(m => [...m, { user: "Agent", text: out.comment || JSON.stringify(out) }]);
          if (out.shouldRun && out.url && out.method) {
            setApiRequest({ method: out.method, url: out.url, body: out.body });
            setApiOutput(null);
          }
        });
    };

    return React.createElement("div", { className: "ai-chat-container" },
      React.createElement("style", {}, `
        .ai-chat-container {
          width: 100%;
          max-width: 100%;
          margin: 0;
          background: #f9fbfc;
          padding: 20px;
          font-family: 'Segoe UI', sans-serif;
          border-radius: 0;
          box-shadow: none;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .ai-chat-title {
          font-size: 22px;
          margin-bottom: 16px;
          color: #003366;
          font-weight: 600;
        }
        .ai-chat-controls {
          display: flex;
          gap: 10px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .ai-chat-input,
        .ai-chat-select {
          flex: 1 1 240px;
          padding: 10px;
          font-size: 14px;
          border: 1px solid #bbb;
          border-radius: 6px;
          box-sizing: border-box;
          min-width: 200px;
        }
        .ai-chat-select {
          appearance: none;
          background-color: #fff;
          padding-right: 30px;
          cursor: pointer;
        }
        .ai-chat-select.selected {
          font-weight: 500;
          color: #003366;
        }
        .ai-chat-loading {
          font-style: italic;
          color: #666;
          margin-bottom: 12px;
        }
        .ai-agent-thinking {
          font-style: italic;
          color: #666;
          margin-bottom: 12px;
          padding-left: 8px;
        }
        .ai-chat-messages {
          flex: 1;
          overflow-y: auto;
          background: #ffffff;
          border: 1px solid #ddd;
          padding: 15px;
          border-radius: 6px;
          margin-bottom: 10px;
          scroll-behavior: smooth;
        }
        .ai-chat-message {
          display: flex;
          flex-direction: column;
          margin-bottom: 12px;
          padding: 12px 16px;
          border-radius: 18px;
          max-width: 80%;
          line-height: 1.5;
          word-wrap: break-word;
          font-size: 14px;
          position: relative;
        }
        .ai-chat-message.user {
          background-color: #daf0e5;
          color: #0f5132;
          align-self: flex-end;
          margin-left: auto;
          border-radius: 18px 18px 4px 18px;
        }
        .ai-chat-message.agent {
          background-color: #f1f3f5;
          color: #333;
          align-self: flex-start;
          margin-right: auto;
          border-radius: 18px 18px 18px 4px;
        }
        .ai-chat-footer {
          display: flex;
          gap: 10px;
          padding: 10px;
          background: #fff;
          border-top: 1px solid #ccc;
          position: sticky;
          bottom: 0;
          z-index: 10;
        }
        .ai-chat-textarea {
          width: 100%;
          min-height: 50px;
          max-height: 200px;
          padding: 10px;
          font-size: 14px;
          resize: none;
          border: 1px solid #bbb;
          border-radius: 6px;
          flex: 1;
        }
        .ai-chat-button {
          background-color: #004085;
          color: white;
          border: none;
          padding: 10px 16px;
          font-size: 14px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s;
          white-space: nowrap;
          height: fit-content;
        }
        .ai-chat-button:hover {
          background-color: #003166;
        }
        .ai-chat-output {
          margin-top: 12px;
          background-color: #f8f9fa;
          border: 1px solid #ccc;
          padding: 12px;
          border-radius: 6px;
        }
        .ai-chat-output pre {
          background: #eef1f4;
          padding: 12px;
          border-radius: 4px;
          max-height: 200px;
          overflow-y: auto;
          font-size: 13px;
          line-height: 1.5;
        }
        .ai-chat-info {
          background-color: #e9f5ff;
          color: #004085;
          padding: 12px 16px;
          border: 1px solid #b8daff;
          border-radius: 6px;
          font-size: 14px;
          margin-top: 12px;
        }
      `),
      React.createElement("h2", { className: "ai-chat-title" }, "Argo CD Chat Assistant"),

      React.createElement("div", null,
        React.createElement("label", null, "Assistant URL: "),
        React.createElement("input", {
          className: "ai-chat-input",
          value: backendUrl,
          onChange: e => setBackendUrl(e.target.value)
        })
      ),

      React.createElement("div", { className: "ai-chat-controls" },
        appName
          ? React.createElement("div", null, `Application: ${appName}`)
          : React.createElement("select", {
              className: `ai-chat-select ${selectedApp ? "selected" : ""}`,
              value: selectedApp,
              onChange: handleAppChange
            },
              React.createElement("option", { value: "" }, "Select an Argo CD application"),
              apps.map(app => React.createElement("option", { key: app, value: app }, app))
            )
      ),

      loading && React.createElement("div", { className: "ai-chat-loading" }, "Analyzing app..."),
      backendUrl && !isValidUrl(backendUrl) && React.createElement("p", { className: "ai-chat-info" }, "Please enter a valid Assistant URL to continue."),
      !backendUrl && React.createElement("p", { className: "ai-chat-info" }, "Please provide your Assistant URL to begin."),

      selectedApp && React.createElement("div", null,
        React.createElement("div", { className: "ai-chat-messages" },
          messages.map((msg, idx) =>
            React.createElement("div", { key: idx, className: `ai-chat-message ${msg.user === "You" ? "user" : "agent"}` },
              React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" } },
                React.createElement("strong", null, `${msg.user}:`)
              ),
              renderText(msg.text)
            )
          )
        ),

        React.createElement("div", { className: "ai-chat-footer" },
          React.createElement("textarea", {
            className: "ai-chat-textarea",
            placeholder: "Ask anything",
            value: input,
            onChange: e => setInput(e.target.value),
            onKeyDown: e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())
          }),
          React.createElement("button", {
            className: "ai-chat-button",
            onClick: handleSend
          }, "Send")
        ),

        apiRequest && React.createElement("div", null,
          React.createElement("p", null, `Suggested: ${apiRequest.method} ${apiRequest.url}`),
          React.createElement("button", {
            className: "ai-chat-button",
            onClick: runSuggestedRequest
          }, "Run API")
        ),

        apiOutput && React.createElement("div", { className: "ai-chat-output" },
          React.createElement("pre", null, apiOutput),
          React.createElement("button", {
            className: "ai-chat-button",
            onClick: sendOutputToAI,
            style: { marginTop: "10px" }
          }, "Send Output to AI")
        ),
        apiSuccess && React.createElement("div", { className: "ai-agent-thinking" }, "Thinking...")
      )
    );
  };

  const TopBarChatShortcut = () => {
    return React.createElement("span", null, "Chat Assistant");
  };

  window.extensionsAPI.registerTopBarActionMenuExt(
    TopBarChatShortcut,
    "Chat Assistant",
    "chat_assistant_topbar",
    ChatFlyout,
    () => true,
    "fa fa-comments",
    true
  );
})(window);
