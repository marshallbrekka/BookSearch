// require mAPIObject

var mBook = function(book) {
	console.log(book);
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
		edition:null
	};
	
	
	this.loadProperties(book, propertyNames);
	
	
	this.offers = null;

}

extend(mBook, mAPIObject);



