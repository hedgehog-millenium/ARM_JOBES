var fs = require('fs')

module.exports = {
	createFile:function(savePath,text){
		return new Promise((resolve,reject)=>{
			fs.writeFile(savePath, text,(err) => {
				if(err) reject(err)
				else resolve("File with name " + savePath + " was successfuly saved!")
			});
		}); 		
	},
	readFile:function(filePath){
		return new Promise((resolve,reject)=>{
			fs.readFile(filePath, 'utf8', function(err, contents) {
				if(err) reject(err);
				else resolve(contents);
			});		
		});
	},
	checkIfFileExist:function(filePath){
		return fs.existsSync(filePath)
	}

};
