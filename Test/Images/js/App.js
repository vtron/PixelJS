$(document).ready(function() {
	var App = new Pixel.App();
	
	App.setSize(1000,400);
	App.setBackgroundColor(0,0,0);
	
	//Load a JS Image Object
	var evolution1 = new Pixel.ImageShape();
	
	var evolution1Image = new Image();
	evolution1Image.onload = function() {
		evolution1.load(evolution1Image);
	}
	
	evolution1Image.src = "images/Evolution1.png";

	
	//Load image into a new Pixel.Canvas and draw that to the app
	var evolution2 = new Pixel.ImageShape();
	
	var evolution2Image = new Image();
	evolution2Image.onload = function() {
		var pxCanvas = new Pixel.Canvas();
		pxCanvas.setSize(evolution2Image.width, evolution2Image.height);
		pxCanvas.drawImage(evolution2Image, 0, 0, evolution2Image.width, evolution2Image.height);
		
		evolution2.load(pxCanvas);
	}
	
	evolution2Image.src = "images/Evolution2.png";
	
	//Load image directly through Pixel.js
	var evolution3 = new Pixel.ImageShape("images/Evolution3.png");
	var evolution4 = new Pixel.ImageShape("images/Evolution4.png");
	var evolution5 = new Pixel.ImageShape("images/Evolution5.png");
	var evolution6 = new Pixel.ImageShape("images/Evolution6.png");
	
	
	App.addChild(evolution1);
	App.addChild(evolution2);
	App.addChild(evolution3);
	App.addChild(evolution4);
	App.addChild(evolution5);
	App.addChild(evolution6);
	
		
	App.update = function() {
		evolution2.pos.x = evolution1.getWidth();
		evolution3.pos.x = evolution2.pos.x + evolution2.width;
		evolution4.pos.x = evolution3.pos.x + evolution3.width;
		evolution5.pos.x = evolution4.pos.x + evolution4.width;
		evolution6.pos.x = evolution5.pos.x + evolution5.width;
	}
	
	
	$(document.body).append(App.element);
	App.start();
	
	$(document).on("mousemove", function(e) {
		evolution4.getPixels();
		
		var pct = e.clientX/App.getWidth();
		var nPixels = evolution4.pixels.length;
		for(var i=0; i<nPixels; i+=4) {
			evolution4.pixels[i+2] = 255*pct;
		}
		
		evolution4.setPixels(evolution4.pixels);
	});
});