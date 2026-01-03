exports.login = (req, res) => {
    const { email, password } = req.body;

    // Simple Admin Check (Hardcoded for Hackathon)
    if (email === 'admin@ott.com' && password === 'admin123') {
        return res.json({
            success: true,
            token: 'fake-jwt-token-admin',
            user: { name: 'Admin User', email, role: 'admin' }
        });
    }

    return res.status(401).json({ success: false, message: 'Invalid credentials' });
};
