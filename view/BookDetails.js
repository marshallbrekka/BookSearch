(function(lib){
	var view = lib.util.extendNamespace("view");
	
	/**
	 * creates a view object that displays the details of the books
	 * 
	 */
	view.BookDetails = function() {
	
		this._image;
		this._metaData;	
		this._book;
	
		this._image = lib.dom.create({
			tag : 'div',
			options : {domClass: [
				lib.constants.css.bookImage, 
				lib.constants.css.bookSizeLarge
			]},
			jquery : true
			
		});
		
		var imageWell = lib.dom.create({
			tag : 'div',
			options : {domClass : lib.constants.css.bookDetailsImageWell}/*,
			children : this._image*/
		});
		
		
		
		this._metaData = lib.dom.create({
			tag : 'div',
			options : {domClass : lib.constants.css.bookDetailsData},
			jquery : true
		});
		
		this._container = lib.dom.create({
			tag : 'div',
			options : {domClass : [lib.constants.css.bookDetails, lib.constants.css.tabContent]},
			children : [this._image, imageWell, this._metaData]
		});
		
		this._scrollbar = new view.ScrollBar(this._container, this._metaData);
		
		
		

	}	
	/**
	 * sets the book to display
	 * @param {model.Book} book
	 */
	 
	view.BookDetails.prototype.setBook = function(book) {
		this._book = book;
		var url = lib.util.empty(book.imageLarge) ? lib.constants.resources.images.ajaxLoaderOnWhite : book.imageLarge;
		
		this._image.css({
				'background-image' : 'url("' + url + '")'
		});
		
		this._metaData.children().remove();
		
		var elements = [];
		var keys = [
			'author',
			'isbn10',
			'isbn13',
			'edition',
			'publisher',
			'publishedDate',
			'msrp',
			'pages'
		];
		

		elements.push(lib.dom.create({
			tag : 'div',
			options : {domClass : lib.constants.css.bookDetailsTitle},
			text : book.title
		}));
		
		for(var i in keys) {
			var key = keys[i];
			var text = book[key];
			if(lib.util.empty(text)) break;
			var label = lib.constants.strings.bookMetaNames[key];
			elements.push(this._createMetaRow(label, text));
		}
		
		this._metaData.append(elements);
		
	}
	
	view.BookDetails.prototype.updateImage = function(book) {
		var url = lib.util.empty(book.imageLarge) ? book.imageSmall : book.imageLarge;
		
		this._image.css({
				'background-image' : 'url("' + url + '")'
		});
	}

	view.BookDetails.prototype._createMetaRow = function(label, text) {
		var domLabel = lib.dom.create({
			tag : 'div',
			options : {domClass : lib.constants.css.bookDetailsLabel},
			text : label
		});
		
		var domText = lib.dom.create({
			tag : 'div',
			options : {domClass : lib.constants.css.bookDetailsText},
			text : text
		});
		
		var row = lib.dom.create({
			tag : 'div',
			options : {domClass : lib.constants.css.bookDetailsRow},
			children : [domLabel, domText]
		});
		return row;
	}
	
	view.BookDetails.prototype.init = function() {
		this._scrollbar.init();
	}
	
	view.BookDetails.prototype.redraw = function() {
		this._scrollbar.redraw();
	}
	
	lib.util.extend(view.BookDetails, view.View);
	
	
	
	
})(JSBookSearch);
