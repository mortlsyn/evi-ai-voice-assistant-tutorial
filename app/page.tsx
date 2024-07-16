import VoiceAssistant from "./VoiceAssistant";

export default function EVIAssistantPage() {
  const apiKey = process.env.NEXT_PUBLIC_HUME_API_KEY as string;

  if (!apiKey) {
    throw new Error("Missing API Key");
  }

  return (
    <div className="min-h-screen p-8" style={{ background: 'radial-gradient(circle at 20% 100%, #e9defa, #fbfcdb, #fad0c4, #fad0c4)' }}>
      <VoiceAssistant apiKey={apiKey} />
    </div>
  );
}