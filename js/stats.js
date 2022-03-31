'use strict';
let accounts = new AccountList([]);


// pulls profiles in local storage and pushes them into accounts array
function getProfileInfo(){
  let rawProfiles = localStorage.getItem('accounts');
  let newProfiles = JSON.parse(rawProfiles);
  for(let i in newProfiles){
    let temp = new UserProfile(newProfiles[i].name);
    temp.timesPlayed = newProfiles[i].timesPlayed;
    temp.theme = newProfiles[i].theme;
    accounts.profile.push(temp);
  }
}
getProfileInfo();

function renderResultsTable(){
  let tableWindow = document.getElementById('statsTable');
  for(let user in accounts.profile){
    let rowElem = document.createElement('tr');
    tableWindow.appendChild(rowElem);

    let userElem = document.createElement('td');
    console.log(accounts.profile[user]);
    //Need to use the i iteration over accounts to load it into the text Content
    userElem.textContent = accounts.profile[user].name;
    rowElem.appendChild(userElem);

    let playElem = document.createElement('td');
    playElem.textContent = accounts.profile[user].timesPlayed;
    rowElem.appendChild(playElem);
  }
}
renderResultsTable();
