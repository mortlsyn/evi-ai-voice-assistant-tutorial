import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(request: Request) {
  const { token } = await request.json();
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    // Creating a user session here OR a JWT?
    return NextResponse.json({ success: true, userId: payload?.sub });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 400 });
  }
}