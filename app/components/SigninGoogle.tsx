'use client';
import { useEffect } from 'react';

declare global {
  interface Window {
    gapi: any;
  }
}

export default function GoogleSignIn({ onSignIn }: { onSignIn: () => void }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        }).then(() => {
          const auth2 = window.gapi.auth2.getAuthInstance();
          if (auth2.isSignedIn.get()) {
            onSignIn();
          }
        });
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [onSignIn]);

  const handleSignIn = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn().then(() => {
      onSignIn();
    });
  };

  return (
    <button onClick={handleSignIn} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Sign in with Google
    </button>
  );
}