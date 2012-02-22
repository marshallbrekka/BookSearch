var mApp = function () {
	this.merchants = {};
	this.useStorage = window.localStorage === undefined ? false : true;
	if(this.useStorage) {
		var tmp = JSON.parse(localStorage.getItem('merchants'));
		this.merchants = tmp == null ? this.merchants : tmp;
	}
}



mApp.prototype.addMerchants = function(merchantsXHR) {
	if(merchantsXHR.status) {
		var merchants = merchantsXHR.data;
		var modified = false;
		for(var i = 0; i < merchants.length; i++) {
			var temp = merchants[i];
			if(this.merchants[temp.id] == undefined) {
				this.merchants[temp.id] = temp;
				modified = true;
			}
		}
		
		if(this.useStorage && modified) {
			localStorage.setItem('merchants', JSON.stringify(this.merchants));
		}
	}
}


