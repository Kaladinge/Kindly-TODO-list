import { displayMessage } from "./js/displayMessage.js";
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
  const realCountry = countryListArray.find((country) => country.name.common.toLowerCase() === input.value.toLowerCase());
  const alreadyThere = countryList.find((country) => country.name.toLowerCase() === input.value.toLowerCase());
 
  if ((realCountry) && (!alreadyThere)) {
    const words = input.value.split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    const capitalLetterWords = words.join(" ");
    
    const data = {name: capitalLetterWords, id: Date.now(), checked: "no"};
    countryList.push(data);
    setCountryList("countries", countryList);
    makeList(countryList, todoList);
    input.value = "";
    displayMessage(".error-container", "success-message", "Country added successfully");
  } else {
    if (!realCountry) {
      displayMessage(".error-container", "error-message", "This value is not a country");
    }
    if (alreadyThere){
      displayMessage(".error-container", "error-message", "This country is already included");
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