# parses xmodmap keys and makes a map if code to key
# the list file was made with xmodmap -pke on a Linux mint system

import os

f = open("./keycodes.txt", "r")
l = {}
L = []
for i in f:
    if len(i) > 5:
        L.append(i)
# print(L)
for i in L:
    igal = i.index("=")
    code = i[igal-3] + i[igal-2]
    payload = ""
    next = igal + 2
    while i[next] != " " and i[next] != "\n":
        payload = payload + i[next]
        next = next + 1
    l[code] = payload
print(l)
f.close()
