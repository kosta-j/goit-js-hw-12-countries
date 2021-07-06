export default async function (searchQuery) {
  const response = await fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`);
  return response.json();
}
