import React from 'react';

interface TranscriptionDisplayProps {
    text: string;
}

const TranscriptionDisplay: React.FC<TranscriptionDisplayProps> = ({ text }) => {
    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Transcription</h2>
            <p className="bg-gray-100 p-4 rounded-lg">{text || 'No transcription yet'}</p>
        </div>
    );
};

export default TranscriptionDisplay;