'use client';

import { useState, useEffect, useCallback } from 'react';
import { VoiceProvider, useVoice } from '@humeai/voice-react';
import Controls from './Controls';
import Messages from './Messages';

function VoiceComponent({ onConnectionChange }: { onConnectionChange: (isConnected: boolean) => void }) {
  const { status, messages: voiceMessages } = useVoice();
  
  useEffect(() => {
    onConnectionChange(status.value === 'connected');
  }, [status.value, onConnectionChange]);

  return (
    <Messages messages={voiceMessages} />
  );
}

export default function JenAssistant({ accessToken }: { accessToken: string }) {
  const [isConnected, setIsConnected] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const handleStartConversation = () => {
    setShowPrompt(true);
    setTimeout(() => setShowPrompt(false), 5000); // Hide prompt after 5 seconds
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-8" style={{ background: 'radial-gradient(circle at 20% 100%, #e9defa, #fbfcdb, #fad0c4, #fad0c4)' }}>
      <div className="flex justify-center">
        <h1 className="text-5xl font-cursive mb-6 text-center">Personal Scheduling Assistant</h1>
      </div>
      <VoiceProvider
        auth={{ type: 'accessToken', value: accessToken }}
        hostname={process.env.NEXT_PUBLIC_HUME_VOICE_HOSTNAME || 'api.hume.ai'}
        messageHistoryLimit={10}
        configId={process.env.NEXT_PUBLIC_HUME_VOICE_JEN_CONFIG_ID}
      >
        <div className="flex-grow">
          {isConnected && <VoiceComponent onConnectionChange={setIsConnected} />}
          {showPrompt && (
            <div className="text-center text-gray-500 font-regular mt-4">
              Please start speaking...
            </div>
          )}
        </div>
        <div className="flex justify-center mt-6">
          <Controls 
            isConnected={isConnected} 
            setIsConnected={setIsConnected} 
            onStartConversation={handleStartConversation}
          />
        </div>
      </VoiceProvider>
    </div>
  );
}