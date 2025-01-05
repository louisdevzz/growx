import { auth } from "twitter-api-sdk";
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const TWITTER_CLIENT_ID = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID;
const TWITTER_CLIENT_SECRET = process.env.NEXT_PUBLIC_TWITTER_CLIENT_SECRET;

// Create a confidential client since we have both client_id and client_secret
const authClient = new auth.OAuth2User({
  client_id: TWITTER_CLIENT_ID!,
  client_secret: TWITTER_CLIENT_SECRET!,
  callback: 'http://localhost:3000/api/twitter/callback',
  scopes: ["tweet.read", "tweet.write", "users.read", "offline.access"],
});

export async function GET() {
  try {
    const state = crypto.randomBytes(16).toString('hex');
    
    // Generate auth URL with state parameter
    const authUrl = authClient.generateAuthURL({
      state: state,
      code_challenge_method: "s256", // This is required for PKCE
    });

    const response = NextResponse.redirect(authUrl);
    
    // Store state for verification
    response.cookies.set('oauth_state', state, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 5, // 5 minutes
    });

    return response;
  } catch (error) {
    console.error('Twitter login error:', error);
    return NextResponse.redirect('/error?message=Failed to generate auth URL');
  }
} 