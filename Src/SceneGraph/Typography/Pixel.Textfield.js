//-------------------------------------------------------
//Pixel.TextField.js
//Font class with added capabilities like position, size, etc
Pixel.TextField = function(font) {
	Pixel.Shape2D.call(this);
	
	this.width	= 100;
	this.height = 50;
	
	this.font			= font || new Pixel.Font("Arial", 14);
	this.textColor		= new Pixel.Color(255,255,255,1);
	this.textSize		= 10;
	this.text			= "";
	
	this.layout			= new Pixel.TextLayout();
	
	//Default to transparent BG
	this.fillEnabled	= false;
}

Pixel.TextField.prototype = Object.create(Pixel.Shape2D.prototype);


//-------------------------------------------------------
Pixel.TextField.prototype.setFont = function(font) {
	if(font instanceof Pixel.Font) {
		this.font = font;
	} else {
		Pixel.log("Not a valid Pixel font object.");
	}
}

//-------------------------------------------------------
Pixel.TextField.prototype.setTextColor = function(r,g,b,a) {
	this.textColor.set(r,g,b,a);
}


//-------------------------------------------------------
Pixel.TextField.prototype.setTextSize = function(size) {
	this.textSize = size;
}


//-------------------------------------------------------
Pixel.TextField.prototype.setTextAlignment = function(textAlignment) {
	this.layout.textAlignment = textAlignment;
}

//-------------------------------------------------------
Pixel.TextField.prototype.getTextAlignment = function() {
	return this.layout.textAlignment;
}

//-------------------------------------------------------
Pixel.TextField.prototype.setLeading = function(leading) {
	this.layout.leading = leading;
}

//-------------------------------------------------------
Pixel.TextField.prototype.getLeading = function() {
	return this.layout.leading;
}

//-------------------------------------------------------
Pixel.TextField.prototype.setText = function(text) {
	this.text = text;
	
	if(this.bAutoSize) {
		this.width	= this.font.getTextWidth(this.text, this.textSize);
		this.height	= this.font.getTextHeight(this.text, this.textSize);
	}
	
	this.doLayout();
}


//-------------------------------------------------------
Pixel.TextField.prototype.doLayout = function() {
	this.layout.doLayout(this.text, this.font, this.textSize, 0, this.width, this.height);
}

//-------------------------------------------------------
Pixel.TextField.prototype.draw = function() {
	if(this.canvas) {
		this.canvas.pushMatrix();
		
		this.canvas.translate(this.pos.x, this.pos.y, this.pos.z);
		this.canvas.rotate(this.rotation);
		this.canvas.scale(this.scaleAmount.x, this.scaleAmount.y);
		
		if(this.fillEnabled) {
			this.canvas.setFillColor(this.fillColor);
		} else {
			this.canvas.noFill();
		}
		
		if(this.strokeEnabled) {
			this.canvas.setStrokeSize(this.strokeSize);
			this.canvas.setStrokeColor(this.strokeColor);
		} else {
			this.canvas.noStroke();
		}
		
		this.calculateOffset();
		this.canvas.drawRect(this.offset.x, this.offset.y, this.width, this.height);
		
		this.canvas.setFillColor(this.textColor);
		this.canvas.setFont(this.font.fontFamily, this.textSize);
		this.canvas.setTextBaseline(this.font.baseline);
		
		var nLines = this.layout.getLines().length;;
		for(var i=0; i<nLines; i++) {
			var thisLine = this.layout.getLines()[i];
			this.canvas.drawText(thisLine.text, this.offset.x + thisLine.pos.x, this.offset.y + thisLine.pos.y);
		}
		
		this.canvas.popMatrix();
	}
}