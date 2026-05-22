(() => {

  const ChatExtension = () => {
    const [apps, setApps] = React.useState([]);
    const [selectedApp, setSelectedApp] = React.useState("");
    const [messages, setMessages] = React.useState([]);
    const [input, setInput] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [backendUrl, setBackendUrl] = React.useState("");
    const [apiRequest, setApiRequest] = React.useState(null);
    const [appJson, setAppJson] = React.useState(null);
    const [apiOutput, setApiOutput] = React.useState(null);
    const [username, setUsername] = React.useState("");
    const [sessionId, setSessionId] = React.useState("");
    const [apiSuccess, setApiSuccess] = React.useState(false);
    const [pendingApp, setPendingApp] = React.useState(() => {
      const params = new URLSearchParams(window.location.search || "");
      return params.get("app") || "";
    });

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

    const isValidUrl = (url) => {
      try {
        const u = new URL(url);
        return u.protocol === "http:" || u.protocol === "https:";
      } catch (_) {
        return false;
      }
    };

    const selectApp = (appName, opts = {}) => {
      const timestamp = Math.floor(Date.now() / 1000);
      const sid = `${username}_${timestamp}`;
      setSessionId(sid);
      setSelectedApp(appName);
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
      fetch(`${window.location.origin}/api/v1/applications/${appName}`)
        .then(res => res.json())
        .then(setAppJson)
        .catch(err => {
          console.error(err);
          setMessages(m => [...m, { user: "Agent", text: "Error getting analysis." }]);
        })
        .finally(() => setLoading(false));
    };

    const handleAppChange = (e) => {
      const appName = e.target.value;
      selectApp(appName);
    };

    React.useEffect(() => {
      if (!pendingApp || selectedApp) return;
      if (!isValidUrl(backendUrl)) return;
      selectApp(pendingApp, { silent: true });
      setPendingApp("");
    }, [pendingApp, selectedApp, backendUrl, username]);

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
      const fullUrl = apiRequest.url.startsWith("http") ? apiRequest.url : `${window.location.origin}${apiRequest.url}`;

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
          setApiOutput("❌ Failed to send request.");
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

    return React.createElement("div", { className: "chat-container" },
      React.createElement("style", {}, `
        .chat-container {
          padding: 20px;
          font-family: Arial, sans-serif;
          color: #002244;
          background-color: #fffbea;
          min-height: 100vh;
        }
        .chat-title {
          font-size: 28px;
          margin-bottom: 20px;
          color: #0047ab;
        }
        .chat-input, .chat-select, .chat-textarea {
          padding: 8px;
          border: 1px solid #0047ab;
          border-radius: 4px;
          margin-bottom: 10px;
          width: 60%;
        }
        .chat-select {
          width: auto;
        }
        .chat-textarea {
          width: 80%;
          height: 70px;
          resize: none;
        }
        .chat-button {
          background-color: #ffcc00;
          color: #002244;
          border: none;
          padding: 10px 16px;
          margin-left: 5px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }
        .chat-box {
          border: 1px solid #ccc;
          height: 300px;
          overflow-y: auto;
          padding: 10px;
          margin-bottom: 10px;
          background: #f0f8ff;
        }
        .chat-message {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
        }
        .chat-message img {
          width: 20px;
          height: 20px;
          margin-right: 6px;
        }
        .chat-response {
          background: #e6f2ff;
          padding: 10px;
          border-radius: 6px;
          white-space: pre-wrap;
          border: 1px solid #0047ab;
          margin-top: 10px;
        }
      `),
      React.createElement("h2", { className: "chat-title" }, "💬 Argo CD Chat Assistant"),

      React.createElement("div", null,
        React.createElement("label", null, "🔗 Backend URL: "),
        React.createElement("input", {
          className: "chat-input",
          value: backendUrl,
          onChange: e => setBackendUrl(e.target.value)
        })
      ),

      React.createElement("div", null,
        React.createElement("label", null, "📦 Select App: "),
        React.createElement("select", {
          className: "chat-select",
          value: selectedApp,
          onChange: handleAppChange
        },
          React.createElement("option", { value: "" }, "-- Choose --"),
          apps.map(app => React.createElement("option", { key: app, value: app }, app))
        )
      ),

      loading && React.createElement("p", null, "⏳ Analyzing..."),

      selectedApp && React.createElement("div", null,
        React.createElement("div", { className: "chat-box" },
          messages.map((msg, idx) =>
            React.createElement("div", { key: idx, className: "chat-message" },
              React.createElement("strong", null, `${msg.user}: `),
              msg.text
            )
          )
        ),

        React.createElement("textarea", {
          className: "chat-textarea",
          value: input,
          onChange: e => setInput(e.target.value),
          onKeyDown: e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())
        }),

        React.createElement("button", {
          className: "chat-button",
          onClick: handleSend
        }, "Send"),

        apiRequest && React.createElement("div", null,
          React.createElement("p", null, `📜 Suggested: ${apiRequest.method} ${apiRequest.url}`),
          React.createElement("button", {
            className: "chat-button",
            onClick: runSuggestedRequest
          }, "Run API")
        ),

        apiOutput && React.createElement("div", { className: "chat-response" }, apiOutput,
          React.createElement("div", null,
            React.createElement("button", {
              className: "chat-button",
              onClick: sendOutputToAI
            }, "Send Output to AI")
          )
        )
      )
    );
  };

  window.extensionsAPI.registerSystemLevelExtension(ChatExtension, "Chat", "/chat", "fa-comments");

  const TopBarChatShortcut = (props) => {
    const appName =
      (props && props.application && props.application.metadata && props.application.metadata.name) ||
      (props && props.app && props.app.metadata && props.app.metadata.name) ||
      "";
    const goToChat = () => {
      const dest = appName ? `/chat?app=${encodeURIComponent(appName)}` : "/chat";
      window.location.assign(dest);
    };
    return React.createElement("span", { onClick: goToChat }, "Chat Assistant");
  };

  window.extensionsAPI.registerTopBarActionMenuExt(
    TopBarChatShortcut,
    "Chat Assistant",
    "chat_assistant",
    null,
    () => true,
    "fa fa-comments",
    true
  );
})();
