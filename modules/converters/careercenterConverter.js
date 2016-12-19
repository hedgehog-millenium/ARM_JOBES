var jsdom = require("jsdom");

module.exports = {
	getAllJobLinks:function(htmlString,callback){
		jsdom.env(
		  htmlString,
		  ["http://code.jquery.com/jquery.js"],
		  function (err, window) {		  	
			var linksArray = [];
		  	window.$("a[href^='ccdspann.php?id=']").each(function(key,val){
		  		linksArray.push({
		  							name:val.text,
		  							path:val.getAttribute('href')
		  					});
		  	});		
			callback(linksArray);
		  }
		);
	}
	
};