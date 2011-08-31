//-------------------------------------------------------
//Pixel.Font.js
//Used for storing font information for convenience 

Pixel.FontSizeCvs = null;

Pixel.Font = function(font, size, alignment, baseline) {
	this.font		= font || "Arial";
	this.size		= size || 12;
	this.alignment	= alignment || Pixel.TEXT_BASELINE_LEFT;
	this.baseline	= baseline || Pixel.TEXT_BASELINE_TOP;
	
	//Create canvas for getting sizes, if not defined yet
	if(Pixel.FontSizeCvs == null) {
		Pixel.FontSizeCvs = new Pixel.Canvas(Pixel.RENDER_MODE_2D);
	}
}


//-------------------------------------------------------
Pixel.Font.prototype.setSize = function(size) {
	this.size = size;
}


//-------------------------------------------------------
Pixel.Font.prototype.setFont = function(font) {
	this.font = font;
}


//-------------------------------------------------------
Pixel.Font.prototype.setSize = function(size) {
	this.size = size;
}


//-------------------------------------------------------
Pixel.Font.prototype.setFont = function(font) {
	this.font = font;
}

//-------------------------------------------------------
Pixel.Font.prototype.setAlignment = function(alignment) {
	this.alignment = alignment;
}


//-------------------------------------------------------
Pixel.Font.prototype.setBaseline = function(baseline) {
	this.baseline = baseline;
}

//-------------------------------------------------------
Pixel.Font.prototype.getSize = function() {
	return this.size;
}

//-------------------------------------------------------
Pixel.Font.prototype.getTextWidth = function(text) {
	Pixel.FontSizeCvs.setFont(this);
	return Pixel.FontSizeCvs.getTextWidth(text);
}

//-------------------------------------------------------
Pixel.Font.prototype.getTextHeight = function() {
	return Math.round(this.size * 1.5);
}