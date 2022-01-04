import { errorMessage } from "./js/displayErrorMessage.js";
import { countryListArray } from "./js/endpoint.js";
import { getCountryList, setCountryList } from "./js/localStorage.js";
import { makeList, todoList } from "./js/makeList.js";

const input = document.getElementById("new-todo");
const autocompleteList = document.getElementById("autocomplete-list");
const addButton = document.getElementById("add-button");
const countryList = getCountryList();

makeList(countryList, todoList);

function autoComplete() {
  const countryList = getCountryList();
  autocompleteList.innerHTML = "";
  autocompleteList.style.display = "block";
  const inputValue = input.value.trim().toLowerCase();

  if(inputValue.length === 0) {
    autocompleteList.style.display = "none";
  } else {
    const autocompleteArray = countryListArray.filter((country) => country.name.common.toLowerCase().startsWith(inputValue));
  
    autocompleteArray.forEach(function(country) {
    
      const found = countryList.find((name) => country.name.common === name.name);

      if (!found) {
        autocompleteList.innerHTML += `
                                      <li class="autocomplete-list__country">${country.name.common}</li>
                                    `
      }

    })
  }
}


function chooseCountry(event) {
  input.value = event.target.innerHTML;
  autocompleteList.style.display = "none";
}


function addToList() {
  
  const countryList = getCountryList();
  const realCountry = countryListArray.find((country) => country.name.common === input.value);
  const alreadyThere = countryList.find((country) => country.name.toLowerCase() === input.value.toLowerCase());
 
  if ((realCountry) && (!alreadyThere)) {
    const data = {name: input.value, id: Date.now(), checked: "no"};
    countryList.push(data);
    setCountryList("countries", countryList);
    makeList(countryList, todoList);
    input.value = "";
    errorMessage(".error-container", "success-message", "Country added successfully");
  } else {
    if (!realCountry) {
      errorMessage(".error-container", "error-message", "This value is not a country");
    }
    if (alreadyThere){
      errorMessage(".error-container", "error-message", "This country is already included");
    }
  }
}


input.addEventListener("keyup", autoComplete);
addButton.addEventListener("click", addToList);
input.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    addToList();
  }
});

function getElement(target) {
  document.getElementById(target).addEventListener('click', chooseCountry);
};

getElement("autocomplete-list");