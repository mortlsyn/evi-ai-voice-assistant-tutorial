"use client";
import React from 'react';
import { VoiceContextType } from "@humeai/voice-react";

type MessageEvent = VoiceContextType['messages'][number];

interface MessagesProps {
  messages: MessageEvent[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  return (
    <div className="mt-6 overflow-y-auto max-h-96">
      {messages.map((msg, index) => {
        if (msg.type === "user_message" || msg.type === "assistant_message") {
          const isUser = msg.type === "user_message";
          return (
            <div key={index} className={`mb-4 ${isUser ? 'text-right' : 'text-left'}`}>
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