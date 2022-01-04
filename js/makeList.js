import { getCountryList, setCountryList } from "./localStorage.js";

export const todoList = document.getElementById("todo-list");

export function makeList(countryList, todoList) {
  todoList.innerHTML = "";
  countryList.forEach((country) => {

    todoList.innerHTML += `<li>
                              <div class="view">
                                <button class="complete ${country.checked}"></button>
                                <label>${country.name}</label>
                                <button class="destroy" data-id="${country.id}"></button>
                              </div>
                            </li>
                          `;    
  })

  const btn = document.querySelectorAll(".complete");
  btn.forEach(function(button) {
    button.addEventListener("click", toggle);
  })

  const btn2 = document.querySelectorAll(".destroy");
  btn2.forEach(function(button) {
    button.addEventListener("click", deleteListItem);
  })
}


function toggle(event) {
  const countryList = getCountryList();
  event.target.classList.toggle("yes");
  event.target.classList.toggle("no");

  const indexNumber = countryList.findIndex(function(entry) {
    if (entry.name === event.path[1].innerText) {
      return true;
    }
  })
  if (countryList[indexNumber].checked === "no") {
      countryList[indexNumber].checked = "yes";
  } else {
    countryList[indexNumber].checked = "no";
  }
  setCountryList("countries", countryList);
}


function deleteListItem(event) {

  const countryList = getCountryList();
  const updatedArray = countryList.filter(function(name) {
    
    if(parseInt(event.target.dataset.id) !== name.id) {
      return true;
    }
  })

  setCountryList("countries", updatedArray);
  makeList(updatedArray, todoList);
}