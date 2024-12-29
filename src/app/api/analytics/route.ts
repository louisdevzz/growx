import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Analytics from '@/models/Analytics';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const data = await request.json();
        
        const { 
            address, 
            projectId, 
            projectName, 
            projectSlug, 
            timeSpent,
            startTime,
            endTime,
            timestamp 
        } = data;
        
        const analytics = await Analytics.create({
            address,
            projectId,
            projectName,
            projectSlug,
            timeSpent,
            startTime,
            endTime,
            timestamp,
        });

        return NextResponse.json(
            { success: true, data: analytics }, 
            { status: 201 }
        );
    } catch (error) {
        console.error('Analytics creation error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to save analytics' },
            { status: 500 }
        );
    }
} 