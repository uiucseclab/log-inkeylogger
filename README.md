# log-inKeylogger

## ECE 419 - Final Project

### Introduction

The idea behind our project was to make a keylogger that went beyond the usual 'capture keys and send to a server' keyloggers on the market. The idea was to have a keylogger that would capture the keys everytime the user hits the ENTER or TAB keys, clicks their mouse or every 10 seconds (with a resetting timer.) These choices were made on the fact that ENTER and TAB are the buttons usually pressed to submit information or to navigate to a new field on a website. While the keys were captured and sent during the 4 actions above, we also take a screenshot of the victim's screen. This would help when a victim happened to go to a website through auto-fill or their favorites. We would have their website on hand while also having any information they typed.

### Keylogger Components

#### Timed, on-press and on-click capturing of keys

Whenever a user arrived on a webpage, the moment they started typing a timer will start. Every 10 seconds from the start of this timer, the users keypresses and a screenshot would be logged and sent to our server. This is based on the information gleaned from various resources that the average user only spends about 10 seconds on a website before moving on. If the ENTER or TAB keys were pressed or a mouse-click event occured, the keypresses and screenshot would be sent while the 10-second timer would also be reset. 

#### Screenshots
Due to the difficulty and bandwidth required to send a screenshot of the users screen, a decision was made to use html2canvas (https://html2canvas.hertzen.com/). This tool allows a text-representation of the website to be created and sent to our server, where we could take the text capture and paste it in a browser to see what the victim was looking at the time of capture. Matching this up the capture text would give us a clear view of what the user was doing at the time of text-capture.

#### Storing the captured data
dynamoDB stuff

#### Attack vector
talk about using a firefox extension + word per minute stuff 

### What is still missing


### Contributors
Ageu Nunes - anunes2  

Greg Hartwig - gahart2  

Mark Wudtke - wudtke1
