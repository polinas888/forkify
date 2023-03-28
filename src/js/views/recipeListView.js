import icons from 'url:../../img/icons.svg';
import * as controller from '../controller';

class RecipeListView {
  #parentElement = document.querySelector('.results');
  #btn_prev = document.querySelector('.pagination__btn--prev');
  #btn_next = document.querySelector('.pagination__btn--next');
  #iconsUrl = icons.split('?')[0];
  #recipeList = [];
  #totalPages;
  #currentPage = 1;
  #itemsPerPage = 10;

  constructor() {
    this.onClickItem();
    this.onClickNextBtn();
    this.onClickPrevBtn();
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

  loadRecipes(recipes) {
    this.#recipeList = recipes;
    this.renderRecipeList();
  }

  renderRecipeList() {
    this.#parentElement.insertAdjacentHTML(
      'afterbegin',
      this.displayItems(this.#currentPage)
    );
  }

  displayItems(pageNumber) {
    this.#totalPages = Math.ceil(this.#recipeList.length / this.#itemsPerPage);
    const startIndex = (this.#currentPage - 1) * this.#itemsPerPage;
    const endIndex = startIndex + this.#itemsPerPage;
    this.#currentPage = pageNumber;

    const currentItems = this.#recipeList.slice(startIndex, endIndex);
    console.log('CURRENTITEMS', currentItems);
    return this.#createRecipeListMarkup(currentItems);
  }

  onClickNextBtn() {
    this.#btn_next.addEventListener('click', event => {
      this.#currentPage += 1;
      if (this.#currentPage <= this.#totalPages) {
        this.#btn_next.textContent = `Page ${this.#currentPage + 1}`;
        this.#btn_prev.textContent = `Page ${this.#currentPage - 1}`;
        this.#parentElement.innerHTML = '';
        this.renderRecipeList();
      } else {
        this.#currentPage = this.#totalPages - 1;
      }
    });
  }

  onClickPrevBtn() {
    this.#btn_prev.addEventListener('click', event => {
      this.#currentPage -= 1;
      if (this.#currentPage >= 1) {
        this.#btn_next.textContent = `Page ${this.#currentPage + 1}`;
        this.#btn_prev.textContent = `Page ${this.#currentPage - 1}`;
        this.#parentElement.innerHTML = '';
        this.renderRecipeList();
      } else {
        this.#currentPage = 2;
      }
    });
  }
}

export default new RecipeListView();
