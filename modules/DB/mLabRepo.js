var mongojs = require('mongojs')
var setting = require('../../settings');
var logger = require('../logger')

var databaseUrl = setting.DbConnectionString; // "username:password@example.com/mydb"
var collections = setting.DbCollections
var db = mongojs(databaseUrl, collections);

module.exports = {
    findAll: findAll,
    //findById: findById,
    insert: insert
    // remove: remove,
    // restore: restore,
    // publish: publish,
    // unpublish: unpublish,
    // update: update
}

function findAll(callback) {
    db.jobsmetadata.find(function(err, jobsMd) {
        callback(err, jobsMd);
    });
}

function insert(document,callback) {
    db.jobsmetadata.save(document, function(err, saved) {
        callback(err, saved);
    });    
}
