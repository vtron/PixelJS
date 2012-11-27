//-------------------------------------------------------
//Pixel.Math.js
//Various classes and functions that make math easier

Pixel.Rectangle = function() {
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
		
	this.set(x,y,width,height);
}
/*

Pixel.Rectangle.prototype.init = function(x,y,width,height) {
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	
	this.set(x,y,width,height);
}


//-------------------------------------------------------
Pixel.Rectangle.prototype.initialize = function(x,y,width,height) { 
	this.set(x,y,width,height);
}


//-------------------------------------------------------
Pixel.Rectangle.prototype.set = function(x,y,width,height) {
	this.setPos(x,y);
	this.setSize(width,height);
}


//-------------------------------------------------------
Pixel.Rectangle.prototype.setPos = function(x,y) {
	if(Pixel.isSet(x)) this.x = x;
	if(Pixel.isSet(y)) this.y = y;
}


//-------------------------------------------------------
Pixel.Rectangle.prototype.setSize = function(width,height) {
	this.width	= width;
	this.height = height;
}


//-------------------------------------------------------
Pixel.Rectangle.prototype.getPos = function() {
	return {
		x:this.x,
		y:this.y
	};
}


//-------------------------------------------------------
Pixel.Rectangle.prototype.getSize = function() {
	return {
		width:this.width,
		height:this.height
	}
}


//-------------------------------------------------------
Pixel.Rectangle.prototype.isInside = function(x,y) {
	return (x > this.x) && (x < this.x + this.width) && (y > this.y) && (y < this.y + this.height);
}
*/


//-------------------------------------------------------
//Utils
//Various classes and functions that make math easier
Pixel.Math = new Object;


//-------------------------------------------------------
//Radians & Degrees
//-------------------------------------------------------
Pixel.Math.radiansToDegrees = function(rad) {
	return rad * (180/Math.PI);
};

Pixel.Math.degreesToRadians = function(deg) {
	return deg * (Math.PI/180);
};




//-------------------------------------------------------
//Mapping/Distance
//-----------------------------------------------------
Pixel.Math.map = function(iStart, iStop, value, oStart, oStop, bClamp) {
	value = oStart + (oStop - oStart) * ((value - iStart) / (iStop - iStart));
	return bClamp ? Pixel.clamp(value) : value;
}

//-----------------------------------------------------
Pixel.Math.clamp = function(value, lowVal,highVal) {
	value = Math.max(value,lowVal);
	value = Math.min(value,highVal);
	return value;
}


//-----------------------------------------------------
Pixel.Math.dist = function(x1,y1,x2,y2, bSigned) {
	var dist = Math.sqrt(Math.pow((x2-x1),2) + Math.pow(y2-y1,2));
	
	return bSigned ? dist : Math.abs(dist);
}


//-----------------------------------------------------
Pixel.Math.getAngle = function(x1, y1, x2, y2) {
	return Math.atan2(y2 - y1, x2 - x1);
}

//-----------------------------------------------------
Pixel.Math.isPowerOfTwo = function(value) {
	return ((value & (value - 1)) == 0);
}
