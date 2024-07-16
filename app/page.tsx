import { fetchAccessToken } from '@humeai/voice';
import dynamic from 'next/dynamic';
import JenAssistant from './components/JenAssistant';

const NoSSR = dynamic(() => Promise.resolve((props: { children: React.ReactNode }) => <>{props.children}</>), { ssr: false });

export default async function Home() {
  const accessToken = await fetchAccessToken({
    apiKey: process.env.HUME_API_KEY || '',
    secretKey: process.env.HUME_SECRET_KEY || '',
  });

  return (
    <NoSSR>
      {accessToken ? (
        <JenAssistant accessToken={accessToken} />
      ) : (
        <div>Missing API Key</div>
      )}
    </NoSSR>
  );
}