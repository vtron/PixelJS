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
Pixel.Font.prototype.getFamily = function(family) {
	return this.fontFamily;
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
	var text = document.createElement('span');
	text.style.font = size + "px " + this.fontFamily;
	text.innerHTML	= text;
	
	var block = document.createElement('div');
	block.style.display = "inline-block";
	block.style.width="1px";
	block.style.height="0px";
	
	var div = document.createElement('div');
	div.appendChild(text);
	div.appendChild(block);
	
	document.body.appendChild(div);
	
	try {
		var result = {};
		
		block.style.verticalAlign = 'baseline';
		result.ascent = block.offsetTop - text.offsetTop;
		
		block.style.verticalAlign = 'bottom';
		result.height = block.offsetTop - text.offsetTop;
		
		result.descent = result.height - result.ascent;
	
	} finally {
		document.body.removeChild(div);
	}
	
	return result;
}

//-------------------------------------------------------
Pixel.Font.prototype.getTextMetrics = function(text, size) {
	var tWidth	= this.getTextWidth(text, size);
	var tHeight = this.getTextHeight(text, size);
	
	return {
		width: tWidth,
		height: tHeight.height,
		ascent: tHeight.ascent,
		descent: tHeight.descent
	}
}