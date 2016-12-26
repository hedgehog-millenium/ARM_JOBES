var path = require('path'),
    settings = require('../../settings'),
    logger = require('../logger'),
    htmlParser = require(path.join(settings.ROOT_DIR,'modules','parser')),
    careerCenterConverter = require(path.join(settings.ROOT_DIR,'modules','converters','careercenterConverter')),
    dbRepo = require('../DB/mLabRepo'),    
    txtFile = require(path.join(settings.ROOT_DIR,'modules','txtFile')),
    handleErr = function(e){logger.log(e)};

    dbRepo.init('jobsmetadata');

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
                        else antsStatus.push({announcement:v.error,status:'Could not Inser To DB'});
                    });
                    resolve(antsStatus);                               
                }).catch(handleErr);                    
            }).catch((e)=>reject(e));// .then(function(docsInDb)   
    });
   
}//function registerAllLinks()

function handleAlljobes(){
    return new Promise((resolve,reject)=>{
        var parsePromises = [],
            jobesHandlingResult = [];

        dbRepo.findAll().then(allJobs =>{

           allJobs.filter(x=>!x.isParsed).forEach(job=>{
               var pathToSave = path.join(settings.Jobs[0].parsedFilePath,job.parsedFile);  

               //if file alrady exist return iteration
               if(txtFile.checkIfFileExist(pathToSave)){
                    jobesHandlingResult.push({text:'file with name:' + pathToSave  + ' already exists',status:'already parsed'});
                    job.isParsed = true;
                    return ;
               }

               parsePromises.push(
                   new Promise((resolve,reject)=>{
                       htmlParser.parse(job.path)
                       .then(parsedHtml=>{
                           return txtFile.createFile(pathToSave,parsedHtml);                           
                       })
                       .then(fileSaveStatus=>{
                           job.isParsed = true;
                           dbRepo.updateById(job._id,job).then(j=>{
                                resolve(fileSaveStatus);
                           }).;                           
                        }).catch(e=>{reject(e)});
                   })//new Promise((resolve,reject)                   
               ); // parsePromises.push
           });//  allJobs.filter(x=>!x.isParsed).forEach(job=>{

           Promise.all(parsePromises).then(vals=>{
               vals.map(val=>{
                   if(val.status == "resolved")
                        jobesHandlingResult.push({text:val.v,status:'parsed'});
                   else
                        jobesHandlingResult.push({text:val.e,status:'error'});
                    
               });
           });

           resolve(jobesHandlingResult);

        });
    });//  return new Promise    
}

function reflect(promise){
    return promise.then(function(v){ return {value:v, status: "resolved" }},
                        function(e){ return {error:e , status:"rejected"}});
}