(function(lib){
	var view = lib.util.extendNamespace("view");
	/**
	 * adds a scroll bar to a view
	 * @param {domNode} container container to be made scrollable
	 * @param {domNode} [child] optionally speficy the child element, otherwise it will grab it for you.
	
	 */
	view.ScrollBar = function(container, child) {
		var self = this;
		this._parent = $(container);
		this._wrapper = child ? child : this._parent.children();
		
		this._handle = lib.dom.create({
			tag : 'div',
			options : {domClass : lib.constants.css.scrollBarHandle},
			jquery : true
		});
		
		this._gutter = lib.dom.create({
			tag : 'div',
			options : {domClass : lib.constants.css.scrollBarGutter},
			jquery : true,
			children : this._handle
		});
		
		
		
		this._mousePositionY = null;
		this._mouseGrabPostionY = null;
		this._scrollPosition = 0;
		
		this._handleHeight = 0;
		this._gutterHeight = 0;
		this._mouseMoveFunction = function(e) {
			self._mouseMove(e);
		}
		
		this._parent.mousewheel(function(){
			self._mouseWheelMove.apply(self, arguments);
		});
		
		window.scroll = this;
		
	}
	
	view.ScrollBar.prototype.init = function() {
		this._parent.after(this._gutter);
		this.redraw();
	}
	
	view.ScrollBar.prototype.redraw = function() {
		this._setHeights();
		this._setScrollPosition();
		this._drawHandle();
		this._positionHandle();
		
		
	}
	
	view.ScrollBar.prototype._setHeights = function() {
		this._height = this._parent.height();
		this._realHeight = this._wrapper.outerHeight();
		this._gutterHeight = this._gutter.height();
	
		var handleHeight = (this._realHeight == 0 || this._realHeight <= this._height) ? this._gutterHeight : Math.round((this._height / this._realHeight) * this._gutterHeight);
		
		if(handleHeight < lib.constants.scrollBar.minHandleSize) handleHeight = lib.constants.scrollBar.minHandleSize;
		this._handleHeight = handleHeight;
	}
		
	
	view.ScrollBar.prototype._setScrollPosition = function() {
		this._scrollPosition = this._parent.scrollTop();
	}
	
	view.ScrollBar.prototype._getOffsetHeight = function() {
		return this._realHeight - this._height;
	}
	
	view.ScrollBar.prototype._getHandleOffsetHeight = function() {
		return this._gutterHeight - this._handleHeight;
	}
	
	view.ScrollBar.prototype._positionHandle = function() {
		var percent = this._scrollPosition / this._getOffsetHeight();
		var top = this._getHandleOffsetHeight() * percent;
		this._handle.css('top', top + 'px');
	}
	
	view.ScrollBar.prototype._drawHandle = function() {
		if(this._handleHeight == this._gutterHeight) {
			this._handle.css('visibility','hidden');
	
		} else {
			this._handle.css('visibility','visible');
			this._handle.css('height', this._handleHeight + 'px');
		}
		
	}

	view.ScrollBar.prototype._scrollDistanceY = function(distY) {
		var newPos = this._scrollPosition + distY;
		if(distY > 0) {
			var offset = this._getOffsetHeight();
			if(this._scrollPosition == offset) return;
			if(offset < newPos) newPos = offset;
		} else {
			if(this._scrollPosition == 0) return;
			if(newPos < 0) newPos = 0;
		}
		
		
		this._parent.scrollTop(newPos);
		this._setScrollPosition();
		
	}
	
	view.ScrollBar.prototype._moveHandleDistanceY = function(distY) {
		
	}
	
	
	
	/* * * Event Handlers * * */
	
	view.ScrollBar.prototype._mouseMove = function(e) {
		
	}
	
	view.ScrollBar.prototype._mouseDown = function(e) {
		
		$(window).mousemove(this._mouseMoveFunction);
		this._mouseGrabPositionY = e.pageY - this.offsetTop;
		this._mousePosition = e.pageY;
	}
	
	view.ScrollBar.prototype._mouseUp = function(e) {
		$(window).unbind('mousemove', this._mouseMoveFunction);
	}
	
	view.ScrollBar.prototype._mouseWheelMove = function(e, d, dx, dy) {
		if(dy == 0) return;
		this._scrollDistanceY(-dy * lib.constants.scrollBar.mouseWheelSpeed);
		this._positionHandle();
	}
	
	
	
	
	
	
	
})(JSBookSearch);



