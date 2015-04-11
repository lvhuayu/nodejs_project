function connect_mysql() {
	// make connection with Mysql
	var mysql = require('mysql');
	var connection = mysql.createConnection({
  	host     : 'localhost',
  	user     : 'root',
  	password : '',
  	database : 'nodejs',
  	port : '3306'
	});

	connection.connect(function(err) {
  		if (err) {
    		console.error('error connecting: ' + err.stack);
    		return;
  		}
  		console.log('connected as id ' + connection.threadId);
	});

	return connection;
}

function query(response, connection, sql) {
	// query
	connection.query(sql, function(err, results, fields) {
    	if (err) throw err; // error case    
    
    	if (results) {
    		response.writeHead(200, {"Content-Type": "text/plain"});
    		var address = results[0].address; 
            console.log(address);
            response.write("The Query address is: " + address);
  			response.end();
    	}
    });
}

function insert(connection, sql) {
	// insert
	connection.query(sql, function(err, results, fields) {
    	if (err) throw err; // error case    
    
    	if (results) {
       		console.log("insert data succeed");
    	}    
    });
}

exports.connect_mysql = connect_mysql;
exports.query = query;
exports.insert = insert;