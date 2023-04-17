import icons from 'url:../../img/icons.svg';

class Bookmarks {
  #parentElement = document.querySelector('.bookmarks__list');
  #bookmarks = [];
  #savedBookmarks = localStorage.getItem('bookmarks');
  #iconsUrl = icons.split('?')[0];

  constructor() {
    if (this.#savedBookmarks !== null) {
      this.#bookmarks = JSON.parse(this.#savedBookmarks);
    }
    this.showBookmarksOrNo();
    //  this.onClickItem();
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
      this.loadNoBookmark();
    }
  }

  renderBookmarks() {
    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML(
      'afterbegin',
      this.#createBookmarkMarkup(this.#bookmarks)
    );
  }

  loadNoBookmark() {
    this.#parentElement.innerHTML = '';
    this.#parentElement.insertAdjacentHTML(
      'afterbegin',
      this.#createNoBookmarkMarkup()
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

  // onClickItem() {
  //   this.#parentElement.addEventListener('click', event => {
  //     if (this.#prevRecipeEl !== undefined) {
  //       this.#prevRecipeEl.style.backgroundColor = '#f9f5f3';
  //     }
  //     const recipeEl = event.target.closest('.preview__link');
  //     this.#prevRecipeEl = recipeEl;
  //     if (recipeEl) {
  //       const recipeId = event.target
  //         .closest('.preview__link')
  //         .getAttribute('href')
  //         .slice(1);
  //       recipeEl.style.backgroundColor = '#d3c7c3';
  //       controller.showRecipeInfo(recipeId);
  //     }
  //   });
  // }

  #createBookmarkMarkup(bookmarks) {
    return bookmarks
      .map(bookmark => {
        return `<li class="preview">
      <a class="preview__link preview__link--active" href="#${bookmark.id}">
        <figure class="preview__fig">
          <img src="${bookmark.image}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${bookmark.title}</h4>
          <p class="preview__publisher">${bookmark.publisher}</p>
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
}

export default new Bookmarks();
