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

module.exports = { addRecipe };