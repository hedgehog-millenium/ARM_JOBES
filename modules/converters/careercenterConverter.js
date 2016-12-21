var jsdom = require("jsdom");

module.exports = {
	getAllJobLinks:function(htmlString){
			return new Promise(function(resolve,reject){
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
														isCompleted:false
												});
								});//each		
								resolve(linksArray);
						}// function (err, window)
				);//jsdom.env
		});//Promise
	}//getAllJobLinks:function
	
};