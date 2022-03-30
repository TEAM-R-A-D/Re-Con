'use strict';

// creates AccountList Object that will hold array of Profile Objects
let accounts = new AccountList([]);

//Event Handler for Adding User
function handleAddUser(event) {
  event.preventDefault();
  addProfile();
  accounts.saveToLocalStorage();
}

// function that will be called to add user to option drop down
function addProfile() {
  let username = document.getElementById('username').value;
  accounts.addUser(username);
  let selectElem = document.getElementById('user');
  let userElem = document.createElement('option');
  userElem.textContent = username;
  selectElem.appendChild(userElem);
}

//Populates local storage profiles
function loadProfiles() {
  let rawProfiles = localStorage.getItem('accounts');
  let newProfiles = JSON.parse(rawProfiles);
  if(newProfiles !== null){
    for (let i = 0; i < newProfiles.length; i++) {
      let temp = new UserProfile(newProfiles[i].name);
      temp.timesPlayed = newProfiles[i].timesPlayed;
      temp.theme = newProfiles[i].theme;
      accounts.profile.push(temp);
      let selectElem = document.getElementById('user');
      let userElem = document.createElement('option');
      userElem.textContent = temp.name;
      selectElem.appendChild(userElem);
    }
  }
}
loadProfiles();

// event listener for adding user
let userForm = document.getElementById('addUser');
userForm = addEventListener('submit', handleAddUser);
