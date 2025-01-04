import { NextResponse } from 'next/server';
import { auth } from "twitter-api-sdk";
import crypto from 'crypto';

const TWITTER_CLIENT_ID = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID;
const TWITTER_CLIENT_SECRET = process.env.NEXT_PUBLIC_TWITTER_CLIENT_SECRET;
const CALLBACK_URL = 'https://www.growx.top/api/twitter/callback';

// Generate PKCE code verifier and challenge
function generateCodeVerifier() {
  const verifier = crypto.randomBytes(32).toString('base64url');
  // Ensure the verifier meets OAuth 2.0 spec requirements (43-128 chars)
  return verifier.length > 128 ? verifier.slice(0, 128) : verifier;
}

function generateCodeChallenge(verifier: string) {
  return crypto
    .createHash('sha256')
    .update(verifier)
    .digest('base64url');
}

const authClient = new auth.OAuth2User({
  client_id: TWITTER_CLIENT_ID!,
  client_secret: TWITTER_CLIENT_SECRET!,
  callback: CALLBACK_URL,
  scopes: ["tweet.read", "tweet.write", "users.read", "offline.access"],
});

export async function GET() {
  try {
    if (!TWITTER_CLIENT_ID || !TWITTER_CLIENT_SECRET) {
      throw new Error('Twitter credentials are not configured');
    }

    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);
    const state = crypto.randomBytes(16).toString('hex');
    
    // Manually construct auth URL with all required parameters
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: TWITTER_CLIENT_ID,
      redirect_uri: CALLBACK_URL,
      scope: 'tweet.read tweet.write users.read offline.access',
      state: state,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256'
    });

    const authUrl = `https://twitter.com/i/oauth2/authorize?${params.toString()}`;
    
    const response = NextResponse.redirect(authUrl);

    // Store code verifier and state in secure cookies
    response.cookies.set('code_verifier', codeVerifier, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 10 // 10 minutes
    });

    response.cookies.set('oauth_state', state, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 10 // 10 minutes
    });
    
    return response;
  } catch (error) {
    console.error('Error generating auth URL:', error);
    return NextResponse.json({ 
      error: 'Failed to generate auth URL', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 