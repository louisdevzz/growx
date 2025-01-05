import { auth } from "twitter-api-sdk";
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const TWITTER_CLIENT_ID = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID;
const TWITTER_CLIENT_SECRET = process.env.NEXT_PUBLIC_TWITTER_CLIENT_SECRET;

// Create a confidential client since we have both client_id and client_secret
const authClient = new auth.OAuth2User({
  client_id: TWITTER_CLIENT_ID!,
  client_secret: TWITTER_CLIENT_SECRET!,
  callback: 'http://localhost:3000/api/twitter/callback',
  scopes: ["tweet.read", "tweet.write", "users.read", "offline.access"],
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const incomingState = searchParams.get('state');

    if (!code) {
      return NextResponse.redirect(new URL('/error?message=No authorization code provided', request.url));
    }

    // Verify state parameter
    const cookieStore = await cookies();
    const storedState = cookieStore.get('oauth_state')?.value;

    if (!storedState || storedState !== incomingState) {
      return NextResponse.redirect(new URL('/error?message=Invalid state parameter', request.url));
    }

    // Exchange the code for a token
    const token = await authClient.requestAccessToken(code);

    // Store the token in an HTTP-only cookie
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.set('twitter_token', JSON.stringify(token), {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });

    // Clean up the state cookie
    response.cookies.delete('oauth_state');

    return response;
  } catch (error: any) {
    console.error('Twitter callback error:', error);
    const errorMessage = error.message || 'Authentication failed';
    return NextResponse.redirect(
      new URL(`/error?message=${encodeURIComponent(errorMessage)}`, request.url)
    );
  }
} 