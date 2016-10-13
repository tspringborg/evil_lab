(function (global) {
	var name = "utils"
	var api = {}


	api.reflection = function(obj,maxDepth, depth){
		maxDepth = maxDepth || 3
		depth = depth || 0
		var indent = Array(depth).join("	")
		var str = indent+""
		for(var key in obj){
			console.log(key,obj[key])
			if depth<maxDepth{

				str+=api.reflection(obj[key], maxDepth, depth--)
			}
			str+=indent+key+" : "+depth>0 ? api.reflection(obj[key], depth--) : obj[key]
			str+="\n"
		}
		return str
	}



	// AMD support
    if (typeof define === 'function' && define.amd) {
        define(function () { return api; });
    // CommonJS and Node.js module support.
    } else if (typeof exports !== 'undefined') {
        // Support Node.js specific `module.exports` (which can be a function)
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = api;
        }
        // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        exports[name] = api;
    } else {
        global[name] = api;
    }

    //testing stuff
	console.log(api.reflection({"asd":"asd"}))
	//end testing

})(this)


