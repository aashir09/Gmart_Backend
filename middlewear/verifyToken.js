const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    console.log("Received Token:", token);

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], 'jwtSecret');
        console.log("Decoded Token:", decoded);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error("Error:", err);
        res.status(401).json({ message: 'Invalid token' });
    }
};
