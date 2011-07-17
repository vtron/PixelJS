if(!Pixel) {
	var Pixel = {};
	if(!px) var px = Pixel;
};


Pixel.Font = new Class({
	text:"",
	font:"Arial",
	size:10,
	alignment: Pixel.TEXT_ALIGN_LEFT,
	baseline: Pixel.TEXT_BASELINE_TOP,
	
	
	initialize:function(font, size, alignment, baseline) {
		if(Pixel.isSet(font)) this.font = font;
		if(Pixel.isSet(size)) this.size = size;
		if(Pixel.isSet(alignment)) this.alignment = alignment;
		
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
	setText: function(text) {
		this.text = text;
	},
	
	
	//-------------------------------------------------------
	getWidth: function(string) {
		
	},
	
	
	//-------------------------------------------------------
	activate: function(ctx) {
		ctx.setFont(this.font, this.size);
		ctx.setTextAlignment(this.alignment);
		ctx.setTextBaseline(this.baseline);
	},
	
	
	//-------------------------------------------------------
	draw: function(ctx, x, y, text) {
		if(text != undefined) this.text = text;
		
		this.activate(ctx);
		ctx.drawText(this.text, x, y);
	}
});