import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerclick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goTo = +btn.dataset.goto;
      handler(goTo);
    });
  }

  _generateMarkUp() {
    const curPage = this._data.page;
    const nextPage = curPage + 1;
    const prevPage = curPage - 1;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `<button data-goto="${nextPage}" class="btn--inline pagination__btn--next">
                    <span>Page ${nextPage}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
          `;
    }

    //   last page
    if (curPage === numPages && numPages > 1) {
      return `<button data-goto="${prevPage}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${prevPage}</span>
          </button>`;
    }

    //   other pages
    if (curPage <= numPages) {
      return `<button data-goto="${prevPage}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${prevPage}</span>
            </button>
            <button data-goto="${nextPage}" class="btn--inline pagination__btn--next">
                    <span>Page ${nextPage}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>`;
    }

    //page 1, and there is no other page
    return '';
  }
}
export default new PaginationView();
