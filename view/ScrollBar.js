(function(lib){
	var view = lib.util.extendNamespace("view");
	/**
	 * adds a scroll bar to a view
	 * @param {domNode} container container to be made scrollable
	 * @param {domNode} [child] optionally specify the child element, otherwise it will grab it for you.
	
	 */
	view.ScrollBar = function(container, child) {
		var self = this;
		if(!view.ScrollBar.systemScrollBarWidth) {
		    this._findScrollBarWidth();
		}
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
		
		this._mouseEventState = {};
		
		
		this._scrollPosition = 0;
		
		this._handleHeight = 0;
		this._gutterHeight = 0;
		this._mouseMoveFunction = function(e) {
			self._mouseMove(e);
		}
		
		this._mouseUpFunction = function(e) {
			self._mouseUp(e);
		}
		this._parent.css('right',-view.ScrollBar.systemScrollBarWidth + 'px');
		
	}
	
	view.ScrollBar.prototype.init = function() {
		var self = this;
		this._parent.after(this._gutter);
		this.redraw();
	    this._parent.scroll(function(){
			self._scrollEvent.apply(self, arguments);
		});
		this._handle.mousedown(function(){
			self._mouseDown.apply(self, arguments);
		});
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
			this._gutter.css('visibility','hidden');
	
		} else {
		    
			this._gutter.css('visibility','visible');
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
		return newPos;
		
	}
	
	
	/* * * Event Handlers * * */
	
	view.ScrollBar.prototype._mouseMove = function(e) {
		e.preventDefault();
		var state = this._mouseEventState;
		var mouseDistance = e.pageY - state.globalPX;
		var percent = (state.gutterPX + mouseDistance) / (this._gutterHeight - this._handleHeight);
		var distance = this._scrollPosition - ((this._realHeight -this._height) * percent);
		
		this._scrollDistanceY(-distance);
		this._positionHandle();
		
		// shouldn't do this off handle, do it off scroll height of container instead'
		
		
		
	}
	
	view.ScrollBar.prototype._mouseDown = function(e) {
		e.preventDefault();
		var self = this;
		$(window).mousemove(
			this._mouseMoveFunction
		).mouseup(
			self._mouseUpFunction
		);
		
		var state = this._mouseEventState;
		state.gutterPX = parseInt(this._handle.css('top'));
		state.globalPX = e.pageY;

	}
	
	view.ScrollBar.prototype._mouseUp = function(e) {
		$(window).unbind('mousemove', this._mouseMoveFunction).unbind('mouseup', this._mouseUp);
	}
	
	view.ScrollBar.prototype._mouseWheelMove = function(e, d, dx, dy) {
		if(dy == 0) return;
		var newPos = this._scrollDistanceY(-dy * lib.constants.scrollBar.mouseWheelSpeed);
		this._positionHandle();
		if(newPos == 0) {
		    e.preventDefault();
		}
	}
	
	view.ScrollBar.prototype._scrollEvent = function() {
	    this._setScrollPosition();
	    this._positionHandle();
	}
	
	view.ScrollBar.prototype._findScrollBarWidth = function() {
	    var originalWidth = 30;
	    var test = $('<div style="width:' + originalWidth + 'px; height:10px; overflow-y:scroll; visibility:hidden;">' + 
	                    '<div style="height:60px;"></div></div>');
	    $('body').append(test);
	    var newWidth = test.children().width();
	    test.remove();
	    view.ScrollBar.systemScrollBarWidth = originalWidth - newWidth;
	}
	

	lib.util.extend(view.ScrollBar, view.View);
	
})(JSBookSearch);



