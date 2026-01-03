const User = require('../models/User');
const Prediction = require('../models/Prediction');

exports.getDashboardStats = async (req, res) => {
    try {
        // 1. Total Users
        const totalUsers = await User.countDocuments();

        // 2. Churn Distribution
        const distribution = await User.aggregate([
            { $group: { _id: "$churnRisk", count: { $sum: 1 } } }
        ]);

        // Format distribution for consistency
        const churnStats = { HIGH: 0, MEDIUM: 0, LOW: 0 };
        distribution.forEach(d => {
            if (d._id) churnStats[d._id] = d.count;
        });

        // 3. Recent Predictions
        const recentPredictions = await Prediction.find()
            .sort({ timestamp: -1 })
            .limit(5)
            .populate('userId', 'name email');

        res.json({
            totalUsers,
            churnStats,
            recentPredictions
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
