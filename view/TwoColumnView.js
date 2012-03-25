(function(lib){
	var view = lib.util.extendNamespace("view");
	
	
	/**
	 * displays 2 columns side by side. 
	 * you can specify min widths, and percentages of view each column can take up
	 * @param {object} left the left column
	 * @param {object} right the right column
	 * @param {int} [gapWidth=0] optional gap between the 2 columns. only shows when they are both visible
	 * @param {view.View} object.view the view object
	 * @param {int} object.minWidth the minumum width of the view
	 * @param {int} object.percent the percentage of the column view the view should cover
	 * @param {$(DomNode)} [object.switchColumnView] the view to display at the bottom of the column if only one is shown that when clicked will bring you back to the other column
	 */
	view.TwoColumnView = function(left, right, gapWidth) {
		this._columnFocus = view.TwoColumnView.LEFT;
		this._singleColumn = false;
		this._fluidFixed = false;
		this._fluidSize = null;
		this._gapWidth = gapWidth ? gapWidth : 0;
		
		
		
		
		this._left = left;
		this._right = right;
		this._leftDom = lib.dom.create({
			tag : 'div',
			options : {domClass : lib.constants.css.twoColumnViewColumn},
			children : [left.view.getDomNode(), left.switchColumnView],
			jquery : true
		});
		
		
		this._rightDom = lib.dom.create({
			tag : 'div',
			options : {domClass : lib.constants.css.twoColumnViewColumn},
			children : [$(right.view.getDomNode()).css('left',this._gapWidth + 'px'), right.switchColumnView],
			jquery : true
		});
		
		
		
		right.view.init();
		left.view.init();
		
		
		this._wrapper = lib.dom.create({
			tag : 'div',
			options : {domClass : lib.constants.css.twoColumnViewShifter},
			children : [this._leftDom, this._rightDom],
			jquery : true
		});
		
		this._container = lib.dom.create({
			tag : 'div',
			options : {domClass : lib.constants.css.twoColumnView},
			children : this._wrapper,
			jquery : true
		});
		
		this._leftDom.css({
			'min-width': left.minWidth + 'px',
			right : (100 - left.percent) + '%' 
		});
		this._rightDom.css({
			'min-width': right.minWidth + 'px',
			left : (100 - right.percent) + '%'
		});
		var self = this;
		$(window).resize(function(){
			self.redraw();
		});
		
		var switchToLeftFn = function(){
			self.setColumnFocus(view.TwoColumnView.LEFT);
		}
		
		var switchToRightFn = function(){
			self.setColumnFocus(view.TwoColumnView.RIGHT);
		}
		
		if(left.switchColumnView) {
			lib.dom.click(left.switchColumnView, switchToRightFn);
		}
		
		if(right.switchColumnView) {
			lib.dom.click(right.switchColumnView, switchToLeftFn);
		}
		
		
	}
	
	view.TwoColumnView.LEFT = 0;
	view.TwoColumnView.RIGHT = 1;
	
	
	/**
	 * sets which column has focus. It doesn't really matter if the view is large enough to show
	 * both columns, but when it's too small it determines which column is visible
	 * @param {LEFT|RIGHT} column int constant for what side
	 */
	view.TwoColumnView.prototype.setColumnFocus = function(column) {
		this._columnFocus = column;
		if(this._singleColumn) {
			
			this._wrapper.animate({
				left : (-100 * column) + '%' 
			},200);
		}
	}
	
	
	view.TwoColumnView.prototype.redraw = function() {
		var width = this._container.width();
		var left = this._left;
		var right = this._right;
		
		if( width < left.minWidth + right.minWidth + this._gapWidth ) {
			if(!this._singleColumn) {
				// set to single column
				$(this._right.view.getDomNode()).css('left','0px');
				this._wrapper.css({
					width:'200%',
					left : (-100 * this._columnFocus) + '%' 
				});
				this._singleColumn = true;
				this._fluidFixed = false;
				this._
				this._leftDom.css('right','50%');
				this._setMinWidth(this._leftDom);
				this._setMinWidth(this._rightDom);
				this._rightDom.css('left','50%');
				this._showSwitchColumnView(this._right);
				this._showSwitchColumnView(this._left);
			}

		} else {
			if(this._singleColumn) {
				// set to two column
				this._wrapper.css({
					width:'100%',
					left : 0 
				});
				$(this._right.view.getDomNode()).css('left', this._gapWidth + 'px');
				this._setMinWidth(this._leftDom, this._left.minWidth);
				this._setMinWidth(this._rightDom, this._right.minWidth);
				this._leftDom.css('right',(100 - this._left.percent) + '%');
				this._rightDom.css('left',(100 - this._right.percent) + '%');
				this._singleColumn = false;
				this._hideSwitchColumnView(this._right);
				this._hideSwitchColumnView(this._left);
				this.redraw();
				return;
			}
			if(!this._fluidFixed) {
				if(this._leftDom.width() == left.minWidth) {
					this._sizeColumn(view.TwoColumnView.RIGHT);
				
				} else if(this._rightDom.width() == right.minWidth + this._gapWidth) {
					this._sizeColumn(view.TwoColumnView.LEFT);
					
				}
			} else {
				var fixedDom, fixed, fluidDom, fluid, positionProperty, gapWidth;
				
				if(this._fluidSide == view.TwoColumnView.LEFT) {
					fixedDom = this._rightDom;
					fixed = this._right;
					gapWidth = this._gapWidth;
					fluidDom = this._leftDom;
					fluid = this._left;
					positionProperty = 'right';
				} else {
					fixedDom = this._leftDom;
					fixed = this._left;
					gapWidth = 0;
					fluidDom = this._rightDom;
					fluid = this._right;
					positionProperty = 'left';
				}
				
				if(fixedDom.width() > fixed.minWidth + gapWidth) {
					this._fluidFixed = false;
					fluidDom.css(positionProperty, (100 - fluid.percent) + '%');
				}
			}
		}
		
		this._left.view.redraw();
		this._right.view.redraw();
	}
	
	/**
	 * sizes the fluid column so that it does not overflow into the fixed size column
	 * @param {LEFT|RIGHT} fluidSide int constant of which side is fluid or fixed
	 */
	view.TwoColumnView.prototype._sizeColumn = function(fluidSide) {
		this._fluidFixed = true;
		this._fluidSide = fluidSide;
		var fixedWidth, fluid, positionProperty;
		
		if(fluidSide == view.TwoColumnView.LEFT) {
			fixedWidth = this._right.minWidth;
			fluid = this._leftDom;
			positionProperty = 'right';
		} else {
			fixedWidth = this._left.minWidth;
			fluid = this._rightDom;
			positionProperty = 'left';
		}
		
		fluid.css(positionProperty, fixedWidth + 'px');
		
	}
	
	view.TwoColumnView.prototype._showSwitchColumnView = function(column) {
		if(column.switchColumnView) {
			var view = column.switchColumnView;
			view.css('display','block');
			var height = view.outerHeight();
			$(column.view.getDomNode()).css('bottom',height + 'px');
			
		}
	}
	
	view.TwoColumnView.prototype._hideSwitchColumnView = function(column) {
		if(column.switchColumnView) {
			var view = column.switchColumnView;
			var height = view.outerHeight();
			$(column.view.getDomNode()).css('bottom','0px');
			view.css('display','none');
		}
	}
	
	view.TwoColumnView.prototype._setMinWidth = function(obj, intVal) {
		if(!intVal) {
			intVal = 0;
		}
		obj.css('min-width', intVal + 'px');
	}
	
	lib.util.extend(view.TwoColumnView, view.View);
	
})(JSBookSearch);