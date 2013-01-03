//-------------------------------------------------------
//Pixel.Font.js
//Used for storing font information for convenience 

//Empty canvas object for rendering
Pixel.FontSizeCvs = null;

Pixel.Font = function(family) {
	this.fontFamily	= family || "Arial";
	this.alignment	= Pixel.TEXT_ALIGN_LEFT;
	this.baseline	= Pixel.TEXT_BASELINE_TOP;
	
	//Create canvas for getting sizes, if not defined yet
	if(Pixel.FontSizeCvs == null) {
		Pixel.FontSizeCvs = new Pixel.Canvas(Pixel.RENDER_MODE_2D);
	}
}

//-------------------------------------------------------
Pixel.Font.prototype.setFamily = function(family) {
	this.fontFamily = fontName;
}


//-------------------------------------------------------
Pixel.Font.prototype.setBaseline = function(baseline) {
	this.baseline = baseline;
}


//-------------------------------------------------------
Pixel.Font.prototype.getTextWidth = function(text, size) {
	Pixel.FontSizeCvs.setFont(this.fontFamily, size);
	return Pixel.FontSizeCvs.getTextWidth(text);
}

//-------------------------------------------------------
Pixel.Font.prototype.getTextHeight = function(text, size) {
	return size;
}