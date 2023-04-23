import icons from 'url:../../img/icons.svg';

class GenericListRecipes {
  #iconsUrl = icons.split('?')[0];

  onClickItem(parentElement, controller) {
    parentElement.addEventListener('click', event => {
      const recipeId = event.target
        .closest('.preview__link')
        .getAttribute('href')
        .slice(1);
      controller.showRecipeInfo(recipeId);
    });
  }

  createRecipeListMarkup(recipes) {
    return recipes
      .map(recipe => {
        return `<li class="preview">
      <a class="preview__link preview__link--active" href="#${recipe.id}">
        <figure class="preview__fig">
          <img src="${recipe.image_url}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${recipe.title}</h4>
          <p class="preview__publisher">${recipe.publisher}</p>
          <div class="preview__user-generated">
            <svg>
              <use href="${this.#iconsUrl}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>`;
      })
      .join('');
  }

  loadNoRecipes(message, parentElement) {
    parentElement.innerHTML = '';
    parentElement.insertAdjacentHTML('afterbegin', message);
  }
}

export default GenericListRecipes;
