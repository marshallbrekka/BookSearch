(function(){
	var includedFiles = [];
	
	
	function include() {
		var args = Array.prototype.slice.call(arguments);
		
		for(var i = 0; i < args.length; i++) {
			var path = args[i];
			if(includedFiles.indexOf(path) == -1) {
				includedFiles.push(path);
				var script = document.createElement('script');
				script.setAttribute("type","text/javascript");
				script.setAttribute("src", path + '.js');
	
				document.getElementsByTagName("head")[0].appendChild(script);
			}
		}
		
	}
	
	window.include = include;
})();

