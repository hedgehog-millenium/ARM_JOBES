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

function findAll() {
    return new Promise(function(resolve,reject){
        db.jobsmetadata.find(function(err, documents) {
            if(err) reject(err)
            else resolve(documents)
        });
    });
    
}

function insert(document) {
     return new Promise(function(resolve,reject){
        db.jobsmetadata.save(document, function(err, saved) {
           if(err) reject(err)
           else resolve(saved)
        });    
     });
}
