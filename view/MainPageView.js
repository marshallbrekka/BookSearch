(function(lib){
    var view = lib.util.extendNamespace('view');
    
    view.MainPageView = view.View.extend({
        init : function(searchView, listView, tabView) {
            this._container = lib.dom.create({
                tag : 'div',
                options : {domClass : lib.constants.css.mainPage}
            })
        }
    });
})(JSBookSearch);