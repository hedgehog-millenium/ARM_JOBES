var fs = require('fs')
var logger = require('./logger')

module.exports = {
	createFile:function(savePath,text,callback){
		fs.writeFile(savePath, text, function(err) {
		    if(err) {
		        return  logger.writeLog(err);
		    }

    		callback("The file with name "+savePath +" was successfuly saved!");    		
		}); 		
	},
	readFile:function(filePath,callback){
		fs.readFile(filePath, 'utf8', function(err, contents) {
		    if(err){
		    	logger.log(err);		    	
		    }else {
		    	callback(contents);
		    }
		});		
	}

};
