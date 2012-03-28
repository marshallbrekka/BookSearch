var lib = JSBookSearch;
var app = lib.app;
lib.api.init(lib.config.apiKey, 66, 130)
var api = lib.api;
var bookData = new lib.controller.BookData();
function addMerchants(data) {
	app.addMerchants(data);
}
api.merchants(addMerchants);

var search = function(books, hasMore) {
	list.addBooks(books, hasMore);
}

var offers = function(book) {
	var offers = book.offers
	newPrices.addOffers(offers.types[lib.constants.Condition.NEW]);
	usedPrices.addOffers(offers.types[lib.constants.Condition.USED]);
	ebookPrices.addOffers(offers.types[lib.constants.Condition.EBOOK]);
}
var loadMore = function() {
	
	bookData.loadMore(search);
}

var selected = function(index) {
	var book = bookData.getBook(index)
	bookDetails.setBook(book);
	tabView.setEmpty(false);
	bookDetails.redraw();
	var prices = [newPrices, usedPrices, ebookPrices];
	if(book.imageLarge == null) {
		bookData.loadLargeBookImage(index, getHighResImg);
	}
	if(book.offers == null) {
		bookData.loadOffers(index, offers);
		for(var i in prices) {
			prices[i].clearElements();
			prices[i].setLoading(true);
		}
	} else {
		for(var i in prices) {
			prices[i].clearElements();
			
		}
		offers(book);
	}
	columnView.setColumnFocus(lib.view.TwoColumnView.RIGHT);
	
	//alert(index);
}

function getHighResImg(book) {
	bookDetails.updateImage(book);
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
		tabView.setEmpty(true);
		
		bookData.search(val, search)

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

