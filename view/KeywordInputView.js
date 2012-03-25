(function(lib) {
	var view = lib.util.extendNamespace('view');
	
	
	/**
	 * creates the view that contains the search form
	 * @PARAM {function} searchCallback the function that gets called when the form is submitted
	 */
	view.KeywordInputView = function(searchCallback) {
		this._empty = true;
		this._searchCallback = searchCallback;
		
		
		this._textField = lib.dom.create({
			tag : 'input',
			options : {
				domClass : [lib.constants.css.keywordInputTextField, lib.constants.css.empty],
				type : 'text',
				value : lib.constants.strings.keywordInput.defaultText
			},
			jquery : true
		});
		
		var textFieldWrapper = lib.dom.create({
			tag : 'div',
			options : {domClass : lib.constants.css.keywordInputTextFieldWrapper},
			children : this._textField
		});
		
		this._submitButton = lib.dom.create({
			tag : 'button',
			options : {
				domClass : lib.constants.css.keywordInputSubmit,
				type : 'submit'
			},
			jquery : true,
			text : lib.constants.strings.keywordInput.submit
		});
		
		this._form = lib.dom.create({
			tag : 'form',
			options : {domClass : lib.constants.css.keywordInputForm},
			children : [textFieldWrapper, this._submitButton],
			jquery : true
		});
		
		this._container = lib.dom.create({
			tag : 'div',
			options : {domClass : lib.constants.css.keywordInput},
			children : this._form
		});
		
		var self = this;
		this._textField.focus(function(){
		   self._onTextFieldEnterFocus(); 
		}).blur(function(){
		    self._onTextFieldLoseFocus();
		});
		
		this._form.submit(function(e){
		   self._onSubmit(e); 
		});
	}
	
	
	view.KeywordInputView.prototype._onSubmit = function(e) {
		e.preventDefault();
		if(this._empty) return;
	    var val = this._textField.val();
	    if(!lib.util.empty(val)) {
	        this._textField.blur();
	        this._searchCallback(val);
	    }
	}
	
	view.KeywordInputView.prototype._onTextFieldEnterFocus = function() {
		if(this._empty) {
			this._textField.val('');
			lib.dom.removeClass(this._textField, lib.constants.css.empty);
			this._empty = false;
		}
		
	}
	
	view.KeywordInputView.prototype._onTextFieldLoseFocus = function() {
		if(lib.util.empty(this._textField.val())) {
			this._empty = true;
			lib.dom.addClass(this._textField, lib.constants.css.empty);
			this._textField.val(lib.constants.strings.keywordInput.defaultText);
		}
	}
	
	
	
	
	
	lib.util.extend(view.KeywordInputView, view.View);
	
})(JSBookSearch);