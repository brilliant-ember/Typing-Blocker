// This module takes a key as input and process it to determine if it is a black listed word
let blackList = require('./blackList').blackList;
var {PythonShell}  = require( 'python-shell');

const BUFFER_LIMIT = 10;
let buffer = "";

// Note you want to clear the buffer whenever u get a space if there is no blacklist with space in it
function addToBuffer(letter, backSpace = false, clearBuffer=false){
    buffer = buffer + letter;
    console.log(buffer);

    if (blackList.includes(buffer)){handleMatch();}
    else if (buffer.length >=  BUFFER_LIMIT){buffer = "" }
    else if (backSpace){buffer = buffer.slice(0, -1);}
    else if (clearBuffer){buffer = ""}
}

function handleMatch(){
    PythonShell.run('./handle_response.py', null, function (err) {
        if (err) throw err;
        console.log('finished');
      });
    
    console.log(buffer);
    console.log("match");
    buffer= ""; // reset buffer after a match




}

module.exports = addToBuffer;