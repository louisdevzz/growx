import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  slug: String,
  coverImage: String,
  profileImage: String,
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
  why: String,
  chain: String,
  fundingSources: [String],
  socialLinks: [{
    type: {
      type: String,
      enum: ['twitter', 'telegram', 'github', 'website']
    },
    url: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Project || mongoose.model('Project', projectSchema); 