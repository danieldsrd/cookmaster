const connection = require('./connection');

const addRecipe = async (id, name, ingredients, preparation) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes')
      .insertOne({ id, name, ingredients, preparation}));
  console.log(recipe.ops[0]);
  return recipe.ops[0];
};

module.exports = {
  addRecipe
};

