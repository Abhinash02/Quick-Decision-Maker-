import mongoose from 'mongoose';  
import dbConnect from '../../../../../lib/mongoose.js';
import Poll from '../../../../../models/Poll.js';

export async function POST(request, context) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const { optionId, userId } = await request.json();

    if (!userId) {
      return Response.json({ success: false, error: 'User ID required' }, { status: 400 });
    }

    const poll = await Poll.findById(id);
    if (!poll) {
      return Response.json({ success: false, error: 'Poll not found' }, { status: 404 });
    }

    // Check expiry
    if (new Date() > new Date(poll.expiry)) {
      return Response.json({ success: false, error: 'Poll expired' }, { status: 400 });
    }

    //  Check if user already voted 
    const hasVoted = poll.voters?.includes(userId);  // userId is string
    if (hasVoted) {
      return Response.json({ success: false, error: 'You already voted!' }, { status: 400 });
    }

    // Find option and increment vote
    const optionIndex = poll.options.findIndex(opt => opt._id.toString() === optionId);
    if (optionIndex === -1) {
      return Response.json({ success: false, error: 'Option not found' }, { status: 400 });
    }

    // Update votes
    poll.options[optionIndex].votes += 1;
    poll.totalVotes += 1;
    
    if (!poll.voters) poll.voters = [];
    poll.voters.push(userId);  
    
    await poll.save();

    console.log(`Vote recorded: User ${userId} → Poll ${id}`);
    
    return Response.json({ success: true, data: poll });

  } catch (error) {
    console.error('Vote error:', error);
    return Response.json({ success: false, error: 'Vote failed' }, { status: 500 });
  }
}
