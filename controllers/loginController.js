const userValidate = require('../services/userValidate');

const ERROR = 500;

const userLogin = async (req, res) => {
  const { email, password } = req.body;  
  try {
    const { code, message, token } = 
      await userValidate.userLogin(email, password);
    console.log('TODOS', code, message, token);
    if (!token) {
      return res.status(code).json({ message });
    }
    res.status(code).json({message: token});
  } catch (err) {
    res.status(ERROR).send({ message: 'Error adding user' });
  }
};

module.exports = { userLogin };