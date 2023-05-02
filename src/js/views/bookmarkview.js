import View from './view.js';
import icons from 'url:../../img/icons.svg';

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find the nice recipe and bookmark it 😁';
  _message = '';

  _generateMarkUp() {
    return this._data.map(this._generateMarkUpPreview).join('');
  }
  _generateMarkUpPreview(result) {
    const id = window.location.hash.slice(1);
    return `
            <li class="preview">
            <a class="preview__link ${
              result.id === id ? 'preview__link--active' : ''
            }" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
              </div>
            </a>
          </li>
        `;
  }
}
export default new BookmarkView();
