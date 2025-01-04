import { NextRequest, NextResponse } from 'next/server';
import { auth } from "twitter-api-sdk";

const TWITTER_CLIENT_ID = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID;
const TWITTER_CLIENT_SECRET = process.env.NEXT_PUBLIC_TWITTER_CLIENT_SECRET;

const authClient = new auth.OAuth2User({
  client_id: TWITTER_CLIENT_ID!,
  client_secret: TWITTER_CLIENT_SECRET!,
  callback: 'https://growx.top/api/twitter/callback',
  scopes: ["tweet.read", "tweet.write", "users.read"],
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    
    if (!code) {
      return NextResponse.json({ error: 'Authorization code is required.' }, { status: 400 });
    }

    // Exchange the code for an access token
    const token = await authClient.requestAccessToken(code);

    // Store the token in a secure way
    const response = NextResponse.redirect(new URL('/tweets', request.url));
    response.cookies.set('twitter_token', JSON.stringify(token), {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Error in callback:', error);
    return NextResponse.json(
      {
        error: 'An error occurred during authentication.',
        details: error.message,
      },
      { status: 500 }
    );
  }
} 