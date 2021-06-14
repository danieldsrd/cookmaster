const recipeValidate = require('../services/recipeValidate');
const ERROR = 500;

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

const getAllRecipes = async (req, res) => {
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
    console.log(result);
    return res.status(code).json(result);
  } catch (e) {
    res.status(ERROR).send({ message: 'Error get recipes' });
  }
};

module.exports = { 
  addRecipe,
  getAllRecipes,
  getRecipeById
};