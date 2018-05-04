// initialize a "buffer" to hold the keystrokes (i did it as a JavaScript array)
var strings = [];

// every time there is a keyup, collect it into the buffer. line 6, i'm not really sure what's going on there... got it from StackOverflow. so if we use something like this we'll want to figure out exactly how it works haha
window.onkeyup = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    strings += String.fromCharCode(key);
}

// this is a function that writes the buffer to the browser console, and then clears the buffer
function writefunc() {
    console.log(strings);
    strings = [];
}

// this sets up a listener-type-thing that basically calls the function you pass it every x milliseconds, so this writes the contents of the buffer to the console every 5 seconds
setInterval(writefunc, 5000);

//////////////////////////////////////////////////////////////////////////////

var AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-2',
    accessKeyId: 'YOUR CREDENTIALS HERE',
    secretAccessKey: 'YOUR CREDENTIALS HERE'
});

ddb = new AWS.DynamoDB();

var params = {
    TableName: 'Music',
    Item: {
        'Artist' : {S: 'Fleetwood Mac'},
        'SongTitle' : {S: 'Go Your Own Way'},
        'Fact' : {S: 'this is a new fact'}
    }
};

ddb.putItem(params, function(err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data);
    }
});

//////////////////////////////////////////////////////////////////////////////////
/*User name,Password,Console login link
greg,}F=x3|VCn_}A,https://181391321903.signin.aws.amazon.com/console
*/