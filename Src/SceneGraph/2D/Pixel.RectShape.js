//-------------------------------------------------------
//-------------------------------------------------------
// !RectShape

Pixel.RectShape = function() {
	Pixel.Shape2D.call(this);
}

Pixel.RectShape.prototype = Object.create(Pixel.Shape2D.prototype);


//-------------------------------------------------------
Pixel.RectShape.prototype.draw = function() {
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
		
		this.canvas.drawRect(0, 0, this.width, this.height);
}