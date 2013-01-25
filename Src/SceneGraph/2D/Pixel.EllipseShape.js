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
		
		this.canvas.pushMatrix();
		this.canvas.translate(this.position.x, this.position.y, this.position.z);
		this.canvas.rotate(this.rotation);
		this.canvas.scale(this.scaleAmount.x, this.scaleAmount.y);
		
		if(this.width == this.height) {
			this.canvas.drawCircle(this.offset.x, this.offset.y, this.width);
		} else {	
			this.canvas.drawEllipse(this.offset.x, this.offset.y, this.width, this.height);
		}
		
		this.canvas.popMatrix();
	}
}