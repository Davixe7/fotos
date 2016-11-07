module.exports = function(img, req, res){
	
	if(img.author._id.toString() == res.locals.user._id){
		return true;
	}
	
	if(req.method == "GET" && req.path.indexOf("edit") < 0){
		return true;
	}
	
	return false;
}