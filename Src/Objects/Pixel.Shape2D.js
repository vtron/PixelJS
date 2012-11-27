//-------------------------------------------------------
//-------------------------------------------------------
//Shape2D

Pixel.Shape2D = function() {
	Pixel.Object.call(this);
	
	this.fillColor		= new Pixel.Color();
	this.fillColor.init(255,255,255);
	console.log(this.fillColor);
	this.bFill			= false;
	
	this.strokeColor	= new Pixel.Color();
	this.strokeSize		= 1;
	this.bStroke		= false;
}

Pixel.Shape2D.prototype = Object.create(Pixel.Object.prototype);

Pixel.Shape2D.prototype.setStrokeSize = function(size) {
	this.strokeSize = size;
}

//-------------------------------------------------------
//-------------------------------------------------------
//RectShape

Pixel.RectShape = function() {
	Pixel.Shape2D.call(this);
}

Pixel.RectShape.prototype = Object.create(Pixel.Shape2D.prototype);

Pixel.RectShape.prototype.draw = function() {
	if(this.canvas) {
		this.canvas.setFillColor(this.fillColor);
		this.canvas.drawRect(this.pos.x, this.pos.y, this.width, this.height);
	}
}