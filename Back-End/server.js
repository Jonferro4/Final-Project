const express = require('express');
const userRoutes = require('./API/users');
const itemRoutes = require('./API/items');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(cookieParser());


const JWT_SECRET = 'SuperSecretKey';

//-------------------------------------------------AUTHENTICATION/ACCESS---------------------------------//
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

//-------------------------------------------------ROUTES---------------------------------//
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);


//-------------------------------------------------CLIENT AUTHENTICATION CHECK---------------------------------//
app.get('/api/auth/status', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ authenticated: false, message: 'No token found' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Token verification failed:', err.message);
      return res.status(401).json({ authenticated: false, message: 'Invalid token' });
    }
    console.log('Token verified successfully. User:', decoded);
    res.json({ authenticated: true, user: decoded });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});