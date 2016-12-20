var express = require('express');
var path = require('path');
var router = express.Router();

var settings = require('../settings');
var logger = require('../modules/logger');
var htmlParser = require(path.join(settings.ROOT_DIR,'modules','parser'))
var careerCenterConverter = require(path.join(settings.ROOT_DIR,'modules','converters','careercenterConverter'));
var dbRepo = require('../modules/DB/mLabRepo');

var allJobes = [];

router.get('/',function(req,res){        

    dbRepo.findAll(function(err,docs){
        if(err) {
            res.send(err);
        }else {
            res.send(docs);            
        }
    })
});

router.post('/parseAll',function(req,res){
    var url = settings.Jobs[0].url;
        
    htmlParser.parse(url,function(antsHtml){
        dbRepo.findAll(function(err,docsInDb){
            if(err) logger.log(err);
            else {              
                careerCenterConverter.getAllJobLinks(antsHtml,function(antsArr){      
                    var savedAnts = '';
                    antsArr.forEach(function(ant) {                    
                            var data = docsInDb.find( function( ele ) { 
                                // console.log(ele.path);
                                // console.log(ant.path);
                                return ele.path === ant.path;
                            });                    
                            if( data ) logger.log('Announcement with path :" ' +ant.path + '" is already in DB' );                    
                            else {
                                dbRepo.insert(ant,function(err,saved){
                                    if(err) logger.log(err);
                                    else savedAnts+=saved.path + '\n';
                                });
                            }
                    }, this);//forEach                            

                    res.send(savedAnts);
                }); // careerCenterConverter.getAllJobLinks   
            }
        });
        
    
    }); //htmlParser.parse  
    
});


router.post('/',function(req,res){
    var rdmInt = Math.floor(Math.random()*100)
    dbRepo.insert({link:'link'+rdmInt,source:'somesource.am',isCompleted:false},function(err,saved){
        if(err) res.send(err);
        else res.send(saved);
    });
});

module.exports = router;
