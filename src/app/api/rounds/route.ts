import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Round from '@/models/Round';

export async function GET() {
  try {
    await dbConnect();
    const rounds = await Round.find({});
    return NextResponse.json({ success: true, data: rounds }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch rounds:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch rounds' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const round = await Round.create(body);
    return NextResponse.json({ success: true, data: round }, { status: 201 });
  } catch (error) {
    console.error('Round creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create round' },
      { status: 500 }
    );
  }
}