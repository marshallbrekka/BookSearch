(function(lib){
	var view = lib.util.extendNamespace("view");
	view.BookList = function(selectedCallback, loadMoreCallback) {
	
		
		this._loadMoreBtn = this._makeLoadMoreBtn();
	
		this._loadMoreCallback = loadMoreCallback;
		
		this.__super({
			clickCallback: selectedCallback,
			emptyLabel : lib.constants.strings.listBookLabels.emptyList,
			footer : this._loadMoreBtn,
			scroll : true
		});
		
		lib.dom.addClass(this._container, lib.constants.css.listBooks);
		/*this.container = lib.dom.create({
			tag : 'div',
			options : {domClass : lib.constants.css.listBooks},
			children : this._listView.container
		});*/
	}


	view.BookList.prototype._makeLoadMoreBtn = function() {
		var btn = lib.dom.create({
			tag : 'li',
			options : {domClass : lib.constants.css.listLoadMore},
			text : lib.constants.strings.listBookLabels.loadMore,
			jquery : true
		});
		var self = this;
		lib.dom.click(btn, function() {
			self._loadMoreClick();
		});
		return btn;
	}

	view.BookList.prototype._loadMoreClick = function() {
		if(this._loading) return;
		this._loading = true;
		
		this.setLoading(true);
		this._loadMoreCallback();
	}


	/**
	 * @param {model.Book[]} elements array of book elements
	 * @param {boolean} hasMore if there are more items that can be loaded
	 */
	view.BookList.prototype.addBooks = function(elements, hasMore) {
		var listSize = this.size();
		if(this._loading) {
			this.setLoading(false);
			this._loading = false;
		}

		var listItems = [];
		for(var i in elements) {
			listItems.push(new view.ListItemBook(elements[i]));
		}
		this.addElements(listItems);
		
		
		if(!hasMore) {
			this._hideFooter();
		}
		

	}
	
	lib.util.extend(view.BookList, view.ListView);

})(JSBookSearch);

