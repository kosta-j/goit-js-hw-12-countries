import '../sass/main.scss';
import fetchCountries from './fetchCountries';
import countryList from '../teplate/country-list';
import singleCountry from '../teplate/single-country';
import debounce from 'lodash.debounce';
import { defaults, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaults.delay = 4000;

const refs = {
  searchInput: document.querySelector('.search-input'),
  countryContainer: document.querySelector('.js-countries'),
};

refs.searchInput.addEventListener('input', debounce(onSearchInput, 500));

async function onSearchInput(e) {
  const searchQuery = e.target.value;
  if (!searchQuery) {
    return;
  }
  try {
    const countries = await fetchCountries(searchQuery);
    render(countries);
  } catch {
    console.error;
  }
}

function render(countries) {
  refs.countryContainer.innerHTML = '';

  if (countries.status === 404) {
    error({
      title: 'Country has not found',
      text: 'Please try again',
    });
    return;
  }

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
  refs.countryContainer.innerHTML = '';

  console.log(err);
}
