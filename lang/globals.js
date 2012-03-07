(function(lib) {
	var util = lib.util;

	/**
	 * extends the provided child from the supertype
	 * @param {function} child the function to extend
	 * @param {function} supertype the function to extend from
	 */
	util.extend = function(child, supertype)
	{
	  child.prototype.__proto__ = supertype.prototype;
	}

	/**
	 * checks if the value is empty or not
	 * @param {object|number|string|function| val the value to check
	 */
	util.empty = function(val) {
		return (val === undefined || val === null || val == "");
	}

	/**
	 * returns a function that binds the object as "this" to the provided function
	 * @param {object} obj the object to use
	 * @param {function} fn the function to bind obj to
	 */
	util.bind = function(obj, fn) {
		return function() {
			return fn.apply(obj, arguments);
		}
	}

})(JSBookSearch);


