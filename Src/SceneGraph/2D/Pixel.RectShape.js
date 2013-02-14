//-------------------------------------------------------
//-------------------------------------------------------
// !RectShape

Pixel.RectShape = function() {
	Pixel.Shape2D.call(this);
}

Pixel.RectShape.prototype = Object.create(Pixel.Shape2D.prototype);

//-------------------------------------------------------
Pixel.RectShape.prototype.pointInside = function(position) {
	console.log(position);
	if(position.x > 0 && position.x < this.getWidth() && position.y > 0 && position.y < this.getHeight()) {
		return true;
	}
	
	return false;
}


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