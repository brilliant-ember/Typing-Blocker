// the javascript for the UI's html
const fs = require('fs');
let startListning = require("./initCapture");
const blackListFilePath = "./blackList.js";

startListning.startListning();
initUI();

document.getElementById("addButton").onclick = function () {
  let newBlackListedWord = document.getElementById("toAdd").value;
  //if length without space is not more than 1
  if (newBlackListedWord.replace(/ /g, '').length <= 1) {
    alert("must be longer than 1 ");
  }
  else if (sanitize(newBlackListedWord)) {
    // document.getElementById("blackListDisplay").innerHTML = newBlackListedWord;
    if(newBlackListedWord.indexOf(",") === -1){addWordForDisplay(newBlackListedWord);}
    else{
      addListForDisplay(newBlackListedWord.split(","));
    }
  }
  else {
    const errorMsg = ' these symbols are not allowed  ; \' " < > { } [ ] & \\ ';
    alert(errorMsg);
  }
}

let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
output.textContent = slider.value;

slider.oninput = function () {
  output.textContent = this.value;
}
document.getElementById("applyButton").onclick = function () {
  let tags = document.getElementById("list").getElementsByTagName("li");
  let wordsToBlackList = [];
  for (let i = 0; i < tags.length; i++) {
    wordsToBlackList.push(tags[i].innerText);
  }
  writeBlackListFile(wordsToBlackList);
}

// document.getElementById("myCheck").checked = true;

function initUI() {
  let blFile = doesFileExist(blackListFilePath);

  if (blFile) {
    fs.readFile(blackListFilePath, 'utf8', (e, data) => {
      if (e) {
        console.log(e);
        alert("error reading old blacklist");
      } else {
        // parses the blacklist file to include it in the UI
        let listStart = data.indexOf("[");
        let listEnd = data.indexOf("]") + 1;
        let oldList = JSON.parse(data.substring(listStart, listEnd));
        addListForDisplay(oldList);
      }
    });

  }
}

//if the search result is -1 then we hava a valid string and we will return true, otherwise return false
function sanitize(string) {
  const reg = /[\\;'"<>\{\}\[\]&]/;
  return string.search(reg) == -1;
}

// adds a UI entry for blackListed words, note that you have to apply before they can be written and applied
function addWordForDisplay(newBlackListedWord) {
  let ul = document.getElementById("list");
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(newBlackListedWord));
  li.setAttribute("class", "BLword");
  ul.appendChild(li);
}

//same as addWordForDisplay but with a lis instead
function addListForDisplay(myList){

  let ul = document.getElementById("list");
  for (let i = 0; i < myList.length; i++) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(myList[i]));
    li.setAttribute("class", "BLword");
    ul.appendChild(li);
  }
}


// takes in a list of blacklist words and writes them to the blackList.js file so they can be blocked
function writeBlackListFile(wordsToBlackList) {
  let x = `//auto-generated, please do not edit manually unless you know what you are doing
let blackList = ${JSON.stringify(wordsToBlackList)};
module.exports.blackList = blackList;
  `;
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
    return False;
  }
}