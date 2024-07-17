/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_HUME_VOICE_HOSTNAME: process.env.NEXT_PUBLIC_HUME_VOICE_HOSTNAME,
    NEXT_PUBLIC_HUME_VOICE_JEN_CONFIG_ID: process.env.NEXT_PUBLIC_HUME_VOICE_JEN_CONFIG_ID,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  },
}

module.exports = nextConfig

