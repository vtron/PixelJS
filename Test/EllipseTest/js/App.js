$(document).ready(function() {
	var App = new Pixel.App();
	
	App.setSize(1000,400);
	App.setBackgroundColor(0,0,0);
	App.showFPS();
	
	var c = new Pixel.EllipseShape();
	c.setSize(225,225);
	c.fillColor.set(255,0,0);
	App.addChild(c);
		
	App.update = function() {

	}
	
	$(document.body).append(App.element);
	App.start();
	
});