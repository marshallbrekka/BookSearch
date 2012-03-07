(function(lib){
	var view = lib.util.extendNamespace("view");
	view.TabView = function() {
		var self = this;
		this._tabs = [];
		this._tabContent = [];
		this._tabWell = this._makeTabWell();
		this._selectedIndex = -1;
		this._contentContainer = this._makeContentContainer();
		this._emptyIndicator = lib.dom.create({
			tag : 'div',
			options : {domClass : lib.constants.css.emptyIndicator},
			text : lib.constants.strings.tabLabels.empty,
			jquery : true
		});

		this.container = lib.dom.create({
			tag : 'div',
			options : {domClass : lib.constants.css.tabView},
			children : [this._emptyIndicator, this._tabWell, this._contentContainer]

		});
		this.setEmpty(true);


		this._tabWell.on("click", "li", function(event){
			var index = $(this).index();
			self.showTab(index);

		});

	}

	view.TabView.prototype.addTab = function(label, view) {
		var btn = lib.dom.create({
			tag : 'li',
			options : {domClass : lib.constants.css.tabButton},
			text : label
		});
		this._tabWell.append(btn);
		this._contentContainer.append(view);
		this._tabs.push(btn);
		this._tabContent.push(view);

	}

	view.TabView.prototype.setEmpty = function(bool) {
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

	view.TabView.prototype.showTab = function(index) {
		if(index === this._selectedIndex) return;
		this._deselectTab(this._selectedIndex);
		this._selectTab(index);
		this._selectedIndex = index;
	}

	view.TabView.prototype._makeTabWell = function() {
		return lib.dom.create({
			tag : 'ul',
			options : {domClass : lib.constants.css.tabWell},
			jquery : true
		});
	}

	view.TabView.prototype._makeContentContainer = function() {
		return lib.dom.create({
			tag : 'div',
			options : {domClass : lib.constants.css.tabContentContainer},
			jquery : true
		});
	}

	view.TabView.prototype._deselectTab = function(index) {
		lib.dom.removeClass(this._tabs[index], lib.constants.css.selected);
		lib.dom.removeClass(this._tabContent[index], lib.constants.css.selected);
	}

	view.TabView.prototype._selectTab = function(index) {
		lib.dom.addClass(this._tabs[index], lib.constants.css.selected);
		lib.dom.addClass(this._tabContent[index], lib.constants.css.selected);
	}
})(JSBookSearch);

