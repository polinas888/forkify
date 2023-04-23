import icons from 'url:../../img/icons.svg';
import * as controller from '../controller';
import GenericListRecipes from './GenericListRecipes';

class Bookmarks extends GenericListRecipes {
  #parentElement = document.querySelector('.bookmarks__list');
  #bookmarks = [];
  #savedBookmarks = localStorage.getItem('bookmarks');
  #iconsUrl = icons.split('?')[0];

  constructor() {
    super();
    if (this.#savedBookmarks !== null) {
      this.#bookmarks = JSON.parse(this.#savedBookmarks);
    }
    this.showBookmarksOrNo();
    super.onClickItem(this.#parentElement, controller);
  }

  addBookmark(bookmark) {
    this.#bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(this.#bookmarks));
    this.renderBookmarks();
  }

  showBookmarksOrNo() {
    if (this.#bookmarks !== null && this.#bookmarks.length > 0) {
      this.renderBookmarks();
    } else {
      super.loadNoRecipes(this.#createNoBookmarkMarkup(), this.#parentElement);
    }
  }

  renderBookmarks() {
    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML(
      'afterbegin',
      super.createRecipeListMarkup(this.#bookmarks)
    );
  }

  #createNoBookmarkMarkup() {
    return `<div class="message">
    <div>
      <svg>
        <use href="${this.#iconsUrl}#icon-smile"></use>
      </svg>
    </div>
    <p>
      No bookmarks yet. Find a nice recipe and bookmark it :)
    </p>
  </div>`;
  }
}

export default new Bookmarks();
