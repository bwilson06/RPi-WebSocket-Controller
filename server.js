var express = require("express");
var app = require('express')();
var http = require('http').createServer(app);
const io = require("socket.io")(http, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

//port for environment
var PORT = process.env.PORT || 3001;

//parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//making public a static folder
app.use(express.static("public"));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("newState", function(state){
        console.log(`State changed: ${state}`)
        io.emit("updateState", state)
    })
});

//starting server
http.listen(PORT, function() {
    console.log(`Express is running on port ${PORT}`);
});