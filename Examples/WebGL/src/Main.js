var App;
window.onload = function() {
	var wrapper = document.getElementById("wrapper");

	//Create App
	var Main = Pixel.App.extend({
		setup: function() {
		},
		
		//-------------------------------------------------------	
		update: function() {
		},
		
		
		//-------------------------------------------------------	
		draw: function() {
			
		},
		
		//-------------------------------------------------------
		mouseDownListener: function(e) {
		},
		
		//-------------------------------------------------------
		mouseMovedListener: function(e) {
		},
		
		//-------------------------------------------------------
		mouseUpListener: function(e) {
		},
	});	
	
	//-------------------------------------------------------
	//Run App
	App = new Main(Pixel.RENDER_MODE_WEBGL);
	App.run();
}

