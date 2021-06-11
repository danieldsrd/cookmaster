const userModel = require('../models/userModel');

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

module.exports = {
  addUser
};
