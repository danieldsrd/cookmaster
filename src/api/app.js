const express = require('express');
const bodyParser = require('body-parser');
const { addUser, userAdmin } = require('../../controllers/userController');
const { userLogin } = require('../../controllers/loginController');
const { 
  addRecipe, 
  getAllRecipes, 
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
  uploadImageById,
  getImage
} = require('../../controllers/recipeController');
const { validateJWT } = require('../../middlewares/validateJWT');
const uploadFile = require('../../middlewares/uploadFile');
const { resolve } = require('path');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
const uploadPath = resolve(__dirname, '..', 'uploads');

app.post('/users', addUser);
app.post('/login', userLogin);
app.post('/recipes', validateJWT, addRecipe);
app.get('/recipes', getAllRecipes);
app.get('/recipes/:id', getRecipeById);
app.put('/recipes/:id', validateJWT, updateRecipeById);
app.delete('/recipes/:id', validateJWT, deleteRecipeById);
app.put('/recipes/:id/image', validateJWT, uploadFile(uploadPath), uploadImageById);
app.get('/images/:filename', getImage);
app.post('/users/admin', validateJWT, userAdmin);



module.exports = app;
