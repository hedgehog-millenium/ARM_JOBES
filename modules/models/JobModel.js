var JobModel = function(originalObject,title,location,duration,description,responsibilities,qualifications,salary,startDate,endDate){    
    this.title = title;
    this.location =location ;
    this.duration = duration;
    this.description = description;
    this.responsibilities = responsibilities;
    this.qualifications = qualifications;
    this.salary = salary;    
    this.startDate = startDate;    
    this.endDate = endDate;    
    this.originalObject =originalObject
}

module.exports = JobModel