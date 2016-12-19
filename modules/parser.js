var request = require('request');
var logger = require('./logger')

module.exports = {
	parse:function(url,callback){
	
		//Request with proxy
		// request({'url':'https://anysite.you.want/sub/sub',
		// 				'proxy':'http://yourproxy:8087'}, function (error, response, body) {
		// 		if (!error && response.statusCode == 200) {
		// 				console.log(body);
		// 		}
		// })

		request(url, function (error, response, body) {
		  if (!error && response.statusCode == 200) {	
			 callback(body);
		  }
		  else{
			  logger.log('Error on getting data from ' + url );
			  logger.log(error);
		  }
		});

		
	}
};