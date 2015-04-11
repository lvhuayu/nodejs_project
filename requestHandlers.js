var querystring = require("querystring");
var mongodb = require("./mongodb");

function start(response, postData, conn) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    'group_name: <input type="text" name="group_name"/><br/>'+
    'user_name: <input type="text" name="user_name"/><br/>'+
    'lat: <input type="text" name="lat"/><br/>'+
    'lng: <input type="text" name="lng"/><br/>'+
    '<input type="submit" value="Submit" />'+
    '</form>'+
    '<br />'+
    '<form action="/query" method="post">'+
    '搜索: <input type="text" name="user_name"/><br/>'+
    '<input type="submit" value="Query" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function query(response, postData, collection) {
  console.log("Request handler 'query' was called.");
  post = JSON.parse(postData);
  var user_name = post.user_name;
  mongodb.query(response, collection, user_name);
}

function upload(response, postData, collection) {
  console.log("Request handler 'upload' was called."); 
  post = JSON.parse(postData);
  console.log(post);  //Json Format
  response.writeHead(200, {"Content-Type": "text/plain"});
  mongodb.insert(collection, post);
  response.write("You've insert succeed");
  response.end();
}


exports.start = start;
exports.query = query;
exports.upload = upload;