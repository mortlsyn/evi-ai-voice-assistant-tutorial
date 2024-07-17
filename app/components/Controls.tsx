'use client';

import { useState } from 'react';
import { useVoice } from '@humeai/voice-react';

type ControlsProps = {
    isConnected: boolean;
    setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
    onStartConversation: () => void;
  };

export default function Controls({ isConnected, setIsConnected, onStartConversation }: ControlsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { connect, disconnect } = useVoice();

  const handleClick = async () => {
    setIsLoading(true);
    if (isConnected) {
      await disconnect();
      setIsConnected(false);
    } else {
      try {
        await connect();
        setIsConnected(true);
        onStartConversation();
      } catch (error) {
        console.error("Failed to connect:", error);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md">
      <button 
        onClick={handleClick} 
        disabled={isLoading}
        className={`w-full py-2 px-4 rounded-full font-basic text-black ${
          isConnected ? 'bg-red-300 hover:bg-red-400' : 'bg-orange-300 hover:bg-orange-400'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Loading...' : (isConnected ? 'End Session' : 'Talk to Jen')}
      </button>
    </div>
  );
}