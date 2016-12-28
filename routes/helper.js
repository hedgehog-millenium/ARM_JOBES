var express = require('express'),
    txtFile = require('../modules/txtFile'),
    settings = require('../settings'),
    parser = require('../modules/parser'),
    path = require('path'),
    jsdom = require('jsdom'),
    router = express.Router();
    jobModel = require('../modules/models/jobModel'),
    converter =  require('../modules/converters/careercenterConverter'),
    dateFormat = require('dateformat');    

router.get('/oop',(req,res)=>{
    var qualifics = [
        'quali1',
        'quali2',
        'quali3',
        'quali4',
        'quali5'        
    ]
    var job = new jobModel('title','location','duration','description','responsibilities',qualifics,'salary','startDate','EndDate');
    res.send(job);
});

router.get('/',function(req,res){
    var name = '27090.txt',
        fullpath = path.join(settings.ROOT_DIR,'tmp',name) ;
        
    txtFile.readFile(fullpath).then(htmlString=>{        
        converter.converToJobModel(htmlString).then(m=>{
            res.send(m);
        })
    });

});

router.get('/check',(req,res)=>{
    var path = 'C:\\Users\\Samvel.Kocharyan\\Desktop\\MY_OWN_ENVIRONMENT\\ARM_JOBES\\parsed_jobes\\career_center\\25324.txt'
    res.send(txtFile.checkIfFileExist(path));
});

module.exports = router;