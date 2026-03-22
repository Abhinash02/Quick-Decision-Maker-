import { NextRequest, NextResponse } from 'next/server';
import Poll from '@/models/Poll';
import dbConnect from '@/lib/mongoose';

export async function PUT(
  request,
  { params }
) {
  try {
    await dbConnect();
    
    const { question, options, expiry } = await request.json();
    const poll = await Poll.findById(params.id);
    
    if (!poll) {
      return NextResponse.json(
        { success: false, error: 'Poll not found' },
        { status: 404 }
      );
    }
    
    poll.question = question;
    poll.options = options.map((text) => ({ text, votes: 0 }));
    poll.expiry = new Date(expiry);
    
    await poll.save();
    
    return NextResponse.json({ success: true, data: poll });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update poll' },
      { status: 500 }
    );
  }
}
