'use strict';

// creates AccountList Object that will hold array of Profile Objects
let accounts = new AccountList([]);

//Event Handler for Adding User
function handleAddUser(event){
  event.preventDefault();
  addProfile();
  accounts.saveToLocalStorage();
}

// function that will be called to add user to option drop down
function addProfile(){
  let username = document.getElementById('username').value;
  accounts.addUser(username);
  let selectElem = document.getElementById('user');
  let userElem = document.createElement('option');
  userElem.textContent = username;
  selectElem.appendChild(userElem);
}

// event listener for adding user
let userForm = document.getElementById('addUser');
userForm = addEventListener('submit', handleAddUser);
