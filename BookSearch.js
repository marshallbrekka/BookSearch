var BookSearch = (function(){
     var lib = lib ? lib : {};
     
     lib.init = function(options) {
        config('apiKey', options.apiKey);
        config('bookImageSmall', options.bookImageSmall);
        config('bookImageLarge', options.bookImageLarge);
        
        lib.api.init(lib.config.apiKey, lib.config.bookImageSmall, lib.config.bookImageLarge);
        var api = lib.api;
        
        api.merchants(addMerchants);

        new lib.controller.MainPage(options.container);  
        
        
        function config(key, val) {
            if(val) {
                lib.config[key] = val;
            }  
        }

        function addMerchants(data) {
            lib.app.addMerchants(data);
        }
    };



/*
    json2.js
    2011-10-19

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON;
if (!JSON) {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
    lib.util = {};
	var util = lib.util;
    

    /**
     * extends the application to create the appropriate namespace specified
     * @param {string} ns_string namespace string "obj.subobj.subsubobj"
     */
    util.extendNamespace = function (ns_string) {  
        var parts = ns_string.split('.'),  
            parent = lib,  
            pl, i;  
        if (parts[0] === "lib") {  
            parts = parts.slice(1);  
        }  
        pl = parts.length;  
        for (i = 0; i < pl; i++) {  
            //create a property if it doesnt exist  
            if (typeof parent[parts[i]] === 'undefined') {  
                parent[parts[i]] = {};  
            }  
            parent = parent[parts[i]];  
        }  
        return parent;  
    } ;

	/**
	 * checks if the value is empty or not
	 * @param {object|number|string|function| val the value to check
	 */
	util.empty = function(val) {
		return (val === undefined || val === null || val == "");
	}

	/**
	 * returns a function that binds the object as "this" to the provided function
	 * @param {object} obj the object to use
	 * @param {function} fn the function to bind obj to
	 */
	util.bind = function(obj, fn) {
		return function() {
			return fn.apply(obj, arguments);
		}
	}
	
	




/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 * http://ejohn.org/blog/simple-javascript-inheritance/
 * var Person = Class.extend({
  init: function(isDancing){
    this.dancing = isDancing;
  },
  dance: function(){
    return this.dancing;
  }
});
var Ninja = Person.extend({
  init: function(){
    this._super( false );
  },
  dance: function(){
    // Call the inherited version of dance()
    return this._super();
  },
  swingSword: function(){
    return true;
  }
});
 */
// Inspired by base2 and Prototype

  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
  // The base Class implementation (does nothing)
  
  lib.Class = function(){};
  
  // Create a new Class that inherits from this class
  lib.Class.extend = function(prop) {
    var _super = this.prototype;
    
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
    
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" && 
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
            
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
            
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
            
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
    
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
    
    // Populate our constructed prototype object
    Class.prototype = prototype;
    
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;
    
    return Class;
  };



	var constants = lib.util.extendNamespace('constants');

	constants.Condition = {'NEW' : 0, 'USED' : 1, 'EBOOK' : 2, 'RENTAL' : 3};
	constants.domPrefix = "bs-";
	
	constants.scrollBar = {
		minHandleSize : 50,
		mouseWheelSpeed : 50
	}

	constants.css = {
		
		twoColumnView : 'two_column_view',
		twoColumnViewColumn : 'two_column_view_column',
		twoColumnViewShifter : 'two_column_view_shifter',
		twoColumnViewSwitchButton : 'two_column_view_switch_button',
		selected : 'selected',
		imageBox : 'image_box',
		bookImage : 'book_img', 
		bookSizeSmall : 'book_img_small',
		bookSizeLarge : 'book_img_large',
		list : 'list',
		listBooks : 'list_books',
		emptyIndicator : 'empty_indicator',
		empty : 'empty',
		loading : 'loading',
		listItem : 'list_item',
		listItemFade : 'list_item_fade',
		listTextDark : 'list_text_dark',
		listTextMedium : 'list_text_medium',
		listTextLight : 'list_text_light',
		listBookItem : 'list_book_item', 
		listBookItemTitle : 'list_book_item_title',
		listBookItemMetaText : 'list_book_item_meta_text',
		listLoadMore : 'list_load_more',
		listOfferItem : 'list_offer_item',
		listOfferItemImage : 'list_offer_item_image',
		listOfferItemPrice : 'list_offer_item_price',
		listOfferItemShipping : 'list_offer_item_shipping',
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
		bookDetailsText : 'book_details_text',
		scrollBarParent : 'scroll_bar_parent',
		scrollBarGutter : 'scroll_bar_gutter',
		scrollBarHandle : 'scroll_bar_handle',
		keywordInput : 'keyword_input',
		keywordInputForm : 'keyword_input_form',
		keywordInputTextField : 'keyword_input_text_field',
		keywordInputTextFieldWrapper : 'keyword_input_text_field_wrapper',
		keywordInputSubmit : 'keyword_input_submit'
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
		},
		listOffersLabels : {
			emptyList : 'No Prices Found',
			totalPrice : 'Total Price',
			shipping : 'shipping'
		},
		keywordInput : {
			defaultText : 'Title, Author, ISBN, Keywords',
			submit : 'Search'
		}
	};
	
	constants.resources = {
		images : {
			ajaxLoaderOnWhite : 'img/loader-on-white.gif'
		}
	};


	var config = lib.util.extendNamespace('config');
	config.apiKey = 'T4C4ZN2TtXhaUfq0Hq6z';
    config.bookImageSmall = 66;
    config.bookImageLarge = 130;



	var dom = lib.util.extendNamespace("dom");



	/**
	 * creates a dom element 
	 * @param {object} args hash of arguments
	 * @param {string} args.tag tag name
	 * @param {object} args.options property list of attributes (class must be domClass)
	 * @param {object} args.css property list of css attributes and values
	 * @param {array} args.children array of child elements, will be added in the array order
	 * @param {bool} args.jquery if true returns jquery object, else returns the dom node, defualts to false
	 */
	dom.create = function(args) {
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
							val[i] = lib.constants.domPrefix + val[i];
						}
					} else {
						val = lib.constants.domPrefix + val;
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
			if(children instanceof Array) {
				for(var x in children) {
					element.append(children[x]);
				}	
			} else {
				element.append(children);
			}
			
		}

		if(jquery) {
			return element;
		} else return element.get(0);

	}

	dom.addClass = function(obj, domClass) {
		$(obj).addClass(lib.constants.domPrefix + domClass);
	}

	dom.removeClass = function(obj, domClass) {
		$(obj).removeClass(lib.constants.domPrefix + domClass);
	}
	
	
	
	/**
	 * sets the id of the object
	 * @param {domNode} obj the object to set the id for
	 * @param {string} [id] if no id is passed in it set the id to null
	 */
	dom.setId = function(obj, id) {
		if (!id) id = "";
		$(obj).attr('id', lib.constants.domPrefix + id);
	}

	dom.click = function(obj, func) {
		if(lib.app.mobile) {
			console.log('mobile not implemented yet');
		} else {
			$(obj).click(func);
		}
	}

	/** 
	 * same as jquery on method, but will auto decide between click and touch based events
	 */
	dom.onClick = function(obj, selector, func) {
		var event = "click"

		if(lib.app.mobile) {
			console.log('mobile not implemented yet');
		} 
		$(obj).on(event, "li", func);
	}
	
	






    var app = lib.util.extendNamespace("app");

    var merchants = {},
        useStorage = window.localStorage === undefined ? false : true;
    if(useStorage) {
        var tmp = JSON.parse(localStorage.getItem('merchants'));
        merchants = (tmp === null) ? merchants : tmp;
    }

    app.mobile = false;

    app.addMerchants = function(merchantsXHR) {
        if(merchantsXHR.status) {
            var locMerchants = merchantsXHR.data;
            var modified = false;
            for(var i = 0; i < locMerchants.length; i++) {
                var temp = locMerchants[i];
                if(merchants[temp.id] === undefined) {
                    merchants[temp.id] = temp;
                    modified = true;
                }
            }

            if(useStorage && modified) {
                localStorage.setItem('merchants', JSON.stringify(merchants));
            }
        }
    };
    
    app.getMerchant = function(id) {
        return merchants[id];
    };

// require mBook, mBookOffers, mMerchant


    var api = lib.util.extendNamespace("api");
    api.API_KEY = null;
    api.IMG_SIZE_SM = null;
    api.IMG_SIZE_LG = null;
    api.BASE_URL = 'http://api2.campusbooks.com/12/rest/';

    api.init = function(API_KEY, IMG_SIZE_SM, IMG_SIZE_LG) {
        api.API_KEY = API_KEY;
        api.IMG_SIZE_SM = IMG_SIZE_SM;
        api.IMG_SIZE_LG = IMG_SIZE_LG;
        this._requestId = 0;
    }
    
    


    
    api.bookPrices = function(isbn, callback) {
        return api._genericSystem('prices', {'isbn':isbn}, api._bookPrices, callback, 20000);
    }

    api.bookInfo = function(isbn, imgSize, callback) {
        // not using because returns inferior results to search function
        //this._genericSystem('bookinfo', {'isbn':isbn,'image_width':imgWidth}, this._bookInfo, callback);

        return api._genericSystem(
            'search',
            {'keywords':isbn,'page':1, image_height : imgSize}, 
            api._bookInfo, 
            callback,
            10000,
            imgSize
        );
    }

    
    /**
     * performes a search using the provided keywords and page
     * @param {string} keywords the search terms
     * @param {IMG_SIZE_SM|IMG_SIZE_LG} imgSize determines the size of the image that will be returned for the results
     * @param {int} page the page of results to return
     * @param {function({boolean status, obj data, int id})} callback the callback function to be called when the request finishes
     * @return {int} the unique id for this request
     */
    api.search = function(keywords, imgSize, page, callback) {
        return api._genericSystem(
            'search', 
            {'keywords':keywords, 'page':page, image_height : imgSize}, 
            api._search, 
            callback,
            10000
        );
    }

    /*
    api.bookPricesAndInfo = function(isbn, imgWidth, callback) {
        var self = this;
        this._genericSystem(
            'bookprices', 
            {'isbn':isbn, 'img_width':imgWidth}, 
            function(data){
                self._bookPricesAndInfo.call(self, data);
            },
            callback
        );
    }
    */


    api.merchants = function(callback) {
        return api._genericSystem('merchants', {'coupons':''}, api._merchants, callback, 15000);
    }


    api._bookPrices = function(data) {
        if(data.offers === undefined) return null;
        var offers = new lib.model.BookOffers(data.offers.condition);
        return offers;
    }

    // based off data returned from search function
    api._bookInfo = function(data, optionalData) {
        if(data.results === undefined) return null;
        var tmp = data.results.book;
        if(tmp.length == 0) return null;
        var book = new lib.model.Book(tmp[0]);
        
        if(optionalData == api.IMG_SIZE_LG) {
            book.imageLarge = book.imageSmall;
            book.imageSmall = null;
        }
        
        
        return book;
    }

    // based off data returned from bookInfo function
    api._bookInfoHelper = function(data) {
        if(data.book === undefined) return null;
        return new lib.model.Book(data.book);
    }


    /*
     * return object
     * @param {object} data
     * @return {object} [int] obj.pages, [int] obj.page, [Book] obj.books
     * 
     */
    api._search = function(data) {
        if(data.results == undefined) return null;
        var results = {
            pages : parseInt(data.pages),
            page : parseInt(data.current_page)
        };
        var books = [];

        var tmp = data.results.book;

        for(var i = 0; i < tmp.length; i++) {
            books.push(new lib.model.Book(tmp[i]));
        }

        results.books = books;
        return results;
    }


    api._bookPricesAndInfo = function(data) {
        var book = this._bookInfoHelper(data);
        if(book == null) return null;
        book.offers = this._bookPrices(data);
        return book;
    }


    api._merchants = function(data) {
        var merchants = [];
        for(var i = 0; i < data.merchant.length; i++) {
            merchants.push(new lib.model.Merchant(data.merchant[i]));
        }

        return merchants;
    }

    api._genericSystem = function(func, params, dataFunc, callback, timeout, optionalData) {
        var requestId = this._requestId++;
        this._buildQuery(func, params, function(data, status) {
            var output = {status:true, data:null, id : requestId};
            if(status !== 'success' || data.response['@attributes'].status !== "ok") {
                output.status = false;
            } else {
            
                output.data = dataFunc(data.response.page, optionalData);
            }
            
            callback(output);
        }, timeout);
        return requestId;
    }

    api._buildQuery = function(func, params, callback, timeout) {
        var full = this.BASE_URL + func + "?";
        full += "key=" + this.API_KEY + "&format=json";
        for(var key in params) {
            if (params.hasOwnProperty(key)) {
                full += "&" + key + '=' + params[key];
            }
        }

        return this._loadQuery(full, callback, timeout);
    }

    api._loadQuery = function(url, callback, timeout) {
       
        $.ajax({
            url: url,
            dataType: 'jsonp',
            data: '',
            success: callback,
            error : callback,
            timeout : timeout
        });
    }
    
    
// abstract class

    var model = lib.util.extendNamespace("model");

    model.APIObject = lib.Class.extend({
        loadProperties : function(obj, props) {
            for(var name in props) {
                if(props.hasOwnProperty(name)) {
                    var val = obj[name];
                    var newName = props[name] !== null ? props[name] : name;

                    if(val === '' || val === undefined) {
                        this[newName] = null;
                    } else {
                        this[newName] = val;
                    }
                }
            }
        }
    });
// require mAPIObject

    var model = lib.util.extendNamespace("model");

    model.Book = model.APIObject.extend({
        init : function(book) {
            var propertyNames = {
                isbn10:null,
                isbn13:null,
                title:null,
                author:null,
                binding:null,
                msrp:null,
                pages:null,
                publisher:null,
                published_date:'publishedDate',
                edition:null,
                image:'imageSmall'
            };


            this.loadProperties(book, propertyNames);

            this.offers = null;
            this.imageLarge = null;

        }
        
    });

    
// require lib.constants

    var model = lib.util.extendNamespace("model");
    model.BookOffers = lib.Class.extend({
        init : function (offerList) {
    
            this.types = [[],[],[],[]];

            for(var i = 0; i < offerList.length; i++) {
                var offers = offerList[i];
                var type = this.getOfferCondition(offers['@attributes'].id);
                if(type !== undefined) {
                    for(var y = 0; y < offers.offer.length; y++) {
                        this.types[type].push(new model.Offer(offers.offer[y]));
                    }
                    //this.types[type] = this.types[type].concat(offers.offer);
                }

            }

            for(i = 0; i < this.types.length; i++) {
                this.types[i].sort(compare);
            }

            function compare(a, b) {
                a = a.total_price;
                b = b.total_price;
                return a > b ? 1 : (a < b ? -1 : 0);
            }

            return this;
        },

        getOfferCondition : function (condition) {
            
            var cons = lib.constants.Condition;

            if(condition == 1) return cons.NEW;
            if(condition == 0 || condition == 2 || condition == 4 || condition == 7) return cons.USED;
            if(condition == 5) return cons.EBOOK;
            if(condition == 6) return cons.RENTAL;
            return cons.USED;

        }
    });
// require mAPIObject

    var model = lib.util.extendNamespace("model");
    /**
     * takes a merchant json object (refer to campusbooks documentation)
     * @param {object} merchant merchants json object
     */
    model.Merchant = model.APIObject.extend({
        init : function(merchant) {
            var propertyNames = {
                image:null,
                merchant_id:'id',
                name:null
            };
            this.loadProperties(merchant, propertyNames);

            var coupons = merchant.coupons.coupon;
            if(coupons !== undefined) {
                this.coupons = coupons;
            } else {
                this.coupons = null;
            }


        }
    });

// require mAPIObject

    var model = lib.util.extendNamespace("model");
    model.Offer = model.APIObject.extend({
        init : function(offer) {
            var propertyNames = {
                condition_id:'conditionId',
                link:null,
                merchant_id:'merchant',
                price:null,
                shipping_ground:'shippingPrice',
                total_price:'totalPrice'
            };


            this.loadProperties(offer, propertyNames);
            this.merchant = lib.app.getMerchant(this.merchant);

        }
    });

    

    var view = lib.util.extendNamespace("view");
    
    /**
     * base class for all view classes 
     * @class
     * @property {domNode} _container the top level dom node for this view
     */
    view.View = lib.Class.extend({
        /**
         * call when view object has been appended to a container
         */
        build : function(){},
        /**
         * call when dimmensions or visibility of container have changed
         */
        redraw : function(){},
        getDomNode : function () {
            if(this._container) return this._container;
            return null;
        }
    });
    
    
    


    var view = lib.util.extendNamespace("view");
    
    view.ListItem = view.View.extend({
        

        /**
         * creates the dom for a list item of a book
         * @constructor
         * @param {domNodes[]} [children=[]] array of dom nodes to append
         * @param {boolean} [fadeRight=false] sets if the right edge should fade out
         */
        init : function(children, fadeRight) {
            if(!children) children = [];
            if(fadeRight) {
                children.unshift(this._addFadingEdge());
            }
            this._container = lib.dom.create({
                tag : 'li',
                options : {domClass: lib.constants.css.listItem},
                jquery : true,
                children : children
            });

            
        },

        _addFadingEdge : function() {
            return lib.dom.create({
                    tag : 'div',
                    options : {domClass : lib.constants.css.listItemFade}
                });
        },

        select : function() {
            lib.dom.addClass(this.getDomNode(), lib.constants.css.selected);
        },

        deselect : function() {
            lib.dom.removeClass(this.getDomNode(),lib.constants.css.selected);
        }
    });
    
    

    var view = lib.util.extendNamespace("view");
    view.ListItemBook = view.ListItem.extend({
        /**
         * creates the dom for a list item of a book
         * @constructor
         * @param {model.Book} book 
         */
        init : function(book) {
            var img = lib.dom.create({
                tag : 'div',
                options : {domClass: [
                    lib.constants.css.imageBox,
                    lib.constants.css.bookImage, 
                    lib.constants.css.bookSizeSmall
                ]},
                css : {
                    'background-image' : 'url("' + book.imageSmall + '")'
                }
            });

            var title = lib.dom.create({
                tag : 'div',
                options : {domClass : [lib.constants.css.listBookItemTitle, lib.constants.css.listTextDark]},
                text : book.title
            });

            var keys = lib.constants.strings.bookMetaNames;
            var metaKeys = [keys.author, keys.isbn10, keys.isbn13];
            var metaVals = [book.author, book.isbn10, book.isbn13];
            var elements = [img, title];

            // build elements for meta info, and add the to elements array
            for(var i = 0; i < metaKeys.length; i++) {
                if ( !lib.util.empty(metaVals[i]) ) {
                    var keyElem = lib.dom.create({
                        tag : 'span',
                        options : {domClass : lib.constants.css.listTextLight},
                        text : metaKeys[i] + ':'
                    });
                    var whole = lib.dom.create({
                        tag : 'div',
                        options : {domClass : [lib.constants.css.listBookItemMetaText, lib.constants.css.listTextMedium]},
                        children : [keyElem, metaVals[i]]
                    });
                    elements.push(whole);
                }
            }


            this._super(elements, true);
            lib.dom.addClass(this._container, lib.constants.css.listBookItem);


        }
    });



    var view = lib.util.extendNamespace("view");
    
    view.ListItemOffer = view.ListItem.extend({
        
        /**
         * creates the dom for a list item of a book
         * @constructor
         * @param {model.Offer} offer  
         * 
         */
        init : function(offer) {
            var img = lib.dom.create({
                tag : 'div',
                options : {domClass: [lib.constants.css.listOfferItemImage, lib.constants.css.imageBox]},
                css : {
                    'background-image' : 'url("' + offer.merchant.image + '")'
                }
            });

            var price = lib.dom.create({
                tag : 'div',
                options : {domClass : [lib.constants.css.listOfferItemPrice, lib.constants.css.listTextDark]},
                text : lib.constants.strings.listOffersLabels.totalPrice + ": $" + offer.totalPrice
            });

            var shipping = lib.dom.create({
                tag : 'div',
                options : {domClass : [lib.constants.css.listOfferItemShipping, lib.constants.css.listTextMedium]},
                text : "$" + offer.price + " + $" + offer.shippingPrice + " " + lib.constants.strings.listOffersLabels.shipping
            });


            this._super([img, price, shipping]);

            lib.dom.addClass(this._container, lib.constants.css.listOfferItem);
        }
    });

    

    var view = lib.util.extendNamespace("view");
    view.ListView = view.View.extend({
        /**
         * scrollable list view
         * @param {function} [options.clickCallback] callback to be called when an item is selected
         * @param {string} options.emptyLabel text value of the empty label
         * @param {domNode} [options.footer] jquery dom node that sits at the bottom of the list
         * @param {boolean} [options.scroll = true] set scroll
         * @property {boolean} _loading is true if this list item is waiting for new items to be inserted
         */
        init : function(options) {
            var self = this;
            this._elements = [];
            this._selectedIndex = null;
            this._loading = false;
            this._clickCallback = options.clickCallback;
            this._footer = options.footer;
            this._scrollBar = null;

            this._container = lib.dom.create({
                tag : 'div',
                options : {domClass : lib.constants.css.list},
                jquery : true
            });

            this._list = lib.dom.create({
                tag : 'ul',
                jquery : true
            });


            this._emptyIndicator = lib.dom.create({
                tag : 'li',
                options : {domClass : lib.constants.css.emptyIndicator},
                text : options.emptyLabel,
                jquery : true
            });
            this._list.append(this._emptyIndicator);
            this._container.append(this._list);

            if(this._footer) {
                this._list.append(this._footer);
                this._hideFooter();
            } 

            lib.dom.onClick(this._list, "li", function(event){
                var index = $(this).index();
                self._listItemClick(index);
            });


            if(options.scroll) {
                this._scrollBar = new view.ScrollBar(this._container);
            }
        },

        build : function() {
            if(this._scrollBar) this._scrollBar.build();
        },

        redraw : function() {
            if(this._scrollBar) this._scrollBar.redraw();
        },

        /**
         * returns the number of elements in the list, excluding footer.
         */
        size : function() {
            return this._elements.length;
        },

        /**
         * adds books to list
         * @param {view.ListItem[]} elements an array of ListItems
         * 
         */
        addElements : function(elements) {
            // switch/remove loading indicators and buttons depending on states

            if(this._elements.length === 0) {
                if(this._loading) {
                    this.setLoading(false);
                }

                if(elements.length !== 0) {
                    this._hideEmptyIndicator();
                    this._showFooter();
                }
            }

            for (var node in elements) {
                if (elements.hasOwnProperty(node)) {
                    this._elements.push(elements[node]);
                    this._emptyIndicator.before(elements[node].getDomNode());
                }  
            }
            if(this._scrollBar) this._scrollBar.redraw();
        },

        clearElements : function() {
            this._elements = [];
            this._selectedIndex = null;
            if(this._footer) {
                this._list.children().slice(0, -2).remove();
            } else {
                this._list.children().slice(0, -1).remove();
            }

            this._hideFooter();
            this._showEmptyIndicator();
            if(this._scrollBar) this._scrollBar.redraw();
        },

        setLoading : function(isLoading) {
            this._loading = isLoading;
            var func;
            if(isLoading) {
                func = lib.dom.addClass;
            } else {
                func = lib.dom.removeClass;
            }
            func(this._container, lib.constants.css.loading);

        },

        _showFooter : function() {
            if(this._footer) this._footer.css('display','block');
        },

        _hideFooter : function() {
            if(this._footer) this._footer.css('display','none');
        },

        _showEmptyIndicator : function() {
            this._emptyIndicator.css('display','block');
        },

        _hideEmptyIndicator : function() {
            this._emptyIndicator.css('display','none');
        },

        _listItemClick : function(index) {

            var numElements = this._elements.length;
            if (numElements === 0 || index >= numElements) return;


            if(this._selectedIndex !== null) {
                this._elements[this._selectedIndex].deselect();
            } 
            this._selectedIndex = index;
            this._elements[index].select();
            this._clickCallback(index);
        }
    });
    


    var view = lib.util.extendNamespace("view");
    view.BookList = view.ListView.extend({
        init : function(selectedCallback, loadMoreCallback) {
    

            this._loadMoreBtn = this._makeLoadMoreBtn();

            this._loadMoreCallback = loadMoreCallback;

            this._super({
                clickCallback: selectedCallback,
                emptyLabel : lib.constants.strings.listBookLabels.emptyList,
                footer : this._loadMoreBtn,
                scroll : true
            });

            lib.dom.addClass(this._container, lib.constants.css.listBooks);
            /*this.container = lib.dom.create({
                tag : 'div',
                options : {domClass : lib.constants.css.listBooks},
                children : this._listView.container
            });*/
        },


        _makeLoadMoreBtn : function() {
            var btn = lib.dom.create({
                tag : 'li',
                options : {domClass : lib.constants.css.listLoadMore},
                text : lib.constants.strings.listBookLabels.loadMore,
                jquery : true
            });
            var self = this;
            lib.dom.click(btn, function() {
                self._loadMoreClick();
            });
            return btn;
        },

        _loadMoreClick : function() {
            if(this._loading) return;
            this._loading = true;

            this.setLoading(true);
            this._loadMoreCallback();
        },


        /**
         * @param {model.Book[]} elements array of book elements
         * @param {boolean} hasMore if there are more items that can be loaded
         */
        addBooks : function(elements, hasMore) {
            var listSize = this.size();
            if(this._loading) {
                this.setLoading(false);
                this._loading = false;
            }

            var listItems = [];
            for(var i in elements) {
                if(elements.hasOwnProperty(i)) {
                    listItems.push(new view.ListItemBook(elements[i]));
                }
            }
            this.addElements(listItems);


            if(!hasMore) {
                this._hideFooter();
            }


        }
    });
    
    




    var view = lib.util.extendNamespace("view");
    
    view.OfferList = view.ListView.extend({
        init : function(selectedCallback, offerType) {
            var callback = function(index) {
                selectedCallback(offerType, index);
            };
            this._super({
                clickCallback: callback,
                emptyLabel : lib.constants.strings.listOffersLabels.emptyList,
                scroll : true
            });
            lib.dom.addClass(this._container, lib.constants.css.listBooks);
        },

        /**
         * @param {model.Offer[]} offers array of offer objects
         */
        addOffers : function(offers) {
            if(this._loading) {
                this.setLoading(false);
            }

            var listItems = [];
            for(var i in offers) {
                if(offers.hasOwnProperty(i)) {
                    listItems.push(new view.ListItemOffer(offers[i]));
                }
            }
            this.addElements(listItems);
        }
    });




    var view = lib.util.extendNamespace('view');
    view.KeywordInputView = view.View.extend({
        
        /**
         * creates the view that contains the search form
         * @PARAM {function} searchCallback the function that gets called when the form is submitted
         */
        init : function(searchCallback) {
        
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

            // @TODO ie7 convertes type to "button" instead of submit
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
        },


        _onSubmit : function(e) {
            e.preventDefault();
            if(this._empty) return;
            var val = this._textField.val();
            if(!lib.util.empty(val)) {
                this._textField.blur();
                this._searchCallback(val);
            }
        },

        _onTextFieldEnterFocus : function() {
            if(this._empty) {
                this._textField.val('');
                lib.dom.removeClass(this._textField, lib.constants.css.empty);
                this._empty = false;
            }
        },

        _onTextFieldLoseFocus : function() {
            if(lib.util.empty(this._textField.val())) {
                this._empty = true;
                lib.dom.addClass(this._textField, lib.constants.css.empty);
                this._textField.val(lib.constants.strings.keywordInput.defaultText);
            }
        }
    });
    

    var view = lib.util.extendNamespace("view");
    
    view.ScrollBar = view.View.extend({
        /**
         * adds a scroll bar to a view
         * @param {domNode} container container to be made scrollable
         * @param {domNode} [child] optionally specify the child element, otherwise it will grab it for you.
         * @TODO rewrite so that you can add it to any element that is absolutely positioned
         */
        init : function(container, child) {
            var self = this;
            if(!view.ScrollBar.systemScrollBarWidth) {
                this._findScrollBarWidth();
            }
            this._parent = $(container);
            this._wrapper = child ? child : this._parent.children();
            this._scrollPane = lib.dom.create({
                tag : 'div',
                options : {domClass : lib.constants.css.scrollBarParent},
                jquery : true
            }).css('right', - view.ScrollBar.systemScrollBarWidth + 'px');

            this._scrollPane = this._parent.wrapInner(this._scrollPane).css('overflow-y','hidden').children();

            this._handle = lib.dom.create({
                tag : 'div',
                options : {domClass : lib.constants.css.scrollBarHandle},
                jquery : true
            });
            
            var tempHandle = this._handle.get(0);
            tempHandle.unselectable = "on";
            tempHandle.onselectstart = function(){return false};
            tempHandle.style.userSelect = tempHandle.style.MozUserSelect = "none";

            this._gutter = lib.dom.create({
                tag : 'div',
                options : {domClass : lib.constants.css.scrollBarGutter},
                jquery : true,
                children : this._handle
            });

            this._parent.append(this._gutter);

            this._mouseEventState = {};


            this._scrollPosition = 0;

            this._handleHeight = 0;
            this._gutterHeight = 0;
            this._mouseMoveFunction = function(e) {
                self._mouseMove(e);
            };

            this._mouseUpFunction = function(e) {
                self._mouseUp(e);
            };
        },

        build : function() {
            var self = this;

            this.redraw();

            this._scrollPane.scroll(function(){

                self._scrollEvent.apply(self, arguments);
            });

            this._parent.scroll(function(){
                self._preventParentScroll();
            });


            this._handle.mousedown(function(){
                self._mouseDown.apply(self, arguments);
            });
        },

        redraw : function() {
            this._setHeights();
            this._setScrollPosition();
            this._drawHandle();
            this._positionHandle();
        },

        _setHeights : function() {
            this._height = this._parent.height();
            this._realHeight = this._wrapper.outerHeight();
            this._gutterHeight = this._gutter.height();

            var handleHeight = (this._realHeight === 0 || this._realHeight <= this._height) ? this._gutterHeight : Math.round((this._height / this._realHeight) * this._gutterHeight);

            if(handleHeight < lib.constants.scrollBar.minHandleSize) handleHeight = lib.constants.scrollBar.minHandleSize;
            this._handleHeight = handleHeight;
        },


        _setScrollPosition : function() {
            this._scrollPosition = this._scrollPane.scrollTop();
        },

        _getOffsetHeight : function() {
            return this._realHeight - this._height;
        },

        _getHandleOffsetHeight : function() {
            return this._gutterHeight - this._handleHeight;
        },

        _positionHandle : function() {
            var percent = this._scrollPosition / this._getOffsetHeight();
            var top = this._getHandleOffsetHeight() * percent;
            this._handle.css('top', top + 'px');
        },

        _drawHandle : function() {
            if(this._handleHeight === this._gutterHeight) {
                this._handle.css('visibility','hidden');
                this._gutter.css('visibility','hidden');
            } else {
                this._gutter.css('visibility','visible');
                this._handle.css('visibility','visible');
                this._handle.css('height', this._handleHeight + 'px');
            }
        },

        _scrollDistanceY : function(distY) {
            var newPos = this._scrollPosition + distY;
            if(distY > 0) {
                var offset = this._getOffsetHeight();
                if(this._scrollPosition === offset) return;
                if(offset < newPos) newPos = offset;
            } else {
                if(this._scrollPosition === 0) return;
                if(newPos < 0) newPos = 0;
            }
            this._scrollPane.scrollTop(newPos);
            this._setScrollPosition();
            return newPos;

        },


        /* * * Event Handlers * * */

        _mouseMove : function(e) {
            e.preventDefault();
            var state = this._mouseEventState;
            var mouseDistance = e.pageY - state.globalPX;
            var percent = (state.gutterPX + mouseDistance) / (this._gutterHeight - this._handleHeight);
            var distance = this._scrollPosition - ((this._realHeight -this._height) * percent);

            this._scrollDistanceY(-distance);
            this._positionHandle();

            // shouldn't do this off handle, do it off scroll height of container instead'
        },

        _mouseDown : function(e) {
            e.preventDefault();
            var self = this;
            $(document).mousemove(
                self._mouseMoveFunction
            ).mouseup(
                self._mouseUpFunction
            );

            var state = this._mouseEventState;
            state.gutterPX = parseInt(this._handle.css('top'));
            state.globalPX = e.pageY;

        },

        _mouseUp : function(e) {
            $(document).unbind('mousemove', this._mouseMoveFunction).unbind('mouseup', this._mouseUp);
        },

        _mouseWheelMove : function(e, d, dx, dy) {
            if(dy === 0) return;
            var newPos = this._scrollDistanceY(-dy * lib.constants.scrollBar.mouseWheelSpeed);
            this._positionHandle();
            if(newPos === 0) {
                e.preventDefault();
            }
        },

        _scrollEvent : function() {
            this._setScrollPosition();
            this._positionHandle();
        },

        _preventParentScroll : function() {
            if(this._parent.scrollLeft() !== 0) this._parent.scrollLeft(0);
            if(this._parent.scrollTop() !== 0) this._parent.scrollTop(0);
        },

        _findScrollBarWidth : function() {
            var originalWidth = 30;
            var test = $('<div style="width:' + originalWidth + 'px; height:90px; overflow-y:scroll; visibility:hidden;">' + 
                            '<div style="height:100px;"></div></div>');
            $('body').append(test);
            var newWidth = test.children().width();
            test.remove();
            view.ScrollBar.systemScrollBarWidth = originalWidth - newWidth;
        }
    });

    





    var view = lib.util.extendNamespace("view");
    view.TabView = view.View.extend({
        init : function() {
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

            this._container = lib.dom.create({
                tag : 'div',
                options : {domClass : lib.constants.css.tabView},
                children : [this._emptyIndicator, this._tabWell, this._contentContainer]

            });
            this.setEmpty(true);


            this._tabWell.on("click", "li", function(event){
                var index = $(this).index();
                self.showTab(index);

            });

        },

        /**
         * adds a view object to the tab container
         * @param {string} label the text to display for the tab
         * @param {view.View} view the view object to append
         */
        addTab : function(label, view) {
            var btn = lib.dom.create({
                tag : 'li',
                options : {domClass : lib.constants.css.tabButton},
                text : label
            });
            this._tabWell.append(btn);
            var domNode = view.getDomNode();
            lib.dom.addClass(domNode, lib.constants.css.tabContent);
            this._contentContainer.append(domNode);
            this._tabs.push(btn);
            this._tabContent.push(view);


        },

        setEmpty : function(bool) {
            if(bool) {
                this._emptyIndicator.show();
                this._tabWell.hide();
                this._contentContainer.hide();
            } else {
                this._emptyIndicator.hide();
                this._tabWell.show();
                this._contentContainer.show();
            }
        },

        showTab : function(index) {
            if(index === this._selectedIndex) return;
            if(this._selectedIndex >= 0) this._deselectTab(this._selectedIndex);
            this._selectTab(index);
            this._selectedIndex = index;

        },

        _makeTabWell : function() {
            return lib.dom.create({
                tag : 'ul',
                options : {domClass : lib.constants.css.tabWell},
                jquery : true
            });
        },

        _makeContentContainer : function() {
            return lib.dom.create({
                tag : 'div',
                options : {domClass : lib.constants.css.tabContentContainer},
                jquery : true
            });
        },

        _deselectTab : function(index) {
            var view = this._tabContent[index];
            lib.dom.removeClass(this._tabs[index], lib.constants.css.selected);
            lib.dom.removeClass(view.getDomNode(), lib.constants.css.selected);
            view.redraw();
        },

        _selectTab : function(index) {
            var view = this._tabContent[index];
            lib.dom.addClass(this._tabs[index], lib.constants.css.selected);
            lib.dom.addClass(view.getDomNode(), lib.constants.css.selected);
            view.redraw();
        },

        build : function() {
            for(var i = 0; i < this._tabContent.length; i++) {
                this._tabContent[i].build();
            }
        },

        redraw : function() {
            for(var i = 0; i < this._tabContent.length; i++) {
                this._tabContent[i].redraw();
            }
        }
    });
    




    var view = lib.util.extendNamespace("view");
    
    view.TwoColumnView = view.View.extend({
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
        init : function(left, right, gapWidth) {
            this.LEFT = 0;
            this.RIGHT = 1;
            this._columnFocus = this.LEFT;
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



            right.view.build();
            left.view.build();


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
                self.setColumnFocus(self.LEFT);
            };

            var switchToRightFn = function(){
                self.setColumnFocus(self.RIGHT);
            };

            if(left.switchColumnView) {
                lib.dom.click(left.switchColumnView, switchToRightFn);
            }

            if(right.switchColumnView) {
                lib.dom.click(right.switchColumnView, switchToLeftFn);
            }


        },

        LEFT : 0,
        RIGHT : 1,


        /**
         * sets which column has focus. It doesn't really matter if the view is large enough to show
         * both columns, but when it's too small it determines which column is visible
         * @param {LEFT|RIGHT} column int constant for what side
         */
        setColumnFocus : function(column) {
            this._columnFocus = column;
            if(this._singleColumn) {

                this._wrapper.animate({
                    left : (-100 * column) + '%' 
                },200);
            }
        },


        redraw : function() {
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
                    if(this._leftDom.width() === left.minWidth) {
                        this._sizeColumn(this.RIGHT);

                    } else if(this._rightDom.width() === right.minWidth + this._gapWidth) {
                        this._sizeColumn(this.LEFT);

                    }
                } else {
                    var fixedDom, fixed, fluidDom, fluid, positionProperty, gapWidth;

                    if(this._fluidSide === this.LEFT) {
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
        },

        /**
         * sizes the fluid column so that it does not overflow into the fixed size column
         * @param {LEFT|RIGHT} fluidSide int constant of which side is fluid or fixed
         */
        _sizeColumn : function(fluidSide) {
            this._fluidFixed = true;
            this._fluidSide = fluidSide;
            var fixedWidth, fluid, positionProperty;

            if(fluidSide === this.LEFT) {
                fixedWidth = this._right.minWidth;
                fluid = this._leftDom;
                positionProperty = 'right';
            } else {
                fixedWidth = this._left.minWidth;
                fluid = this._rightDom;
                positionProperty = 'left';
            }

            fluid.css(positionProperty, fixedWidth + 'px');

        },

        _showSwitchColumnView : function(column) {
            if(column.switchColumnView) {
                var view = column.switchColumnView;
                view.css('display','block');
                var height = view.outerHeight();
                $(column.view.getDomNode()).css('bottom',height + 'px');

            }
        },

        _hideSwitchColumnView : function(column) {
            if(column.switchColumnView) {
                var view = column.switchColumnView;
                var height = view.outerHeight();
                $(column.view.getDomNode()).css('bottom','0px');
                view.css('display','none');
            }
        },

        _setMinWidth : function(obj, intVal) {
            if(!intVal) {
                intVal = 0;
            }
            obj.css('min-width', intVal + 'px');
        }
    });
    

    

    var view = lib.util.extendNamespace("view");
    
    /**
     * creates a view object that displays the details of the books
     * 
     */
    view.BookDetails = view.View.extend({
        init : function() {
            this._image = lib.dom.create({
                tag : 'div',
                options : {domClass: [
                    lib.constants.css.bookImage, 
                    lib.constants.css.bookSizeLarge
                ]},
                jquery : true

            });

            var imageWell = lib.dom.create({
                tag : 'div',
                options : {domClass : lib.constants.css.bookDetailsImageWell}/*,
                children : this._image*/
            });



            this._metaData = lib.dom.create({
                tag : 'div',
                options : {domClass : lib.constants.css.bookDetailsData},
                jquery : true
            });

            this._container = lib.dom.create({
                tag : 'div',
                options : {domClass : [lib.constants.css.bookDetails, lib.constants.css.tabContent]},
                children : [this._image, imageWell, this._metaData]
            });

            this._scrollbar = new view.ScrollBar(this._container, this._metaData);




        },  
        /**
         * sets the book to display
         * @param {model.Book} book
         */
        setBook : function(book) {
            this._book = book;
            var url = lib.util.empty(book.imageLarge) ? lib.constants.resources.images.ajaxLoaderOnWhite : book.imageLarge;

            this._image.css({
                    'background-image' : 'url("' + url + '")'
            });

            this._metaData.children().remove();

            var elements = [];
            var keys = [
                'author',
                'isbn10',
                'isbn13',
                'edition',
                'publisher',
                'publishedDate',
                'msrp',
                'pages'
            ];


            elements.push(lib.dom.create({
                tag : 'div',
                options : {domClass : lib.constants.css.bookDetailsTitle},
                text : book.title
            }));

            for(var i in keys) {
                if(keys.hasOwnProperty(i)) {
                    var key = keys[i];
                    var text = book[key];
                    if(lib.util.empty(text)) continue;
                    var label = lib.constants.strings.bookMetaNames[key];
                    elements.push(this._createMetaRow(label, text));
                }
            }

            this._metaData.append(elements);

        },

        updateImage : function(book) {
            var url = lib.util.empty(book.imageLarge) ? book.imageSmall : book.imageLarge;

            this._image.css({
                    'background-image' : 'url("' + url + '")'
            });
        },

        _createMetaRow : function(label, text) {
            var domLabel = lib.dom.create({
                tag : 'div',
                options : {domClass : lib.constants.css.bookDetailsLabel},
                text : label
            });

            var domText = lib.dom.create({
                tag : 'div',
                options : {domClass : lib.constants.css.bookDetailsText},
                text : text
            });

            var row = lib.dom.create({
                tag : 'div',
                options : {domClass : lib.constants.css.bookDetailsRow},
                children : [domLabel, domText]
            });
            return row;
        },

        build : function() {
            this._scrollbar.build();
        },

        redraw : function() {
            this._scrollbar.redraw();
        }
    });

    


    var controller = lib.util.extendNamespace('controller');
    
    controller.BookData = lib.Class.extend({
        init :function() {

            this._requestSet = {};
            this._bookSetId = 0;
            this._books = [];
            this._searchTerms = null;
            this._currentPage = 1;
            this._maxPages = null;
            this._currentBookIndex = 0;
            lib.api.init(lib.config.apiKey, 66, 130);
            this._api = lib.api;

            var self = this;

            this._fnWrappers = {
                addBooks : function(o) {
                    self._addBooks(o);
                },
                addLargeBookImage : function(o) {
                    self._addLargeBookImage(o);
                },
                loadOffers : function(o) {
                    self._loadOffers(o);
                }
            };
        },

        /**
         * loads books from the search terms
         * @param {string} searchTerms the search terms
         * @param {function(Book[], boolean hasMore)} callback the callback that gets called when the request has finished
         *
         */
        search : function(searchTerms, callback) {
            this._bookSetId++;
            this._searchTerms = searchTerms;
            this._currentPage = 1;
            this._maxPages = 1;
            this._books = [];

            var requestId = this._api.search(searchTerms, this._api.IMG_SIZE_SM, this._currentPage, this._fnWrappers.addBooks);
            this._createRequestSet(requestId, null, callback);
        },

        loadMore : function(callback) {
            this._currentPage++;
            var requestId = this._api.search(this._searchTerms, this._api.IMG_SIZE_SM, this._currentPage, this._fnWrappers.addBooks);
            this._createRequestSet(requestId, null, callback);
        },

        hasMore : function() {
            return this._currentPage < this._maxPages;
        },

        getBook : function(index) {
            if(index < this._books.length) {
                this._currentBookIndex = index;
                return this._books[index];
            }
            return null;
        },

        getCurrentBook : function() {
            return this._books[this._currentBookIndex];
        },

        loadLargeBookImage : function(index, callback) {
            var book = this._books[index];
            if(book.imageLarge) {
                callback(book);
            } else {
                var requestId = this._api.bookInfo(book.isbn10, this._api.IMG_SIZE_LG, this._fnWrappers.addLargeBookImage);
                this._createRequestSet(requestId, index, callback);
            }

        },

        loadOffers : function(index, callback) {
            var book = this._books[index];
            if(book.offers) {
                callback(book);
            } else {
                var requestId = this._api.bookPrices(book.isbn10, this._fnWrappers.loadOffers);
                this._createRequestSet(requestId, index, callback);
            }

        },

        _getRequestSet : function(requestId) {
            var request = this._requestSet[requestId];
            delete this._requestSet[requestId];
            if(request.bookSet === this._bookSetId) {
                return request;
            } else {
                return null;
            }


        },

        /**
         * creates a requestSet object for keeping track of jsonp requests so that we correctly update the right information
         * @param {int} requestId the number returned from any API calls
         * @param {int} [bookIndex] optional param of the book this request is for. If this is loading more books for instance you would not provide a bookIndex
         * @param {function} callback the callback function that should be called when the request is completed
         */
        _createRequestSet : function(requestId, bookIndex, callback) {
            this._requestSet[requestId] = {
                bookSet : this._bookSetId,
                bookIndex : bookIndex,
                callback : callback
            };
        },

        _addLargeBookImage : function(ajax) {
            var request = this._getRequestSet(ajax.id);
            var book;
            if(request) {
                book = this._books[request.bookIndex];
                if(!ajax.status) {
                    if(this._currentBookIndex === request.bookIndex) {
                        this._logError("There was an error connecting to the server");
                    }
                } else {
                    book.imageLarge = ajax.data.imageLarge;
                }

                if(this._currentBookIndex === request.bookIndex) {
                    request.callback(book);
                }
            }
        },


        _addBooks : function(ajax) {
            var request = this._getRequestSet(ajax.id);
            var books = null;
            var more = false;
            if(request) {
                if(!ajax.status) {
                    this._logError("There was an error connecting to the server");
                    this._currentPage = this._currentPage === 1 ? 1 : this._currentPage - 1;
                    more = true;
                } else if(ajax.data === null) {
                    more = false;


                } else {
                    this._maxPages = ajax.data.pages;

                    if(ajax.data.page < ajax.data.pages) {
                        more = true;
                    }
                    this._books = this._books.concat(ajax.data.books);
                    books = ajax.data.books;
                }

                request.callback(books, more);
            }
        },

        _loadOffers : function(ajax) {
            var request = this._getRequestSet(ajax.id);
            var book;
            if(request) {
                if(!ajax.status) {
                    this._logError("There was an error connecting to the server");
                } else if(ajax.data === null) {
                    book = null; 
                } else {

                    book = this._books[request.bookIndex];
                    book.offers = ajax.data;
                }

                if(this._currentBookIndex === request.bookIndex) {
                    request.callback(book);
                }
            }
        },

        _logError : function(msg) {
            alert(msg);
        }
    });


    


    var controller = lib.util.extendNamespace('controller');
    
    
    controller.ListingOpener = lib.Class.extend({

        openUrl : function(url) {
            var customParams = [];
            if(lib.config.preOpenOfferFn) {
                customParams = lib.config.preOpenOfferFn();
                if(customParams.length > 3) {
                    customParams = customParams.slice(0,3);
                }
            }
            for(var i = 0; i < customParams.length; i++) {
                url += '&c' + (i + 1) + encodeURI(customParams[i]); 
            }

            window.open(url);
        }
    });
    
    

	var controller = lib.util.extendNamespace('controller');
	
	controller.MainPage = lib.Class.extend({
        init : function(parent) {
            lib.dom.addClass(parent, 'container');
            this.bookData = new lib.controller.BookData();
            var self = this;

            var offerSelected = function(type, index) {
                self._offerSelected(type, index);
            }
            var bookSelected = function(index) {
                self._bookSelected(index);
            }
            var loadMore = function() {
                self._loadMore();
            }

            this._getHighResImg = function(book) {
                self.views.bookDetails.updateImage(book);
            }

            var startSearch = function(val) {
                return self._startSearch(val);
            }

            this.listingOpener = new lib.controller.ListingOpener();

            this.views = {
                tabView : new lib.view.TabView(),
                bookDetails : new lib.view.BookDetails(),
                newPrices : new lib.view.OfferList(offerSelected, lib.constants.Condition.NEW),
                usedPrices : new lib.view.OfferList(offerSelected, lib.constants.Condition.USED),
                ebookPrices : new lib.view.OfferList(offerSelected, lib.constants.Condition.EBOOK),
                list : new lib.view.BookList(bookSelected, loadMore),
                columnView : null,
                searchView : new lib.view.KeywordInputView(startSearch)
            };

            this.views.tabView.addTab("Info", this.views.bookDetails);
            this.views.tabView.addTab("New", this.views.newPrices);
            this.views.tabView.addTab("Used", this.views.usedPrices);
            this.views.tabView.addTab("eBook", this.views.ebookPrices);

            this.views.columnView = new lib.view.TwoColumnView({
                        view : this.views.list,
                        minWidth : 400,
                        percent : 40
                    },{
                        view : this.views.tabView,
                        minWidth : 400,
                        percent : 60,
                        switchColumnView : lib.dom.create({
                            tag: 'div',
                            options : {
                                domClass : lib.constants.css.twoColumnViewSwitchButton
                                },
                            text : 'Back To All Books',
                            jquery : true
                        })
                    }, 30);





            lib.dom.setId(this.views.searchView.getDomNode(), 'topRow');
            lib.dom.setId(this.views.columnView.getDomNode(), 'bottomRow');
            $(parent).append(this.views.columnView.getDomNode());
            $(parent).append(this.views.searchView.getDomNode());

            this.views.columnView.redraw();
            this.views.tabView.showTab(0);



        },

        _startSearch : function(val) {
             var views = this.views;
             var self = this;
             var search = function(books, hasMore) {
                 self._search(books, hasMore);
             }
             try {


                views.list.clearElements(val);
                views.list.setLoading(true);
                views.tabView.setEmpty(true);

                this.bookData.search(val, search)

                views.columnView.setColumnFocus(lib.view.TwoColumnView.prototype.LEFT);
            }
            catch(e) {
                console.log(e);
            }
            return false;
        },

        _offerSelected : function(type, index) {
            var offers = this.bookData.getCurrentBook().offers;
            this.listingOpener.openUrl(offers.types[type][index].link);
        },

        _getOffers : function(book) {
            var offers = book.offers
            var views = this.views;
            views.newPrices.addOffers(offers.types[lib.constants.Condition.NEW]);
            views.usedPrices.addOffers(offers.types[lib.constants.Condition.USED]);
            views.ebookPrices.addOffers(offers.types[lib.constants.Condition.EBOOK]);
        },

        _bookSelected : function(index) {
            var views = this.views;
            var book = this.bookData.getBook(index)
            var self = this;
            var getOffers = function(book) {
                self._getOffers(book);
            }


            views.bookDetails.setBook(book);
            views.tabView.setEmpty(false);
            views.bookDetails.redraw();
            var prices = [views.newPrices, views.usedPrices, views.ebookPrices];
            if(book.imageLarge == null) {
                this.bookData.loadLargeBookImage(index, this._getHighResImg);
            }
            if(book.offers == null) {

                this.bookData.loadOffers(index, getOffers);
                for(var i in prices) {
                    prices[i].clearElements();
                    prices[i].setLoading(true);
                }
            } else {
                for(var i in prices) {
                    prices[i].clearElements();

                }
                getOffers(book);
            }
            views.columnView.setColumnFocus(lib.view.TwoColumnView.prototype.RIGHT);

        },

        _loadMore : function() {
            var self = this;
            var search = function(books, hasMore) {
                self._search(books, hasMore);
            }
            this.bookData.loadMore(search);
        },

        _search : function(books, hasMore) {
            this.views.list.addBooks(books, hasMore);
        }
    });
	
	


    return {
        init : lib.init
    };
})();