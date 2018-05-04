/* this is an HTTP Request (REST) to send the buffer to the URL*/
function sendData (URLtoSend, stringBuffer)
{
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", URLtoSend, true);


    html2canvas(document.body).then(function(canvas) {
    xmlHttp.send(canvas.toDataURL('image/jpeg', 0.5));       
    });
    

}