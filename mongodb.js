
function connect_Mongo() {
	var server_options = {'auto_reconnect':true, poolSize:5};
	var db_options = {w:-1};

	var mongodb = require("mongodb"),
    	mongoserver = new mongodb.Server('localhost', 27017, server_options),
    	db = new mongodb.Db('map_project', mongoserver, db_options);
	
	db.open(function(err,db){
    	if (err) {
			console.info('Can not connect Mongodb');
    		throw err;
    	}
    	console.info('Mongodb connected');
	});

	var collection = db.collection('address');
	
	return collection
}

function insert(collection, document) {
	collection.insert(document);
	console.log("Insert Succeed!")
}

function query(response, collection, user_name) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	console.log(user_name);
	collection.findOne({"user_name": user_name}, function(err, document) {
		if (err) throw err
			
  		console.log(document);
  		response.write(JSON.stringify(document));
  		response.end();
	});

}

exports.connect_Mongo = connect_Mongo;
exports.insert = insert;
exports.query = query;