//-------------------------------------------------------
//Pixel.Font.js
//Used for storing font information for convenience 

//Empty canvas object for rendering
Pixel.FontSizeCvs = null;

Pixel.Font = Class.extend({
	init: function(font, size, alignment, baseline) {
		this.font		= font || "Arial";
		this.size		= size || 12;
		this.alignment	= alignment || Pixel.TEXT_BASELINE_LEFT;
		this.baseline	= baseline || Pixel.TEXT_BASELINE_TOP;
		
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
	getTextWidth: function(text) {
		Pixel.FontSizeCvs.setFont(this);
		return Pixel.FontSizeCvs.getTextWidth(text);
	},
	
	
	//-------------------------------------------------------
	getTextHeight: function() {
		return Math.round(this.size * 1.5);
	}
});