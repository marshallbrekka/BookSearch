// require mAPIObject

var mOffer = function(offer) {
	var propertyNames = {
		condition_id:'conditionId',
		link:null,
		merchant_id:'merchant',
		price:null,
		shipping_ground:'shippingPrice'
	};
	
	
	this.loadProperties(offer, propertyNames);
	this.merchant = App.merchants[this.merchant];

}

extend(mOffer, mAPIObject);



