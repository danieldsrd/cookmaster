const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./controllers/userController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
