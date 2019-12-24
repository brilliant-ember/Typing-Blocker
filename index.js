// the javascript for the UI's html
const fs = require('fs');
let startListning = require("./initCapture");
startListning.startListning(); 

document.getElementById("addButton").onclick = function () {
  let newBlackListedWord = document.getElementById("toAdd").value;
  //if length without space is not more than 1
  if (newBlackListedWord.replace(/ /g, '').length <= 1) {
    alert("must be longer than 1 ");
  }
  else if (sanitize(newBlackListedWord)) {
    // document.getElementById("blackListDisplay").innerHTML = newBlackListedWord;
    let ul = document.getElementById("list");
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(newBlackListedWord));
    li.setAttribute("class", "BLword");
    ul.appendChild(li);
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
  // wordsToBlackList = wordsToBlackList.toString();
  // console.log(wordsToBlackList);
  let x = `let blackList = ${JSON.stringify(wordsToBlackList)};
module.exports.blackList = blackList;
  `;
  fs.writeFile("./blackList.js", x, function (err) {
    if (err) {
      return console.log(err);
    }
    alert("Updated!");
  });
  startListning();
}

// document.getElementById("myCheck").checked = true;

//if the search result is -1 then we hava a valid string and we will return true, otherwise return false
function sanitize(string) {
  const reg = /[\\;'"<>\{\}\[\]&]/;
  return string.search(reg) == -1;
}