import { Client, auth } from "twitter-api-sdk";
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const TWITTER_CLIENT_ID = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID;
const TWITTER_CLIENT_SECRET = process.env.NEXT_PUBLIC_TWITTER_CLIENT_SECRET;

// Initialize OAuth 2.0 client with the correct callback URL
const authClient = new auth.OAuth2User({
  client_id: TWITTER_CLIENT_ID!,
  client_secret: TWITTER_CLIENT_SECRET!,
  callback: 'https://www.growx.top/api/twitter/callback',
  scopes: ["tweet.read", "tweet.write", "users.read", "offline.access"],
});

const client = new Client(authClient);

async function validateAndRefreshToken() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('twitter_token');
  
  if (!tokenCookie?.value) {
    return false;
  }

  try {
    const token = JSON.parse(tokenCookie.value);
    authClient.token = token;

    // Check if token needs refresh
    if (token.expires_at && Date.now() >= token.expires_at * 1000) {
      if (token.refresh_token) {
        const newToken = await authClient.refreshAccessToken();
        // Update the cookie with new token
        const response = new NextResponse();
        response.cookies.set('twitter_token', JSON.stringify(newToken), {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          path: '/',
        });
        return true;
      }
      return false;
    }
    return true;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Validate and refresh token if needed
    const isValidToken = await validateAndRefreshToken();
    if (!isValidToken) {
      return NextResponse.json({ 
        error: 'Authentication required', 
        loginUrl: '/api/twitter/login' 
      }, { status: 401 });
    }

    const body = await request.json();
    const { tweetContent, mediaUrl } = body as { tweetContent: string; mediaUrl?: string };

    if (!tweetContent) {
      return NextResponse.json({ error: 'Tweet content is required.' }, { status: 400 });
    }

    // Create tweet using the official SDK
    const response = await client.tweets.createTweet({
      text: tweetContent,
      ...(mediaUrl && {
        media: {
          media_ids: [mediaUrl]
        }
      })
    });

    return NextResponse.json({ 
      message: 'Tweet posted successfully', 
      data: response 
    });
  } catch (error: any) {
    console.error('Error posting tweet:', error);
    
    // If token is invalid or expired, redirect to login
    if (error.message.includes('access_token') || error.status === 401) {
      return NextResponse.json({ 
        error: 'Authentication required', 
        loginUrl: '/api/twitter/login' 
      }, { status: 401 });
    }

    return NextResponse.json(
      {
        error: 'An error occurred while posting the tweet.',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Validate and refresh token if needed
    const isValidToken = await validateAndRefreshToken();
    if (!isValidToken) {
      return NextResponse.json({ 
        error: 'Authentication required', 
        loginUrl: '/api/twitter/login' 
      }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required for fetching tweets.' }, { status: 400 });
    }

    // Get tweets using the official SDK
    const response = await client.tweets.usersIdTweets(userId, {
      max_results: 5
    });

    return NextResponse.json({ message: 'Tweets fetched successfully', data: response });
  } catch (error: any) {
    console.error('Error fetching tweets:', error);
    
    // If token is invalid or expired, redirect to login
    if (error.message.includes('access_token') || error.status === 401) {
      return NextResponse.json({ 
        error: 'Authentication required', 
        loginUrl: '/api/twitter/login' 
      }, { status: 401 });
    }

    return NextResponse.json(
      {
        error: 'An error occurred while fetching tweets.',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
