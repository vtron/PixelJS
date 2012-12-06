//-------------------------------------------------------
//-------------------------------------------------------
// !RectShape

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