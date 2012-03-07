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
var loadMore = function() {
	
	api.search(app.currentSearch, api.IMG_SIZE_SM, app.currentPage++, {obj: cb, fn : cb.search});
}

var selected = function(index) {
	bookDetails.setBook(app.bookResults[index]);
	tabView.setEmpty(false);
	//alert(index);
}
var list = null;
var tabView = null;
var bookDetails = null;
$(function(){
	list = new lib.view.BookList(selected, loadMore);
	tabView = new lib.view.TabView();
	bookDetails = new lib.view.BookDetails();
	$('#bs-book').append(tabView.container);
	
	tabView.addTab("Info", bookDetails.container);
	tabView.addTab("New", $('<p class="bs-tab_content">tab 2</p>'));
	tabView.addTab("Used", $('<p class="bs-tab_content">tab 3</p>'));
	tabView.showTab(0);
	//tabView.setEmpty(false);
	
	$('#bs-list').append(list.container);
	
	$('#bs-searchBar form').submit(function(){
		try {
			
		
		list.clear();
		list.setLoading();
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

