'use strict';

// PROCURE storage
let procuredTheme = localStorage.getItem('themes');

// PARSE storage
let parsedTheme = JSON.parse(procuredTheme);

// DOM window
let gameboard = document.getElementById('gameboard');
let cardSelector = document.getElementsByClassName('card');
let turnCounter = 1;
let matchedPairs = 10;

//Array of img names
let imgs = parsedTheme.themeImages;
//array of random numbers for randomized cards
let imageArray = [];
function fillImageArray() {
  let pairs = [];
  while (imageArray.length < imgs.length) {
    let imgIndex = getRandomIndex();
    if (!imageArray.includes(imgIndex)) {
      imageArray.push(imgIndex);
    }
  }
  while (pairs.length < imgs.length) {
    let imgIndex = getRandomIndex();
    if (!pairs.includes(imgIndex)) {
      imageArray.push(imgIndex);
      pairs.push(imgIndex);
    }
  }
}
fillImageArray();

// generate a random number based on imgs length
function getRandomIndex() {
  return Math.floor(Math.random() * imgs.length);
}

// render game board of 20 tiles (5 x 4)
function renderTable() {
  //cardID to give each cell an ID
  let cardID = 1;

  //slow loop for table rows
  for (let i = 0; i < 4; i++) {
    let tableRow = document.createElement('tr');
    gameboard.appendChild(tableRow);

    // fast loop to place 5 cells in a row
    for (let j = 0; j < 5; j++) {
      let tdElement = document.createElement('td');
      tdElement.className = 'card-container';
      tableRow.appendChild(tdElement);

      // creates a div with a class of card to contain inputs
      let cardElement = document.createElement('div');
      cardElement.className = 'card';
      cardElement.id = cardID;
      cardID++;
      tdElement.appendChild(cardElement);

      //gives image attributes to the inputs, front and back to create a "card"
      let frontCard = document.createElement('input');
      let image = imgs[imageArray.pop()];
      frontCard.className = 'front';
      frontCard.type = 'image';
      frontCard.src = `/img/${image}`;
      frontCard.alt = image;
      cardElement.appendChild(frontCard);

      let cardBack = document.createElement('input');
      cardBack.className = 'back';
      cardBack.type = 'image';
      cardBack.src = '/img/cardback1.png';
      cardBack.alt = 'cardback1.png';
      cardElement.appendChild(cardBack);

    }
  }
}
renderTable();

// Global Variables for handling click event and matches
let firstClick = '';
let timesClicked = 0;
let firstClickId = '0';
let secondClickId = '0';

//Attaches Event listener to every card div
for (let i = 0; i < cardSelector.length; i++) {
  cardSelector[i].addEventListener('click', handleCardClick);
}

// Executes every time a card is clicked
function handleCardClick(event) {
  //stores the target of the click
  let imgClicked = event.target;

  //Takes alt text of the card clicked
  let altText = '';
  altText = pullsAltAndId(imgClicked, altText);

  //Stores alt text into firstClick or second Click depending on turn iteration
  let secondClick = '';
  secondClick = storeAltTxt(secondClick, altText);

  //Checks if alt texts match 
  checkMatch(secondClick);

  //Resets turn iteration
  if (timesClicked === 2) {
    firstClick = '';
    timesClicked = 0;
  }
  gameWon();
  //Re-renders Turn counter if click goes into next turn iteration
  turnCounterRender();
}

//function that pulls alt text and ID depending on the target element which is passed through imgClicked
function pullsAltAndId(imgClicked, altText) {
  if (imgClicked.className === 'card') {
    altText = imgClicked.firstChild.alt;
    if (timesClicked === 0) {
      firstClickId = imgClicked.id;
    } else {
      secondClickId = imgClicked.id;
    }
  }
  // console.log says input.back
  else if (imgClicked.className === 'back') {
    altText = imgClicked.parentElement.firstChild.alt;
    if (timesClicked === 0) {
      firstClickId = imgClicked.parentElement.id;
    } else {
      secondClickId = imgClicked.parentElement.id;
    }
  }
  // console.log says input.front
  else {
    altText = imgClicked.alt;
    if (timesClicked === 0) {
      firstClickId = imgClicked.parentElement.id;
    } else {
      secondClickId = imgClicked.parentElement.id;
    }
  }
  return altText;
}

// function to determine where to store altText based on turn iteration
function storeAltTxt(secondClick, altText) {
  if (timesClicked === 1) {
    secondClick = altText;
    timesClicked++;
    turnCounter++;
  } else {
    firstClick = altText;
    timesClicked++;
  }
  return secondClick;
}

// function that will check if alt text matches; If matched will remove card contents and replace card with the image of the card
function checkMatch(secondClick) {
  let cardWindowOne = document.getElementById(firstClickId);
  let cardWindowTwo = document.getElementById(secondClickId);
  if (firstClick === secondClick) {
    matchedPairs--;
    while (cardWindowOne.firstChild) {
      cardWindowOne.removeChild(cardWindowOne.firstChild);
    }
    while (cardWindowTwo.firstChild) {
      cardWindowTwo.removeChild(cardWindowTwo.firstChild);
    }
    let staticImg = document.createElement('img');
    staticImg.src = `/img/${firstClick}`;
    staticImg.alt = `${firstClick}`;
    let staticImg2 = document.createElement('img');
    staticImg2.src = `/img/${secondClick}`;
    staticImg2.alt = `${secondClick}`;
    cardWindowOne.parentElement.appendChild(staticImg);
    cardWindowTwo.parentElement.appendChild(staticImg2);
    cardWindowOne.parentElement.removeChild(cardWindowOne.parentElement.firstChild);
    cardWindowTwo.parentElement.removeChild(cardWindowTwo.parentElement.firstChild);
  }
}

// function that will Re-render the turn counter every time the turn iterates and also replaces the class for animations purposes
function turnCounterRender() {
  let turns = document.getElementById('turn-counter');
  let turnsElm = document.createElement('p');
  if (timesClicked === 1) {
    turns.className = 'turnAnimationOff';
  }
  else {
    turns.className = 'turnAnimation';
  }
  if (turns.firstChild) {
    turns.removeChild(turns.firstChild);
  }
  turnsElm.textContent = `Turn ${turnCounter}`;
  turns.appendChild(turnsElm);
}
turnCounterRender();

function gameWon() {
  if (matchedPairs === 0) {
    let profile = localStorage.getItem('accounts');
    let parseProfile = JSON.parse(profile);
    for (let users in parseProfile) {
      if (parseProfile[users].name === parsedTheme.user) {
        parseProfile[users].timesPlayed++;
      }
    }
    let reparseProfile = JSON.stringify(parseProfile);
    localStorage.setItem('accounts', reparseProfile);

    let mainWindow = document.getElementById('win');
    let winElem = document.createElement('p');
    winElem.textContent = 'You Win!!';
    winElem.id = 'winner';
    mainWindow.appendChild(winElem);
  }
}
