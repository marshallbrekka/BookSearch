(function(lib){
	var view = lib.util.extendNamespace("view");
	/**
	 * scrollable list view
	 * @param {function} [options.clickCallback] callback to be called when an item is selected
	 * @param {string} options.emptyLabel text value of the empty label
	 * @param {domNode} [options.footer] jquery dom node that sits at the bottom of the list
	 * @param {boolean} [options.scroll = true] set scroll
	 * @property {boolean} _loading is true if this list item is waiting for new items to be inserted
	 */
	view.ListView = function(options) {
		var self = this;
		this._elements = [];
		this._selectedIndex = null;
		this._loading = false;
		this._clickCallback = options.clickCallback;
		this._footer = options.footer;
		this._scrollBar = null;
		
		this._container = lib.dom.create({
			tag : 'div',
			options : {domClass : lib.constants.css.list},
			jquery : true
		});
		
		this._list = lib.dom.create({
			tag : 'ul',
			jquery : true
		});
		

		this._emptyIndicator = lib.dom.create({
			tag : 'li',
			options : {domClass : lib.constants.css.emptyIndicator},
			text : options.emptyLabel,
			jquery : true
		});
		this._list.append(this._emptyIndicator);
		this._container.append(this._list);
		
		if(this._footer) {
			this._list.append(this._footer);
			this._hideFooter();
		} 



		lib.dom.onClick(this._list, "li", function(event){
			var index = $(this).index();
			self._listItemClick(index);
		});
		
		
		if(options.scroll || lib.util.empty(options.scroll)) {
			this._scrollBar = new view.ScrollBar(this._container);
			
		}

	}
	
	
	view.ListView.prototype.init = function() {
		if(this._scrollBar) this._scrollBar.init();
		
	}
	
	view.ListView.prototype.redraw = function() {
		if(this._scrollBar) this._scrollBar.redraw();
	}

	/**
	 * returns the number of elements in the list, excluding footer.
	 */
	view.ListView.prototype.size = function() {
		return this._elements.length;
	}

	/**
	 * adds books to list
	 * @param {view.ListItem[]} elements an array of ListItems
	 * 
	 */
	view.ListView.prototype.addElements = function(elements) {
		// switch/remove loading indicators and buttons depending on states

		if(this._elements.length === 0) {
			if(this._loading) {
				this.setLoading(false);
			}

			if(elements.length !== 0) {
				this._hideEmptyIndicator();
				this._showFooter();
				
			}
		}

		for (var node in elements) {

			this._elements.push(elements[node]);
			this._emptyIndicator.before(elements[node].getDomNode());
		}
		if(this._scrollBar) this._scrollBar.redraw();
	}

	view.ListView.prototype.clearElements = function() {
		this._elements = [];
		this._selectedIndex = null;
		if(this._footer) {
			this._list.children().slice(0, -2).remove();
		} else {
			this._list.children().slice(0, -1).remove();
		}

		this._hideFooter();
		this._showEmptyIndicator();
		if(this._scrollBar) this._scrollBar.redraw();
		

	}

	view.ListView.prototype.setLoading = function(isLoading) {
		this._loading = isLoading;
		var func;
		if(isLoading) {
			func = lib.dom.addClass;
		} else {
			func = lib.dom.removeClass;
		}
		func(this._container, lib.constants.css.loading);
 
	}

	view.ListView.prototype._showFooter = function() {
		if(this._footer) this._footer.css('display','block');
	}

	view.ListView.prototype._hideFooter = function() {
		if(this._footer) this._footer.css('display','none');
	}
	
	view.ListView.prototype._showEmptyIndicator = function() {
		this._emptyIndicator.css('display','block');
	}
	
	view.ListView.prototype._hideEmptyIndicator = function() {
		this._emptyIndicator.css('display','none');
	}

	view.ListView.prototype._listItemClick = function(index) {
		console.log(index);
		var numElements = this._elements.length
		if (numElements === 0 || index >= numElements) return;


		if(this._selectedIndex != null) {
			this._elements[this._selectedIndex].deselect();
		} 
		this._selectedIndex = index;
		this._elements[index].select();
		this._clickCallback(index);
	}
	
	lib.util.extend(view.ListView, view.View);
})(JSBookSearch);



