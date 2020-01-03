// the javascript for the UI's html
const fs = require('fs');
let startListning = require("./initCapture");
const blackListFilePath = "./blackList.json";
// This part is for the tolerance slider
const slider = document.getElementById("toleranceSlider");
const sliderVal = document.getElementById("toleranceDemo");

startListning.startListning();
initUI();

// the add button, to add new words to blacklist
document.getElementById("addButton").onclick = function () {
  let newBlackListedWord = document.getElementById("toAdd").value;
  //if length without space is not more than 1
  if (newBlackListedWord.replace(/ /g, '').length <= 1) {
    alert("must be longer than 1 ");
  }
  else if (sanitize(newBlackListedWord)) {
    // document.getElementById("blackListDisplay").innerHTML = newBlackListedWord;
    if (newBlackListedWord.indexOf(",") === -1) { addWordForDisplay(newBlackListedWord); }
    else {
      addListForDisplay(newBlackListedWord.split(","));
    }
  }
  else {
    const errorMsg = ' these symbols are not allowed  ; \' " < > { } [ ] & \\ ';
    alert(errorMsg);
  }
}

slider.oninput = function () {
  sliderVal.textContent = this.value;
}

// The apply button logic
document.getElementById("applyButton").onclick = function () {
  let tags = document.getElementById("list").getElementsByTagName("li");
  let wordsToBlackList = [];
  for (let i = 0; i < tags.length; i++) {
    wordsToBlackList.push(tags[i].innerText);
  }
  writeBlackListFile(wordsToBlackList);
}

// reades the blackList.json file to populate the UI
function initUI() {
  sliderVal.textContent = slider.value;

  let data = readBlackListFile();
  if (data) {
    addListForDisplay(data.blackList);
    slider.value = data.tolerance;
    sliderVal.textContent = data.tolerance;
  }
}

// reads the blacklist file and then outputs the resulting json, outputs undefined if file not read or doesnt exist
function readBlackListFile() {
  let blFile = doesFileExist(blackListFilePath);
  let returnJson ;
  if (blFile) {
     returnJson =JSON.parse(fs.readFileSync(blackListFilePath, 'utf8'));
  }
  return returnJson
}

//if the search result is -1 then we hava a valid string and we will return true, otherwise return false
function sanitize(string) {
  const reg = /[\\;'"<>\{\}\[\]&]/;
  return string.search(reg) == -1;
}

function appendItemToUiList(ul, content) {
  let li = document.createElement("li");
  let span = document.createElement("span");
  span.appendChild(document.createTextNode(content));
  li.appendChild(span);
  li.setAttribute("class", "blWord");
  li.addEventListener("click", function (event) {
    removeWordFromBlackList(event.target.innerText);
  });
  ul.appendChild(li);
}

function removeWordFromBlackList(word) {
  let json = readBlackListFile();
  if(json){
    let newBlacklist = json.blackList.filter((val)=>{return val !== word});
    writeBlackListFile(newBlacklist);
  } else{
    console.log("blacklist doesn't exist so cannot remove the word: " + word);
  }
}
// adds a UI entry for blackListed words, note that you have to apply before they can be written and applied
function addWordForDisplay(newBlackListedWord) {
  let ul = document.getElementById("list");
  appendItemToUiList(ul, newBlackListedWord)
}

//same as addWordForDisplay but with a lis instead
function addListForDisplay(myList) {

  let ul = document.getElementById("list");
  for (let i = 0; i < myList.length; i++) {
    appendItemToUiList(ul, myList[i]);
  }
}


// takes in a list of blacklist words and writes them to the blackList.js file so they can be blocked
function writeBlackListFile(wordsToBlackList) {
  let x = JSON.stringify({
    blackList: wordsToBlackList,
    tolerance: sliderVal.textContent
  });
  fs.writeFile(blackListFilePath, x, function (err) {
    if (err) {
      console.log(err);
      alert("error occured while creating blacklist");
    }
    else { alert("Updated!"); }
  });
}

function doesFileExist(path) {
  try {
    let stats = fs.lstatSync(path);
    return stats.isFile();
  } catch (E) {
    console.log(E);
    return false;
  }
}