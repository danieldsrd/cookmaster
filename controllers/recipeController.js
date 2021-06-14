const recipeValidate = require('../services/recipeValidate');
const ERROR = 500;
const STATUS_OK = 200;
const { resolve } = require('path');

const addRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const data = req.user;
  try {
    const { code, message, result } = 
      await recipeValidate.addRecipe(data._id, name, ingredients, preparation);
    if(!result) return res.status(code).json({ message });
    return res.status(code).json({ recipe: result });
  } catch (err) {
    res.status(ERROR).send({ message: 'Error adding recipe' });
  }
};

const getAllRecipes = async (_req, res) => {
  try {
    const { code, result } = await recipeValidate.getAllRecipes();
    return res.status(code).json(result);
  } catch (err) {
    res.status(ERROR).send({ message: 'Error get recipes' });
  }
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const { code, message, result } = await recipeValidate.getRecipeById(id);
    if (!result) {
      return res.status(code).json({ message });
    }
    return res.status(code).json(result);
  } catch (e) {
    res.status(ERROR).send({ message: 'Error get recipes' });
  }
};

const updateRecipeById = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  try {
    const { code, message, result } = 
      await recipeValidate.updateRecipeById(id, name, ingredients, preparation);
    if (!result) {
      return res.status(code).json({ message });
    }
    return res.status(code).json(result);
  } catch (e) {
    res.status(ERROR).send({ message: 'Error get recipe by id' });
  }
};

const deleteRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const { code } = await recipeValidate.deleteRecipeById(id);
    return res.status(code).json();
  } catch (e) {
    res.status(ERROR).send({ message: 'Error to delete recipe by id'});
  }
};

const uploadImageById = async (req, res) => {
  const { id } = req.params;
  try {
    const { filename } = req.file;
    const imagePath = `localhost:3000/src/uploads/${filename}`;
    const { code, result } = await recipeValidate.uploadImage(id, imagePath);
    return res.status(code).json(result);
  } catch (e) {
    res.status(ERROR).send({ message: 'Error to find id'});
  }
};

const getImage = async (req, res) => {
  const { filename } = req.params;
  const filePath = resolve( 'src/uploads', filename);
  try {
    return res.status(STATUS_OK).sendFile(filePath);
  } catch (e) {
    res.status(ERROR).send({ message: 'Error to image'});
  }
};

module.exports = { 
  addRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
  uploadImageById,
  getImage
};