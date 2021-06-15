const userValidate = require('../services/userValidate');

const ERROR = 500;

const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  const role = 'user';
  try {
    const { code, message, result } = 
      await userValidate.addUser(name, email, password, role);
    if (!result) {
      return res.status(code).json({ message });
    }
    res.status(code).json({user: result});
  } catch (err) {
    res.status(ERROR).send({ message: 'Error adding user' });
  }
};

const userAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const { role } = req.user;
  // console.log(role);
  try {
    const { code, message, result } = 
      await userValidate.addAdmin(name, email, password, role);
    if (!result) {
      return res.status(code).json({ message });
    }
    res.status(code).json({user: result});
  } catch (err) {
    res.status(ERROR).send({ message: 'Error adding Admin' });
  }
};

module.exports = { 
  addUser, 
  userAdmin 
};
