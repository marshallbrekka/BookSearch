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
				lib.constants.css.imageBox,
				lib.constants.css.bookImage, 
				lib.constants.css.bookSizeSmall
			]},
			css : {
				'background-image' : 'url("' + book.imageSmall + '")'
			}
		});

		var title = lib.dom.create({
			tag : 'div',
			options : {domClass : [lib.constants.css.listBookItemTitle, lib.constants.css.listTextDark]},
			text : book.title
		});
		
		var edgeFade = lib.dom.create({
			tag : 'div',
			options : {domClass : lib.constants.css.listItemFade}
		})

		var keys = lib.constants.strings.bookMetaNames;
		var metaKeys = [keys.author, keys.isbn10, keys.isbn13];
		var metaVals = [book.author, book.isbn10, book.isbn13];
		var elements = [edgeFade, img, title];

		// build elements for meta info, and add the to elements array
		for(var i = 0; i < metaKeys.length; i++) {
			if ( !lib.util.empty(metaVals[i]) ) {
				var keyElem = lib.dom.create({
					tag : 'span',
					options : {domClass : lib.constants.css.listTextLight},
					text : metaKeys[i] + ':'
				});
				var whole = lib.dom.create({
					tag : 'div',
					options : {domClass : [lib.constants.css.listBookItemMetaText, lib.constants.css.listTextMedium]},
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