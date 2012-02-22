// abstract class
var mAPIObject = function(){};
mAPIObject.prototype.loadProperties = function(obj, props) {
	for(var name in props) {
		var val = obj[name];
		var newName = props[name] != null ? props[name] : name;
		
		if(val === '' || val === undefined) {
			this[newName] = null;
		} else {
			this[newName] = val;
		}
	}
}	
