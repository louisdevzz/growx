import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    projectName: {
        type: String,
        required: true
    },
    projectSlug: {
        type: String,
        required: true
    },
    timeSpent: {
        type: Number,
        required: true
    },
    startTime: {
        type: Number,
        required: true
    },
    endTime: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Number,
        default: Date.now
    }
});

export default mongoose.models.Analytics || mongoose.model('Analytics', analyticsSchema); 