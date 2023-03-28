import icons from 'url:../../img/icons.svg';
import * as controller from '../controller';

class RecipeListView {
  #parentElement = document.querySelector('.results');
  #iconsUrl = icons.split('?')[0];
  #recipeList;
  // #totalPages = Math.ceil(this.#recipeList.length / this.#itemsPerPage);
  #currentPage = 1;
  #itemsPerPage = 10;

  constructor() {
    this.onClickItem();
  }

  #createRecipeListMarkup(recipes) {
    console.log('RECiPES', recipes);
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

  onClickItem() {
    this.#parentElement.addEventListener('click', function (event) {
      if (event.target.closest('.preview')) {
        const recipeId = event.target
          .closest('.preview__link')
          .getAttribute('href')
          .slice(1);
        controller.showRecipeInfo(recipeId);
      }
    });
  }

  renderRecipeList(recipes) {
    this.#recipeList = recipes;
    console.log('DISPLAY', this.displayItems(1));
    this.#parentElement.insertAdjacentHTML('afterbegin', this.displayItems(1));
  }

  displayItems(pageNumber) {
    const startIndex = (this.#currentPage - 1) * this.#itemsPerPage;
    const endIndex = startIndex + this.#itemsPerPage;
    this.#currentPage = pageNumber;

    const currentItems = this.#recipeList.slice(startIndex, endIndex);
    console.log('CURRENTITEMS', currentItems);
    return this.#createRecipeListMarkup(currentItems);
  }
}

export default new RecipeListView();
