// src/components/ChatWindow.jsx
import React from "react";
import { MessageSquare, Send } from "lucide-react";

const ChatWindow = ({
  messages,
  inputMessage,
  onInputChange,
  onSendMessage,
  t,
  isRTL,
}) => {
  return (
    <div
      className={`fixed bottom-24 ${
        isRTL ? "left-6" : "right-6"
      } w-96 bg-white rounded-xl shadow-2xl z-50 flex flex-col`}
      style={{ height: "500px" }}
    >
      <div className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white p-4 rounded-t-xl">
        <div
          className={`flex items-center space-x-2 ${
            isRTL ? "flex-row-reverse space-x-reverse" : ""
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <div className={isRTL ? "text-right" : ""}>
            <h3 className="font-semibold">{t.aiAssistant}</h3>
            <p className="text-xs text-emerald-100">{t.poweredByAI}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user"
                ? isRTL
                  ? "justify-start"
                  : "justify-end"
                : isRTL
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-gradient-to-r from-emerald-500 to-blue-600 text-white"
                  : "bg-gray-100 text-gray-800"
              } ${isRTL ? "text-right" : ""}`}
            >
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t p-4">
        <div
          className={`flex space-x-2 ${
            isRTL ? "flex-row-reverse space-x-reverse" : ""
          }`}
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSendMessage()}
            placeholder={t.askAnything}
            className={`flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm ${
              isRTL ? "text-right" : ""
            }`}
          />
          <button
            onClick={onSendMessage}
            className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white p-2 rounded-lg hover:from-emerald-600 hover:to-blue-700 transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
