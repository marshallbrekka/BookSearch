(function(lib){
	var view = lib.util.extendNamespace("view");
	/**
	 * creates the dom for a list item of a book
	 * @constructor
	 * @param {domNodes[]} [children=[]] array of dom nodes to append
	 * @param {boolean} [fadeRight=false] sets if the right edge should fade out
	 */
	view.ListItem = function(children, fadeRight) {
		if(!children) children = [];
		this._container = lib.dom.create({
			tag : 'li',
			options : {domClass: lib.constants.css.listItem},
			jquery : true,
			children : children
		});
		
		if(fadeRight) this._addFadingEdge();
	}

	
	view.ListItem.prototype._container = null;
	
	view.ListItem.prototype._addFadingEdge = function() {
		this.getDomNode().append(
			lib.dom.create({
				tag : 'div',
				options : {domClass : lib.constants.css.listItemFade}
			})
		);
	}

	view.ListItem.prototype.select = function() {
		lib.dom.addClass(this.getDomNode(), lib.constants.css.selected);
	}

	view.ListItem.prototype.deselect = function() {
		lib.dom.removeClass(this.getDomNode(),lib.constants.css.selected);
	}
	
	lib.util.extend(view.ListItem, view.View);
})(JSBookSearch);