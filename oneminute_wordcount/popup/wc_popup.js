var strings = [];

window.onkeyup = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    strings += String.fromCharCode(key);
}

function WordCount() { 
    var popup = document.getElementById("wc_numbers");
    oneString = strings.toString();
    var stringLength = oneString.split(" ").length;
    document.getElementById("wc_numbers").innerHTML = stringLength;
    strings = [];
}

setInterval(WordCount, 3000); //60000 for one minute