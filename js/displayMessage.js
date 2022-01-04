export function displayMessage(container, category, message) {
  
  
  const messageContainer = document.querySelector(container);
  messageContainer.style.display = "block";
  
  messageContainer.innerHTML = `<div class="${category}">${message}</div>`
  setTimeout(function() {messageContainer.style.display = "none"}, 4000);
}