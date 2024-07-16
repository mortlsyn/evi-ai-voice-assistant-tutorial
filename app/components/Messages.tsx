'use client';

import React from 'react';
import { useVoice } from "@humeai/voice-react";

type MessagesProps = {
  messages: any[];
};

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  return (
    <div className="mt-6 flex-grow overflow-y-auto">
      {messages.map((msg, index) => {
        if (msg.type === "user_message" || msg.type === "assistant_message") {
          const isUser = msg.message.role === "user";
          return (
            <div key={msg.type + index} className={`mb-4 ${isUser ? 'text-right' : 'text-left'}`}>
              <div className="font-semibold">{isUser ? 'You' : 'Jen'}</div>
              <div className={`p-3 rounded-lg inline-block ${isUser ? 'bg-blue-100' : 'bg-gray-100'}`}>
                {msg.message.content}
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Messages;