var jsdom = require("jsdom"),
	jobModel = require('../../modules/models/jobModel'),
	dateFormat = require('dateformat');    

module.exports = {
	getAllJobLinks:getAllJobLinks,
	converToJobModel:converToJobModel	
};

function getAllJobLinks(htmlString){
		return new Promise(function(resolve,reject){
			jsdom.env(
					htmlString,
					["http://code.jquery.com/jquery.js"],
					function (err, window) {		  	
							var linksArray = [];
							window.$("table:first a[href^='ccdspann.php?id=']").each(function(key,val){
								linksArray.push({
										name:val.text,
										path:'http://careercenter.am/' + val.getAttribute('href'),
										source:'careercenter',
										regTime:new Date().toLocaleString(),
										parseInfo:{
											filePath:val.getAttribute('href').match(/\d+/)[0]+'.txt',	
											isCompleted:false,
											status:{}
										},																						
										isConverted:false,
								});//linksArray.push
							});//each		
							resolve(linksArray);
					}// function (err, window)
			);//jsdom.env
	});//Promise
}//function  getAllJobLinks(htmlString){

function converToJobModel(htmlString){
	return new Promise((resolve,reject)=>{
		 jsdom.env(
                htmlString,
                ["http://code.jquery.com/jquery.js"],
                function (err, window) {		  	
                        var $ = window.$,
                            pObj ={};
                        window.$("body>p").each(function(){
                            var paragraphVals = $(this).text().split(':');
								if(paragraphVals.length>1){
									var key =  paragraphVals[0].trim(),
									val = paragraphVals[1]?paragraphVals[1].trim():undefined;   
									pObj[key] = val;         
								}
                                                                                                                                                    
                        });//each	

						var strDate ,endDate ;
						try {strDate = dateFormat(pObj['OPENING DATE'],"dd-mm-yyyy")} catch (error) {}
						try {endDate = dateFormat(pObj['APPLICATION DEADLINE'],"dd-mm-yyyy")} catch (error) {}
                        var jModel = new jobModel(
                                pObj,
                                pObj["TITLE"],
                                pObj["LOCATION"],
                                pObj["DURATION"],
                                pObj["JOB DESCRIPTION"],
                                pObj["JOB RESPONSIBILITIES"]?pObj["JOB RESPONSIBILITIES"].substring(1, pObj["JOB RESPONSIBILITIES"].length).split('\n-').map(j=>j.slice(0,-1)):undefined,
                                pObj["REQUIRED QUALIFICATIONS"]?pObj["REQUIRED QUALIFICATIONS"].substring(1, pObj["REQUIRED QUALIFICATIONS"].length).split('\n-').map(j=>j.slice(0,-1)):undefined,
                                pObj["REMUNERATION/ SALARY"],
                                strDate,
								endDate
                                                               
                        );                        
                        resolve(jModel)
                    }// function (err, window)
            );//jsdom.env 
    });//return new Promise((resole,reject)=>{	
}//function converToJobModel(htmlString){



