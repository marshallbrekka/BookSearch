var vListView = function(clickCallback, loadMoreCallback) {
	var self = this;
	this.container = DOM.create({
		tag : 'ul',
		options : {domClass : mConstants.css.list},
		jquery : true
	});
	
	this._loadMoreBtn = DOM.create({
		tag : 'li',
		options : {domClass : [mConstants.css.listItem, mConstants.css.listLoadMore]},
		text : 'Load More',
		jquery : true
	});
	this._hideLoadMoreBtn();

	this._elements = [];
	this._selectedIndex = null;
	this._loading = false;
	
	this._loadMoreBtn.click(function(event){
		if(!self._loading) return
		event.preventDefault();
		self.setLoading();
		loadMoreCallback();
		
	});
	
	this._emptyIndicator = DOM.create({
		tag : 'li',
		options : {domClass : mConstants.css.listEmptyIndicator},
		text : 'No Books Found',
		jquery : true
	});
	
	this.container.append(this._emptyIndicator);
	this.container.append(this._loadMoreBtn);
	
	
	this.container.on("click", "li", function(event){
		var index = $(this).index();
		if(self._selectedIndex != null) {
			self._elements[self._selectedIndex].deselect();
		} 
		self._selectedIndex = index;
		self._elements[index].select();
		clickCallback(index);
	});
	
}

/**
 * adds books to list
 * @param {mBook[]} elements an array of mBook objects
 * @param {bool} hasMore are there more elements that can be loaded
 */
vListView.prototype.addElements = function(elements, hasMore) {
	// switch/remove loading indicators and buttons depending on states
	
	if(this._elements.length === 0) {
		if(this._loading) {
			this._emptyIndicator.removeClass(mConstants.css.listLoadingIndicator);
		}
		
		if(elements.length !== 0) {
			this._emptyIndicator.remove();
			this._showLoadMoreBtn();
		}
	} else {
		if(!hasMore) {
			this._hideLoadMoreBtn();
		} 
		this._loadMoreBtn.removeClass(mConstants.css.listLoadingIndicator);
	}

	this._loading = false;

	var domNode;
	for (var i in elements) {
		domNode = new vListItem(elements[i]);
		this._elements.push(domNode);
		this._loadMoreBtn.before(domNode.container);
	}
}

vListView.prototype.clearElements = function() {
	this._elements = [];
	this._selectedIndex = null;
	this.container.children().remove();
	this.container.append(this._emptyIndicator);
	this._hideLoadMoreBtn();
	this.container.append(this._loadMoreBtn);
	
	
}

vListView.prototype.setLoading = function() {
	this._loading = true;
	if(this._elements.length === 0) {
		this._emptyIndicator.addClass(mConstants.css.listLoadingIndicator);
	} else {
		this._loadMoreBtn.addClass(mConstants.css.listLoadingIndicator);
	}
	
	
}

vListView.prototype._showLoadMoreBtn = function() {
	this._loadMoreBtn.css('display','block');
}

vListView.prototype._hideLoadMoreBtn = function() {
	this._loadMoreBtn.css('display','none');
}


