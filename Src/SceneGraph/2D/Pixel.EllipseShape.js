//-------------------------------------------------------
//-------------------------------------------------------
// !EllipseShape

Pixel.EllipseShape = function() {
	Pixel.Shape2D.call(this);
}

Pixel.EllipseShape.prototype = Object.create(Pixel.Shape2D.prototype);


//-------------------------------------------------------
Pixel.EllipseShape.prototype.draw = function() {
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