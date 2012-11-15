$(document).ready(function() {
	var App = new Pixel.App();
	App.setBackgroundColor(0,0,0);
	
	var x = Math.random() * App.getWidth(),
		xSpeed = 1,
		y = Math.random() * App.getHeight(),
		ySpeed = 1,
		size = 50;
	
	App.update = function() {
		x += xSpeed;
		y += ySpeed;
		
		if(x > App.getWidth() - size || x<0) xSpeed *= -1;
		if(y > App.getHeight() - size || y<0) ySpeed *= -1;
	}
	
	App.draw = function() {
		App.setFillColor(255,0,255);
		App.pushMatrix();
		App.translate(x, y, 0);
		App.rotate(x);
		App.drawSquare(-size/2,-size/2,size);
		App.popMatrix();
	}
	
	
	$(document.body).append(App.canvas);
	App.start();
	
	
});