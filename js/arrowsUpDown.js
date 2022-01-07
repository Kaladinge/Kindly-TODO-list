let liSelected;
let index = -1;

export function arrowsUpDown(e, autocompleteList, input) {
  if (e.code !== "Enter") {
  
    let len = autocompleteList.getElementsByTagName('li').length - 1;
    if (e.which === 40) {
      index++;
      
      if (liSelected) {
        removeClass(liSelected, 'selected');
        var next = autocompleteList.getElementsByTagName('li')[index];
        if (typeof next !== undefined && index <= len) {

        liSelected = next;
      } else {
        index = 0;
        liSelected = autocompleteList.getElementsByTagName('li')[0];
      }
      addClass(liSelected, 'selected');
      
      } else {
        index = 0;

        liSelected = autocompleteList.getElementsByTagName('li')[0];
        addClass(liSelected, 'selected');
      }
      input.value = liSelected.innerHTML;
    } else if (e.which === 38) {
      if (liSelected) {
        removeClass(liSelected, 'selected');
        index--;
        next = autocompleteList.getElementsByTagName('li')[index];
        if (typeof next !== undefined && index >= 0) {
        liSelected = next;
        } else {
        index = len;
        liSelected = autocompleteList.getElementsByTagName('li')[len];
        } 
        addClass(liSelected, 'selected');
      } else {
        index = 0;
        liSelected = autocompleteList.getElementsByTagName('li')[len];
        addClass(liSelected, 'selected');
      }
      input.value = liSelected.innerHTML;
    }
  }
};

function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
};

function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += ' ' + className;
  }
};