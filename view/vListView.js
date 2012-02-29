
/**
 * clickCallback callback to be called when an item is selected
 * emptyLabel text value of the empty label
 * footer jquery dom node that sits at the bottom of the list
 */
var vListView = function(clickCallback, emptyLabel, footer) {
	var self = this;
	this._clickCallback = clickCallback;
	this.container = DOM.create({
		tag : 'ul',
		options : {domClass : mConstants.css.list},
		jquery : true
	});
	this._footer = footer;
	
	this._hideFooter();

	this._elements = [];
	this._selectedIndex = null;
	this._loading = false;
	 
	
	this._emptyIndicator = DOM.create({
		tag : 'li',
		options : {domClass : mConstants.css.emptyIndicator},
		text : emptyLabel,
		jquery : true
	});
	
	this.container.append(this._emptyIndicator);
	if(this._footer) this.container.append(this._footer);
	
	
	
	DOM.onClick(this.container, "li", function(event){
		var index = $(this).index();
		self._listItemClick(index);
	});
	
}

/**
 * adds books to list
 * @param {domNodes[]} elements an array of domNodes
 * 
 */
vListView.prototype.addElements = function(elements) {
	// switch/remove loading indicators and buttons depending on states
	
	if(this._elements.length === 0) {
		if(this._loading) {
			DOM.removeClass(this._emptyIndicator, mConstants.css.loadingIndicator);
		}
		
		if(elements.length !== 0) {
			this._emptyIndicator.remove();
		}
	}

	this._loading = false;

	
	for (var node in elements) {
		
		this._elements.push(node);
		if(this._footer) {
			this._footer.before(node.container);
		} else {
			this.container.append(node.container);
		}
		
	}
}

vListView.prototype.clearElements = function() {
	this._elements = [];
	this._selectedIndex = null;
	this.container.children().remove();
	this.container.append(this._emptyIndicator);
	this.hideFooter();
	if(this._footer) this.container.append(this._footer);
}

vListView.prototype.setLoading = function() {
	this._loading = true;
	if(this._elements.length === 0) {
		DOM.addClass(this._emptyIndicator, mConstants.css.loadingIndicator);
	} 
}

vListView.prototype.showFooter = function() {
	if(this._footer) this._footer.css('display','block');
}

vListView.prototype.hideFooter = function() {
	if(this._footer) this._footer.css('display','none');
}

vListView.prototype._listItemClick = function(index) {
	var numElements = this._elements.length
	if (numElements === 0 || numElements === index) return;
	
		
	if(this._selectedIndex != null) {
		this._elements[this._selectedIndex].deselect();
	} 
	this._selectedIndex = index;
	this._elements[index].select();
	this._clickCallback(index);
}




