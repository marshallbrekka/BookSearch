(function(lib) {
	var view = lib.util.extendNamespace('view');
	
	
	/**
	 * creates the view that contains the search form
	 * @PARAM {function} searchCallback the function that gets called when the form is submitted
	 */
	view.KeywordInputView = function(searchCallback) {
		this._searchCallback = searchCallback;
		this._textField = lib.dom.create({
			tag : 'input',
			options : {
				domClass : [lib.constants.css.keywordInputTextField, lib.constants.css.emptyempty],
				type : 'text',
				value : lib.constants.strings.keywordInput.defaultText
			},
			jquery : true
		});
		
		this._submitButton = lib.dom.create({
			tag : 'input',
			options : {
				domClass : lib.constants.css.keywordInputSubmit,
				type : 'submit',
				value : lib.constants.strings.keywordInput.submit
			},
			jquery : true
		});
		
		this._container = lib.dom.create({
			tag : 'form',
			options : {domClass : lib.constants.css.keywordInput},
			children : [this._textField, this._submit],
			jquery : true
		});
		
		var self = this;
		this._textField.focus(function(){
		   self._onTextFieldEnterFocus(); 
		}).blur(function(){
		    self._onTextFieldLoseFocus();
		});
		
		this._container.submit(function(){
		   self._onSubmit(); 
		});
	}
	
	
	view.KeywordInputView.prototype._onSubmit = function() {
	    var val = this._textField.val();
	    if(!lib.util.empty(val)) {
	        this._textField.blur();
	        this._searchCallback();
	    }
	}
	
	view.KeywordInputView.prototype._onTextFieldEnterFocus = function() {
		this._textField.val('');
		lib.dom.removeClass(this._textField, lib.constants.css.empty);
	}
	
	view.KeywordInputView.prototype._onTextFieldLoseFocus = function() {
		if(lib.util.empty(this._textField.val())) {
			lib.dom.addClass(this._textField, lib.constants.css.empty);
			this._textField.val(lib.constants.strings.keywordInput.defaultText);
		}
	}
	
	
	
	
	
	lib.util.extend(view.KeywordInputView, view.View);
	
})(JSBookSearch);