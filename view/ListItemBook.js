(function(lib){
	var view = lib.util.extendNamespace("view");
	/**
	 * creates the dom for a list item of a book
	 * @constructor
	 * @param {mBook} book  
	 */
	view.ListItemBook = function(book) {
		var img = lib.dom.create({
			tag : 'div',
			options : {domClass: [
				lib.constants.css.bookImage, 
				lib.constants.css.bookSizeSmall
			]},
			css : {
				'background-image' : 'url("' + book.imageSmall + '")'
			}
		});

		var title = lib.dom.create({
			tag : 'div',
			options : {domClass : lib.constants.css.listBookItemTitle},
			text : book.title
		});

		var keys = lib.constants.strings.bookMetaNames;
		var metaKeys = [keys.author, keys.isbn10, keys.isbn13];
		var metaVals = [book.author, book.isbn10, book.isbn13];
		var elements = [img, title];

		// build elements for meta info, and add the to elements array
		for(var i = 0; i < metaKeys.length; i++) {
			if ( !lib.util.empty(metaVals[i]) ) {
				var keyElem = lib.dom.create({
					tag : 'span',
					text : metaKeys[i] + ':'
				});
				var whole = lib.dom.create({
					tag : 'div',
					options : {domClass : lib.constants.css.listBookItemMetaText},
					children : [keyElem, metaVals[i]]
				});
				elements.push(whole);
			}
		}

		this.container = lib.dom.create({
			tag : 'li',
			options : {domClass: [lib.constants.css.listBookItem, lib.constants.css.listItem]},
			children : elements
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