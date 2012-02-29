var App = new mApp();
var API = new mAPI(config.apiKey, 66, 150);
API.merchants({obj:App, fn:App.addMerchants});
var cb = {};
cb.search = function(re) {
	
	App.maxPages = re.data.pages;
	var more = false;
	if(re.data.page < re.data.pages) {
		more = true;
	}
	list.addElements(re.data.books, more);
}
var loadMore = function() {
	
	API.search(App.currentSearch, API.IMG_SIZE_SM, App.currentPage++, {obj: cb, fn : cb.search});
}

var selected = function(index) {
	alert(index);
}
var list = null;
var tabView = null;
$(function(){
	list = new vListView(selected, loadMore);
	tabView = new vTabView();
	$('#bs-book').append(tabView.container);
	tabView.addTab("Info", $('<p class="bs-tab_content">tab 1</p>'));
	tabView.addTab("New", $('<p class="bs-tab_content">tab 2</p>'));
	tabView.addTab("Used", $('<p class="bs-tab_content">tab 3</p>'));
	tabView.showTab(0);
	tabView.setEmpty(false);
	$('#bs-list').append(list.container);
	
	$('#bs-searchBar form').submit(function(){
		list.clearElements();
		list.setLoading();
		var val = $('#search').val();
		App.currentSearch = val;
		App.currentPage = 1;
		API.search(App.currentSearch, API.IMG_SIZE_SM, App.currentPage, {obj: cb, fn : cb.search});
		return false;
	});
		
});

