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
    console.log('load recipe done');
  } catch (error) {
    throw new Error(error);
  }
};

export async function loadRecipes(recipe) {
  try {
    const recipes = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipe}`
    )
      .then(recipesDataJson => recipesDataJson.json())
      .then(recipesData => recipesData.data);
    state.recipeList = recipes;
    console.log('RECIPELIST', state.recipeList);
  } catch (error) {
    return new Error(`Can't find recipes`);
  }
}
