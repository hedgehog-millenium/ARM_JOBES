var express = require('express');
var path = require('path');
var router = express.Router();

var settings = require('../settings');
var htmlParser = require(path.join(settings.ROOT_DIR,'modules','parser'))

router.get('/',function(req,res){
    htmlParser();
    res.send('parser is ready');
});

module.exports = router;
