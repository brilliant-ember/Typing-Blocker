# this python script will handle respoding to the blacklist trigger

from pyautogui import press, keyDown, keyUp

keyDown('ctrl') # Press the ctrl key down and hold it.
press('a') # Press the a key.
keyUp('ctrl')   # Let go of the ctrl key.

press('backspace')
press('backspace')




