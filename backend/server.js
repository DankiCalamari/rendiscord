const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.WEB_PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'supersecret';

app.use(express.json());
app.use(cors());

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    }
    res.status(401).json({ message: 'Invalid credentials' });
});

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).json({ message: 'No token provided' });
    jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' });
        req.user = decoded;
        next();
    });
};

app.get('/api/status', authenticate, (req, res) => {
    res.json({ discordBot: "Online", mcBot: "Online" });
});

app.listen(PORT, () => {
    console.log(`Web portal running at http://localhost:${PORT}`);
});