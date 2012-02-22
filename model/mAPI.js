// require mBook, mBookOffers, mMerchant


var mAPI = function(API_KEY, IMG_WIDTH_SM, IMG_WIDTH_LG) {
	this.API_KEY = API_KEY;
	this.IMG_WIDTH_SM = IMG_WIDTH_SM;
	this.IMG_WIDTH_LG = IMG_WIDTH_LG;
	this.BASE_URL = 'http://api2.campusbooks.com/12/rest/';
}

var proto = mAPI.prototype;

/**
 * format of callback {obj:,fn:}
 */
proto.bookPrices = function(isbn, callback) {
	this._genericSystem('prices', {'isbn':isbn}, this._bookPrices, callback);
}

proto.bookInfo = function(isbn, imgWidth, callback) {
	// not using because returns inferior results to search function
	//this._genericSystem('bookinfo', {'isbn':isbn,'image_width':imgWidth}, this._bookInfo, callback);
	
	this._genericSystem(
		'search',
		{'keywords':isbn,'page':1,'img_width':imgWidth}, 
		this._bookInfo, 
		callback, 
		{imageKey : this._imageSizeKey(imgWidth)}
	);
}

proto.search = function(keywords, imgWidth, page, callback) {
	this._genericSystem(
		'search', 
		{'keywords':keywords, 'page':page, 'img_width':imgWidth}, 
		this._search, 
		callback, 
		{imageKey : this._imageSizeKey(imgWidth)}
	);
}

/*
proto.bookPricesAndInfo = function(isbn, imgWidth, callback) {
	this._genericSystem('bookprices', {'isbn':isbn, 'img_width':imgWidth}, this._bookPricesAndInfo, callback);
}*/


proto.merchants = function(callback) {
	this._genericSystem('merchants', {'coupons':''}, this._merchants, callback);
}

proto._bookPrices = function(data) {
	var offers = new mBookOffers(data.offers.condition);
	return offers;
}

proto._bookInfo = function(data) {
	var tmp = data.results.book;
	if(tmp.length == 0) return null;
	
	return new mBook(tmp[0]);
}

proto._imageSizeKey = function(size) {
	if(size > this.IMAGE_WIDTH_SM) {
		return 'imageLg';
	} else return 'imageSm';
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

/*
proto._bookPricesAndInfo = function(data) {
	console.log(data);
}
*/

proto._merchants = function(data) {
	var merchants = [];
	for(var i = 0; i < data.merchant.length; i++) {
		merchants.push(new mMerchant(data.merchant[i]));
	}
	
	return merchants;
}

proto._genericSystem = function(func, params, dataFunc, callback) {
	this._buildQuery(func, params, function(data, status) {
		var output = {status:true, data:null};
		if(status !== 'success') {
			output.status = false;
		} else {
			output.data = dataFunc(data.response.page);
		}
		 
		callback.fn.call(callback.obj,output);
	});
}

proto._buildQuery = function(func, params, callback, optionalData) {
	var full = this.BASE_URL + func + "?";
	full += "key=" + this.API_KEY + "&format=json";
	for(var key in params) {
		full += "&" + key + '=' + params[key];
	}
			
	return this._loadQuery(full, callback, optionalData);
}

proto._loadQuery = function(url, callback, optionalData) {
	$.ajax({
		url: url,
		dataType: 'jsonp',
		data: '',
		success: function(data){
			callback(data, optionalData);
		}
	});
	
}






