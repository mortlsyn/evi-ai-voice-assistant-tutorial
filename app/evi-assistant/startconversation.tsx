import React from 'react';

interface TalktoEVIbutton {
    Start: () => void;
    End: () => void;
    isRecording: boolean;
}

const MicrophoneButton: React.FC<TalktoEVIbutton> = ({ Start, End, isRecording }) => {
    const handleClick = () => {
        if (isRecording) {
            End();
        } else {
            Start();
        }
    };

    return (
        <button 
            onClick={handleClick}
            className={`w- py-2 px-4 rounded-full font-regular text-b ${
                isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-400 hover:bg-blue-500'
            }`}
        >
            {isRecording ? 'End Conversation' : 'Start Conversation'}
        </button>
    );
};

