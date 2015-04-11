var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var mongodb = require("./mongodb");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/query"] = requestHandlers.query;

// connect with MongoDB
var collection = mongodb.connect_Mongo();

// start the server
server.start(router.route, handle, collection);