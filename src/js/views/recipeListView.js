import icons from 'url:../../img/icons.svg';
import * as controller from '../controller';
import GenericListRecipes from './GenericListRecipes';

class RecipeListView extends GenericListRecipes {
  #parentElement = document.querySelector('.results');
  #btnPrev = document.querySelector('.pagination__btn--prev');
  #btnNext = document.querySelector('.pagination__btn--next');
  #pagination_buttons = document.querySelector('.pagination_buttons');
  #recipeList = [];
  #totalPages;
  #currentPage = 1;
  #itemsPerPage = 12;
  #prevRecipeEl;

  constructor() {
    super();
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

  loadErrorNoSuchRecipes() {
    const noResultMesage = `<p class="no_search_result">I didn't find such recipes</p>`;
    super.loadNoRecipes(noResultMesage, this.#parentElement);
  }

  letsSearchForRecipesMessage() {
    const letSearchMessage = `<p class="no_search_result">let's search for recipes</p>`;
    super.loadNoRecipes(letSearchMessage, this.#parentElement);
  }

  getPageRecipesMarkup() {
    const startIndex = (this.#currentPage - 1) * this.#itemsPerPage;
    const endIndex = startIndex + this.#itemsPerPage;

    const currentItems = this.#recipeList.slice(startIndex, endIndex);
    return super.createRecipeListMarkup(currentItems);
  }

  onClickItem() {
    this.#parentElement.addEventListener('click', event => {
      if (this.#prevRecipeEl !== undefined) {
        this.#prevRecipeEl.style.backgroundColor = '#f9f5f3';
      }
      const recipeEl = event.target.closest('.preview__link');
      this.#prevRecipeEl = recipeEl;
      if (recipeEl) {
        const recipeId = event.target
          .closest('.preview__link')
          .getAttribute('href')
          .slice(1);
        recipeEl.style.backgroundColor = '#d3c7c3';
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

  showPagination(showPagination) {
    this.#currentPage = 1;
    if (showPagination == true) {
      this.#pagination_buttons.classList.remove('hide_pagination');
    } else {
      this.#pagination_buttons.classList.add('hide_pagination');
    }
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
