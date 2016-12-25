var express = require('express'),
    txtFile = require('../modules/txtFile'),
    settings = require('../settings'),
    parser = require('../modules/parser'),
    path = require('path'),
    jsdom = require("jsdom"),
    router = express.Router();

router.get('/',function(req,res){
    var name = 'ccjobshtml.txt',
        fullpath = path.join(settings.ROOT_DIR,'tmp',name) ;
        
    txtFile.readFile(fullpath).then(htmlString=>{
        var linksArray = [];
        jsdom.env(
                htmlString,
                ["http://code.jquery.com/jquery.js"],
                function (err, window) {		  	
                        var linksArray = [];
                        window.$("a[href^='ccdspann.php?id=']").each(function(key,val){
                            linksArray.push({
                                                name:val.text,
                                                path:val.getAttribute('href'),
                                                source:'careercenter.am',
                                                parsedFile:val.getAttribute('href').match(/\d+/)[0],
                                                isParsed:false,
                                                isConverted:false,
                                        });
                        });//each		
                        res.send(linksArray)
                    }// function (err, window)
            );//jsdom.env 
    })

});

module.exports = router;