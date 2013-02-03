//-------------------------------------------------------
//-------------------------------------------------------
// !EllipseShape

Pixel.EllipseShape = function() {
	Pixel.Shape2D.call(this);
}

Pixel.EllipseShape.prototype = Object.create(Pixel.Shape2D.prototype);


//-------------------------------------------------------
Pixel.EllipseShape.prototype.draw = function() {
	if(this.canvas && this.visible) {
		this.calculateOffset();
		
		if(this.fillEnabled) {
			this.canvas.setFillColor(this.fillColor);
		}
		
		if(this.strokeEnabled) {
			this.canvas.setStrokeSize(this.strokeSize);
			this.canvas.setStrokeColor(this.strokeColor);
		}
		
		this.setTransformation();
		
		if(this.width == this.height) {
			this.canvas.drawCircle(this.offset.x, this.offset.y, this.width);
		} else {	
			this.canvas.drawEllipse(this.offset.x, this.offset.y, this.width, this.height);
		}
		
		if(this.shouldDrawBounds) {
			this.drawBounds();
		}
		
		this.unsetTransformation();
	}
}