import mongoose from 'mongoose';

const pollSchema = new mongoose.Schema({
  question: { type: String, required: true, trim: true, maxlength: 200 },
  creatorId: { type: String, required: true },  
  creatorName: { type: String, required: true },
  options: [{
    text: { type: String, required: true, trim: true },
    votes: { type: Number, default: 0 }
  }],
  expiry: { type: Date, required: true },
  totalVotes: { type: Number, default: 0 },
  voters: [{ type: String }] 
}, { timestamps: true });

export default mongoose.models.Poll || mongoose.model('Poll', pollSchema);
