//-------------------------------------------------------
//Pixel.Textfield.js
//Font class with added capabilities like position, size, etc


Pixel.Textfield = function(text, font) {
	Pixel.Object.call(this);

	this.font 	= font || new Pixel.Font("Arial", 14);
	this.color	= new Pixel.Color(255,255,255,1);
	
	this.text	= text || "Text not set";
	this.setText(this.text);
}

Pixel.Textfield.prototype = new Pixel.Object();


//-------------------------------------------------------
Pixel.Textfield.prototype.setFont = function(font, size, alignment, baseline) {
	if(size != undefined) {
		this.font = new Pixel.Font(font, size, alignment, baseline);
	} else {
		this.font = font;
	}
}

//-------------------------------------------------------
Pixel.Textfield.prototype.setColor = function(r,g,b,a) {
	this.color.set(r,g,b,a);
}

//-------------------------------------------------------
Pixel.Textfield.prototype.setText = function(text) {
	this.text = text;
	
	this.width	= this.font.getTextWidth(this.text);
	this.height	= this.font.getTextHeight(this.text);
	
	this.setRect();
}


//-------------------------------------------------------
Pixel.Textfield.prototype.setRect = function() {
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