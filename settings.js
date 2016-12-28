module.exports = {
    ROOT_DIR:__dirname,
    DbConnectionString:'mongodb://samvelNodejs:samvelNodejs@ds145158.mlab.com:45158/armjobs',
    DbCollections:['jobsmetadata','jobs'],
    Jobs:[
        {
            name:'careercenter',
            url:'http://careercenter.am/ccidxann.php#JO',
            parsedFilePath:__dirname+'/parsed_jobes/career_center'
        }
    ]
}