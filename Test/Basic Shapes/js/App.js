$(document).ready(function() {
	var App = new Pixel.App();
	App.setSize(1000,400);
	App.setBackgroundColor(0,0,0);
	
	
	
/*
	for(var i=0;i<1000; i++) {
		var r = new Pixel.RectShape();
		r.pos.set(Math.random()*900, Math.random()*300, 0);
		r.width=100;
		r.height=100;
		r.fillColor.set(255,255,255,0.005);
		App.addChild(r);
	}
*/
	
	var rect = new Pixel.RectShape();
	var rectSpeed = new Pixel.Point();
	rectSpeed.set(1, 1, 0);
	rect.pos.set(Math.random() * App.getWidth(), Math.random() * App.getHeight(), 0);
	rect.width	= 50;
	rect.height	= 50;
	rect.alignment = Pixel.ALIGNMENT_CENTER_CENTER;
	rect.fillColor.set(0, 0, 100);
	rect.strokeSize = 2;
	rect.strokeColor.set(255,0,0);
	
	var circle = new Pixel.OvalShape();
	var circleSpeed = new Pixel.Point();
	circleSpeed.set(5, 5, 0);
	circle.pos.set(Math.random() * App.getWidth(), Math.random() * App.getHeight(), 0);
	circle.width	= 25;
	circle.height	= 25;
	circle.fillColor.set(0, 255, 255);
	
	App.addChild(rect);
	App.addChild(circle);
		
	App.update = function() {
		if(rect.pos.x > (App.getWidth()		- rect.width )	|| rect.pos.x < rect.width/2 ) rectSpeed.x *= -1;
		if(rect.pos.y > (App.getHeight()	- rect.height ) || rect.pos.y < rect.height/2 ) rectSpeed.y *= -1;
		
		rect.pos.x		+= rectSpeed.x;
		rect.pos.y		+= rectSpeed.y;
		rect.rotation	+= rectSpeed.x;
		
		if(circle.pos.x > (App.getWidth()	- circle.width ) || circle.pos.x  < circle.width/2) circleSpeed.x *= -1;
		if(circle.pos.y > (App.getHeight()	- circle.height ) || circle.pos.y < circle.height/2) circleSpeed.y *= -1;
		
		circle.pos.x	+= circleSpeed.x;
		circle.pos.y	+= circleSpeed.y;
	}
	
/*
	App.draw = function() {
		App.setFillColor(255,0,255);
		App.pushMatrix();
		App.translate(x, y, 0);
		App.rotate(x);
		App.drawSquare(-size/2,-size/2,size);
		App.popMatrix();
	}
*/
	
	
	$(document.body).append(App.element);
	App.start();
	
	var b = false;
	$(document).on("click", function() {
		if(b) {
			b = false;
			App.moveChildForward(rect);
			console.log("fart");
		} else {
			App.moveChildBackward(rect);
			b = true;
			console.log("No Fart");
		}
/*
		if(App.isRunning()) {
			App.stop();
		} else {
			App.start();
		}
*/
	});
});