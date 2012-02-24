var vScrollBar = function(container, options) {
	
	
	
	/*var handle, content, realHeight, height, scrollPosition, handleHeight, prevMousePos, mouseOffset, handleDistToTop;
	var heightElement;
	function __ScrollBar() {
		content = parent.children();
		makeElements();
		
		content.scroll(positionHandle);
		
		heightElement = content.wrapInner('<div style="overflow:auto;" />').children();
		resize();
		Function.registry.call('resize');
		Function.registry.listen('resize',resize);
		var close = handle.parent();
		close.mousedown(gutterMousePress);
	}
	
	function makeElements() {
		var elem = $('<div></div>'), elem2;
		handle = $('<div></div>');
		elem.append(handle);
		elem.css('display','none');

		elem2 = $('<div class="scroll"></div>').append(elem);
		
		parent.prepend(elem2);
		
	}
	
	function resize() {
		
		
		height = content.height();
		
		scrollPosition = content.scrollTop();
		
		realHeight = heightElement.height();
		
		
		content.scrollTop(scrollPosition);
		var percent = (height/realHeight)*100;
		if(percent > 100) percent = 100;
		handleHeight = height* percent * .01;
		handle.css('height', percent + '%');
		
		positionHandle();
		if(percent == 100) {
			//handle.parent().stop().animate({'opacity':0}, 2000);
			handle.parent().css('display','none');
	
		} else if(handle.parent().css('display') != 'block') {
			
			handle.parent().css('display','block');
			
			
		}
		
	}
	
	function positionHandle() {
		scrollPosition = content.scrollTop();
		var handlePosition = ((scrollPosition)/(realHeight))*100;
		handle.css('top', handlePosition + '%');
	}
	
	function shiftHandle(offset) {
		var currentLocation = height * (parseInt(handle.css('top')) * .01);
		
		var newLocation = currentLocation + offset;
		if(newLocation < 0) newLocation = 0;

		else if(newLocation > height - handleHeight) newLocation = height - handleHeight;
		
		handle.css('top',(newLocation/height)*100 + '%');
	} 
	
	function setHandle(position) {
		var dif = height - handleHeight;
		if(position < 0) position = 0;

		else if(position > dif) position = dif;
		
		handle.css('top',(position/height)*100 + '%');
		
		var scroll = realHeight * (position / height);
		
		content.scrollTop(scroll);
	}
	
	
	
	function onDrag(event) {
	
		var newPos = event.pageY - prevMousePos + (mouseOffset - handleDistToTop);
		setHandle(newPos);
	}
	
	function onUpClick(event) {

		$('html').unbind('mouseup', onUpClick).unbind('mousemove', onDrag);
		
	}
	
	function gutterMousePress(event) {
		if(event.target != handle.get(0)) {
			
			var newPos = getOffset(event) - handleHeight/2;

			handleDistToTop = handleHeight/2;

			setHandle(newPos);

		} else {
			handleDistToTop = getOffset(event) - height * (parseInt(handle.get(0).style.top) * .01);
		}
		
		prevMousePos = event.pageY;
		mouseOffset = getOffset(event);

		$('html').mouseup(onUpClick).mousemove(onDrag);

	}
	
	function getOffset(event) {
		if(event.layerY != undefined) {
			return event.layerY;
		} else {
			return event.offsetY;
		}
	}
	
	__ScrollBar();
	
}*/

}