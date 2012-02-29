var vTabView = function() {
	var self = this;
	this._tabs = [];
	this._tabContent = [];
	this._tabWell = this._makeTabWell();
	this._selectedIndex = -1;
	this._contentContainer = this._makeContentContainer();
	this._emptyIndicator = DOM.create({
		tag : 'div',
		options : {domClass : mConstants.css.emptyIndicator},
		text : mConstants.strings.tabLabels.empty,
		jquery : true
	});
	
	this.container = DOM.create({
		tag : 'div',
		options : {domClass : mConstants.css.tabView},
		children : [this._emptyIndicator, this._tabWell, this._contentContainer]
		
	});
	this.setEmpty(true);
	
	
	this._tabWell.on("click", "li", function(event){
		var index = $(this).index();
		self.showTab(index);
		
	});

}

vTabView.prototype.addTab = function(label, view) {
	var btn = DOM.create({
		tag : 'li',
		options : {domClass : mConstants.css.tabButton},
		text : label
	});
	this._tabWell.append(btn);
	this._contentContainer.append(view);
	this._tabs.push(btn);
	this._tabContent.push(view);
	
}

vTabView.prototype.setEmpty = function(bool) {
	if(bool) {
		this._emptyIndicator.show();
		this._tabWell.hide();
		this._contentContainer.hide();
	} else {
		this._emptyIndicator.hide();
		this._tabWell.show();
		this._contentContainer.show();
	}
}

vTabView.prototype.showTab = function(index) {
	if(index === this._selectedIndex) return;
	this._deselectTab(this._selectedIndex);
	this._selectTab(index);
	this._selectedIndex = index;
}

vTabView.prototype._makeTabWell = function() {
	return DOM.create({
		tag : 'ul',
		options : {domClass : mConstants.css.tabWell},
		jquery : true
	});
}

vTabView.prototype._makeContentContainer = function() {
	return DOM.create({
		tag : 'div',
		options : {domClass : mConstants.css.tabContentContainer},
		jquery : true
	});
}

vTabView.prototype._deselectTab = function(index) {
	DOM.removeClass(this._tabs[index], mConstants.css.selected);
	DOM.removeClass(this._tabContent[index], mConstants.css.selected);
}

vTabView.prototype._selectTab = function(index) {
	DOM.addClass(this._tabs[index], mConstants.css.selected);
	DOM.addClass(this._tabContent[index], mConstants.css.selected);
}

