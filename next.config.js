/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_HUME_VOICE_HOSTNAME: process.env.NEXT_PUBLIC_HUME_VOICE_HOSTNAME,
    NEXT_PUBLIC_HUME_VOICE_JEN_CONFIG_ID: process.env.NEXT_PUBLIC_HUME_VOICE_JEN_CONFIG_ID,
    GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  },
}

module.exports = nextConfig