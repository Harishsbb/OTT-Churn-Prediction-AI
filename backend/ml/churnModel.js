const tf = require('@tensorflow/tfjs');

let model;

// Normalization constants (approximate max values)
const MAX_ACTIVE_DAYS = 100;
const MAX_WATCH_HOURS = 50;
const MAX_PAYMENT_DELAY = 30;

function normalize(lastActive, watchHours, paymentDelay) {
    return [
        Math.min(lastActive / MAX_ACTIVE_DAYS, 1),
        Math.min(watchHours / MAX_WATCH_HOURS, 1),
        Math.min(paymentDelay / MAX_PAYMENT_DELAY, 1)
    ];
}

async function trainModel() {
    console.log('Training Churn Model...');

    // Create a simple model
    model = tf.sequential();
    model.add(tf.layers.dense({ units: 16, activation: 'relu', inputShape: [3] }));
    model.add(tf.layers.dense({ units: 8, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' })); // Output probability 0-1

    model.compile({
        optimizer: tf.train.adam(0.01),
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
    });

    // Generate synthetic training data
    const xsData = [];
    const ysData = [];

    for (let i = 0; i < 1000; i++) {
        // Random inputs
        const lastActive = Math.random() * MAX_ACTIVE_DAYS;
        const watch = Math.random() * MAX_WATCH_HOURS;
        const payment = Math.random() * MAX_PAYMENT_DELAY;

        xsData.push(normalize(lastActive, watch, payment));

        // Logic for ground truth:
        // Churn if inactive > 30 days OR payment delay > 10 days AND watch hours < 5
        let churn = 0;
        if (lastActive > 30 || payment > 7) {
            churn = 1;
        }
        if (watch > 20) {
            churn = 0; // High engagement reduces churn
        }
        // Add some noise
        if (Math.random() < 0.1) churn = 1 - churn;

        ysData.push([churn]);
    }

    const xs = tf.tensor2d(xsData);
    const ys = tf.tensor2d(ysData);

    await model.fit(xs, ys, {
        epochs: 20,
        shuffle: true,
        verbose: 0
    });

    console.log('Churn Model Trained!');
    xs.dispose();
    ys.dispose();
}

async function predictChurn(lastActive, watchHours, paymentDelay) {
    if (!model) await trainModel();

    const input = tf.tensor2d([normalize(lastActive, watchHours, paymentDelay)]);
    const prediction = model.predict(input);
    const score = (await prediction.data())[0];

    input.dispose();
    prediction.dispose();

    let risk = 'LOW';
    if (score > 0.4) risk = 'MEDIUM';
    if (score > 0.7) risk = 'HIGH';

    return { probability: score, risk };
}

module.exports = { trainModel, predictChurn };
