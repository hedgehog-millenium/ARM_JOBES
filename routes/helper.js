var express = require('express');
var request = require('request');
var bodyParser = require('body-parser')
var hma = require('hma-proxy-scraper');
var fs = require('fs');
var settings = require('../settings');

var router = express.Router();


router.post('/',bodyParser.json(),function(req,res){        

        var proxyIP = req.body.proxy,
            proxyPort = req.body.port,
            proxy = 'http://' + proxyIP + ':' + proxyPort;

       var promise = new Promise(function(resolve,reject){

       });     
              

        hma.getProxies(function (err,proxies) {
            if(err)
                throw err;


            var rndInt = Math.floor(Math.random()*100),
                filename = 'testedProxies' + rndInt + '.txt',
                testedProxylist = '',                                     
                promiseArr = [];
                
            for (key in proxies) {
               promiseArr.push(checkProxy(key,proxies[key]))
            }

            Promise.all(promiseArr).then(function(values){
                // values.forEach(function(item, i, arr){
                //     testedProxylist += item + '\n';
                //     console.log(item, i, arr);
                // });
                res.send(values);

                // fs.writeFile(settings.ROOT_DIR +'\\tmp\\'+filename,testedProxylist,function(err){
                //     if(err) console.log(err);
                //     else console.log("The file was saved!");
                //     res.send('done');
                // });

            });                             
        });                     	
});

router.post('/useProxy,',function(req,res){
        // var url = 'https://api.ipify.org?format=json';
        var url = 'http://www.redit.com';
        //Request with proxy
		request({
                    'url':url,
                    'proxy':'http://46.101.3.43:8118/'
                }, function (err, resp, body) {
				if (!err) 
						res.send(body);				
                else
                    res.send(err);
		});
});

function checkProxy(proxy,port){
    var promise = new Promise(function(resolve,reject){
        var proxyFull ='http://'+ proxy+':'+ port;    
        request(proxyFull,function(err,resp,body){
            if(!err){
                resolve('yaaaa ba aexav aziz jan?' + '\n')
            }else {
                reject('not working proxy')
            }                                                              
        });
    }); 
    return promise;   
}

module.exports = router;