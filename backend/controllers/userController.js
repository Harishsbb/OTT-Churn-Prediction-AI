const User = require('../models/User');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { name, email, lastActiveDays, watchHours, paymentDelay } = req.body;

        // Create user
        const newUser = new User({
            name,
            email,
            lastActiveDays,
            watchHours,
            paymentDelay
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
