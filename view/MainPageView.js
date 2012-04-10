(function(lib){
    var view = lib.util.extendNamespace('view');
    
    view.MainPageView = function(searchView, listView, tabView) {
        this._container = lib.dom.create({
            tag : 'div',
            options : {domClass : lib.constants.css.mainPage}
        })
    }
    
    
})(JSBookSearch);