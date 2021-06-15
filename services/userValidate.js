const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const secret = 'senhadificil';

const validateEmail = (email) => {
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return emailRegex.test(email);
};

const addUser = async (name, email, password, role) => {
  if (!name || !email || !password || !validateEmail(email)) {
    return { code: 400, message: 'Invalid entries. Try again.' };
  }
  const emailExists = await userModel.emailExists(email);
  if (emailExists) {
    return { code: 409, message: 'Email already registered' };
  }
  const result = await userModel.addUser(name, email, password, role);
  
  return { code: 201, result };
};

const userLogin = async (email, password) => {
  if (!email || !password) return {
    code: 401, message: 'All fields must be filled'
  };
  const result = await userModel.userLogin(email);
  if (!result || result.password !== password) return ({
    code: 401, message: 'Incorrect username or password'
  });

  const token = jwt.sign(result, secret, jwtConfig);

  return { code: 200, token };
};

const addAdmin = async (name, email, password, role) => {
  if (!name || !email || !password || !validateEmail(email)) {
    return { code: 400, message: 'Invalid entries. Try again.' };
  }
  const emailExists = await userModel.emailExists(email);
  if (emailExists) {
    return { code: 409, message: 'Email already registered' };
  }
  if (role !== 'admin') {
    return { code: 403, message: 'Only admins can register new admins'};
  }
  const result = await userModel.addUser(name, email, password, role);
  
  return { code: 201, result };
};

module.exports = {
  addUser,
  userLogin,
  addAdmin
};
