# this python script will handle respoding to the blacklist trigger

from pyautogui import press, keyDown, keyUp
from time import sleep
#TODO try to disable user keyboard input when doing ctrl a bckspace 

#this function does ctrl+A then backspace, I do backspace twice because some browsers have autofill that 
# requires pressing backspace another time to clear it
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



