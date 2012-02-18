var App;
window.onload = function() {
	var wrapper = document.getElementById("wrapper");

	//Create App
	var App = new (Pixel.App.extend({
		setup: function() {
			App.setSize(500,500);
			this.rotation = 0.0;
		},
		
		//-------------------------------------------------------	
		update: function() {
			this.rotation += 0.5;
		},
		
		
		//-------------------------------------------------------	
		draw: function() {
			App.pushMatrix();
			App.translate(App.getWidth()/2, App.getHeight()/2);
			App.scale(2.0,1.0);
			//App.rotate(this.rotation);
			App.setFillColor(255,0,255, 1);
			App.drawSquare(0, 0, 50);
			App.popMatrix();
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

