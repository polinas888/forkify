import * as model from './model.js';
import recipe from './views/recipeView.js';
import recipeList from './views/recipeListView.js';

const searchBtn = document.querySelector('.search__btn');
const searchField = document.querySelector('.search__field');
const savedStateRecipe = localStorage.getItem('stateRecipe');
const savedRecipeType = localStorage.getItem('recipeType');

export async function showRecipeInfo(id) {
  if (id !== undefined) {
    recipe.renderSpinner();
    await model.loadRecipe(id);
  }
  recipe.renderRecipeOrNoRecipe(model.state.recipe);
}

async function showRecipeList() {
  recipe.renderSpinner();

  if (model.state.recipeList.length !== 0) {
    recipeList.showPagination(true);
    recipeList.loadPageRecipes(model.state.recipeList);
  } else {
    recipeList.showPagination(false);
    recipeList.loadErrorNoSuchRecipes();
  }
}

async function loadRacipiesInfo(recipeType) {
  if (recipeType !== null) {
    recipeList.showPagination(true);
    await model.loadRecipes(recipeType);
    await showRecipeList();
  } else {
    recipeList.showPagination(false);
    recipeList.letsSearchForRecipesMessage();
  }

  if (model.state.recipeList.length !== 0 && savedStateRecipe !== null) {
    model.state.recipe = JSON.parse(savedStateRecipe);
    showRecipeInfo(model.state.recipe.id);
  } else {
    showRecipeInfo(undefined);
  }
}

searchBtn.addEventListener('click', event => {
  event.preventDefault();
  loadRacipiesInfo(searchField.value);
  searchField.value = '';
});

loadRacipiesInfo(savedRecipeType);
