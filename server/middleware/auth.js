const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function auth(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'No token, access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: 'Token tidak valid' });
  }
}

module.exports = auth;
