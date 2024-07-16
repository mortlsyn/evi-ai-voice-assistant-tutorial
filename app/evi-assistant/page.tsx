import { fetchAccessToken } from "@humeai/voice";
import VoiceAssistant from "./VoiceAssistant";

export default async function EVIAssistantPage() {
  const accessToken = await fetchAccessToken({
    apiKey: process.env.HUME_API_KEY as string,
    secretKey: process.env.HUME_SECRET_KEY as string,
  });

  if (!accessToken) {
    throw new Error("Failed to fetch access token");
  }

  return (
    <div className="min-h-screen p-8" style={{ background: 'radial-gradient(circle at 20% 100%, #e9defa, #fbfcdb, #fad0c4, #fad0c4)' }}>
      <VoiceAssistant accessToken={accessToken} />
    </div>
  );
}