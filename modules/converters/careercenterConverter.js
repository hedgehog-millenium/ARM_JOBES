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
											path:'http://careercenter.am/index.php?/' + val.getAttribute('href'),
											source:'careercenter.am',
											parsedFile:val.getAttribute('href').match(/\d+/)[0]+'.txt',
											isParsed:false,
											isConverted:false,
									});//linksArray.push
								});//each		
								resolve(linksArray);
						}// function (err, window)
				);//jsdom.env
		});//Promise
	}//getAllJobLinks:function
	
};