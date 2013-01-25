//-------------------------------------------------------
//-------------------------------------------------------
// !RectShape

Pixel.RectShape = function() {
	Pixel.Shape2D.call(this);
}

Pixel.RectShape.prototype = Object.create(Pixel.Shape2D.prototype);


//-------------------------------------------------------
Pixel.RectShape.prototype.draw = function() {
	if(this.canvas && this.visible) {
		this.calculateOffset();
		
		this.canvas.pushMatrix();
		this.canvas.translate(this.position.x, this.position.y, this.position.z);
		this.canvas.rotate(this.rotation);
		
		if(this.fillEnabled) {
			this.canvas.setFillColor(this.fillColor);
		} else {
			this.canvas.noFill();
		}
		
		if(this.strokeEnabled) {
			this.canvas.setStrokeSize(this.strokeSize);
			this.canvas.setStrokeColor(this.strokeColor);
		} else {
			this.canvas.noStroke();
		}
		
		//this.calculateOffset();
		this.canvas.drawRect(this.offset.x, this.offset.y, this.width, this.height);
		
		this.canvas.popMatrix();
	}
}