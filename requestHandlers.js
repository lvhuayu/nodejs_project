var querystring = require("querystring");
var mysql = require("./mysql");

function start(response, postData, conn) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '地址: <input type="text" name="address"/><br/>'+
    '密码: <input type="password" name="password"/><br/>'+
    '<input type="submit" value="Submit" />'+
    '</form>'+
    '<br />'+
    '<form action="/query" method="post">'+
    '搜索: <input type="text" name="password"/><br/>'+
    '<input type="submit" value="Query" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function query(response, postData, conn) {
  console.log("Request handler 'query' was called.");
  post = querystring.parse(postData);
  response.writeHead(200, {"Content-Type": "text/plain"});
  var password = parseInt(post.password);
  var query_sql = "SELECT address FROM address_store WHERE (password = " + password + ");"
  console.log(query_sql);
  mysql.query(response, conn, query_sql);
}

function upload(response, postData, conn) {
  console.log("Request handler 'upload' was called.");
  post = querystring.parse(postData);
  response.writeHead(200, {"Content-Type": "text/plain"});
  var address = parseInt(post.address);
  var password = parseInt(post.password);
  var insert_sql = "INSERT INTO address_store VALUES(id,'" + address + "','" + password + "');"
  console.log(insert_sql);
  mysql.insert(conn, insert_sql);
  response.write("You've sent your address: " + address);
  response.end();
}


exports.start = start;
exports.query = query;
exports.upload = upload;