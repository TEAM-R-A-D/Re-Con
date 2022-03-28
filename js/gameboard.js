'use strict';

// TILE LOGIC
// 1. Receive profile properties from local storage
//  - needs to include something that pairs images?
//  - image source is needed
// 2. Double-up images or otherwise get count so board can be rendered
// 3. Randomize tiles and prep for rendering
// 4. Render board

// PULL FROM LOCAL STORAGE
// primary key : 'accounts'

// GET local storage

// SET local storage

// STEP 4

// DOM WINDOWS
let gameboard = document.getElementById('gameboard');
////////// [] table element needs 'gameboard' id


// RENDER GAMEBOARD of 20 tiles (5 x 4)
function renderTable() {
  ////////// get properties from main array

  // create 5 rows with 4 cells each
  for (let i = 0; i < 5; i++) {
    // create a table row
    let tableRow = document.createElement('tr');
    // add to DOM
    gameboard.appendChild(tableRow);

    // add cells to the row
    for (let j = 0; j < 4; j++) {
      // create a table cell
      let tdElement = document.createElement('td');
      // temporary content
      tdElement.innerHTML = 'x';
      // add to DOM
      tableRow.appendChild(tdElement);
    }
  }
}

// call function
renderTable();

// possible way to bring in img sources:
// const image = document.createElement("img").src = "your image source";
// box.innerHTML = ""; // remove any text from the box
// box.append(image); // add the image inside of your element  

// renderTable();
