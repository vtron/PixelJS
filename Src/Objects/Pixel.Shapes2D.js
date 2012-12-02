//-------------------------------------------------------
//-------------------------------------------------------
//Shape2D

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




//-------------------------------------------------------
//-------------------------------------------------------
//RectShape

Pixel.RectShape = function() {
	Pixel.Shape2D.call(this);
}

Pixel.RectShape.prototype = Object.create(Pixel.Shape2D.prototype);


//-------------------------------------------------------
Pixel.RectShape.prototype.draw = function() {
	if(this.canvas) {
		this.canvas.pushMatrix();
		this.canvas.translate(this.pos.x, this.pos.y, this.pos.z);
		this.canvas.rotate(this.rotation);
		
		this.canvas.setFillColor(this.fillColor);
		this.canvas.setStrokeSize(this.strokeSize);
		this.canvas.setStrokeColor(this.strokeColor);
		
		this.calculateOffset();
		this.canvas.drawRect(this.offset.x, this.offset.y, this.width, this.height);
		
		this.canvas.popMatrix();
	}
}


//-------------------------------------------------------
//-------------------------------------------------------
//OvalShape

Pixel.OvalShape = function() {
	Pixel.Shape2D.call(this);
}

Pixel.OvalShape.prototype = Object.create(Pixel.Shape2D.prototype);


//-------------------------------------------------------
Pixel.OvalShape.prototype.draw = function() {
	if(this.canvas) {		
		this.canvas.setFillColor(this.fillColor);
		this.canvas.setStrokeSize(this.strokeSize);
		this.canvas.setStrokeColor(this.strokeColor);
		
		this.calculateOffset();
		
		this.canvas.pushMatrix();
		this.canvas.translate(this.pos.x, this.pos.y, this.pos.z);
		this.canvas.rotate(this.rotation);
		
		if(this.width == this.height) {
			this.canvas.drawCircle(this.offset.x, this.offset.y, this.width);
		} else {	
			this.canvas.drawEllipse(this.offset.x, this.offset.y, this.width, this.height);
		}
		
		this.canvas.popMatrix();
	}
}