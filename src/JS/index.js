import '../sass/main.scss';
import fetchCountries from './fetchCountries';
import countryList from '../teplate/country-list';

const refs = {
  searchInput: document.querySelector('.search-input'),
  countryContainer: document.querySelector('.js-countries'),
};

refs.searchInput.addEventListener('input', e => {
  const inputValue = e.target.value;
  fetchCountries(inputValue).then(render);
});

function render(countries) {
  const countryMarkup = countryList(countries);
  refs.countryContainer.innerHTML = countryMarkup;
}
