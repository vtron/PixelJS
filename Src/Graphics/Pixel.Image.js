//-------------------------------------------------------
//Pixel.Image.js
//Forloading, storing, manipulating, etc

Pixel.Image = function(url) {
	Pixel.Object.call(this);
	
	if(url != undefined) this.load(url);
	
	this.bAllocated = false;
}

Pixel.Image.prototype = new Pixel.Object();


//-------------------------------------------------------
Pixel.Image.prototype.load = function(src) {
	this.clear();
	
	this.image = new Image();
	var self = this;
	this.image.addEventListener("load", function() { 
		self.bLoaded = true;
		
		//Get Size of Image
		self.setSize(this.width, this.height);
	});
	
	
	this.image.addEventListener("error", function() {
		console.log("Could not load image from '" + url + "'");
	});
	
	
	this.image.src = src;
};



//-------------------------------------------------------
Pixel.Image.prototype.isLoaded = function() {
	return this.bLoaded;
};



//-------------------------------------------------------
Pixel.Image.prototype.clear = function() {
	this.bLoaded	= false;
	this.pixels		= null;
	this.imageData	= null;
	this.image		= null;
};



//-------------------------------------------------------
Pixel.Image.prototype.setSize = function(width, height) {
	Pixel.Object.prototype.setSize.call(this, width,height);
	
	if(this.bAllocated == false) {			
		//Get Canvas Ref
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.imageData = this.ctx.getImageData(0,0,this.getWidth(), this.getHeight());
	}
	
	
	this.canvas.setAttribute("width", this.width);
	this.canvas.setAttribute("height", this.height);
};



//-------------------------------------------------------
Pixel.Image.prototype.getImageData = function() {
	return this.imageData;
};



//-------------------------------------------------------
Pixel.Image.prototype.getPixels = function() {
	if(this.bLoaded) {			
		this.ctx.drawImage(this.image, 0,0);
		this.imageData	= this.ctx.getImageData(0,0,this.size.width, this.size.height)
		this.pixels		= this.imageData.data;
		return this.pixels;
	}
	return null;
};



//-------------------------------------------------------
Pixel.Image.prototype.setFromPixels = function(pixels, width, height){
	this.clear();
	
	//Resize the Canvas, get the new image data obj
	this.setSize(width, height);
	this.imageData	= this.ctx.getImageData(0,0,this.size.width, this.size.height);
	this.pixels		= this.imageData.data;
	
	//Copy pixels into image data
	var i=pixels.length;
	while(i--) this.pixels[i] = pixels[i];
	
	//Draw Data back into the canvas object
	this.ctx.putImageData(this.imageData, 0,0);
	
	//Store info as an IMG, drawing using drawImage() is WAY faster than putImageData()
	this.image = new Element("img");  
	this.image.addEvent("load", function() {
		this.image.removeEvent("load");
		this.bLoaded = true;
	}.bind(this));
	
	this.image.src = this.canvas.toDataURL("image/png");
};


//-------------------------------------------------------
Pixel.Image.prototype.draw = function(pxCanvas, x, y) {
	pxCanvas.drawImage(this, x,y);
};