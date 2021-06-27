export default function (searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(r => r.json())
    .then(console.log);
}
