import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    
    const project = await Project.create(body);
    
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    console.error('Project creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
} 

export async function GET() {
  const projects = await Project.find({});
  return NextResponse.json({ success: true, data: projects }, { status: 200 });
}