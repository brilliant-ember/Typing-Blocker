A node program that moniters your keystrokes and blocks you from typing black listed words



# Note about keyboard event capture library
switch keyboard events to use the npm module keypress
it is probably cross platform, but it can't process numbers and symbols


# Genenral notes
uses robotJS to automate action, like pressing backspace, which requires nodeJS native add-ons
which can be obtained with this command
    sudo npm install -g node-gyp
The robotJS requires the make command so make sure you have that installed

More info about robotJS https://github.com/octalmage/robotjs and https://robotjs.io
