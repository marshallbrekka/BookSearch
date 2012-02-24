
/**
 * creates the dom for a list item of a book
 * @constructor
 * @param {mBook} book  
 */
var vListItem = function(book) {
	var img = DOM.create({
		tag : 'div',
		options : {domClass: [
			mConstants.css.bookImage, 
			mConstants.css.bookSizeSmall
		]},
		css : {
			'background-image' : 'url("' + book.imageSmall + '")'
		}
	});
	
	var title = DOM.create({
		tag : 'div',
		options : {domClass : mConstants.css.listItemTitle},
		text : book.title
	});
	
	var keys = mConstants.strings.bookMetaNames;
	var metaKeys = [keys.author, keys.isbn10, keys.isbn13];
	var metaVals = [book.author, book.isbn10, book.isbn13];
	var elements = [img, title];
	
	// build elements for meta info, and add the to elements array
	for(var i = 0; i < metaKeys.length; i++) {
		if ( !empty(metaVals[i]) ) {
			var keyElem = DOM.create({
				tag : 'span',
				text : metaKeys[i] + ':'
			});
			var whole = DOM.create({
				tag : 'div',
				options : {domClass : mConstants.css.listItemMetaText},
				children : [keyElem, metaVals[i]]
			});
			elements.push(whole);
		}
	}
	
	this.container = DOM.create({
		tag : 'li',
		options : {domClass: mConstants.css.listItem},
		children : elements
	});
}

vListItem.prototype.constructor = vListItem;
vListItem.prototype.container = null;

vListItem.prototype.select = function() {
	DOM.addClass(this.container, mConstants.css.selected);
}

vListItem.prototype.deselect = function() {
	DOM.removeClass(this.container,mConstants.css.selected);
}