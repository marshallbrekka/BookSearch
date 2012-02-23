var App = new mApp();
var API = new mAPI(config.apiKey, 100, 150);
API.merchants({obj:App, fn:App.addMerchants});