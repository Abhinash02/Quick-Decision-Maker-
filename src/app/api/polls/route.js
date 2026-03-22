import mongoose from 'mongoose';          
import dbConnect from '@/lib/mongoose.js';
import Poll from '@/models/Poll.js';

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '12');

    const filter = {};
    if (status === 'active') {
      filter.expiry = { $gt: new Date() };
    } else if (status === 'expired') {
      filter.expiry = { $lt: new Date() };
    }

    const polls = await Poll.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    const pollsWithData = polls.map(poll => {
      const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
      const isExpired = new Date() > new Date(poll.expiry);
      const winner = isExpired && totalVotes > 0
        ? poll.options.reduce((prev, curr) => curr.votes > prev.votes ? curr : prev)
        : null;

      return { ...poll, totalVotes, isExpired, winner };
    });

    return Response.json({ success: true, polls: pollsWithData });
  } catch (error) {
    console.error('DB Error:', error);
    return Response.json({ success: false, error: 'Failed to fetch polls' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const { question, options, expiry, creatorId, creatorName } = await request.json();

    if (!question?.trim()) {
      return Response.json({ success: false, error: 'Question required' }, { status: 400 });
    }
    const validOptions = options.filter(opt => opt.trim());
    if (validOptions.length < 2 || validOptions.length > 4) {
      return Response.json({ success: false, error: 'Need 2-4 options' }, { status: 400 });
    }
    if (!expiry || new Date(expiry) <= new Date()) {
      return Response.json({ success: false, error: 'Future expiry required' }, { status: 400 });
    }

    const poll = new Poll({
      question: question.trim(),
      creatorId: creatorId || new mongoose.Types.ObjectId(),  
      creatorName: creatorName || 'Anonymous',
      options: validOptions.map(text => ({
        text: text.trim(),
        votes: 0 
      })),
      expiry: new Date(expiry)
    });

    await poll.save();
    return Response.json({ success: true, data: poll }, { status: 201 });

  } catch (error) {
    console.error('Create poll error:', error);
    return Response.json({ success: false, error: 'Failed to create poll' }, { status: 500 });
  }
}
