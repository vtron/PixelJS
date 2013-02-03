$(document).ready(function() {
	var App = new Pixel.App();
	
	App.setSize(1000,500);
	App.setBackgroundColor(0,0,0);
	App.showFPS(true);
	
	for(var i=0; i<5; i++) {
		
		var circle = new Pixel.EllipseShape();
		circle.setSize(25,25);
		//circle.setAlignment(Pixel.ALIGNMENT_CENTER_CENTER);
		circle.position.set(50 * i, App.getHeight()/2);
		circle.setDrawBounds(true);
		//circle.rotation = Math.PI;
		
		circle.name = i;
		circle.eventHandler = function(event) {
			this.fillColor.set(255,0,0);
			if(this.name == "3")
			event.stopPropogation();
		}
		
		circle.addEvent(Pixel.MOUSE_DOWN_EVENT, {"test":"fart"});
		
		App.addChild(circle);
	}
	
	
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