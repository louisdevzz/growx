import { NextRequest, NextResponse } from 'next/server';
import Project from '@/models/Project';
import connectDB from '@/lib/mongodb';

export async function POST(req: NextRequest) {
    try {
        await connectDB(); // Ensure database connection is established
        
        const { address } = await req.json();
        console.log(address)
        // Using findOne instead of find since we're looking for a single project by slug
        const project = await Project.find({ ownerAddress: address });
        
        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json(project);
    } catch (error) {
        console.error('Error in findByAddress:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}