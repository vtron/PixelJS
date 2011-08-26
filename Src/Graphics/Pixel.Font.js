//-------------------------------------------------------
//Pixel.Font.js
//Used for storing font information for convenience 

Pixel.FontSizeCvs = null;

Pixel.Font = new Class({
	ctx:null,
	
	font:"Arial",
	size:24,
	alignment: Pixel.TEXT_ALIGN_LEFT,
	baseline: Pixel.TEXT_BASELINE_TOP,
	
	//-------------------------------------------------------
	initialize:function(font, size, alignment, baseline) {
		if(Pixel.isSet(font)) this.font = font;
		if(Pixel.isSet(size)) this.size = size;
		if(Pixel.isSet(alignment)) this.alignment = alignment;
		if(Pixel.isSet(baseline)) this.baseline = baseline;
		
		//Create canvas for getting sizes, if not defined yet
		if(Pixel.FontSizeCvs == null) {
			Pixel.FontSizeCvs = new Pixel.Canvas(Pixel.RENDER_MODE_2D);
		}
	},
	
	//-------------------------------------------------------
	setSize: function(size) {
		this.size = size;
	},
	
	
	//-------------------------------------------------------
	setFont: function(font) {
		this.font = font;
	},
	
	//-------------------------------------------------------
	setAlignment: function(alignment) {
		this.alignment = alignment;
	},
	
	
	//-------------------------------------------------------
	setBaseline: function(baseline) {
		this.baseline = baseline;
	},
	
	//-------------------------------------------------------
	getSize: function() {
		return this.size;
	},
	
	//-------------------------------------------------------
	getTextWidth:function(text) {
		Pixel.FontSizeCvs.setFont(this);
		return Pixel.FontSizeCvs.getTextWidth(text);
	},
	
	//-------------------------------------------------------
	getTextHeight: function() {
		return Math.round(this.size * 1.5);
	}	
});