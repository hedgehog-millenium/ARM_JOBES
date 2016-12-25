var path = require('path'),
    settings = require('../../settings'),
    logger = require('../logger'),
    htmlParser = require(path.join(settings.ROOT_DIR,'modules','parser')),
    careerCenterConverter = require(path.join(settings.ROOT_DIR,'modules','converters','careercenterConverter')),
    dbRepo = require('../DB/mLabRepo'),    
    handleErr = function(e){logger.log(e)};

module.exports = {
    registerAllLinks:registerAllLinks,
    handleAlljobes:handleAlljobes
}

function registerAllLinks(){

    return new Promise((resolve,reject)=>{
         var url = settings.Jobs[0].url,
            parsedAntsArr=[],        
            antsStatus = [];

        htmlParser.parse(url)
            .then(function(antsHtml){
                return careerCenterConverter.getAllJobLinks(antsHtml);
            })
            .then(function(antsArr){
                this.parsedAntsArr = antsArr;            
                return dbRepo.findAll();            
            })
            .then(function(docsInDb){                          
                var insrtPromises = [];
                            
                this.parsedAntsArr.forEach(function(ant) {                                                        
                    var isDocInDb = docsInDb.find( function( ele ) { return ele.path === ant.path;});                    
                    if( isDocInDb ) {antsStatus.push({announcement:ant.path,status:'already in DB'});}
                    else {insrtPromises.push( dbRepo.insert(ant));}                
                });// this.parsedAntsArr.forEach   

                Promise.all(insrtPromises.map(reflect)).then(vals=>{
                    vals.map(v=>{
                        if(v.status==='resolved') antsStatus.push({announcement:v.value.path,status:'Saved'});
                        else antsStatus.push({announcement:v.error,status:'Couldn Inser To DB'});
                    });
                    resolve(antsStatus);                               
                }).catch(handleErr);                    
            }).catch((e)=>reject(e));// .then(function(docsInDb)   
    });
   
}//function registerAllLinks()

function handleAlljobes(){

}

function reflect(promise){
    return promise.then(function(v){ return {value:v, status: "resolved" }},
                        function(e){ return {error:e , status:"rejected"}});
}