//object for express. 
var express = require('express');

// requireing socket.io to the project. 
var socket = require('socket.io');

//object for body-parser.
var bodyParser = require("body-parser");

//object for database. 
var mysql = require ('mysql');

//for express.
var app = express();

var server = app.listen(1337,function(){
	//listening to the request on port 1337.
	console.log('listening to the request on port 1337.');
}); 

//static file. 
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

// socket setup
// this socket is running on the back end.
var io = socket(server);

//making a socket connection. 
io.on('connection', function(socket){
	console.log('made a socket connection');
	
	// Handle chat event
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });
});

app.post("/create", function(req, res) {
 // Get values from the form
 var user = { username: req.body.username, email: req.body.email, bio: req.body.bio, account_info: req.body.account_info, pass: req.body.pass, repass: req.body.repass };    

 connection.query("INSERT INTO members SET ?", user, function(err, result) {
    if (err)
      res.send(err);
    else {
      console.log("Inserted member!" );
	  res.redirect("/login.html");
	}
  }); 
});

app.post("/log", function(req, res) {
 // for checking the log in information of the user. 
 var use = req.body.u;
 var pas = req.body.p;   
 
 connection.query("SELECT username,pass FROM members", function(err, rows) {
    if (err)
      res.send(err);
    else{
		var auth = false;
		rows.forEach(function(row) {
			var usenam = row.username;
			var usepas = row.pass;
			
			if (usenam == use && usepas == pas){
				// Need to open the BOT's homepage here. 
				auth = true;
				console.log("Authenticated is true");
			}
		});
		if(auth == true){
			res.redirect("/home.html");
			console.log("Redirecting to home is true");
		}
		else{
			res.redirect("/login.html");
			console.log("Redirecting to log");
		}
	}
  });
});

app.post("/homeBot", function(req, res) {
	res.redirect("/withbot.html");
});
app.post("/chatUser", function(req, res) {
	res.redirect("/withuser.html");
});

//connecting to  database.
var connection = mysql.createConnection({
	connectionLimit: 50,
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'chatbotuser'
});

connection.connect(function(error){
	if (error){
		console.log('Error:',error);
	}else{
		console.log('Connected established');
	}
});
