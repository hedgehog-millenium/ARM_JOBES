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

    dbRepo.findAll().then(function(docs){
        res.send(docs);
    }).catch(function(err){
         res.send(err);
    });
});

router.post('/parseAll',function(req,res){
    var url = settings.Jobs[0].url,
        newAntsArr=[],        
        savedAnts = '';

    htmlParser.parse(url)
        .then(function(antsHtml){
            return careerCenterConverter.getAllJobLinks(antsHtml);
        })
        .then(function(antsArr){
            this.newAntsArr = antsArr;            
            return dbRepo.findAll();            
        })
        .then(function(docsInDb){       
            this.newAntsArr.forEach(function(ant) {                                                        
                var newDoc = docsInDb.find( function( ele ) { return ele.path === ant.path;});                    
                if( newDoc ) {console.log('Announcement with path :" ' +ant.path + '" is already in DB' );}
                else {
                    /// SOME INCORRECT WORK HERE
                    var promisies = [];
                    
                    promisies.push(dbRepo.insert(newDoc));                                        

                    Promise.all(promisies).then(function(vals){
                        console.log(vals);
                        vals.forEach(val=>{
                                this.savedAnts += val + '\n';
                        })
                        res.send(this.savedAnts)           
                    })                    
                }                               
            }); 

            
        });
        
            

    // htmlParser.parse(url,function(antsHtml){
    //     dbRepo.findAll(function(err,docsInDb){
    //         if(err) logger.log(err);
    //         else {              
    //             careerCenterConverter.getAllJobLinks(antsHtml,function(antsArr){      
    //                 var savedAnts = '';
    //                 antsArr.forEach(function(ant) {                    
    //                         var data = docsInDb.find( function( ele ) { 
    //                             // console.log(ele.path);
    //                             // console.log(ant.path);
    //                             return ele.path === ant.path;
    //                         });                    
    //                         if( data ) logger.log('Announcement with path :" ' +ant.path + '" is already in DB' );                    
    //                         else {
    //                             dbRepo.insert(ant,function(err,saved){
    //                                 if(err) logger.log(err);
    //                                 else savedAnts+=saved.path + '\n';
    //                             });
    //                         }
    //                 }, this);//forEach                            

    //                 res.send(savedAnts);
    //             }); // careerCenterConverter.getAllJobLinks   
    //         }
    //     });
        
    
    // }); //htmlParser.parse  
    
});


router.post('/',function(req,res){
    var rdmInt = Math.floor(Math.random()*100)
    dbRepo.insert({link:'link'+rdmInt,source:'somesource.am',isCompleted:false},function(err,saved){
        if(err) res.send(err);
        else res.send(saved);
    });
});

module.exports = router;
