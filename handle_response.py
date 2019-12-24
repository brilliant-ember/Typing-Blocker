# this python script will handle respoding to the blacklist trigger

from pyautogui import press, keyDown, keyUp
from time import sleep

def clearInput():
  keyDown('ctrl') # Press the ctrl key down and hold it.
  press('a') # Press the a key.
  keyUp('ctrl')   # Let go of the ctrl key.

  press('backspace')
  press('backspace')

#I call it twice with a sleep in between as a failsafe in case user is
# typing fast, and the ctrl+a became ctrl+(what user pressed) 
clearInput()
sleep(0.2)
clearInput()



