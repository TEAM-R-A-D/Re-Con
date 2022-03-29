'use strict';

// PROCURE storage
// let procuredAccounts = localStorage.getItem('accounts');

// PARSE storage
// let parsedAccounts = JSON.parse(retrievedAccounts);

// DOM window
let gameboard = document.getElementById('gameboard');

let imgs = ['dog1.png','dog2.png','dog3.png','dog4.png','dog5.png','dog6.png','dog7.png','dog8.png','dog9.png','dog10.png'];
let imageArray = [];

function fillImageArray () {
  let pairs = [];
  while (imageArray.length < 10) {
    let imgIndex = getRandomIndex();
    if (!imageArray.includes(imgIndex)) {
      imageArray.push(imgIndex);
    }
  }
  while (pairs.length < 10) {
    let imgIndex = getRandomIndex();
    if (!pairs.includes(imgIndex)) {
      imageArray.push(imgIndex);
      pairs.push(imgIndex);
    }
  }
}

// collect images
function collectImages () {
  for (let i = 1; i < 11; i++) {
    imageArray.push(`img/dog${i}.png`);
  }
  for (let j = 1; j < 11; j++) {
    imageArray.push(`img/dog${j}.png`);
  }
}

fillImageArray();

console.log(imageArray);

// generate random whole number
function getRandomIndex () {
  return Math.floor(Math.random() * imgs.length);
}
///// LOGIC TO PREVENT IMAGE FROM REPEATING THREE TIMES

// render gameboard of 20 tiles (4 x 5)
function renderTable() {
  ////////// get properties from main array

  // create 5 rows with 4 cells each
  for (let i = 0; i < 4; i++) {
    // create a table row
    let tableRow = document.createElement('tr');
    // add to DOM
    gameboard.appendChild(tableRow);

    // add cells to the row
    for (let j = 0; j < 5; j++) {
      // create a table cell
      let tdElement = document.createElement('td');
      tdElement.className = 'card-container';
      // add to DOM
      tableRow.appendChild(tdElement);

      // create an image element
      let cardElement = document.createElement('div');
      cardElement.className = 'card';
      tdElement.appendChild(cardElement);

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

      // add context
      /////////////////// NEED A METHOD BESIDES SPLICE?
      // let randomNumber = imageArray.splice(randomNumberZeroToNineteen(1,imageArray.length));
      // console.log(randomNumber);
      ///////////////////
      // imgElement.src = imageArray[randomNumber];
      // add to DOM
      // tdElement.append(imgElement);
    }
  }
}

renderTable();
