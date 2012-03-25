var lib = JSBookSearch;
var app = lib.app;
lib.api.init(config.apiKey, 66, 130)
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
	if(book.imageLarge == null) {
		api.bookInfo(book.isbn10, api.IMG_SIZE_LG, {obj:cb,fn:getHighResImg});
	}
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
	columnView.setColumnFocus(lib.view.TwoColumnView.RIGHT);
	
	//alert(index);
}

function getHighResImg(data) {
	var book = app.bookResults[app.currentBookIndex];
	book.imageLarge = data.data.imageLarge;
	bookDetails.updateImage(book);
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
var columnView = null;
$(function(){
	
	tabView = new lib.view.TabView();
	bookDetails = new lib.view.BookDetails();
	newPrices = new lib.view.OfferList(offerSelected);
	usedPrices = new lib.view.OfferList(offerSelected);
	ebookPrices = new lib.view.OfferList(offerSelected);
	
	
	tabView.addTab("Info", bookDetails);
	tabView.addTab("New", newPrices);
	tabView.addTab("Used", usedPrices);
	tabView.addTab("eBook", ebookPrices);
	
	//tabView.setEmpty(false);
	
	
	list = new lib.view.BookList(selected, loadMore);
	columnView = new lib.view.TwoColumnView({
		view : list,
		minWidth : 400,
		percent : 40
	},{
		view : tabView,
		minWidth : 400,
		percent : 60,
		switchColumnView : lib.dom.create({
			tag: 'div',
			options : {domClass : lib.constants.css.twoColumnViewSwitchButton},
			text : 'Back To All Books',
			jquery : true
		})
	}, 30);
	
	
	
	
	
	
	var startSearch = function(val){
		try {
			
		
		list.clearElements(val);
		list.setLoading(true);
		
		app.currentSearch = val;
		app.currentPage = 1;
		app.bookResults = [];
		api.search(app.currentSearch, api.IMG_SIZE_SM, app.currentPage, {obj: cb, fn : cb.search});
		columnView.setColumnFocus(lib.view.TwoColumnView.LEFT);
		}
		catch(e) {
			console.log(e);
		}
		return false;
	}
	
	var searchView = new lib.view.KeywordInputView(startSearch);
	lib.dom.setId(searchView.getDomNode(), 'topRow');
	lib.dom.setId(columnView.getDomNode(), 'bottomRow');
	$('#bookSearchJS').append(columnView.getDomNode());
	$('#bookSearchJS').append(searchView.getDomNode());
	
	columnView.redraw();
	tabView.showTab(0);
		
});

