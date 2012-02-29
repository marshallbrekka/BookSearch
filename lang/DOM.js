function DOM() {

}

/**
 * creates a dom element 
 * @param {object} args hash of arguments
 * @param {string} args.tag tag name
 * @param {object} args.options property list of attributes (class must be domClass)
 * @param {object} args.css property list of css attributes and values
 * @param {array} args.children array of child elements, will be added in the array order
 * @param {bool} args.jquery if true returns jquery object, else returns the dom node, defualts to false
 */
DOM.prototype.create = function(args) {
	var options = args.options, tag = args.tag, css = args.css, 
		text = args.text, children = args.children, jquery = args.jquery;
	var element = $('<' + tag + '></' + tag + '>');
	if(options) {
		for(var key in options) {
			var val = options[key];
			
			if(key == 'domClass') key = 'class';
			
			if(key == 'class' || key == 'id') {
				if(val instanceof Array) {
					for(var i = 0; i < val.length; i++) {
						val[i] = mConstants.domPrefix + val[i];
					}
				} else {
					val = mConstants.domPrefix + val;
				}
			}
			
			if(val instanceof Array) {
				var concat = '';
				for(var y = 0; y < val.length; y++) {
					concat += val[y] + ' ';
				}
				val = concat;
			}
			element.attr(key, val);
		}
	}
	if(css) {
		element.css(css);
	}
	
	if(text) {
		element.text(text);
	}
	if(children) {
		for(var x in children) {
			element.append(children[x]);
		}
	}
	
	if(jquery) {
		return element;
	} else return element.get(0);
	
}

DOM.prototype.addClass = function(obj, domClass) {
	$(obj).addClass(mConstants.domPrefix + domClass);
}

DOM.prototype.removeClass = function(obj, domClass) {
	$(obj).removeClass(mConstants.domPrefix + domClass);
}

DOM.prototype.click = function(obj, func) {
	if(mApp.mobile) {
		console.log('mobile not implemented yet');
	} else {
		$(obj).click(func);
	}
}

/** 
 * same as jquery on method, but will auto decide between click and touch based events
 */
DOM.prototype.onClick = function(obj, selector, func) {
	var event = "click"
	
	if(mApp.mobile) {
		console.log('mobile not implemented yet');
	} 
	$(obj).on(event, "li", func);
}

var DOM = new DOM();

