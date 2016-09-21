var app = require("express")();
var express = require("express");
//var Firebase = require("firebase");

app.use(express.static(__dirname + '\public'));
app.use(express.static(__dirname + '\scripts'));

var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function(req, res){
  res.sendfile("index.html");
});

var mySocket;

var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

var mySerial = new SerialPort("/COM3", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
});

//var myFirebaseRef = new Firebase("https://arduinot01.firebaseio-demo.com/button/");



mySerial.on("open", function(){
  console.log("Porta ABERTA!!");
});

mySerial.on("data", function(data){
  //console.log(dados);
  io.emit("dadoArduino", {
    valor: data
  });
  //myFirebaseRef.set(data.valor);
});

io.on("connection", function(socket){
  console.log("Usuario Conectado");
})

http.listen(3000, function(){
  console.log("Servidor Rodando");
})
