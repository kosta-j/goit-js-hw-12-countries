import '../sass/main.scss';
import fetchCountries from './fetchCountries';
import countryList from '../teplate/country-list';
var debounce = require('lodash.debounce');

const refs = {
  searchInput: document.querySelector('.search-input'),
  countryContainer: document.querySelector('.js-countries'),
};

refs.searchInput.addEventListener(
  'input',
  debounce(e => {
    onSearchInput(e.target.value);
  }, 500),
);

function onSearchInput(input) {
  fetchCountries(input).then(render).catch(error);
}

function render(countries) {
  const countryMarkup = countryList(countries);
  refs.countryContainer.innerHTML = '';
  refs.countryContainer.insertAdjacentHTML('beforeend', countryMarkup);
}

function error(err) {
  console.log(err);
}
