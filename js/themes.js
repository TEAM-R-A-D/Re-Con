// array which holds any themes
let themes = [];

// STRINGIFY array
let stringifiedTheme = JSON.stringify(themes);

// SET array as storage
localStorage.setItem('themes', stringifiedTheme);

// OBJECT CONSTRUCTOR which creates a Theme object containing: 1) themeName 2) 10 images
function Theme(theme) {
  this.themeName = theme; //theme from user
  this.themeImages = []; //10 images
  themes.splice(0, 1, this);
}

// event handling for storing current theme
// DOM window
let clickPlay = document.getElementById('play');
// event listener
clickPlay = addEventListener('click', eventHandlerThatStoresTheme);
// event handler
function eventHandlerThatStoresTheme(event) {
  event.preventDefault();
  let select = document.getElementById('theme');
  let currentTheme = select.options[select.selectedIndex].value;
  new Theme(currentTheme);
  let filename = '';
  for (let i = 1; i < 11; i++) {
    filename = `${currentTheme}${i}.png`;
    themes[0].themeImages.push(filename);
  }
  console.log(themes);
}

