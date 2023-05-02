import * as model from './model.js';
import recipeView from './views/recipeview.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarkview.js';

// import 'core-js';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// only parcel can understand
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;

    // spinner
    recipeView.renderSpinner();

    // 0)Updating results view to mark selected search result
    resultsView.update(model.getSearchresultPage());
    bookmarksView.update(model.state.bookmarks);

    // 1) loading data
    await model.loadRecipe(id); //because it return promise

    // 2)rendering data
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 1) Get search query
    const query = searchView.getQuery();
    // console.log(query);
    if (!query) return;

    resultsView.renderSpinner();
    // 2)Load search results
    await model.loadSearchResults(query);

    // 3)Render search results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchresultPage());

    // 4)render the initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};
const controlPagination = function (goToPage) {
  // 1)Render new  results
  resultsView.render(model.getSearchresultPage(goToPage));

  // 2)render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe serving (in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add or remove bookmarks
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerclick(controlPagination);
  console.log('begin');
};
init();
