const { predictChurn } = require('../ml/churnModel');
const Prediction = require('../models/Prediction');
const User = require('../models/User');

exports.predictChurnRate = async (req, res) => {
    try {
        let { userId, lastActiveDays, watchHours, paymentDelay } = req.body;
        let user = null;

        // If userId provided, fetch data from user
        if (userId) {
            user = await User.findById(userId);
            if (user) {
                lastActiveDays = user.lastActiveDays;
                watchHours = user.watchHours;
                paymentDelay = user.paymentDelay;
            }
        }

        // Run Prediction
        const result = await predictChurn(lastActiveDays, watchHours, paymentDelay);

        // Save Prediction record
        const newPrediction = new Prediction({
            userId: userId || null,
            inputData: { lastActiveDays, watchHours, paymentDelay },
            churnProbability: result.probability,
            riskLevel: result.risk
        });
        await newPrediction.save();

        // If user exists, update their risk profile
        if (user) {
            user.churnRisk = result.risk;
            await user.save();
        }

        res.json({
            ...result,
            predictionId: newPrediction._id
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
