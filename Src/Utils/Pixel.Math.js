if(!Pixel) {
	var Pixel = {};
	if(!px) var px = Pixel;
}


//-------------------------------------------------------
//Rectangle Class
//-------------------------------------------------------
Pixel.Rectangle = new Class({
	x:0,
	y:0,
	
	width:0,
	height:0,
	
	//-------------------------------------------------------
	initialize:function(x,y,width,height) { 
		this.set(x,y,width,height);
	},
	
	
	//-------------------------------------------------------
	set: function(x,y,width,height) {
		this.setPos(x,y);
		this.setSize(width,height);
	},
	
	//-------------------------------------------------------
	setPos: function(x,y) {
		if(Pixel.isSet(x)) this.x = x;
		if(Pixel.isSet(y)) this.y = y;
	},
	
	//-------------------------------------------------------
	setSize: function(width,height) {
		if(Pixel.isSet(width))	this.width	= width;
		if(Pixel.isSet(height)) this.height = height;
	},
	
	//-------------------------------------------------------
	getPos: function() {
		return {
			x:this.x,
			y:this.y
		};
	},
	
	//-------------------------------------------------------
	getSize: function() {
		return {
			width:this.width,
			height:this.height
		}
	},
	
	//-------------------------------------------------------
	isInside:function(x,y) {
		return (x > this.x) && (x < this.x + this.width) && (y > this.y) && (y < this.y + this.height);
	}
});




//-------------------------------------------------------
//Convert Radians to Degrees
//-------------------------------------------------------
Pixel.radToDeg = function(rad) {
	return rad * (180/Math.PI);
};

Pixel.degToRad = function(deg) {
	return deg * (Math.PI/180);
};




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
Pixel.dist = function(x1,y1,x2,y2, bSigned) {
	var dist = Math.sqrt(Math.pow((x2-x1),2) + Math.pow(y2-y1,2));
	
	return bSigned ? dist : Math.abs(dist);
}


//-----------------------------------------------------
Pixel.getAngle = function(x1, y1, x2, y2) {
	return Math.atan2(y2 - y1, x2 - x1);
}
