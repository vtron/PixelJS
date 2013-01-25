//-------------------------------------------------------
//-------------------------------------------------------
//Pixel.Shape2D.js
//Contains a base shape for 2D shapes

//-------------------------------------------------------
//-------------------------------------------------------
// !Shape2D

Pixel.Shape2D = function() {
	Pixel.Object.call(this);
	
	this.fillColor			= new Pixel.Color(255,255,255);
	this.fillEnabled		= true;
	
	this.strokeColor		= new Pixel.Color();
	this.strokeSize			= 1;
	this.strokeEnabled		= false;
	
	this.path 				= null;
}

Pixel.Shape2D.prototype = Object.create(Pixel.Object.prototype);

//-------------------------------------------------------
//! Override addChid to throw error,
//Shape objects can't have children

//-------------------------------------------------------
Pixel.Shape2D.prototype.addChild = function(child) {
	Pixel.log("Error: Children cannot be added to a shape object");
}

//-------------------------------------------------------
//! Fill

//-------------------------------------------------------
Pixel.Shape2D.prototype.enableFill = function() {
	this.fillEnabled = true;
}


//-------------------------------------------------------
Pixel.Shape2D.prototype.disableFill = function() {
	this.fillEnabled = false;
}


//-------------------------------------------------------
Pixel.Shape2D.prototype.setFillColor = function(r,g,b,a) {
	this.fillColor.set(r,g,b,a);
}

//-------------------------------------------------------
//! Stroke
//-------------------------------------------------------
Pixel.Shape2D.prototype.enableStroke = function() {
	this.strokeEnabled = true;
}


//-------------------------------------------------------
Pixel.Shape2D.prototype.disableStroke = function() {
	this.strokeEnabled = false;
}


//-------------------------------------------------------
Pixel.Shape2D.prototype.setStrokeSize = function(size) {
	this.strokeSize = size;
	this.strokeEnabled = true;
}


//-------------------------------------------------------
Pixel.Shape2D.prototype.setStrokeColor = function(r,g,b,a) {
	this.strokeColor.set(r,g,b,a);
}


//-------------------------------------------------------
//! Size
//-------------------------------------------------------
Pixel.Shape2D.prototype.getWidth = function() {
	return this.width;
}

//-------------------------------------------------------
Pixel.Shape2D.prototype.setWidth = function(width) {
	this.width = width;
}


//-------------------------------------------------------
Pixel.Shape2D.prototype.getHeight = function() {
	return this.height;
}


//-------------------------------------------------------
Pixel.Shape2D.prototype.setHeight = function(height) {
	this.height = height;
}


//-------------------------------------------------------
Pixel.Shape2D.prototype.getSize = function() {
	return { "width": this.getWidth(), "height": this.getHeight() };
}


//-------------------------------------------------------
Pixel.Shape2D.prototype.setSize = function(width, height) {
	this.setWidth(width);
	this.setHeight(height);
}

//-------------------------------------------------------
//! Bounds
//-------------------------------------------------------

//-------------------------------------------------------
Pixel.Shape2D.prototype.getBounds = function() {
	this.calculateOffset();
	return new Pixel.Rect(this.offset.x, this.offset.y, this.getWidth(), this.getHeight());
}