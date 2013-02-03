$(document).ready(function() {
	var App = new Pixel.App();
	
	App.setSize(1000,500);
	App.setBackgroundColor(0,0,0);
	App.showFPS(true);
	
	var circle = new Pixel.EllipseShape();
	circle.setSize(200,200);
	//circle.setAlignment(Pixel.ALIGNMENT_CENTER_CENTER);
	circle.position.set(App.getWidth()/2, App.getHeight()/2);
	circle.setDrawBounds(true);
	circle.rotation = Math.PI;
	
	circle.addEvent(Pixel.MOUSE_DOWN_EVENT, {"test":"fart"});
	
	App.addChild(circle);
	
	
	//----------------------------------------
	//Update
	App.update = function() {
/*
		circle.scaleAmount.x -= 0.01;
		circle.position.y += 1;
*/
	}
	
	//----------------------------------------
	//Add to DOM and Init App
	$(document.body).append(App.element);
	App.start();
	
	//App.stop();
});