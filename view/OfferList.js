(function(lib){
	var view = lib.util.extendNamespace("view");
	view.OfferList = function(selectedCallback) {
		this._loading = false;
		this._listView = new view.ListView({
			clickCallback: selectedCallback,
			emptyLabel : lib.constants.strings.listOffersLabels.emptyList
		});
		this.container = lib.dom.create({
			tag : 'div',
			options : {domClass : [lib.constants.css.listBooks, lib.constants.css.tabContent]},
			children : [this._listView.container]
		});
	}




	/**
	 * @param {model.Offer[]} offers array of offer objects
	 */
	view.OfferList.prototype.addOffers = function(offers) {
		if(this._loading) {
			this._listView.setLoading(false);
			this._loading = false;
		}

		var listItems = [];
		for(var i in offers) {
			listItems.push(new view.ListItemOffer(offers[i]));
		}
		this._listView.addElements(listItems);
		var newListSize = this._listView.size();

	}

	view.OfferList.prototype.clear = function(loading) {
		
		this._listView.clearElements();
		if(loading) {
			this._loading = true;
			this.listView.setLoading(true);
		}
	}

	view.OfferList.prototype.setLoading = function() {
		if(!this._loading) {
			this._loading = true;
			this._listView.setLoading(true);
		}
	}

})(JSBookSearch);

