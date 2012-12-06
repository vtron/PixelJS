//-------------------------------------------------------
//-------------------------------------------------------
//Pixel.Shape2D.js
//Contains a base shape for 2D shapes

//-------------------------------------------------------
//-------------------------------------------------------
// !Shape2D

Pixel.Shape2D = function() {
	Pixel.Object.call(this);
	
	this.width	= 0;
	this.height = 0;
	
	this.fillColor			= new Pixel.Color(255,255,255);
	this._fillEnabled		= false;
	
	this.strokeColor		= new Pixel.Color();
	this.strokeSize			= 1;
	this._strokeEnabled		= false;
}

Pixel.Shape2D.prototype = Object.create(Pixel.Object.prototype);


//-------------------------------------------------------
//Fill

//-------------------------------------------------------
Pixel.Shape2D.prototype.enableFill = function() {
	this._fillEnabled = true;
}

//-------------------------------------------------------
Pixel.Shape2D.prototype.disableStroke = function() {
	this._fillEnabled = false;
}

//-------------------------------------------------------
//Stroke

//-------------------------------------------------------
Pixel.Shape2D.prototype.setStrokeSize = function(size) {
	this.strokeSize = size;
}

//-------------------------------------------------------
Pixel.Shape2D.prototype.enableStroke = function() {
	this._strokeEnabled = true;
}

//-------------------------------------------------------
Pixel.Shape2D.prototype.disableStroke = function() {
	this._strokeEnabled = false;
}

//-------------------------------------------------------
Pixel.Shape2D.prototype.setStrokeSize = function(size) {
	this.strokeSize = size;
}

//-------------------------------------------------------
//Width

//-------------------------------------------------------
Pixel.Shape2D.prototype.setWidth = function(width) {
	this.width = width;
	return this;
}


//-------------------------------------------------------
Pixel.Shape2D.prototype.getWidth = function() {
	return this.width;
}

//-------------------------------------------------------
//Height


//-------------------------------------------------------
Pixel.Shape2D.prototype.setHeight = function() {
	this.height = height;
	return this;
}


//-------------------------------------------------------
Pixel.Shape2D.prototype.getHeight = function() {
	return this.height;
}

//-------------------------------------------------------
//Size/Bounds

//-------------------------------------------------------
Pixel.Shape2D.prototype.getSize = function() {
	var size = {
		width:this.width,
		heigiht:this.height
	}
	
	return size;
}

//-------------------------------------------------------
Pixel.Shape2D.prototype.getBounds = function() {
	return new Pixel.Rect(this.pos.x, this.pos.y, this.width, this.height);
}