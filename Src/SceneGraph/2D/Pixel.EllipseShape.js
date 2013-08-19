//-------------------------------------------------------
//-------------------------------------------------------
// !EllipseShape

Pixel.EllipseShape = function() {
	Pixel.Shape2D.call(this);
}

Pixel.EllipseShape.prototype = Object.create(Pixel.Shape2D.prototype);

//-------------------------------------------------------
Pixel.EllipseShape.prototype.pointInside = function(position) {
	if(position.x < this.getWidth() && position.y < this.getHeight()) {
		return true;
	}
	
	return false;
}


//-------------------------------------------------------
Pixel.EllipseShape.prototype.draw = function() {
	if(this.fillEnabled) {
		this.canvas.setFillColor(this.fillColor);
	}
	
	if(this.strokeEnabled) {
		this.canvas.setStrokeSize(this.strokeSize);
		this.canvas.setStrokeColor(this.strokeColor);
	}
	
	if(this.width == this.height) {
		this.canvas.drawCircle(0, 0, this.width);
	} else {	
		this.canvas.drawEllipse(0, 0, this.width, this.height);
	}
	
	if(this.shouldDrawBounds) {
		this.drawBounds();
	}
}