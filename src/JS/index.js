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
    const inputValue = e.target.value;
    fetchCountries(inputValue).then(render);
  }, 500),
);

function render(countries) {
  const countryMarkup = countryList(countries);
  refs.countryContainer.innerHTML = countryMarkup;
}

function error(err) {
  console.log(err);
}
