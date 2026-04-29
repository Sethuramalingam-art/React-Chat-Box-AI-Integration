import React, { useState } from "react";
import useChatBot from "../src/hooks/useChatBot";

interface ChatBotProps {
  headerText?: string;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

const ChatBot: React.FC<ChatBotProps> = (props: ChatBotProps) => {
  const [inputValue, setInputValue] = useState("");
  const { messages, sendMessageToBot } = useChatBot();

  const handleEnter = () => {
    const input = inputValue.trim();
    if (input) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: input,
        sender: "user",
      };
      sendMessageToBot(newMessage);
      setInputValue("");
    }
  };

  return (
    <>
      <div className="flex border items-center justify-center  p-4 w-full">
        {props.headerText}
      </div>
      <div className="flex border flex-col items-center justify-center  p-4 w-full">
        <div className="flex flex-col gap-4 w-full">
          {messages.map((message) => {
            const isBot = message.sender === "bot";
            return (
              <div
                key={message.id}
                className={`border border-gray-100 rounded-md p-2 w-auto flex ${message.sender === "user" ? "bg-gray-100 self-end" : "bg-white self-start min-h-[50px] max-h-[100px] overflow-scroll"}`}
                style={
                  isBot
                    ? {
                        minHeight: "50px",
                        maxHeight: "100px",
                        overflow: "scroll",
                      }
                    : {}
                }
              >
                {message.text}
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 w-full">
          <input
            type="text"
            className="border rounded-lg p-2 w-full"
            placeholder="Type your message here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEnter();
              }
            }}
          />
          <button
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
            onClick={handleEnter}
          >
            <i className="fa fa-rocket" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
