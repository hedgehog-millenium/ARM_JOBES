var express = require('express'),
    router = express.Router(),
    dbRepo = require('../modules/DB/mLabRepo'),    
    careercenterFacade = require('../modules/facades/careercenterFacade');

router.get('/',function(req,res){        

    dbRepo.findAll().then(function(docs){
        res.send(docs);
    }).catch(function(err){
         res.send(err);
    });
});

router.post('/parseAll',function(req,res){
    careercenterFacade.registerAllLinks().then(jsonResult=>{
        res.send(jsonResult);
    }).catch(err=>{res.send(err);})
});//router.post('/parseAll',function(req,res)



router.post('/',function(req,res){
    var rndInt = Math.floor(Math.random()*100)
    dbRepo.insert({link:'link'+rndInt,source:'somesource.am',isCompleted:false},function(err,saved){
        if(err) res.send(err);
        else res.send(saved);
    });
});

module.exports = router;
