import { NextRequest, NextResponse } from 'next/server';
import Round from '@/models/Round';
import connectDB from '@/lib/mongodb';

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        
        const { slug } = await req.json();

        console.log('slug',slug);

        if (!slug) {
            return NextResponse.json(
                { error: 'Slug parameter is required' },
                { status: 400 }
            );
        }

        // Using case-insensitive regex search for the slug
        const round = await Round.findOne({slug: "test"});
        
        if (!round) {
            return NextResponse.json(
                { error: `Round with slug "${slug}" not found` },
                { status: 404 }
            );
        }

        return NextResponse.json(round);
    } catch (error) {
        console.error('Error in findBySlug:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}