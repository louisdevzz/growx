import mongoose from 'mongoose';

const roundSchema = new mongoose.Schema({
  roundId: String,
  slug: String,
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  chain: String,
  startDate: Number,
  endDate: Number,
  amountRaised: Number,
  address: String,
  ownerAddress: String,
  duration: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Round || mongoose.model('Round', roundSchema); 