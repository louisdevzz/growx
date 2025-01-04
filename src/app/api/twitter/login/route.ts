import { NextResponse } from 'next/server';
import { auth } from "twitter-api-sdk";

const TWITTER_CLIENT_ID = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID;
const TWITTER_CLIENT_SECRET = process.env.NEXT_PUBLIC_TWITTER_CLIENT_SECRET;

const authClient = new auth.OAuth2User({
  client_id: TWITTER_CLIENT_ID!,
  client_secret: TWITTER_CLIENT_SECRET!,
  callback: 'https://growx.top/api/twitter/callback',
  scopes: ["tweet.read", "tweet.write", "users.read"],
});

export async function GET() {
  try {
    const authUrl = authClient.generateAuthURL({
      state: "my-state",
      code_challenge_method: "s256",
    });
    
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Error generating auth URL:', error);
    return NextResponse.json({ error: 'Failed to generate auth URL' }, { status: 500 });
  }
} 