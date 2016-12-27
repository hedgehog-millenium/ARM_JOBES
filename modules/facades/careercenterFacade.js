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
    handleAlljobs:handleAlljobs
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


//STEPS 
//Step 1: get all job links from db
//Step 2: Filter all jobs that not parsed 'isParsed:false'
//Step 3: Check if parsed file exists - >
//     3.1 update db and return iteration if exsist
//Step 4: Parse all unparsed announcements
//Step 5: Seve all parsed announcements to files
//Step 6: Update DB , set 'parseInfo.isCompleted:true'
 function handleAlljobs(){
    return new Promise((resolve,reject)=>{
        var parsePromises = [],
            fileCheckPromises = [],
            resObjArr = [];

        dbRepo.findAll().then(allJobs =>{
           
           allJobs.filter(x=>!x.parseInfo.isCompleted).forEach(job=>{        
               var pathToSave = path.join(settings.Jobs[0].parsedFilePath,job.parseInfo.filePath);                                     
               fileCheckPromises.push(handleIfFileExist(pathToSave,job));                    
           }); // allJobs.filter(x=>!x.isParsed).forEach(job=>{

           Promise.all(fileCheckPromises).then(fileExstResults=>{
               return new Promise((resolve,reject)=>{                              
                    fileExstResults.map(fileExstRes=>{
                        var job = fileExstRes.data;
                        if(fileExstRes.exist){                                                        
                                resObjArr.push({object:job,status:'warning'});                                
                        }else{ //if(fileExstRes.exist){
                                parsePromises.push(
                                    reflect(
                                        new Promise((resolve,reject)=>{
                                                htmlParser.parse(job.path)
                                                .then(parsedHtml=>{
                                                    var pathToSave = path.join(settings.Jobs[0].parsedFilePath,job.parseInfo.filePath);                              
                                                    job.parseInfo.status.parsingStatus = 'the html page just parsed';
                                                    return txtFile.createFile(pathToSave,parsedHtml);                           
                                                })
                                                .then(fileSaveStatus=>{
                                                    job.parseInfo.status.parsedFile = fileSaveStatus;
                                                    job.parseInfo.isCompleted = true;                
                                                    job.parseInfo.status.time = new Date().toLocaleString();
                                                    return dbRepo.updateById(job._id,job)
                                                })
                                                .then(j=>{   
                                                    job.parseInfo.status.comment = '"isParsed" status of announcement was changed to completed';                         
                                                    resolve(job);
                                                })
                                                .catch(e=>{reject(e)});
                                        }) // new Promise((resolve,reject)                   
                                    ) //reflect
                                )// parsePromises.push
                        }//if(fileExstRes.exist){
                    });//fileExstResults.map(fileExstRes=>{
                    resolve(parsePromises);       
               });// return new Promise((resolve,reject)=>{        
           }).then(prms=>{
                    Promise.all(parsePromises).then(vals=>{
                    vals.map(val=>{
                        if(val.status == "resolved")
                                resObjArr.push({object:val.value,status:'parsed'});
                        else
                                resObjArr.push({object:val.error,status:'error'});                    
                    });//  vals.map(val=>{
                    
                    resolve(resObjArr);
               });//Promise.all(parsePromises).then(vals=>{
           })
           
        });// dbRepo.findAll().then(allJobs =>{
    });//  return new Promise    
}

function handleIfFileExist(filePath,job){
    return new Promise((resolve,reject)=>{
        if(txtFile.checkIfFileExist(filePath)){                                  
            job.parseInfo.isCompleted = true;   
            job.parseInfo.status.fileAlreadyExists=true;
            job.parseInfo.status.comment = 'parseInfo.isCompleted status of announcement was changed to completed';
            job.parseInfo.status.time = new Date().toLocaleString();

            dbRepo.updateById(job._id,job).then(j=>{                               
                resolve({exist:true,data:job});                                                                                     
            });            
        }else{ // if(txtFile.checkIfFileExist(filePath)){                                  
             resolve({exist:false,data:job})
        }
    });//return new Promise((resolve,reject)=>{
     
}

function reflect(promise){
    return promise.then(function(v){ return {value:v, status: "resolved" }},
                        function(e){ return {error:e , status:"rejected"}});
}