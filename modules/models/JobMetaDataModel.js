
var JobMetaDataModel = function(name,path,source,regTime,parseInfo,isConverted){
    this.name=name;
    this.path=path;
    this.source=source;
    this.regTime=regTime;
    this.parseInfo=parseInfo;            
    this.isConverted=isConverted;            
}

module.exports = JobMetaDataModel