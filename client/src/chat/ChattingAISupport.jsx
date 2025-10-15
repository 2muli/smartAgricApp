import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./chat.css";

const ChattingAISupport = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello dear 👋, how can I assist you today?" },
  ]);
  const [botTyping, setBotTyping] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, botTyping]);

  const handleSend = async () => {
    const value = inputRef.current.value.trim();
    if (!value) return;

    // Add user message
    setMessages((prev) => [...prev, { from: "user", text: value }]);
    inputRef.current.value = "";

    try {
      setBotTyping(true);
      const res = await axios.post("http://localhost:8800/server/chat", {
        message: value,
      });
      setBotTyping(false);

      // Add bot reply
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: res.data.reply || "I'm sorry, no response received." },
      ]);
    } catch (err) {
      setBotTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Error occurred. Please ensure you’re online. If the issue persists, contact support: 0792079900.",
        },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="app-container">
      {/* Close Button */}
      <Link to="/" className="close-btn">
        <span>
          <i className="bi bi-x-circle"></i>
        </span>
        <span className="tooltip-text" style={{ bottom: "-40px" }}>
          Close
        </span>
      </Link>

      <h2 className="app-title">Smart Agric Chat For Support</h2>

      {/* Chat Box */}
      <div
        id="messages"
        className="chat-box flex flex-col space-y-4 p-3 overflow-y-auto"
      >
        {messages.map((message, i) => (
          <div key={i}>
            <div
              className={`flex items-end ${
                message.from === "bot" ? "" : "justify-end"
              }`}
            >
              <div
                className={`flex flex-col space-y-2 text-md leading-tight max-w-lg mx-2 ${
                  message.from === "bot"
                    ? "order-2 items-start"
                    : "order-1 items-end"
                }`}
              >
                <div>
                  <span
                    className={`px-4 py-3 rounded-xl inline-block ${
                      message.from === "bot"
                        ? "rounded-bl-none bg-gray-100 text-gray-600"
                        : "rounded-br-none bg-green-700 text-white"
                    }`}
                  >
                    {message.text}
                  </span>
                </div>
              </div>
              <img
                src={
                  message.from === "bot"
                    ? "https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png"
                    : "https://i.pravatar.cc/100?img=7"
                }
                alt=""
                className={`w-6 h-6 rounded-full ${
                  message.from === "bot" ? "order-1" : "order-2"
                }`}
              />
            </div>
          </div>
        ))}

        {botTyping && (
          <div className="flex items-end">
            <div className="flex flex-col space-y-2 text-md leading-tight mx-2 order-2 items-start">
              <div>
                <img
                  src="https://support.signal.org/hc/article_attachments/360016877511/typing-animation-3x.gif"
                  alt="typing..."
                  className="w-16 ml-6"
                />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
          <input
            type="text"
            placeholder="Ask about crops or livestock..."
            ref={inputRef}
            onKeyDown={handleKeyDown}
            className="text-md w-full focus:outline-none text-gray-600 placeholder-gray-600 pl-5 pr-16 bg-gray-100 border-2 border-gray-200 focus:border-green-700 rounded-full py-2"
          />
          <div className="absolute right-2 items-center inset-y-0 hidden sm:flex">
            <button
              type="button"
              onClick={handleSend}
              className="inline-flex items-center justify-center rounded-full h-8 w-8 transition duration-200 ease-in-out text-white bg-green-700 hover:bg-green-800 focus:outline-none"
            >
              <i className="bi bi-send-fill text-sm"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChattingAISupport;
