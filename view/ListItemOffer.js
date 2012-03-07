(function(lib){
	var view = lib.util.extendNamespace("view");
	/**
	 * creates the dom for a list item of a book
	 * @constructor
	 * @param {model.Offer} offer  
	 * @TODO everything, this is just a copy so far of the book item
	 */
	view.ListItemOffer = function(offer) {
		var img = lib.dom.create({
			tag : 'div',
			options : {domClass: [lib.constants.css.listOfferItemImage]},
			css : {
				'background-image' : 'url("' + offer.merchant.image + '")'
			}
		});

		var price = lib.dom.create({
			tag : 'div',
			options : {domClass : lib.constants.css.listOfferItemPrice},
			text : lib.constants.strings.listOffersLabels.totalPrice + ": $" + offer.totalPrice
		});
		
		var shipping = lib.dom.create({
			tag : 'div',
			options : {domClass : lib.constants.css.listOfferItemShipping},
			text : "$" + offer.price + " + $" + offer.shippingPrice + " " + lib.constants.strings.listOffersLabels.shipping
		});

		
		

		this.container = lib.dom.create({
			tag : 'li',
			options : {domClass: [lib.constants.css.listOfferItem, lib.constants.css.listItem]},
			children : [img, price, shipping]
		});
	}

	
	view.ListItemBook.prototype.container = null;

	view.ListItemBook.prototype.select = function() {
		lib.dom.addClass(this.container, lib.constants.css.selected);
	}

	view.ListItemBook.prototype.deselect = function() {
		lib.dom.removeClass(this.container,lib.constants.css.selected);
	}
})(JSBookSearch);