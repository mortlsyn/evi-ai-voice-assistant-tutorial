'use client';
import { useEffect, useCallback } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleSignIn({ onSignIn }: { onSignIn: () => void }) {
  const handleCredentialResponse = useCallback((response: any) => {
    console.log('Received credential response:', response);

    fetch('/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: response.credential }),
    })
    .then(res => res.json())
    .then(data => {
      console.log('Server response:', data);
      if (data.success) {
        onSignIn();
      } else {
        console.error('Authentication failed:', data.error);
      }
    })
    .catch(error => {
      console.error('Error during authentication:', error);
    });
  }, [onSignIn]);

  useEffect(() => {
    console.log('Client ID:', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (!window.google) {
        console.error('Google API failed to load');
        return;
      }

      try {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse
        });
      } catch (error) {
        console.error('Error initializing Google Sign-In:', error);
      }
    };

    script.onerror = () => {
      console.error('Failed to load Google API script');
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [handleCredentialResponse]);

  const handleCustomSignIn = () => {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.log('One Tap is not displayed or was skipped.');
        }
      });
    } else {
      console.error('Google Sign-In is not initialized');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button 
        onClick={handleCustomSignIn} 
        className="bg-pink-400 hover:bg-pink-800 text-white font-bold py-2 px-4 rounded"
      >
        Sign in with Google
      </button>
      <p className="mt-2 text-sm text-gray-600">If sign-in doesn't work, check the console for errors.</p>
    </div>
  );
}