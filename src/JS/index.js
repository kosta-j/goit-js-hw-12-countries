import '../sass/main.scss';
import fetchCountries from './fetchCountries';
import countryList from '../teplate/country-list';
import singleCountry from '../teplate/single-country';
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
  fetchCountries(input).then(console.log);
}

function render(countries) {
  refs.countryContainer.innerHTML = '';
  if (countries.length > 10) {
    return;
  }
  if (countries.length > 1 && countries.length <= 10) {
    let countryMarkup = countryList(countries);
    refs.countryContainer.insertAdjacentHTML('beforeend', countryMarkup);
    return;
  }
  if ((countries.length = 1)) {
    let countryMarkup = singleCountry(countries);
    refs.countryContainer.insertAdjacentHTML('beforeend', countryMarkup);
    return;
  }
}

function error(err) {
  console.log(err);
}
