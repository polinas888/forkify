import * as model from './model.js';
import recipe from './views/recipeView.js';

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

async function showRecipeInfo(id) {
  recipe.renderSpinner();
  await model.loadRecipe(id);
  recipe.renderRecipeOrNoRecipe(model.state.recipe);
}

showRecipeInfo('5ed6604591c37cdc054bc886');
//getRecipes();

//'5ed6604591c37cdc054bc886'
model.loadRecipes('pizza');
