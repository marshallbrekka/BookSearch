(function(lib){
	var view = lib.util.extendNamespace("view");
	/**
	 * scrollable list view
	 * @param {function} [options.clickCallback] callback to be called when an item is selected
	 * @param {string} options.emptyLabel text value of the empty label
	 * @param {domNode} [options.footer] jquery dom node that sits at the bottom of the list
	 */
	view.ListView = function(options) {
		var self = this;
		this._elements = [];
		this._selectedIndex = null;
		this._loading = false;
		this._clickCallback = options.clickCallback;
		this._footer = options.footer;
		
		this.container = lib.dom.create({
			tag : 'ul',
			options : {domClass : lib.constants.css.list},
			jquery : true
		});
		

		this._emptyIndicator = lib.dom.create({
			tag : 'li',
			options : {domClass : lib.constants.css.emptyIndicator},
			text : options.emptyLabel,
			jquery : true
		});

		this.container.append(this._emptyIndicator);
		
		if(this._footer) {
			this.container.append(this._footer);
			this._hideFooter();
		} 



		lib.dom.onClick(this.container, "li", function(event){
			var index = $(this).index();
			self._listItemClick(index);
		});

	}

	/**
	 * returns the number of elements in the list, excluding footer.
	 */
	view.ListView.prototype.size = function() {
		return this._elements.length;
	}

	/**
	 * adds books to list
	 * @param {domNodes[]} elements an array of domNodes
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
			this._emptyIndicator.before(elements[node].container);
		}
	}

	view.ListView.prototype.clearElements = function() {
		this._elements = [];
		this._selectedIndex = null;
		if(this._footer) {
			this.container.children().slice(0, -2).remove();
		} else {
			this.container.children().slice(0, -1).remove();
		}

		this._hideFooter();
		this._showEmptyIndicator();
		

	}

	view.ListView.prototype.setLoading = function(isLoading) {
		this._loading = isLoading;
		var func;
		if(isLoading) {
			func = lib.dom.addClass;
		} else {
			func = lib.dom.removeClass;
		}
		func(this.container, lib.constants.css.loading);
 
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
		var numElements = this._elements.length
		if (numElements === 0 || index >= numElements) return;


		if(this._selectedIndex != null) {
			this._elements[this._selectedIndex].deselect();
		} 
		this._selectedIndex = index;
		this._elements[index].select();
		this._clickCallback(index);
	}
})(JSBookSearch);



