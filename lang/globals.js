
function extend(child, supertype)
{
  child.prototype.__proto__ = supertype.prototype;
}

function empty(val) {
	return (val === undefined || val === null || val == "");
}

function bind(obj, fn) {
	return function() {
		return fn.apply(obj, arguments);
	}
}

