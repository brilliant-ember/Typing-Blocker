# this python script will handle respoding to the blacklist trigger

from pyautogui import size, press, keyDown, keyUp

screenWidth, screenHeight = size() # Get the size of the primary monitor.

keyDown('ctrl') # Press the ctrl key down and hold it.
press('a') # Press the a key.
keyUp('ctrl')   # Let go of the ctrl key.

press('backspace')
press('backspace')




