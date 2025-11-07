// src/components/ChatButton.jsx
import React from "react";
import { MessageSquare, X } from "lucide-react";

const ChatButton = ({ chatOpen, onToggle, isRTL }) => {
  return (
    <button
      onClick={onToggle}
      className={`fixed bottom-6 ${
        isRTL ? "left-6" : "right-6"
      } bg-gradient-to-r from-emerald-500 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-xl transition-all z-50`}
    >
      {chatOpen ? (
        <X className="w-6 h-6" />
      ) : (
        <MessageSquare className="w-6 h-6" />
      )}
    </button>
  );
};

export default ChatButton;
