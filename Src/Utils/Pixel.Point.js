//-------------------------------------------------------
//-------------------------------------------------------
//Point Class

Pixel.Point = function(x,y,z) {
	this.x = x || 0.0;
	this.y = y || 0.0;
	this.z = z || 0.0;
}

Pixel.Point.prototype.set = function(x,y,z) {
	this.x = x || 0.0;
	this.y = y || 0.0;
	this.z = z || 0.0;
}