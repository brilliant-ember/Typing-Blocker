// This module takes a key as input and process it to determine if it is a black listed word
let blackList = require('./blackList').blackList;


const BUFFER_LIMIT = 10;
let buffer = "";

function addToBuffer(letter){
    buffer = buffer + letter;
    console.log(buffer);

    if (blackList.includes(buffer)){
        handleMatch();
    }
    if (buffer.length >=  BUFFER_LIMIT){
        buffer = ""
    }
}

function handleMatch(){
    console.log(buffer);
    console.log("match");
    buffer= ""; // reset buffer after a match

}

module.exports = addToBuffer;