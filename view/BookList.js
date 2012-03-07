(function(lib){
	var view = lib.util.extendNamespace("view");
	view.BookList = function(selectedCallback, loadMoreCallback) {

		this._loadMoreBtn = this._makeLoadMoreBtn();
		this._loading = false;
		this._loadMoreCallback = loadMoreCallback;
		this._listView = new view.ListView({
			clickCallback: selectedCallback,
			emptyLabel : lib.constants.strings.listBookLabels.emptyList,
			footer : this._loadMoreBtn
		});
		this.container = lib.dom.create({
			tag : 'div',
			options : {domClass : lib.constants.css.listBooks},
			children : [this._listView.container]
		});
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
			console.log("more");
			self._loadMoreClick();
		});
		return btn;
	}

	view.BookList.prototype._loadMoreClick = function() {
		console.log("load More")
		if(this._loading) return;
		this._loading = true;
		
		this._listView.setLoading(true);
		this._loadMoreCallback();
	}


	/**
	 * @param {mBook[]} elements array of book elements
	 * @param {boolean} hasMore if there are more items that can be loaded
	 */
	view.BookList.prototype.addBooks = function(elements, hasMore) {
		var listSize = this._listView.size();
		if(this._loading) {
			this._listView.setLoading(false);
			this._loading = false;
		}

		var listItems = [];
		for(var i in elements) {
			listItems.push(new view.ListItemBook(elements[i]));
		}
		this._listView.addElements(listItems);
		var newListSize = this._listView.size();
		if(!hasMore) {
			this._listView._hideFooter();
		}
		if(newListSize !== 0 && listSize === 0) {
			this._listView._showFooter();
		}

	}

	view.BookList.prototype.clear = function(loading) {
		
		this._listView.clearElements();
		if(loading) {
			this._loading = true;
			this.listView.setLoading(true);
		}
	}

	view.BookList.prototype.setLoading = function() {
		if(!this._loading) {
			this._loading = true;
			this._listView.setLoading(true);
		}
	}

})(JSBookSearch);

