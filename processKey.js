// This module takes a key as input and process it to determine if it is a black listed word
let blackList = require('./blackList').blackList;
let { PythonShell } = require('python-shell');
let fuzz = require('fuzzball');
//recommended value is 75
let MATCHING_THRESHOLD = require("./blackList").tolerance;

const BUFFER_LIMIT = 10;
let buffer = "";

// Note you want to clear the buffer whenever u get a space if there is no blacklist with space in it
function addToBuffer(letter, backSpace = false, clearBuffer = false) {
    // if (blackList.includes(buffer)){handleMatch();}
    if (clearBuffer) { buffer = "" }

    else {
        if (backSpace) { buffer = buffer.slice(0, -1); }

        buffer = buffer + letter;

        for (let i = 0; i < blackList.length; i++) {
            let blackListedWord = blackList[i];
            //simple ratio of single words
            let simpleRatio = fuzz.ratio(blackListedWord, buffer);

            // very good with longer sentences
            let tokenSetRatio = fuzz.token_set_ratio(blackListedWord, buffer);

            console.log({
                "simpleRatio": simpleRatio, 
                "tokenSetRatio":tokenSetRatio,
                "blocked_word": blackListedWord,
                "buffer": buffer
            });
            if (simpleRatio >= MATCHING_THRESHOLD || tokenSetRatio >= MATCHING_THRESHOLD) {
                handleMatch();
            }

        }


    }
    if (buffer.length >= BUFFER_LIMIT) { buffer = "" }
}

function handleMatch() {
    console.log(buffer);
    console.log("match");
    buffer = ""; // reset buffer after a match
    PythonShell.run('./handle_response.py', null, function (err) {
        if (err) throw err;
        console.log('finished');
    });
    buffer = ""; // reset buffer after script keypresses execute






}

module.exports = addToBuffer;