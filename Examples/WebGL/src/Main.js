var App;
window.onload = function() {
	var wrapper = document.getElementById("wrapper");

	//Create App
	var App = new (Pixel.App.extend({
		setup: function() {
			App.setSize(500,500);
			
			App.clear();
			App.drawSquare(50,50, 50);
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
	}))(Pixel.RENDER_MODE_WEBGL);	
	
	//-------------------------------------------------------
	//Run App
	App.run();
	
	wrapper.appendChild(App.canvas);
}

