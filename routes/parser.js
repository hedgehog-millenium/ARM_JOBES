var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    res.send('parser is ready');
});

module.exports = router;
