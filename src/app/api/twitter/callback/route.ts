import { NextRequest, NextResponse } from 'next/server';
import { auth } from "twitter-api-sdk";

const TWITTER_CLIENT_ID = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID;
const TWITTER_CLIENT_SECRET = process.env.NEXT_PUBLIC_TWITTER_CLIENT_SECRET;
const CALLBACK_URL = 'https://www.growx.top/api/twitter/callback';

const authClient = new auth.OAuth2User({
  client_id: TWITTER_CLIENT_ID!,
  client_secret: TWITTER_CLIENT_SECRET!,
  callback: CALLBACK_URL,
  scopes: ["tweet.read", "tweet.write", "users.read", "offline.access"],
});

export async function GET(request: NextRequest) {
  try {
    if (!TWITTER_CLIENT_ID || !TWITTER_CLIENT_SECRET) {
      throw new Error('Twitter credentials are not configured');
    }

    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    
    console.log('Received callback with:', { 
      code: code ? 'present' : 'missing',
      state: state ? 'present' : 'missing'
    });

    if (!code) {
      throw new Error('Authorization code is required');
    }

    // Get the code verifier and stored state from cookie
    const codeVerifier = request.cookies.get('code_verifier')?.value;
    const storedState = request.cookies.get('oauth_state')?.value;

    console.log('Cookie values:', {
      codeVerifier: codeVerifier ? 'present' : 'missing',
      storedState: storedState ? 'present' : 'missing'
    });

    if (!codeVerifier) {
      throw new Error('Code verifier not found in cookies');
    }

    // Verify state to prevent CSRF
    if (!state || !storedState || state !== storedState) {
      throw new Error('Invalid state parameter');
    }

    try {
      // Exchange the code for an access token with PKCE
      console.log('Attempting to exchange code for token...');
      await authClient.requestAccessToken(code);
      const tokenResponse = authClient.token;
      console.log('Token exchange successful');

      if (!tokenResponse) {
        throw new Error('No token received from Twitter');
      }

      // Create response with redirect
      const response = NextResponse.redirect(new URL('/tweets', request.url));

      // Store the token securely
      response.cookies.set('twitter_token', JSON.stringify(tokenResponse), {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      // Clean up the temporary cookies
      response.cookies.delete('code_verifier');
      response.cookies.delete('oauth_state');

      return response;
    } catch (tokenError: any) {
      console.error('Token exchange error:', {
        message: tokenError.message,
        stack: tokenError.stack,
        details: tokenError
      });
      throw new Error(`Token exchange failed: ${tokenError.message}`);
    }
  } catch (error: any) {
    console.error('Error in callback:', {
      message: error.message,
      stack: error.stack,
      details: error
    });
    return NextResponse.json(
      {
        error: 'An error occurred during authentication.',
        details: error.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
} 