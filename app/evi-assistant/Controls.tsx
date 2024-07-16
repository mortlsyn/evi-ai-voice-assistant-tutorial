import React from 'react';

interface ControlsProps {
  isConversationActive: boolean;
  startConversation: () => void;
  endConversation: () => void;
}

const Controls: React.FC<ControlsProps> = ({ isConversationActive, startConversation, endConversation }) => {
  return (
    <div>
      {isConversationActive ? (
        <button onClick={endConversation} className="w-full py-2 px-4 rounded-full font-bold text-white bg-red-500 hover:bg-red-600">
          End Conversation
        </button>
      ) : (
        <button onClick={startConversation} className="w-full py-2 px-4 rounded-full font-basic text-black bg-orange-300 hover:bg-orange-400">
          Talk to Jen
        </button>
      )}
    </div>
  );
};

export default Controls;