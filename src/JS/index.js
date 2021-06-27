import '../sass/main.scss';
import fetchCountries from './fetchCountries';
import countryList from '../teplate/country-list';

const refs = {
  searchInput: document.querySelector('.search-input'),
  countryContainer: document.querySelector('.js-countries'),
};

fetchCountries('col').then(render);

function render(countries) {
  const countryMarkup = countryList(countries);
  refs.countryContainer.innerHTML = countryMarkup;
}
