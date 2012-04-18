(function(lib){
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
            this._container = lib.dom.create({
                tag : 'li',
                options : {domClass: lib.constants.css.listItem},
                jquery : true,
                children : children
            });

            if(fadeRight) this._addFadingEdge();
        },

        _addFadingEdge : function() {
            this.getDomNode().append(
                lib.dom.create({
                    tag : 'div',
                    options : {domClass : lib.constants.css.listItemFade}
                })
            );
        },

        select : function() {
            lib.dom.addClass(this.getDomNode(), lib.constants.css.selected);
        },

        deselect : function() {
            lib.dom.removeClass(this.getDomNode(),lib.constants.css.selected);
        }
    });
    
    
})(JSBookSearch);