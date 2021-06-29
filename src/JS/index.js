import '../sass/main.scss';
import fetchCountries from './fetchCountries';
import countryList from '../teplate/country-list';
import singleCountry from '../teplate/single-country';
import debounce from 'lodash.debounce';
import { defaults, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

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
  fetchCountries(input).then(render).catch(errorHandle);
}

function render(countries) {
  refs.countryContainer.innerHTML = '';
  if (countries.length > 10) {
    error({
      text: 'Too many matches found. Please enter a more specific query',
    });
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

function errorHandle(err) {
  console.log(err);
}
