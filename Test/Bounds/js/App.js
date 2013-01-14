$(document).ready(function() {
	var App = new Pixel.App();
	
	App.setSize(1000,500);
	App.setBackgroundColor(0,0,0);
	
	var o = new Pixel.Object();
	o.pos.set(App.getWidth()/2, App.getHeight()/2);
	o.setDrawBounds(true);
	
	App.addChild(o);
	
	var e = new Pixel.EllipseShape();
	e.setAlignment(Pixel.ALIGNMENT_CENTER_CENTER);
	e.setSize(250, 250);
	e.pos.set(50,75);
	o.addChild(e);
	
	var r = new Pixel.RectShape();
	r.setSize(250,250);
	o.addChild(r);
	
	
	var testRect = new Pixel.Rect(0,0,0,0);
	testRect.include(new Pixel.Rect(-125.5,-125.5, 250,250));
	testRect.include(new Pixel.Rect(0,0, 250,250));
	
	console.log(testRect);
	
	//----------------------------------------
	//Update
	App.update = function() {
	}
	
	//----------------------------------------
	//Add to DOM and Init App
	$(document.body).append(App.element);
	App.start();
	
	//App.stop();
});