const recipeModel = require('../models/recipeModel');

const addRecipe = async (id, name, ingredients, preparation) => {
  if(!name || !ingredients || !preparation) {
    return { code: 400, message: 'Invalid entries. Try again.' };
  }
  const result = await recipeModel.addRecipe(id, name, ingredients, preparation);
  return { code: 201, result };
};

module.exports = {
  addRecipe
};
