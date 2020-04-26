// Make connection. 
// the socket right here is running on the front end.
var socket = io.connect('http://localhost:1337');

// Query DOM.
// Creating the variable for handelling the event/input. 
var message = document.getElementById('message'); 
var	handle = document.getElementById('handle'); 
var	btn = document.getElementById('send'); 
var	output = document.getElementById('output'); 

//emit an event when someone clicks send.
btn.addEventListener('click',function(){
	socket.emit('chat',{
		message:message.value,
		handle:handle.value
	});
});

// Listen for events
socket.on('chat', function(data){
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});