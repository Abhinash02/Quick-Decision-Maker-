import dbConnect from '../../../../lib/mongoose.js';
import Poll from '../../../../models/Poll.js';

export async function GET(request, context) {
  try {
    await dbConnect();
    const { id } = await context.params;

    const poll = await Poll.findById(id).lean();
    if (!poll) {
      return Response.json({ success: false, error: 'Poll not found' }, { status: 404 });
    }

    const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
    const isExpired = new Date() > new Date(poll.expiry);
    
    return Response.json({
      success: true,
      data: { ...poll, totalVotes, isExpired }
    });
  } catch (error) {
    return Response.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    await dbConnect();
    const { id } = await context.params;
    
    const poll = await Poll.findById(id);
    if (!poll) {
      return Response.json({ success: false, error: 'Poll not found' }, { status: 404 });
    }

    // Only creator can delete (before votes)
    if (poll.totalVotes > 0) {
      return Response.json({ success: false, error: 'Cannot delete after votes' }, { status: 400 });
    }

    await Poll.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error: 'Delete failed' }, { status: 500 });
  }
}
