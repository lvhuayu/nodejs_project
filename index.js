var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var mysql = require("./mysql")

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/query"] = requestHandlers.query;
// connect with mysql
var conn = mysql.connect_mysql();

// start the server
server.start(router.route, handle, conn);