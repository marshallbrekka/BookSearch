// require mBook, mBookOffers, mMerchant


var mAPI = function(API_KEY, IMG_SIZE_SM, IMG_SIZE_LG) {
	this.API_KEY = API_KEY;
	this.IMG_SIZE_SM = IMG_SIZE_SM;
	this.IMG_SIZE_LG = IMG_SIZE_LG;
	this.BASE_URL = 'http://api2.campusbooks.com/12/rest/';
}

var proto = mAPI.prototype;

/**
 * format of callback {obj:,fn:}
 */
proto.bookPrices = function(isbn, callback) {
	this._genericSystem('prices', {'isbn':isbn}, this._bookPrices, callback);
}

proto.bookInfo = function(isbn, imgSize, callback) {
	// not using because returns inferior results to search function
	//this._genericSystem('bookinfo', {'isbn':isbn,'image_width':imgWidth}, this._bookInfo, callback);
	
	this._genericSystem(
		'search',
		{'keywords':isbn,'page':1, image_height : imgSize}, 
		this._bookInfo, 
		callback
	);
}

proto.search = function(keywords, imgSize, page, callback) {
	this._genericSystem(
		'search', 
		{'keywords':keywords, 'page':page, image_height : imgSize}, 
		this._search, 
		callback
	);
}

/*
proto.bookPricesAndInfo = function(isbn, imgWidth, callback) {
	var self = this;
	this._genericSystem(
		'bookprices', 
		{'isbn':isbn, 'img_width':imgWidth}, 
		function(data){
			self._bookPricesAndInfo.call(self, data);
		},
		callback
	);
}
*/


proto.merchants = function(callback) {
	this._genericSystem('merchants', {'coupons':''}, this._merchants, callback);
}


proto._bookPrices = function(data) {
	var offers = new mBookOffers(data.offers.condition);
	return offers;
}

// based off data returned from search function
proto._bookInfo = function(data) {

	var tmp = data.results.book;
	if(tmp.length == 0) return null;
	
	return new mBook(tmp[0]);
}

// based off data returned from bookInfo function
proto._bookInfoHelper = function(data) {
	return new mBook(data.book);
}


/*
 * return object
 * int pages
 * int page
 * array[book] books
 * 
 */
proto._search = function(data) {
	var results = {
		pages : parseInt(data.pages),
		page : parseInt(data.current_page)
	};
	var books = [];
	
	var tmp = data.results.book;
	
	for(var i = 0; i < tmp.length; i++) {
		books.push(new mBook(tmp[i]));
	}
	
	results.books = books;
	return results;
}


proto._bookPricesAndInfo = function(data) {
	var book = this._bookInfoHelper(data);
	book.offers = this._bookPrices(data);
	return book;
}


proto._merchants = function(data) {
	var merchants = [];
	for(var i = 0; i < data.merchant.length; i++) {
		merchants.push(new mMerchant(data.merchant[i]));
	}
	
	return merchants;
}

proto._genericSystem = function(func, params, dataFunc, callback, optionalData) {
	this._buildQuery(func, params, function(data, status) {
		var output = {status:true, data:null};
		if(status !== 'success') {
			output.status = false;
		} else {
			console.log(data.response.page);
			output.data = dataFunc(data.response.page, optionalData);
		}
		 
		callback.fn.call(callback.obj, output);
	});
}

proto._buildQuery = function(func, params, callback) {
	var full = this.BASE_URL + func + "?";
	full += "key=" + this.API_KEY + "&format=json";
	for(var key in params) {
		full += "&" + key + '=' + params[key];
	}
			
	return this._loadQuery(full, callback);
}

proto._loadQuery = function(url, callback) {
	$.ajax({
		url: url,
		dataType: 'jsonp',
		data: '',
		success: callback
	});
	
}






