export const state = {
  recipe: {},
  recipeList: [],
};

export const loadRecipe = async function (id) {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    if (!response.ok === true) throw new Error(error);
    const recipeJson = await response.json();
    console.log('JSON', recipeJson);
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
    localStorage.setItem('state', JSON.stringify(state.recipe));
  } catch (error) {
    throw new Error(error);
  }
};

export async function loadRecipes(recipe) {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipe}`
    );
    if (!response.ok === true) throw new Error(error);
    const recipesDataJson = await response.json();
    const recipes = await recipesDataJson.data;
    state.recipeList = recipes.recipes;
    // localStorage.setItem('state', JSON.stringify(state));
  } catch (error) {
    return new Error(`Can't find recipes`);
  }
}
