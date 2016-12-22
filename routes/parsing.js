var express = require('express'),
    path = require('path'),
    router = express.Router(),

    settings = require('../settings'),
    logger = require('../modules/logger'),
    htmlParser = require(path.join(settings.ROOT_DIR,'modules','parser')),
    careerCenterConverter = require(path.join(settings.ROOT_DIR,'modules','converters','careercenterConverter')),
    dbRepo = require('../modules/DB/mLabRepo'),
    handleErr = function(e){logger.log(e)}
    allJobes = [];

router.get('/',function(req,res){        

    dbRepo.findAll().then(function(docs){
        res.send(docs);
    }).catch(function(err){
         res.send(err);
    });
});

router.post('/parseAll',function(req,res){
    var self = this,
        url = settings.Jobs[0].url,
        parsedAntsArr=[],        
        antsStatus = [];

    htmlParser.parse(url)
        .then(function(antsHtml){
            return careerCenterConverter.getAllJobLinks(antsHtml);
        })
        .then(function(antsArr){
            self.parsedAntsArr = antsArr;            
            return dbRepo.findAll();            
        })
        .then(function(docsInDb){                          
            var insrtPromises = [];
                         
            self.parsedAntsArr.forEach(function(ant) {                                                        
                var isDocInDb = docsInDb.find( function( ele ) { return ele.path === ant.path;});                    
                if( isDocInDb ) {antsStatus.push({announcement:ant.path,status:'already in DB'});}
                else {insrtPromises.push( dbRepo.insert(ant));}                
            });// this.parsedAntsArr.forEach   

            var rejPromise = new Promise(function(resolve,reject){
                reject('i am rejected');
            })
            insrtPromises.push(rejPromise);
            Promise.all(insrtPromises.map(reflect)).then(vals=>{
                vals.map(v=>{
                    antsStatus.push({announcement:v.path,status:'Saved'});
                });
                res.send(antsStatus);                               
            }).catch(handleErr);                    

            
        });// .then(function(docsInDb)                     
    
});//router.post('/parseAll',function(req,res)

function reflect(promise){
    return promise.then(function(v){ return {v:v, status: "resolved" }},
                        function(e){ logger.log(e)});
}

router.post('/',function(req,res){
    var rdmInt = Math.floor(Math.random()*100)
    dbRepo.insert({link:'link'+rdmInt,source:'somesource.am',isCompleted:false},function(err,saved){
        if(err) res.send(err);
        else res.send(saved);
    });
});

function reflect(promise){
    return promise.then(function(v){ return {v:v, status: "resolved" }},
                        function(e){ return {e:e, status: "rejected" }});
}

module.exports = router;
