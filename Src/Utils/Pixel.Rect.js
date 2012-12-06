//-------------------------------------------------------
//Pixel.Math.js
//Various classes and functions that make math easier

Pixel.Rect = function(x,y,width,height) {
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
		
	this.set(x,y,width,height);
}


//-------------------------------------------------------
Pixel.Rect.prototype.set = function(x,y,width,height) {
	this.setPos(x,y);
	this.setSize(width,height);
}


//-------------------------------------------------------
Pixel.Rect.prototype.setPos = function(x,y) {
	if(Pixel.isSet(x)) this.x = x;
	if(Pixel.isSet(y)) this.y = y;
}


//-------------------------------------------------------
Pixel.Rect.prototype.setSize = function(width,height) {
	this.width	= width;
	this.height = height;
}


//-------------------------------------------------------
Pixel.Rect.prototype.getPos = function() {
	return {
		x:this.x,
		y:this.y
	};
}


//-------------------------------------------------------
Pixel.Rect.prototype.getSize = function() {
	return {
		width:this.width,
		height:this.height
	}
}

//-------------------------------------------------------
//Takes poPoint or x,y coordinate
Pixel.Rect.prototype.pointInside = function(x,y) {
	if(y != undefined) {
		return (x > this.x) && (x < this.x + this.width) && (y > this.y) && (y < this.y + this.height);
	} else {
		return (x.x > this.x) && (x.x < this.x + this.width) && (x.y > this.y) && (x.y < this.y + this.height);
	}
}

//-------------------------------------------------------
Pixel.Rect.prototype.include = function(rect) {
	if(rect.x < this.x) this.x = rect.x;
	if(rect.y < this.y) this.y = rect.y;
	
	if(rect.x + rect.width	> this.width)	this.width	= rect.x + rect.width;
	if(rect.y + rect.height > this.height)	this.height = rect.y + rect.height;
}