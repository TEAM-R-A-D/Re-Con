'use strict';

// Constructor for AccountList Object to hold Profile Array
let AccountList = function(profile){
  this.profile = profile;
};

// Method of AccountList - will take the given name, create a new UserProfile, and store profile in AccountList
AccountList.prototype.addUser = function(name){
  let user = new UserProfile(name);
  this.profile.push(user);
};

// Method of AccountList - will take the profile array in AccountList, Stringify it, and Store with key value 'accounts'
AccountList.prototype.saveToLocalStorage = function(){
  let profileString = JSON.stringify(this.profile);
  localStorage.setItem('accounts', profileString);
};

// Constructor for profiles object, will hold name, times played, and selected theme
let UserProfile = function(name){
  this.name = name;
  this.timesPlayed = 0;
  this.theme = null;
};
