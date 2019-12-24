A node program that moniters your keystrokes and blocks you from typing black listed words




# Genenral Development Notes

### Why switched away from robotJS to node-key-sender library then switched to running a python shell in the node program
Migrated from the robotJS node-key-sender, because robotJS was very slow to execute keyboard events, like pressing backspace. The speed could not be altered as the function setKeyboardDelay() did not work.

note about robotJS: it requires nodeJS native add-ons
which can be obtained with this command
    sudo npm install -g node-gyp
The robotJS requires the make command so make sure you have that installed

Then again had to switch, because the node-key-sender was too slow to execute key commands, and it wasn't
accurate, may the order of execution did not match the order of the code or maybe its a timing thing
for example:
    // ks.sendCombination(['@17', '@65']);
    // ks.sendKey("@8");
    // ks.sendKey("@8");
The send combinatin would press ctrl + A (@17 is ctrl and @65 is a), then @8 (backspace) would follow,
this did not always erase the whole text, it was a hit or miss. Therefor I switched to a python script that the node program runs, it worked perfectly, in fact the response time was a lot faster. It uses the library pyautogui, and the script the node calls is handle_response.py


### Note about keyboard event capture library
Maybe switch keyboard events to use the npm module keypress
it is probably cross platform, but it can't process numbers and symbols

### String matching
Uses fuzzball package which depends on the edit distance principle for figuring out how similar strings are
for more info about it go to https://en.wikipedia.org/wiki/Edit_distance and https://en.wikipedia.org/wiki/Levenshtein_distance. 

Code examples

        //simple ratio of single words
        let simpleRatio = fuzz.ratio("man", buffer);

        // very good with longer sentences
        let tokenSetRatio = fuzz.token_set_ratio("man", buffer);

        //sort ratio is good for order of words
        // let token_sort_ratio

        //partial ratio doesnt work good for us here as say for example man is blacklisted
        //then a would score 100, a 'a' is a substring of man. it would trigger so many false positives




## extra features
instead of removing the text, press ctrl f4 to close the whole thing or to switch off the computer
cool down time after when seetings take place if the user sets hard mode ON aka persistnt
make it presistanct, that it opens it self again if user cloeses it from the system moniter
clipboard moniter ie copy+ paster check


## things to fix
 it keeps opening a new a new tab whenever I block a keyword in the browser URL space... it is on and off 
 When user types too fast, the ctrl +a can become ctrl  + something else, maybe use a batch type...
 account for the left and right keys

