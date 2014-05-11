var mysql = require('mysql');
var http = require("http");
var handleRequest = require("./request-handler.js").handleRequest;
var _ = require('underscore');

 var port = 3000;
 var ip = "127.0.0.1";

var server = http.createServer(handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chatterbot"
});

dbConnection.connect(function(err){
  if (!err){
    console.log('connected to mysql!');
  }
});



exports.writeChattoDB = function(chat){

  var newName = {username: chat.username, objectID: chat.objectID};
  var newMessage = {messagetext: chat.text, objectID: chat.objectID};
  var newRoom = {roomname: chat.roomname, objectID: chat.objectID};

  dbConnection.query('INSERT INTO users SET ?', newName, function(err, result){
    if (err){
      console.log(err);
    } else {
      console.log('added' + result + 'to the users table');
    }
  });
  dbConnection.query('INSERT INTO messages SET ?', newMessage, function(err, result){
    if (err){
      console.log(err);
    } else {
      console.log('added' + result + 'to the messages table');
    }
  });
  dbConnection.query('INSERT INTO rooms SET ?', newRoom, function(err, result){
    if (err){
      console.log(err);
    } else {
      console.log('added' + result + 'to the rooms table');
    }
  });
};

exports.readChatsFromDB = function(){
  dbConnection.query('SELECT messages.objectID, messages.messagetext, users.username FROM messages INNER JOIN users ON messages.objectID = users.objectID ORDER BY users.objectID', function(err, result){
    if (err){
      console.log(err);
    } else {
      console.log(_.uniq(result));
    }
  });
};

// var writeMsgtoDB = function(msg){se

// };

// var write RoomtoDB = function(room){

// }










// var addMessage = dbConnection.query('INSERT INTO messages SET ?', post, function(err, result){
//   if (err){
//     console.log('message added');
//   }
//   else {
//     console.log (addMessage.sql);
//   }
// });



/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

/* You already know how to create an http server from the previous
 * assignment; you can re-use most of that code here. */
