import { fetchAccessToken } from '@humeai/voice';
import dynamic from 'next/dynamic';

const JenAssistantNoSSR = dynamic(() => import('./components/JenAssistant'), { ssr: false });

export default async function Home() {
  const accessToken = await fetchAccessToken({
    apiKey: process.env.HUME_API_KEY || '',
    secretKey: process.env.HUME_SECRET_KEY || '',
  });

  return (
    <>
      {accessToken ? (
        <JenAssistantNoSSR accessToken={accessToken} />
      ) : (
        <div>Missing API Key</div>
      )}
    </>
  );
}