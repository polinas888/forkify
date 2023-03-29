import * as model from './model.js';
import recipe from './views/recipeView.js';
import recipeList from './views/recipeListView.js';

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

export async function showRecipeInfo(id) {
  recipe.renderSpinner();
  await model.loadRecipe(id);
  recipe.renderRecipeOrNoRecipe(model.state.recipe);
}

async function showRecipeList(recipeType) {
  recipe.renderSpinner();
  await model.loadRecipes(recipeType);
  recipeList.loadPageRecipes(model.state.recipeList);
}

async function loadRacipiesInfo() {
  const savedState = localStorage.getItem('state');
  await showRecipeList('pizza');
  if (savedState != null) {
    model.state.recipe = JSON.parse(savedState);
    showRecipeInfo(model.state.recipe.id);
  } else {
    console.log('LIST', model.state.recipeList);
    model.state.recipe = model.state.recipeList[0];
    showRecipeInfo(model.state.recipeList[0].id);
  }
}

loadRacipiesInfo();
