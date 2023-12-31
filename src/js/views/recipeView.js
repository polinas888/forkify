import icons from 'url:../../img/icons.svg';
import bookmarks from './bookmarks';

class RecipeView {
  #parentElement = document.querySelector('.recipe');
  #bookmarkBtn;
  #data;
  #bookmarksJson = localStorage.getItem('bookmarks');
  #bookmarks = JSON.parse(this.#bookmarksJson);
  #iconsUrl = icons.split('?')[0];

  #init() {
    if (this.#data.id !== undefined) {
      this.#bookmarkBtn = document.querySelector('.bookmark-btn');
      const bookmarked = this.#isBookmarked();
      this.#setupBookmarkBtn(bookmarked);
      this.#bookmarkBtn.addEventListener('click', event => {
        event.target
          .closest('svg')
          .querySelector('use')
          .setAttribute('href', `${this.#iconsUrl}#icon-bookmark`);
        this.#bookmarkBtn.disabled = true;
        bookmarks.addBookmark(this.#data);
        this.#bookmarks.push(this.#data);
      });
    }
  }

  renderRecipeOrNoRecipe(data) {
    this.#data = data;
    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML(
      'afterbegin',
      this.#data.id !== undefined
        ? this.#createRecipeMarkup()
        : this.#createErrorMarkup()
    );
    this.#init();
  }

  #isBookmarked() {
    return (
      this.#bookmarks !== null &&
      this.#bookmarks.some(bookmark => bookmark.id === this.#data.id)
    );
  }

  #setupBookmarkBtn(bookmarked) {
    if (bookmarked) {
      this.#bookmarkBtn
        .querySelector('use')
        .setAttribute('href', `${this.#iconsUrl}#icon-bookmark`);
      this.#bookmarkBtn.disabled = true;
    } else {
      this.#bookmarkBtn
        .querySelector('use')
        .setAttribute('href', `${this.#iconsUrl}#icon-bookmark-fill`);
      this.#bookmarkBtn.disabled = false;
    }
  }

  #createRecipeMarkup() {
    return `<figure class="recipe__fig">
    <img src="${this.#data.image}" alt="${
      this.#data.title
    }" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this.#data.title}</span>
    </h1>
  </figure>
  
  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${this.#iconsUrl}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this.#data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${this.#iconsUrl}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this.#data.servings
      }</span>
      <span class="recipe__info-text">servings</span>
  
      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${this.#iconsUrl}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${this.#iconsUrl}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>
  
    <div class="recipe__user-generated">
    </div>
    <button class="btn--round bookmark-btn">
      <svg class="">
        <use href="${this.#iconsUrl}#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>
  
  
  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${this.#data.ingredients
      .map(
        ingredient =>
          `<li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${this.#iconsUrl}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ingredient.quantity != null ? ingredient.quantity : ''
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ingredient.unit}</span>
          ${ingredient.description}
        </div>
      </li>`
      )
      .join('')}
    </ul>
  </div>
  
  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this.#data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this.#data.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${this.#iconsUrl}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }

  #createErrorMarkup() {
    return `<div class="error">
              <div>
                <svg>
                  <use href="${this.#iconsUrl}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>'Recipe didn't choose yet!'</p>
            </div>`;
  }

  renderSpinner() {
    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML('afterbegin', this.#createSpinner());
  }

  #createSpinner() {
    return `<div class="spinner">
    <svg>
      <use href="${this.#iconsUrl}#icon-loader"></use>
    </svg>
  </div>`;
  }
}

export default new RecipeView();
