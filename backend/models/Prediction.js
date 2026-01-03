const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    inputData: {
        lastActiveDays: Number,
        watchHours: Number,
        paymentDelay: Number
    },
    churnProbability: Number,
    riskLevel: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prediction', PredictionSchema);
