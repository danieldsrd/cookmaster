const recipeModel = require('../models/recipeModel');

const addRecipe = async (id, name, ingredients, preparation) => {
  if(!name || !ingredients || !preparation) {
    return { code: 400, message: 'Invalid entries. Try again.' };
  }
  const result = await recipeModel.addRecipe(id, name, ingredients, preparation);
  return { code: 201, result };
};

const getAllRecipes = async () => {
  const result = await recipeModel.getAllRecipes();
  return { code: 200, result };
};

const getRecipeById = async (id) => {
  const result = await recipeModel.getRecipeById(id);
  if (!result) {
    return { code: 404, message: 'recipe not found' };
  }
  return { code: 200, result };
};

const updateRecipeById = async (id, name, ingredients, preparation) => {
  const result = await recipeModel.updateRecipeById(id, name, ingredients, preparation);
  if (!result) {
    return { code: 404, message: 'recipe not found' };
  }
  return { code: 200, result };
};

const deleteRecipeById = async (id) => {
  const result = await recipeModel.deleteRecipeById(id);
  if(!result) {
    return { code: 404, message: 'recipe not found' };
  }
  return { code: 204 };
};

const uploadImage = async (id, image) => {
  const result = await recipeModel.uploadImage(id, image);
  if(!result) {
    return { code: 404, message: 'recipe not found' };
  }
  return { code: 200, result };
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
  uploadImage
};
