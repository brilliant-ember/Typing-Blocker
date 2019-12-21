// This module takes a key as input and process it to determine if it is a black listed word
let blackList = require('./blackList').blackList;
let { PythonShell } = require('python-shell');
let fuzz = require('fuzzball');


const BUFFER_LIMIT = 10;
const MATCHING_THRESHOLD = 75;
let buffer = "";

// Note you want to clear the buffer whenever u get a space if there is no blacklist with space in it
function addToBuffer(letter, backSpace = false, clearBuffer = false) {
    if (clearBuffer) { buffer = "" }

    else {
        if (backSpace) { buffer = buffer.slice(0, -1); }
        buffer = buffer + letter;

        //simple ratio of single words
        let simpleRatio = fuzz.ratio("man", buffer);
        
        // very good with longer sentences
        let tokenSetRatio = fuzz.token_set_ratio("man", buffer);

        //sort ratio is good for order of words
        // let token_sort_ratio

        //partial ratio doesnt work good for us here as say for example man is blacklisted
        //then a would score 100, a 'a' is a substring of man. it would trigger so many false positives

        if (simpleRatio >= MATCHING_THRESHOLD || tokenSetRatio >= MATCHING_THRESHOLD) {
            handleMatch();
        }
        // if (blackList.includes(buffer)){handleMatch();}
        else if (buffer.length >= BUFFER_LIMIT) { buffer = "" }
    }
}

function handleMatch() {
    console.log(buffer);
    console.log("match");
    buffer = ""; // reset buffer after a match
    PythonShell.run('./handle_response.py', null, function (err) {
        if (err) throw err;
        console.log('finished');
    });






}

module.exports = addToBuffer;