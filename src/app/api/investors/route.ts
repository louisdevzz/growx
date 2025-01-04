import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Investors from '@/models/Investors';

export async function GET() {
  try {
    await dbConnect();
    const investors = await Investors.find({});
    return NextResponse.json({ success: true, data: investors }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch investors:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch investors' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const investor = await Investors.create(body);
    return NextResponse.json({ success: true, data: investor }, { status: 201 });
  } catch (error) {
    console.error('Investor creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create investor' },
      { status: 500 }
    );
  }
}