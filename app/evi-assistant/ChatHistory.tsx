import React from 'react';

interface ResponseDisplayProps {
    response: string;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response }) => {
    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">AI Response</h2>
            <p className="bg-blue-100 p-4 rounded-lg">{response || 'No response yet'}</p>
        </div>
    );
};

export default ResponseDisplay;