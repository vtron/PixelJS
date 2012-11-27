$(document).ready(function() {
	var App = new Pixel.App();
	App.setBackgroundColor(255,0,0);
	
	var r = new Pixel.RectShape();
	r.fillColor.set(255,0,255);
	r.width		= 50;
	r.height	= 50;
	
	
	App.addChild(r);
	console.log(App.canvas);
	
	var x = Math.random() * App.getWidth(),
		xSpeed = 1,
		y = Math.random() * App.getHeight(),
		ySpeed = 1,
		size = 50;
		
		
	
	r.update = function() {
		x += xSpeed;
		y += ySpeed;
		
		if(x > App.getWidth()	- size || x<0) xSpeed *= -1;
		if(y > App.getHeight()	- size || y<0) ySpeed *= -1;
		
		r.pos.x = x;
		r.pos.y = y;
	}
	
	App.draw = function() {
		App.setFillColor(255,0,255);
		App.pushMatrix();
		App.translate(x, y, 0);
		App.rotate(x);
		App.drawSquare(-size/2,-size/2,size);
		App.popMatrix();
	}
	
	
	$(document.body).append(App.element);
	App.start();
	
	$(document).on("click", function() {
		if(App.isRunning()) {
			App.stop();
		} else {
			App.start();
		}
	}); 
	
	var v = Vector.create([4,8,0]);
});