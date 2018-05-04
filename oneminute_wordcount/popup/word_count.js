var strings = [];

window.onkeyup = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    strings += String.fromCharCode(key);
}

function WordCount(str) { 
  return str.split(" ").length;
}

function oneMinute(){

    var curTime = new Date();
    var timeMarker = curTime.getUTCSeconds();
    while(1){
        var runningTime = timeMarker.getUTCSeconds();
        if(runningTime == timeMarker){
            return true;
        }
    }
}

function oneMinuteWordCount(str){

    if(oneMinute()){
        console.log(WordCount(str));
    }
}

setInterval(oneMinuteWordCount(strings), 60000);

///////////////////////////////////////
/*
function writefunc() {
    console.log(strings);
  */  