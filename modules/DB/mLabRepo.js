var mongojs = require('mongojs'),
    setting = require('../../settings'),
    logger = require('../logger'),

    databaseUrl = setting.DbConnectionString, // "username:password@example.com/mydb"
    collections = setting.DbCollections,
    activeCollection = '',
    db = mongojs(databaseUrl, collections);

module.exports = {
    init:init,
    findAll: findAll,
    //findById: findById,
    insert: insert,
    // remove: remove,
    // restore: restore,
    // publish: publish,
    // unpublish: unpublish,
     updateById: updateById
}

function init(collectionName){
    activeCollection = collectionName
}

function findAll() {
    return new Promise(function(resolve,reject){
        db.collection(activeCollection).find(function(err, documents) {
            if(err) reject(err)
            else resolve(documents)
        });
    });
    
}

function insert(document) {
     return new Promise(function(resolve,reject){
        db.collection(activeCollection).save(document, function(err, saved) {
           if(err) reject(err)
           else resolve(saved)
        });    
     });
}

function updateById(id,document){
    return new Promise(function(resolve,reject){
        db.collection(activeCollection).update({_id:mongojs.ObjectId(id)},document,{},(err,doc)=>{
            if(!err) resolve(doc);
            else reject(err);
        });
    });
}
