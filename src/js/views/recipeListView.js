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
  #itemsPerPage = 10;

  constructor() {
    this.onClickItem();
    this.onClickNextBtn();
    this.onClickPrevBtn();
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

  loadPageRecipes(recipes) {
    this.#recipeList = recipes;
    const savedPage = localStorage.getItem('page');
    if (savedPage != null) {
      this.#currentPage = Number(savedPage);
    }
    this.#totalPages = Math.ceil(this.#recipeList.length / this.#itemsPerPage);
    this.renderRecipeList();
    if (this.#totalPages === 1) {
      this.#btnNext.style.display = 'none';
    }
    this.updateBtnText();
  }

  renderRecipeList() {
    localStorage.setItem('page', this.#currentPage);
    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', this.displayItems());
  }

  displayItems() {
    const startIndex = (this.#currentPage - 1) * this.#itemsPerPage;
    const endIndex = startIndex + this.#itemsPerPage;

    const currentItems = this.#recipeList.slice(startIndex, endIndex);
    return this.#createRecipeListMarkup(currentItems);
  }

  onClickNextBtn() {
    this.#btnNext.addEventListener('click', event => {
      this.#currentPage += 1;
      if (this.#currentPage < this.#totalPages) {
        this.updateBtnText();
        this.renderRecipeList();
      } else {
        this.#currentPage = this.#totalPages;
        this.renderRecipeList();
      }
    });
  }

  onClickPrevBtn() {
    this.#btnPrev.addEventListener('click', event => {
      this.#currentPage -= 1;
      if (this.#currentPage > 1) {
        this.updateBtnText();
        this.renderRecipeList();
      } else {
        this.#currentPage = 1;
        this.renderRecipeList();
      }
    });
  }

  updateBtnText() {
    if (this.#currentPage === 1) {
      this.#btnNext.getElementsByTagName('span')[0].textContent = `Page 2`;
      this.#btnPrev.getElementsByTagName('span')[0].textContent = `Page 1`;
    } else if (this.#currentPage === this.#totalPages) {
      this.#btnNext.getElementsByTagName('span')[0].textContent = `Page ${
        this.#totalPages
      }`;
      this.#btnPrev.getElementsByTagName('span')[0].textContent = `Page ${
        this.#currentPage - 1
      }`;
    } else {
      this.#btnNext.getElementsByTagName('span')[0].textContent = `Page ${
        this.#currentPage + 1
      }`;
      this.#btnPrev.getElementsByTagName('span')[0].textContent = `Page ${
        this.#currentPage - 1
      }`;
    }
  }
}

export default new RecipeListView();
