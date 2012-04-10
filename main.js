
(function(lib) {
    var app;
    lib.init = function(options) {
        config('apiKey', options.apiKey);
        config('bookImageSmall', options.bookImageSmall);
        config('bookImageLarge', options.bookImageLarge);
        
   
   
        app = lib.app;
        lib.api.init(lib.config.apiKey, lib.config.bookImageSmall, lib.config.bookImageLarge);
        var api = lib.api;
        
        api.merchants(addMerchants);

        new lib.controller.MainPage(options.container);

        

    }
    
    function config(key, val) {
        if(val) {
            lib.config[key] = val;
        }
        
    }
    
    function addMerchants(data) {
        app.addMerchants(data);
    }
    
})(JSBookSearch);



