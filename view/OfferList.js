(function(lib){
	var view = lib.util.extendNamespace("view");
	view.OfferList = function(selectedCallback) {
	
		this.__super({
			clickCallback: selectedCallback,
			emptyLabel : lib.constants.strings.listOffersLabels.emptyList,
			scroll : true
		});
		
	
		lib.dom.addClass(this._container, lib.constants.css.listBooks);
	}

	/**
	 * @param {model.Offer[]} offers array of offer objects
	 */
	view.OfferList.prototype.addOffers = function(offers) {
		if(this._loading) {
			this.setLoading(false);
		}

		var listItems = [];
		for(var i in offers) {
			listItems.push(new view.ListItemOffer(offers[i]));
		}
		this.addElements(listItems);


	}	
	
	lib.util.extend(view.OfferList, view.ListView);

})(JSBookSearch);

