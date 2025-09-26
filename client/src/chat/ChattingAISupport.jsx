import SendIcon from "@mui/icons-material/Send";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import axios from "axios";
import React, { useRef, useState } from "react";
import "./chat.css";
import { Link } from "react-router-dom";

const ChattingAISupport = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:8800/server/chat", {
        message: input,
      });

      const botMessage = { sender: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        sender: "bot",
        text: "⚠️ Error: Could not get response.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    if (textareaRef.current) {
      textareaRef.current.style.height = "40px";
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  return (
    <div className="app-container">
        <Link to="/" className="close-btn">
        <span><i className="bi bi-x-circle"></i></span>
        <span className="tooltip-text" style={{bottom: "-40px"}}>Close</span>
        </Link>
      <h2 className="app-title">🌱 SmartAgr Chat For Support</h2>

      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <TextField
        multiline
        maxRows={5}
        value={input}
        onChange={handleInput}
        onKeyDown={(e) =>
          e.key === "Enter" &&
          !e.shiftKey &&
          (e.preventDefault(), sendMessage())
        }
        placeholder="Ask about crops or livestock..."
        fullWidth
        variant="outlined"
        InputProps={{
          endAdornment:
            input.trim() && (
              <InputAdornment position="end">
                <IconButton onClick={sendMessage}>
                  <SendIcon color="success" />
                </IconButton>
              </InputAdornment>
            ),
        }}
        className="chat-input"
      />
    </div>
  );
};

export default ChattingAISupport;