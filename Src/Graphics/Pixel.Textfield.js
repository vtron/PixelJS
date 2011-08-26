//-------------------------------------------------------
//Pixel.Textfield.js
//Font class with added capabilities like position, size, etc

Pixel.Textfield = new Class({
	Extends:Pixel.Object,
	
	text:"Text Not Set",
	color:null,
	font:null,
	
	//-------------------------------------------------------
	initialize:function(text, font) {
		this.font = new Pixel.Font("Arial", 14);
		this.color = new Pixel.Color(255,255,255,1);
		
		if(font != undefined) {
			this.font = font;
		}
		
		if(text != undefined) {
			this.setText(text);
		}
	},
	
	//-------------------------------------------------------
	setFont: function(font, size, alignment, baseline) {
		if(size != undefined) {
			this.font = new Pixel.Font(font, size, alignment, baseline);
		} else {
			this.font = font;
		}
	},
	
	//-------------------------------------------------------
	setColor: function(r,g,b,a) {
		this.color.set(r,g,b,a);
	},
	
	//-------------------------------------------------------
	setText: function(text) {
		this.text = text;
		
		this.width	= this.font.getTextWidth(this.text);
		this.height	= this.font.getTextHeight(this.text);
		
		this.setRect();
	},
	
	
	//-------------------------------------------------------
	setRect: function() {
		switch(this.font.alignment) {
			case Pixel.TEXT_ALIGN_LEFT:
				switch(this.font.baseline) {
					case Pixel.TEXT_BASELINE_TOP:
						this.rect.set(this.pos.x, this.pos.y, this.width, this.height);
						break;
					case Pixel.TEXT_BASELINE_MIDDLE:
						this.rect.set(this.pos.x, this.pos.y - this.height/2, this.width, this.height);
						break;
					case Pixel.TEXT_BASELINE_BOTTOM:
						this.rect.set(this.pos.x, this.pos.y - this.height, this.width, this.height);
						break;
				}
				break;
				
			case Pixel.TEXT_ALIGN_CENTER:
				switch(this.font.baseline) {
					case Pixel.TEXT_BASELINE_TOP:
						this.rect.set(this.pos.x - this.width/2, this.pos.y, this.width, this.height);
						break;
					case Pixel.TEXT_BASELINE_MIDDLE:
						this.rect.set(this.pos.x - this.width/2, this.pos.y - this.height/2, this.width, this.height);
						break;
					case Pixel.TEXT_BASELINE_BOTTOM:
						this.rect.set(this.pos.x - this.width/2, this.pos.y - this.height, this.width, this.height);
						break;
				}
				break;
				
			case Pixel.TEXT_ALIGN_RIGHT:
				switch(this.font.baseline) {
					case Pixel.TEXT_BASELINE_TOP:
						this.rect.set(this.pos.x - this.width, this.pos.y, this.width, this.height);
						break;
					case Pixel.TEXT_BASELINE_MIDDLE:
						this.rect.set(this.pos.x - this.width, this.pos.y - this.height/2, this.width, this.height);
						break;
					case Pixel.TEXT_BASELINE_BOTTOM:
						this.rect.set(this.pos.x - this.width, this.pos.y - this.height, this.width, this.height);
						break;
				}				
				break;
		}
	}
});
