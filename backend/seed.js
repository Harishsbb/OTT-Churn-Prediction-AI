require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Prediction = require('./models/Prediction');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

const users = [
    { name: 'John Doe', email: 'john@example.com', lastActiveDays: 2, watchHours: 15, paymentDelay: 0, churnRisk: 'LOW' },
    { name: 'Jane Smith', email: 'jane@example.com', lastActiveDays: 45, watchHours: 2, paymentDelay: 12, churnRisk: 'HIGH' },
    { name: 'Alice Johnson', email: 'alice@example.com', lastActiveDays: 10, watchHours: 8, paymentDelay: 5, churnRisk: 'MEDIUM' },
    { name: 'Bob Brown', email: 'bob@example.com', lastActiveDays: 1, watchHours: 25, paymentDelay: 0, churnRisk: 'LOW' },
    { name: 'Charlie Davis', email: 'charlie@example.com', lastActiveDays: 60, watchHours: 0, paymentDelay: 20, churnRisk: 'HIGH' },
];

const seed = async () => {
    try {
        await User.deleteMany({});
        await Prediction.deleteMany({});

        await User.insertMany(users);
        console.log('Data Seeded!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seed();
