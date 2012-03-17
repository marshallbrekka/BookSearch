(function(lib){
	var view = lib.util.extendNamespace("view");
	
	/**
	 * base class for all view classes 
	 * @class
	 * @property {domNode} _container the top level dom node for this view
	 */
	view.View = function() {};
	
	
	/**
	 * call when view object has been appended to a container
	 */
	view.View.prototype.init = function () {}
	
	
	/**
	 * call when dimmensions or visibility of container have changed
	 */
	view.View.prototype.redraw = function () {}
	
	view.View.prototype.getDomNode = function () {
		if(this._container) return this._container;
		return null;
	}

})(JSBookSearch);