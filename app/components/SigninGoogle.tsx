'use client';
import { useEffect } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

export default function GoogleSignIn({ onSignIn }: { onSignIn: () => void }) {
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
        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInDiv"),
          { theme: "outline", size: "large" }
        );
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
  }, []);

  const handleCredentialResponse = (response: any) => {
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
  };

  return (
    <div>
      <div id="googleSignInDiv"></div>
    </div>
  );
}