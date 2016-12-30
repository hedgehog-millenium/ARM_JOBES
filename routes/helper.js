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

router.get('/conv',(req,res)=>{
     var path = 'C:\\Users\\Samvel.Kocharyan\\Desktop\\MY_OWN_ENVIRONMENT\\ARM_JOBES\\tmp\\ccjobshtml.txt';
     txtFile.readFile(path).then(htmlString=>{
        jsdom.env(
					htmlString,
					["http://code.jquery.com/jquery.js"],
					function (err, window) {		  	
							var linksArray = [];
							window.$("table:first a[href^='ccdspann.php?id=']").each(function(key,val){
								linksArray.push({
										name:val.text,
										path:'http://careercenter.am/' + val.getAttribute('href'),
										source:'careercenter',
										regTime:new Date().toLocaleString(),
										parseInfo:{
											filePath:val.getAttribute('href').match(/\d+/)[0]+'.txt',	
											isCompleted:false,
											status:{}
										},																						
										isConverted:false,
								});//linksArray.push
							});//each		
							res.send(linksArray);
					}// function (err, window)
			);//jsdom.env
     });     
});

module.exports = router;