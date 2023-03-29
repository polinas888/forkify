import icons from 'url:../../img/icons.svg';
import * as controller from '../controller';

class RecipeListView {
  #parentElement = document.querySelector('.results');
  #btnPrev = document.querySelector('.pagination__btn--prev');
  #btnNext = document.querySelector('.pagination__btn--next');
  #iconsUrl = icons.split('?')[0];
  #recipeList = [];
  #totalPages;
  #currentPage = 1;
  #itemsPerPage = 12;

  constructor() {
    this.onClickItem();
    this.onClickNextBtn();
    this.onClickPrevBtn();
  }

  loadPageRecipes(recipes) {
    this.#recipeList = recipes;
    this.#totalPages = Math.ceil(this.#recipeList.length / this.#itemsPerPage);
    this.renderRecipesPage();
  }

  renderRecipesPage() {
    this.updateBtnContent();
    this.renderRecipeList();
  }

  renderRecipeList() {
    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML(
      'afterbegin',
      this.getPageRecipesMarkup()
    );
  }

  getPageRecipesMarkup() {
    const startIndex = (this.#currentPage - 1) * this.#itemsPerPage;
    const endIndex = startIndex + this.#itemsPerPage;

    const currentItems = this.#recipeList.slice(startIndex, endIndex);
    return this.#createRecipeListMarkup(currentItems);
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

  onClickNextBtn() {
    this.#btnNext.addEventListener('click', event => {
      this.#currentPage += 1;
      if (this.#currentPage < this.#totalPages) {
        this.renderRecipesPage();
      } else {
        this.#currentPage = this.#totalPages;
        this.renderRecipesPage();
      }
    });
  }

  onClickPrevBtn() {
    this.#btnPrev.addEventListener('click', event => {
      this.#currentPage -= 1;
      if (this.#currentPage > 1) {
        this.renderRecipesPage();
      } else {
        this.#currentPage = 1;
        this.renderRecipesPage();
      }
    });
  }

  #createRecipeListMarkup(recipes) {
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

  updateBtnContent() {
    const spanBtnNext = this.#btnNext.getElementsByTagName('span')[0];
    const spanBtnPrev = this.#btnPrev.getElementsByTagName('span')[0];
    const svgBtnNext = this.#btnNext.getElementsByTagName('svg')[0];
    const svgBtnPrev = this.#btnPrev.getElementsByTagName('svg')[0];

    this.#totalPages === 1
      ? (this.#btnNext.style.display = 'none')
      : (this.#btnNext.style.display = 'inline-block');

    switch (this.#currentPage) {
      case 1:
        spanBtnNext.textContent = `Page 2`;
        svgBtnNext.style.display = 'inline';
        spanBtnPrev.textContent = `Page 1`;
        svgBtnPrev.style.display = 'none';
        break;
      case this.#totalPages:
        spanBtnNext.textContent = `Page ${this.#totalPages}`;
        svgBtnNext.style.display = 'none';
        spanBtnPrev.textContent = `Page ${this.#currentPage - 1}`;
        svgBtnPrev.style.display = 'inline';
        break;
      default:
        spanBtnNext.textContent = `Page ${this.#currentPage + 1}`;
        svgBtnNext.style.display = 'inline';
        spanBtnPrev.textContent = `Page ${this.#currentPage - 1}`;
        svgBtnPrev.style.display = 'inline';
    }
  }
}

export default new RecipeListView();
