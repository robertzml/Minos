/* the mongodb connection file */

var client = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://uminos:nodejs*1027@202.195.145.181:27017/minos';


var findDocuments = function(db, collection, query, callback) {
    // Get the documents collection
    var collection = db.collection(collection);
    // Find documents
    collection.find(query).toArray(function(err, docs) {

        //console.dir(docs)
        callback(docs);
    });
}

var findOneDocument = function(db, collection, query, callback) {
    var collection = db.collection(collection);

    collection.findOne(query, function(err, document) {
        assert.equal(err, null);

        callback(document);
    });
};

var insertDocuments = function(db, collection, doc, callback) {
    // Get the documents collection
    var collection = db.collection(collection);
    // Insert some documents
    collection.insert(doc, function(err, result) {
        assert.equal(err, null);
        callback(result);
    });
}


exports.connect = function() {
    client.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        db.close();
    });
};


exports.find = function(collection, query, callback) {
    client.connect(url, function(err, db) {
        assert.equal(null, err);

        findDocuments(db, collection, query, function(result) {
            callback(result);
            db.close();
        });
    });
};


exports.findOne = function(collection, query, callback) {
    client.connect(url, function(err, db) {
        assert.equal(null, err);

        findOneDocument(db, collection, query, function(result) {
            callback(result);
            db.close();
        });
    });
};


exports.insert = function(collection, doc) {
    client.connect(url, function(err, db) {
        assert.equal(null, err);

        insertDocuments(db, collection, doc, function() {
            db.close();
        });
    });
};