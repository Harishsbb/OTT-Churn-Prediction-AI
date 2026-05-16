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

exports.seedData = async (req, res) => {
    try {
        const users = [
            { name: 'John Doe', email: 'john@example.com', lastActiveDays: 2, watchHours: 15, paymentDelay: 0, churnRisk: 'LOW' },
            { name: 'Jane Smith', email: 'jane@example.com', lastActiveDays: 45, watchHours: 2, paymentDelay: 12, churnRisk: 'HIGH' },
            { name: 'Alice Johnson', email: 'alice@example.com', lastActiveDays: 10, watchHours: 8, paymentDelay: 5, churnRisk: 'MEDIUM' },
            { name: 'Bob Brown', email: 'bob@example.com', lastActiveDays: 1, watchHours: 25, paymentDelay: 0, churnRisk: 'LOW' },
            { name: 'Charlie Davis', email: 'charlie@example.com', lastActiveDays: 60, watchHours: 0, paymentDelay: 20, churnRisk: 'HIGH' },
        ];

        await User.deleteMany({});
        await Prediction.deleteMany({});
        await User.insertMany(users);

        res.json({ message: 'Database Seeded Successfully!', count: users.length });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
