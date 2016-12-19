var express = require('express');
var path = require('path');
var router = express.Router();

var settings = require('../settings');
var htmlParser = require(path.join(settings.ROOT_DIR,'modules','parser'))
var careerCenterConverter = require(path.join(settings.ROOT_DIR,'modules','converters','careercenterConverter'));

router.get('/',function(req,res){
    var url = settings.Jobs[0].url;
    
    htmlParser.parse(url,function(antsHtml){
        careerCenterConverter.getAllJobLinks(antsHtml,function(antsArr){
            res.send(antsArr);
        });
        
    });    
});

module.exports = router;
