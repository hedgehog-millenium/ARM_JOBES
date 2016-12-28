var express = require('express'),
    txtFile = require('../modules/txtFile'),
    settings = require('../settings'),
    parser = require('../modules/parser'),
    path = require('path'),
    jsdom = require('jsdom'),
    router = express.Router();
    jobModel = require('../modules/models/jobModel'),
    converter =  require('../modules/converters/careercenterConverter'),
    dateFormat = require('dateformat'),
    dbRepo = require('../modules/DB/mLabRepo');   


router.get('/',function(req,res){
    dbRepo.init('jobs');
    dbRepo.findAll().then(j=>{
        res.send(j);
    })
});

router.get('/check',(req,res)=>{
    var path = 'C:\\Users\\Samvel.Kocharyan\\Desktop\\MY_OWN_ENVIRONMENT\\ARM_JOBES\\parsed_jobes\\career_center\\25324.txt'
    res.send(txtFile.checkIfFileExist(path));
});

module.exports = router;