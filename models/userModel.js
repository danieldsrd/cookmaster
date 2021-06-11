const connection = require('./connection');

const addUser = async (name, email, password, role) => {
  const user = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }));
  return { _id: user.insertedId, name, email, role };
};

const emailExists = async (email) => {
  const emailFound = await connection()
    .then((db) => db.collection('users').findOne({ email }));
  if (emailFound) return true;
};

module.exports = {
  addUser,
  emailExists
};
