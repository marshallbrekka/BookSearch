// require mAPIObject

var mMerchant = function(merchant) {
	var propertyNames = {
		image:null,
		merchant_id:'id',
		name:null
	};
	this.loadProperties(merchant, propertyNames);
	
	var coupons = merchant.coupons.coupon;
	if(coupons != undefined) {
		this.coupons = coupons;
	} else {
		this.coupons = null;
	}
	
	
}

extend(mMerchant, mAPIObject);



