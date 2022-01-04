const url = "https://restcountries.com/v3.1/all";
 
async function getCountries(){
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

export const countryListArray = await getCountries();