const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  lastActiveDays: { type: Number, required: true }, // Days since last active
  watchHours: { type: Number, required: true }, // Avg watch hours per week
  paymentDelay: { type: Number, required: true }, // Days delayed in payment
  churnRisk: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], default: 'LOW' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
