const jwt = require('jsonwebtoken');
const { userLogin } = require('../models/userModel');
const secret = 'senhadificil';

const STATUS_ERROR = 401;

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if(!token) {
    return res.status(STATUS_ERROR).json({ message: 'token dont exists'});
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await userLogin(decoded.email);
    
    if (!user) return res.status(STATUS_ERROR).json(
      { message: 'User dont exists.' }
    );

    req.user = user;
    next();
  } catch (_err) {
    return res.status(STATUS_ERROR).json({ message: 'jwt malformed' });
  }
};

module.exports = { 
  validateJWT
};

