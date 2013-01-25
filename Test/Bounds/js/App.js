$(document).ready(function() {
	var App = new Pixel.App();
	
	App.setSize(900, 900);
	App.setBackgroundColor(0,0,0);
	App.name = "App";
	
	var o = new Pixel.Object();
	//o.setAlignment(Pixel.ALIGNMENT_CENTER_CENTER);
	o.position.set(App.getWidth()/4, App.getHeight()/2);
	o.setDrawBounds(true);
	o.name ="Test Object";
	
	App.addChild(o);
	
	
	var r = new Pixel.RectShape();
	var rSpeed = 1;
	r.setAlignment(Pixel.ALIGNMENT_CENTER_CENTER);
	r.name = "Rectangle";
	r.setSize(200,200);
	
	var e = new Pixel.EllipseShape();
	var eSpeed = 5;
	e.setAlignment(Pixel.ALIGNMENT_CENTER_CENTER);
	e.name = "Ellipse";
	e.setSize(200, 200);
	e.position.set(50,75);
	
	
	o.addChild(e);
	o.addChild(r);
	//o.addChild(e);
	
	var r1 = new Pixel.Rect(0,0,200,200);
	var r2 = new Pixel.Rect(-50,-25,200,200);
	r2.include(r1);
	console.log(r2);
	//----------------------------------------
	//Update
	App.update = function() {
		//o.rotation++;
		
		if(e.position.x > App.getWidth() - e.getWidth() || e.position.x < -o.position.x) {
			eSpeed *= -1;
		}
		
		e.position.x += eSpeed;
		
		if(r.position.y > App.getHeight() - r.getHeight() || r.position.y < -o.position.y) {
			rSpeed *= -1;
		}
		
		r.position.y += rSpeed;
	}
	
	//----------------------------------------
	//Add to DOM and Init App
	$(document.body).append(App.element);
	App.start();
	//App.stop();
});