// This module takes a key as input and process it to determine if it is a black listed word
let blackList = require('./blackList').blackList;
let robot = require("robotjs");


const BUFFER_LIMIT = 10;
let buffer = "";

// Note you want to clear the buffer whenever u get a space if there is no blacklist with space in it
function addToBuffer(letter, backSpace = false, clearBuffer=false){
    buffer = buffer + letter;
    console.log(buffer);

    if (blackList.includes(buffer)){
        handleMatch();
    }
    if (buffer.length >=  BUFFER_LIMIT){
        buffer = ""
    }

    if (backSpace){buffer = buffer.slice(0, -1);}
    else if (clearBuffer){buffer = ""}
}

function handleMatch(){
    console.log(buffer);
    console.log("match");
    for(let i = 0 ; i <= buffer.length; i++){
        robot.setKeyboardDelay(1);
        robot.keyTap("backspace");
        // robot.setKeyboardDelay(1);

    }
    buffer= ""; // reset buffer after a match




}

module.exports = addToBuffer;