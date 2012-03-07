(function(lib){
	var constants = lib.util.extendNamespace('constants');

	constants.Condition = {'NEW' : 0, 'USED' : 1, 'EBOOK' : 2, 'RENTAL' : 3};
	constants.domPrefix = "bs-";
	constants.css = {
		selected : 'selected',
		bookImage : 'book_img', 
		bookSizeSmall : 'book_img_small',
		bookSizeLarge : 'book_img_large',
		list : 'list',
		listBooks : 'list_books',
		emptyIndicator : 'empty_indicator',
		loading : 'loading',
		listItem : 'list_item',
		listBookItem : 'list_book_item', 
		listBookItemTitle : 'list_book_item_title',
		listBookItemMetaText : 'list_book_item_meta_text',
		listLoadMore : 'list_load_more',
		tabView : 'tab_view',
		tabWell : 'tab_well',
		tabContentContainer : 'tab_content_container',
		tabButton : 'tab_button',
		tabContent : 'tab_content',
		bookDetails : 'book_details',
		bookDetailsImageWell : 'book_details_image_well',
		bookDetailsData : 'book_details_data',
		bookDetailsTitle : 'book_details_title',
		bookDetailsRow : 'book_details_row',
		bookDetailsLabel : 'book_details_label',
		bookDetailsText : 'book_details_text'
	};

	constants.strings = {
		bookMetaNames : {
			author : 'Author',
			isbn10 : 'ISBN10',
			isbn13 : 'ISBN13',
			binding : 'Binding',
			msrp : 'MSRP',
			pages : 'Pages',
			publisher : 'Publisher',
			publishedDate : 'Published',
			edition : 'Edition'
		},
		listBookLabels : {
			loadMore : 'Load More',
			emptyList : 'No Books to Display'
		},
		tabLabels : {
			empty : 'No Book to Display',
			pricesEmpty : 'No Prices Found'
		}
	};
})(JSBookSearch);
