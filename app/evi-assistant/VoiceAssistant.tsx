"use client";
import React, { useState } from 'react';
import { useVoice } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";

const VoiceAssistant: React.FC = () => {
  const voice = useVoice();
  const [isConversationActive, setIsConversationActive] = useState(false);

  const handleStartConversation = async () => {
    try {
      await voice.connect();
      setIsConversationActive(true);
      console.log("Please start speaking...");
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  };

  const handleEndConversation = () => {
    voice.disconnect();
    setIsConversationActive(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-8" style={{ background: 'radial-gradient(circle at 20% 100%, #e9defa, #fbfcdb, #fad0c4, #fad0c4)' }}>
      <div className="flex justify-center">
        <h1 className="text-5xl font-cursive mb-6 text-center">Personal Health Coach</h1>
      </div>
      <Messages messages={voice.messages} />
      <div className="flex justify-center mt-6">
        <Controls 
          isConversationActive={isConversationActive} 
          startConversation={handleStartConversation} 
          endConversation={handleEndConversation} 
        />
      </div>
    </div>
  );
};

export default VoiceAssistant;