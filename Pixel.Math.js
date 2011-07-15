if(!Pixel) {
	var Pixel = {};
	if(!px) var px = Pixel;
}


//-------------------------------------------------------
//Rectangle Class
//-------------------------------------------------------
Pixel.Rectangle = new Class({
	pos: {
		x:0,
		y:0
	},
	
	size: {
		width:0,
		height:0
	},
	
	isSet:function(num) { return num != null ? num : 0; },
	
	//-------------------------------------------------------
	initialize:function(x,y,width,height) { 
		this.setPos(x,y);
		this.setSize(width,height);
	},
	
	//-------------------------------------------------------
	setPos: function(x,y) {
		this.pos.x = this.isSet(x);
		this.pos.y = this.isSet(y);
	},
	
	//-------------------------------------------------------
	setSize: function(width,height) {
		this.size.width = this.isSet(width);
		this.size.height = this.isSet(height);
	},
	
	//-------------------------------------------------------
	getPos: function() {
		return this.pos;
	},
	
	//-------------------------------------------------------
	getSize: function() {
		return this.size;
	},
	
	//-------------------------------------------------------
	isInside:function(x,y) {
		return (x > this.pos.x) && (x < this.pos.x + this.size.width) && (y > this.pos.y) && (y < this.pos.y + this.size.height);
	}
});




//-------------------------------------------------------
//Convert Radians to Degrees
//-------------------------------------------------------
Pixel.radToDeg = function(rad) {
	return rad * (180/Math.PI);
}

Pixel.degToRad = function(deg) {
	return deg * (Math.PI/180);
}




//-------------------------------------------------------
//Mapping/Distance
//-----------------------------------------------------
Pixel.map = function(value, iStart, iStop, oStart, oStop, bClamp) {
	value = oStart + (oStop - oStart) * ((value - iStart) / (iStop - iStart));
	return bClamp ? Pixel.clamp(value) : value;
}

//-----------------------------------------------------
Pixel.clamp = function(value, lowVal,highVal) {
	value = Math.max(value,lowVal);
	value = Math.min(value,highVal);
	return value;
}


//-----------------------------------------------------
Pixel.dist = function(x1,y1,x2,y2) {
	return Math.sqrt(Math.pow((x2-x1),2) + Math.pow(y2-y1,2));
}


//-----------------------------------------------------
Pixel.getAngle = function(x1, y1, x2, y2) {
	return Math.atan2(y2 - y1, x2 - x1);
}
