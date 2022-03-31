// OBJECT CONSTRUCTOR which creates a Theme object containing: 1) themeName 2) 10 images
function Theme(theme, user) {
  this.themeName = theme; //theme from user
  this.themeImages = []; //10 images
  this.user = user; //selected user
}

// event handling for storing current theme
// DOM window
let clickPlay = document.getElementById('play');
// event listener
clickPlay.addEventListener('mouseover', eventHandlerThatStoresTheme);
// event handler
function eventHandlerThatStoresTheme(event) {
  event.preventDefault();
  // get current theme from dropdown
  let select = document.getElementById('theme');
  let user = document.getElementById('user');
  let currentTheme = select.options[select.selectedIndex].value;
  let themes = new Theme(currentTheme, user.value);
  // create filenames for array
  let filename = '';
  for (let i = 1; i < 11; i++) {
    filename = `${currentTheme}${i}.png`;
    themes.themeImages.push(filename);
  }
  // STRINGIFY Theme object
  let stringifiedTheme = JSON.stringify(themes);
  // SET Theme object as storage
  localStorage.setItem('themes', stringifiedTheme);
}
