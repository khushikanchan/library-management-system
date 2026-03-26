const axios = require('axios');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    const response = await axios.get(`${process.env.AUTH_SERVICE_URL}/me`, {
      headers: { Authorization: token }
    });

    req.user = response.data;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ error: 'Not authorized' });
  }
};