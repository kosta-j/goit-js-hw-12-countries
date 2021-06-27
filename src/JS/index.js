import '../sass/main.scss';
import fetchCountries from './fetchCountries';
import templateFunction from '../teplate/country-list';
// document.body.innerHTML = templateFunction();

fetchCountries('col');
