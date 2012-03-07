var JSBookSearch = {};
JSBookSearch.util = {};

/**
 * extends the application to create the appropriate namespace specified
 * @param {string} ns_string namespace string "obj.subobj.subsubobj"
 */
JSBookSearch.util.extendNamespace = function (ns_string ) {  
    var parts = ns_string.split('.'),  
        parent = JSBookSearch,  
        pl, i;  
    if (parts[0] == "JSBookSearch") {  
        parts = parts.slice(1);  
    }  
    pl = parts.length;  
    for (i = 0; i < pl; i++) {  
        //create a property if it doesnt exist  
        if (typeof parent[parts[i]] == 'undefined') {  
            parent[parts[i]] = {};  
        }  
        parent = parent[parts[i]];  
    }  
    return parent;  
} 



