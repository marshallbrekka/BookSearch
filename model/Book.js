// require mAPIObject
(function(lib){
	var model = lib.util.extendNamespace("model");

	model.Book = function(book) {
		var propertyNames = {
			isbn10:null,
			isbn13:null,
			title:null,
			author:null,
			binding:null,
			msrp:null,
			pages:null,
			publisher:null,
			published_date:'publishedDate',
			edition:null,
			image:'imageSmall'
		};


		this.loadProperties(book, propertyNames);

		this.offers = null;
		this.imageLarge = null;

	}

	lib.util.extend(model.Book, model.APIObject);
	
})(JSBookSearch);



