var http = require("http");
var https = require("https");
var url = require("url");
var StringDecoder = require("string_decoder").StringDecoder;
var config = require("./config");
var fs = require("fs");
var handlers = require("./lib/handlers");

var httpServer = http.createServer(function (req, res) {
  unifiedServer(req, res);
});

httpServer.listen(config.httpPort, function () {
  console.log("The server is listening on port " + config.httpPort);
});

var httpsServerOptions = {
  key: fs.readFileSync("./https/key.pem"),
  cert: fs.readFileSync("./https/cert.pem"),
};

var httpsServer = https.createServer(httpsServerOptions, function (req, res) {
  unifiedServer(req, res);
});

httpsServer.listen(config.httpsPort, function () {
  console.log("The server is listening on port " + config.httpsPort);
});

var router = {
  ping: handlers.ping,
  users: handlers.users,
};
