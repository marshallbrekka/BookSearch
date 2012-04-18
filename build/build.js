// settings

var FILE_ENCODING = 'utf-8',
    EOL = '\n',
    DIST_FILE_PATH = '../dist',
    DIST_FILE_NAME = 'BookSearch',
    SRC_PATH = '../src';
    
var _fs = require('fs');
var path = require('path')


function concat () {
    var coreFile = 'lib/core';
    
    var fileList = [
        'plugins/json2',
        'lib/util',
        'lib/Class',
        'lib/Constants',
        'lib/config',
        'lib/DOM',
        'lib/App',
        'lib/API',
        'model/APIObject',
        'model/Book',
        'model/BookOffers',
        'model/Merchant',
        'model/Offer',
        'view/View',
        'view/ListItem',
        'view/ListItemBook',
        'view/ListItemOffer',
        'view/ListView',
        'view/BookList',
        'view/OfferList',
        'view/KeywordInputView',
        'view/ScrollBar',
        'view/TabView',
        'view/TwoColumnView',
        'view/BookDetails',
        'controller/BookData',
        'controller/ListingOpener',
        'controller/MainPage'
    ];
    
    var coreContent = readFile(coreFile);
    var coreParts = splitCore(coreContent);
    var start = coreParts[0];
    var end = coreParts[1];
    
    fileList.map(function(fileName){
        var content = readFile(fileName);
        content = content.replace(/\(\s*?function\s*?\(\s*?lib\s*?\)\s*?{/,"");
        content = content.replace(/}\s*?\)\s*?\(\s*?JSBookSearch\s*?\)\s*?;/,"");
        start += content;
    });
    
    try {
        _fs.mkdirSync(DIST_FILE_PATH);
    }
    catch(e){
        console.log(e);
    }
    
    _fs.writeFileSync(path.join(DIST_FILE_PATH, DIST_FILE_NAME + '.js'), start + end, FILE_ENCODING);
    
    var uglify = require("uglify-js"); 
    var jsp = uglify.parser;
    var pro = uglify.uglify;

    
    var ast = jsp.parse(start + end); // parse code and get the initial AST
    ast = pro.ast_mangle(ast); // get a new AST with mangled names
    ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
    var final_code = pro.gen_code(ast); // compressed code here
    
    _fs.writeFileSync(path.join(DIST_FILE_PATH, DIST_FILE_NAME + '.min.js'), final_code, FILE_ENCODING);
}


function readFile(fileName) {
    var fileName = path.join(SRC_PATH, fileName + '.js');
    return _fs.readFileSync(fileName).toString();
}

function splitCore(core) {
    core = core.replace(/lib/,"");
    var splitPoint = core.lastIndexOf("return");
    splitPoint = core.lastIndexOf(EOL, splitPoint);
    
    var start = core.slice(0, splitPoint);
    var end = core.slice(splitPoint);
    end = end.replace(/JSBookSearch/,"");
    return [start, end];
}

concat();