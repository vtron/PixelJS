$(document).ready(function() {
	var App = new Pixel.App();
	
	App.setSize(1000,500);
	App.setBackgroundColor(0,0,0);
	App.showFPS(true);
	
	for(var i=0; i<2000; i++) {
		var r = new Pixel.RectShape();
		r.setSize(50,50);
		r.setFillColor(255,255,255,0.1);
		App.addChild(r);
	}
	
	//----------------------------------------
	//Update
	App.update = function() {
	}
	
	//----------------------------------------
	//Add to DOM and Init App
	$(document.body).append(App.element);
	App.start();
});