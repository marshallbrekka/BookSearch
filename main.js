var lib = JSBookSearch;
var app = lib.app;
lib.api.init(config.apiKey, 66, 150)
var api = lib.api;
api.merchants({obj:app, fn:app.addMerchants});
var cb = {};
cb.search = function(re) {
	
	app.maxPages = re.data.pages;
	var more = false;
	if(re.data.page < re.data.pages) {
		more = true;
	}
	app.bookResults = app.bookResults.concat(re.data.books);
	list.addBooks(re.data.books, more);
}

cb.offers = function(re) {
	var offers = re.data;
	app.bookResults[app.currentBookIndex].offers = offers;
	newPrices.addOffers(offers.types[lib.constants.Condition.NEW]);
	usedPrices.addOffers(offers.types[lib.constants.Condition.USED]);
	ebookPrices.addOffers(offers.types[lib.constants.Condition.EBOOK]);
}
var loadMore = function() {
	
	api.search(app.currentSearch, api.IMG_SIZE_SM, app.currentPage++, {obj: cb, fn : cb.search});
}

var selected = function(index) {
	app.currentBookIndex = index;
	var book = app.bookResults[index];
	bookDetails.setBook(book);
	tabView.setEmpty(false);
	bookDetails.redraw();
	var prices = [newPrices, usedPrices, ebookPrices];
	if(book.offers == null) {
		api.bookPrices(book.isbn10, {obj:cb, fn:cb.offers});
		for(var i in prices) {
			prices[i].clearElements();
			prices[i].setLoading(true);
		}
	} else {
		for(var i in prices) {
			prices[i].clearElements();
			
		}
		displayOffers(book);
	}
	
	
	//alert(index);
}

function displayOffers(book) {
	var offers = book.offers;
		
	newPrices.addOffers(offers.types[lib.constants.Condition.NEW]);
	usedPrices.addOffers(offers.types[lib.constants.Condition.USED]);
	ebookPrices.addOffers(offers.types[lib.constants.Condition.EBOOK]);
}

var offerSelected = function(index) {
	alert(index);
}
var list = null;
var tabView = null;
var bookDetails = null;
var newPrices = null;
var usedPrices = null;
var ebookPrices = null;
$(function(){
	
	tabView = new lib.view.TabView();
	bookDetails = new lib.view.BookDetails();
	newPrices = new lib.view.OfferList(offerSelected);
	usedPrices = new lib.view.OfferList(offerSelected);
	ebookPrices = new lib.view.OfferList(offerSelected);
	$('#bs-book').append(tabView.getDomNode());
	
	//tabView.addTab("Info", bookDetails);
	tabView.addTab("New", newPrices);
	tabView.addTab("Used", usedPrices);
	/*tabView.addTab("eBook", ebookPrices);*/
	
	//tabView.setEmpty(false);

	tabView.showTab(0);
	list = new lib.view.BookList(selected, loadMore);
	
	$('#bs-list').append(list.getDomNode());
	list.init();
	tabView.init();
	
	
	
	$('#bs-searchBar form').submit(function(){
		try {
			
		
		list.clearElements();
		list.setLoading(true);
		var val = $('#search').val();
		app.currentSearch = val;
		app.currentPage = 1;
		app.bookResults = [];
		api.search(app.currentSearch, api.IMG_SIZE_SM, app.currentPage, {obj: cb, fn : cb.search});
		
		}
		catch(e) {
			console.log(e);
		}
		return false;
	});
		
});

