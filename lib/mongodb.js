/* the mongodb connection file */

var mongo = require('mongodb');
var client = mongo.MongoClient;
var assert = require('assert');

var url = 'mongodb://uminos:nodejs*1027@202.195.145.181:27017/minos';
//var url = 'mongodb://uminos:nodejs*1027@localhost:27017/minos';

var findDocuments = function(db, collectionName, query, callback) {
    // Get the documents collection
    var collection = db.collection(collectionName);
    // Find documents
    collection.find(query).toArray(function(err, docs) {
        docs.forEach(function(item) {
           item._id = item._id.toString();
        });
        //console.dir(docs)
        callback(docs);
    });
}

var findOneDocument = function(db, collectionName, query, callback) {
    var collection = db.collection(collectionName);

    collection.findOne(query, function(err, document) {
        //assert.equal(err, null);
        if (err)
            callback(null);

        document._id = document._id.toString();
        callback(document);
    });
};


var insertDocuments = function(db, collectionName, doc, callback) {
    // Get the documents collection
    var collection = db.collection(collectionName);
    // Insert some documents
    collection.insert(doc, function(err, result) {
        assert.equal(err, null);
        callback(result);
    });
}


var updateDocument = function(db, collectionName, query, update, callback) {
    var collection = db.collection(collectionName);

    collection.update(query, update, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        callback(result);
    });
}

var aggregateDocument = function(db, collectionName, pipeline, callback) {
    var collection = db.collection(collectionName);

    collection.aggregate(pipeline, function(err ,result) {
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


exports.findById = function(collection, id, callback) {
    client.connect(url, function(err, db) {
        assert.equal(null, err);

        findOneDocument(db, collection, {_id: mongo.ObjectID(id)}, function(result) {
            callback(result);
            db.close();
        });
    });
}


exports.insert = function(collection, doc, callback) {
    client.connect(url, function(err, db) {
        assert.equal(null, err);

        insertDocuments(db, collection, doc, function() {
            callback();
            db.close();
        });
    });
};


exports.update = function(collection, query, update, callback) {
    client.connect(url, function(err, db) {
        assert.equal(null, err);

        updateDocument(db, collection, query, { $set: update }, function() {
            callback();
            db.close();
        });
    });
}


exports.updateById = function(collection, id, update, callback) {
    client.connect(url, function(err, db) {
        assert.equal(null, err);

        updateDocument(db, collection, {_id: mongo.ObjectID(id)}, { $set: update }, function() {
            callback();
            db.close();
        });
    });
}


// add $set by yourself
exports.updateExtend = function(collection, id, update, callback) {
    client.connect(url, function(err, db) {
        assert.equal(null, err);

        updateDocument(db, collection, {_id: mongo.ObjectID(id)}, update, function() {
            callback();
            db.close();
        });
    });
};


exports.aggregate = function(collection, pipeline, callback) {
    client.connect(url, function(err, db) {
        assert.equal(null, err);

        aggregateDocument(db, collection, pipeline, function(result) {
            callback(result);
            db.close();
        });
    });
}