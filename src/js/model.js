export const state = {
  recipe: {},
  recipeType: null,
  recipeList: [],
};

export const loadRecipe = async function (id) {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    if (!response.ok === true) throw new Error(error);
    const recipeJson = await response.json();
    const recipeFromApi = await recipeJson.data.recipe;
    state.recipe = {
      id: recipeFromApi.id,
      title: recipeFromApi.title,
      publisher: recipeFromApi.publisher,
      sourceUrl: recipeFromApi.source_url,
      image: recipeFromApi.image_url,
      servings: recipeFromApi.servings,
      cookingTime: recipeFromApi.cooking_time,
      ingredients: recipeFromApi.ingredients,
    };
    localStorage.setItem('stateRecipe', JSON.stringify(state.recipe));
  } catch (error) {
    throw new Error(error);
  }
};

export async function loadRecipes(recipeType) {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipeType}`
    );
    if (!response.ok) {
      throw new Error(error);
    }
    const recipesDataJson = await response.json();
    const recipes = recipesDataJson.data;
    state.recipeList = recipes.recipes;
    state.recipeType = recipeType.replace(/[^a-zA-Z]/gi, '');
    localStorage.setItem('recipesList', JSON.stringify(state.recipeList));
    localStorage.setItem('recipeType', JSON.stringify(state.recipeType));
  } catch (error) {
    return new Error(`Can't find recipes`);
  }
}
