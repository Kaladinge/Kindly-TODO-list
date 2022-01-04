export function getCountryList() {
  const countryList = localStorage.getItem("countries");

  if(!countryList) {
    return [];
  } else {
    return JSON.parse(countryList);
  }
}

export function setCountryList(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}