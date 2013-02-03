$(document).ready(function() {
	var App = new Pixel.App();
	
	App.setSize(1000,500);
	App.setBackgroundColor(0,0,0);
	
	for(var i=0; i<10; i++) {
		var c = new Pixel.EllipseShape();
		c.setSize(50, 50);
		c.position.set(50 + i*3, 50 + i*3);
		
		var color = (i+1)/10 * 255;
		c.fillColor.set(color, 255-color, color);
		
		App.addChild(c);
	}
	
	var backCircle = App.children[0];
	
	//----------------------------------------
	//Update
	App.update = function() {
	}
	
	//----------------------------------------
	//Add to DOM and Init App
	$(document.body).append(App.element);
	App.start();
	
	//App.stop();
	$(document.body).on("keydown", function(e) {
		switch(event.which) {
			case 38:
				//Up arrow		
				console.log(App.moveChildBackward(backCircle));
				break;
			
			case 40:	
				//Down arrow		
				App.moveChildForward(backCircle);
				break;
			
			case 37:	
				//Left Arrow		
				App.moveChildToBack(backCircle);
				break;
			
			case 39:	
				//Right Arrow		
				App.moveChildToFront(backCircle);
				break;

		}
		
		console.log(App.getChildPosition(backCircle));
	});
});