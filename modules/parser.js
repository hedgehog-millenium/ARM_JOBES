var jsdom = require("jsdom");
var settings = require('../settings')
    
var parse = function(){
        // Count all of the links from the io.js build page
        var url = settings.Jobs[0].url;
        var jsdom = require("jsdom");

        jsdom.env(
        url,
        ["http://code.jquery.com/jquery.js"],
        function (err, window) {
            console.log("there have been", window.$("a").length - 4, "io.js releases!");
            console.log(window)
        }
        );  
}

module.exports = parse;

