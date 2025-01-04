import mongoose from 'mongoose';

const investorsSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  amountDonated: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Investors || mongoose.model('Investors', investorsSchema); 