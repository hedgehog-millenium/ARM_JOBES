var express = require('express'),
    router = express.Router(),
    dbRepo = require('../modules/DB/mLabRepo'),    
    careercenterFacade = require('../modules/facades/careercenterFacade');

    dbRepo.init('jobsmetadata');
    
router.get('/',function(req,res){        

    dbRepo.findAll().then(function(docs){
        res.send(docs);
    }).catch(function(err){
         res.send(err);
    });
});

router.post('/parseAllLinks',function(req,res){
    careercenterFacade.registerAllLinks().then(jsonResult=>{
        res.send(jsonResult);
    }).catch(err=>{res.send(err);})
});//router.post('/parseAll',function(req,res)

router.post('/parseAllJobs',function(req,res){
    careercenterFacade.handleAlljobs().then(jobs=>{
        res.send(jobs);
    });
});//router.post('parseAllJobes',function(req,res){

module.exports = router;
