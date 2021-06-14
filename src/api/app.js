const express = require('express');
const bodyParser = require('body-parser');
const { addUser } = require('../../controllers/userController');
const { userLogin } = require('../../controllers/loginController');
const { addRecipe } = require('../../controllers/recipeController');
const { validateJWT } = require('../../middlewares/validateJWT');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', addUser);
app.post('/login', userLogin);
app.post('/recipes', validateJWT, addRecipe);

module.exports = app;
