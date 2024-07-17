'use client';
import React from 'react';
import { useState } from 'react';
import { VoiceProvider, useVoice } from '@humeai/voice-react';
import Controls from './Controls';
import Messages from './Messages';
import GoogleSignIn from './SigninGoogle';

function VoiceComponent({ isConnected, setIsConnected }: { isConnected: boolean; setIsConnected: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { status, messages } = useVoice();
  
  React.useEffect(() => {
    setIsConnected(status.value === 'connected');
  }, [status.value, setIsConnected]);

  return <Messages messages={messages} />;
}

export default function JenAssistant({ accessToken }: { accessToken: string }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleStartConversation = () => {
    console.log("Starting conversation...");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-8" style={{ background: 'radial-gradient(circle at 20% 100%, #e9defa, #fbfcdb, #fad0c4, #fad0c4)' }}>
      <div className="flex justify-center">
        <h1 className="text-5xl font-cursive mb-6 text-center">Personal Scheduling Assistant</h1>
      </div>
      {!isSignedIn ? (
        <GoogleSignIn onSignIn={() => setIsSignedIn(true)} />
      ) : (
        <VoiceProvider
          auth={{ type: 'accessToken', value: accessToken }}
          hostname={process.env.NEXT_PUBLIC_HUME_VOICE_HOSTNAME || 'api.hume.ai'}
          messageHistoryLimit={30}
          configId={process.env.NEXT_PUBLIC_CONFIG_ID}
        >
          <VoiceComponent isConnected={isConnected} setIsConnected={setIsConnected} />
          <div className="flex justify-center mt-6">
            <Controls 
              isConnected={isConnected} 
              setIsConnected={setIsConnected} 
              onStartConversation={handleStartConversation}
            />
          </div>
        </VoiceProvider>
      )}
    </div>
  );
}