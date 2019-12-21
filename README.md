A node program that moniters your keystrokes and blocks you from typing black listed words




# Genenral Development Notes

### Why switched away from robotJS to node-key-sender library then switched to running a python shell in the node program
Migrated from the robotJS, because it was very slow to issue keyboard events, like pressing backspace. The speed could not be altered as the function setKeyboardDelay() did not work.
It which requires nodeJS native add-ons
which can be obtained with this command
    sudo npm install -g node-gyp
The robotJS requires the make command so make sure you have that installed

More info about robotJS https://github.com/octalmage/robotjs and https://robotjs.io

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


## extra features
instead of removing the text, press ctrl f4 to close the whole thing or to switch off the computer