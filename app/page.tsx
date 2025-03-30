"use client";
import { useState } from "react";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer YOUR_OPENAI_API_KEY`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [...messages, userMessage],
      }),
    });

    const data = await response.json();
    const botMessage = { role: "assistant", content: data.choices[0].message.content };
    setMessages([...messages, userMessage, botMessage]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 p-6 text-white">
      <h1 className="text-2xl font-bold text-center">ChatGPT Bot</h1>
      <div className="flex-1 overflow-y-auto p-4 bg-gray-800 shadow-md rounded-lg my-4 max-h-[70vh]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-2 rounded-md max-w-[75%] md:max-w-[60%] lg:max-w-[50%] ${
              msg.role === "user" ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-600 text-white self-start"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-500 rounded-md bg-gray-700 text-white focus:outline-none focus:border-blue-500"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;