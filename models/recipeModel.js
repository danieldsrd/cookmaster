const connection = require('./connection');
const { ObjectId } = require('mongodb');

const addRecipe = async (id, name, ingredients, preparation) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes')
      .insertOne({ id, name, ingredients, preparation}));
  return recipe.ops[0];
};

const getAllRecipes = async () => {
  const allRecipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  return allRecipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  const recipeById = await connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return recipeById;
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getRecipeById
};

