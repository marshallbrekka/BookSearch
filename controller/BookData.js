(function(lib){
	var controller = lib.util.extendNamespace('controller');
	
	controller.BookData = function() {

		this._requestSet = {};
		this._bookSetId = 0;
		this._books = [];
		this._searchTerms = null;
		this._currentPage = 1;
		this._maxPages = null;
		this._currentBookIndex = 0;
		lib.api.init(lib.config.apiKey, 66, 130)
		this._api = lib.api;
		
		var self = this;
		
		this._fnWrappers = {
			addBooks : function(o) {
				self._addBooks(o);
			},
			addLargeBookImage : function(o) {
				self._addLargeBookImage(o);
			},
			loadOffers : function(o) {
				self._loadOffers(o);
			}
		}
			
		
	}
	
	/**
	 * loads books from the search terms
	 * @param {string} searchTerms the search terms
	 * @param {function(Book[], boolean hasMore)} callback the callback that gets called when the request has finished
	 *
	 */
	controller.BookData.prototype.search = function(searchTerms, callback) {
		this._bookSetId++;
		this._searchTerms = searchTerms;
		this._currentPage = 1;
		this._maxPages = 1;
		this._books = [];
		
		var requestId = this._api.search(searchTerms, this._api.IMG_SIZE_SM, this._currentPage, this._fnWrappers.addBooks);
		this._createRequestSet(requestId, null, callback);
	}
	
	controller.BookData.prototype.loadMore = function(callback) {
		this._currentPage++;
		var requestId = this._api.search(this._searchTerms, this._api.IMG_SIZE_SM, this._currentPage, this._fnWrappers.addBooks);
		this._createRequestSet(requestId, null, callback);
	}
	
	controller.BookData.prototype.hasMore = function() {
		return this._currentPage < this._maxPages;
	}
	
	controller.BookData.prototype.getBook = function(index) {
		if(index < this._books.length) {
			this._currentBookIndex = index;
			return this._books[index];
		}
		return null;
	}
	
	
	
	
	controller.BookData.prototype.loadLargeBookImage = function(index, callback) {
		var book = this._books[index];
		if(book.imageLarge) {
			callback(book);
		} else {
			var requestId = this._api.bookInfo(book.isbn10, this._api.IMG_SIZE_LG, this._fnWrapper.loadLargeBookImage);
			this._createRequestSet(requestId, index, callback);
		}
		
	}
	
	controller.BookData.prototype.loadOffers = function(index, callback) {
		var book = this._books[index];
		if(book.offers) {
			callback(book);
		} else {
			var requestId = this._api.bookPrices(book.isbn10, this._fnWrapper.loadOffers);
			this._createRequestSet(requestId, index, callback);
		}
		
	}
	
	controller.BookData.prototype._getRequestSet = function(requestId) {
		var request = this._requestSet[requestId];
		delete this._requestSet[requestId];
		if(request.bookSet == this._bookSetId) {
			return request;
		} else {
			return null;
		}
		
		
	}
	
	/**
	 * creates a requestSet object for keeping track of jsonp requests so that we correctly update the right information
	 * @param {int} requestId the number returned from any API calls
	 * @param {int} [bookIndex] optional param of the book this request is for. If this is loading more books for instance you would not provide a bookIndex
	 * @param {function} callback the callback function that should be called when the request is completed
	 */
	controller.BookData.prototype._createRequestSet = function(requestId, bookIndex, callback) {
		this._requestSet[requestId] = {
			bookSet : this._bookSetId,
			bookIndex : bookIndex,
			callback : callback
		}
	}
	
	controller.BookData.prototype._addLargeBookImage = function(ajax) {
		var request = this._getRequestSet(ajax.id);
		if(request) {
			var book = this._books[request.bookIndex];
			book.imageLarge = ajax.data.imageLarge;
			if(this._currentBookIndex == request.bookIndex) {
				request.callback(book);
			}
		}
	}
	
	
	controller.BookData.prototype._addBooks = function(ajax) {
		var request = this._getRequestSet(ajax.id);
		if(request) {
			this._maxPages = ajax.data.pages;
			
			var more = false;
			if(ajax.data.page < ajax.data.pages) {
				more = true;
			}
			this._books = this._books.concat(ajax.data.books);
			request.callback(ajax.data.books, more);
		}
	}
	
	controller.BookData.prototype._loadOffers = function(ajax) {
		var request = this._getRequestSet(ajax.id);
		if(request) {
			var book = this._books[request.bookIndex];
			book.offers = ajax.data;
			if(this._currentBookIndex == request.bookIndex) {
				request.callback(book);
			}
		}
	}
	
	
	
	
})(JSBookSearch);
