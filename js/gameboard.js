'use strict';

// PROCURE storage
// let procuredAccounts = localStorage.getItem('accounts');

// PARSE storage
// let parsedAccounts = JSON.parse(retrievedAccounts);

// DOM window
let gameboard = document.getElementById('gameboard');

let imageArray = [];

// collect images
function collectImages () {
  for (let i = 1; i < 11; i++) {
    imageArray.push(`img/dog${i}.png`);
  }
  for (let j = 1; j < 11; j++) {
    imageArray.push(`img/dog${j}.png`);
  }
}

collectImages();

console.log(imageArray);

// generate random whole number from 0 to 19
function randomNumberZeroToNineteen (min, max) {
  return Math.floor(Math.random() * (max-min) + min);
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
      // add to DOM
      tableRow.appendChild(tdElement);

      // create an image element
      let imgElement = document.createElement('img');
      // add context
      /////////////////// NEED A METHOD BESIDES SPLICE?
      let randomNumber = imageArray.splice(randomNumberZeroToNineteen(1,imageArray.length));
      console.log(randomNumber);
      ///////////////////
      imgElement.src = imageArray[randomNumber];
      // add to DOM
      tdElement.append(imgElement);
    }
  }
}

renderTable();
