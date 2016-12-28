var reflect = function(promise){
    return promise.then(function(v){ return {value:v, status: "resolved" }},
                        function(e){ return {error:e , status:"rejected"}});
}

module.exports = reflect;