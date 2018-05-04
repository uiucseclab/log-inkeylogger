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
We created a table in DynamoDB to store the keylogged data. We also created an AWS Cognitoy Identity Pool, which is able to generate unique IdentityIDs on demand that have full read/write permissions to the DynamoDB table. In this way, we are able to give each victim's browser a unique identifier, which is used as the primary key for the table. A timestamp of the keylogged data is a secondary key. This way, all of a single user's data can be easily correlated together and sorted by time. Additionally, running in the context of a Firefox extension, we ensure that the uniquely generated IdentityID is stored in the victim's Firefox profile so that upon opening the browser in subsequent "uses" of the extension, their UserID will be loaded from storage to keep the correlation consistent and accurate.

#### Attack vector
We decided to disguise the keylogger as a "word-per-minute" counter browser extension. The Firefox browser has support for custom extensions and is a popular web browser, so we chose to develop the keylogger for this browser. Ideally, what this extension would do is present a simple graphic overlay on top of the current brower session that is refreshed every 60 seconds with the user's current WPM. Behind the scenes, the keylogger would be recording key strokes and taking screenshots as detailed above.

#### Testing Steps
If you would like to test the extension (keylog), there are a few setup items that should be considered:

##### the extension assumes you have an AWS account, and have the following things set up:
###### an AWS cognito identity pool with unauthenticated roles allowed, and where the IAM roles have full permissions for DynamoDB
###### a DynamoDB table called "key_data", with a "UserID" primary key of type String, and a "Timestamp" secondary key of type String
##### if these things are ready to go, the only configuration necessary is to replace the IdentityPoolId on line 44 of background.js with the IdentityPoolId corresponding to the AWS Cognito pool with DynamyDB permissions (the IdentityPool is used to generate unique IdentityId's that are used as UserID's for each victim's Firefox instance)
##### of course, some regions might need to be changed, namely lines 19, 39 and 70, if they don't match with our example
##### as of now, the code is configured to work with our group's AWS account, and successfully logs basic keylogged data to our DynamoDB table. However, we ran out of time to actually write a script to query the table, so there is no way for you to view the keylogged data. That's why, if desired, you could set it up with your own AWS account so that you can see the database storage aspect "in action"

Once that is all set up (or if you wish to leave the extension as it is), the steps to test are as follows:

##### open Firefox and navigate to "about:debugging"
##### click "load temporary add-on"
##### select any of the files in the "keylog" folder (background.js, for example)
##### navigate to any webpage (google works well, but really anything will do)
##### start typing, and when you would like a chunk of keylogged text to be sent to the dynamoDB table, hit either Tab or Enter
##### this works with multiple tabs open, etc.

### What is still missing
While we had great success in building the different pieces (a keylogger, a screenshot grabber, a database storage solution and a words-per-minute counter), getting the pieces together to actually make an extension worked well. While we were able to send the logged keystrokes and screenshots to the database, there were some websites (for example, Bank of America and Facebook were 2 I tried) that did not allow the screenshots to be grabbed and sent (though logging keystrokes was not an issue). 

We also were not able to fully combine the words-per-minute extension with the screenshot/keystroke/DynamoDB portion. This was due purely to a lack of time to do proper integration testing. However, each extension can be viewed independently (keylog and oneminute_wordcount).

Obviously, we didn't attempt to upload this extension to Firefox (we prefer to avoid making any lists).

### Contributors
Ageu Nunes - anunes2  

Greg Hartwig - gahart2  

Mark Wudtke - wudtke1
