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
	
	//Default to transparent BG
	this.fillEnabled	= false;
	
	this.bAutoSize	= false;
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
Pixel.TextField.prototype.setAutoSize = function(autoSize) {
	this.bAutoSize = autoSize;
}


//-------------------------------------------------------
Pixel.TextField.prototype.setText = function(text) {
	this.text = text;
	
	if(this.bAutoSize) {
		this.width	= this.font.getTextWidth(this.text, this.textSize);
		this.height	= this.font.getTextHeight(this.text, this.textSize);
	}
}


//-------------------------------------------------------
Pixel.TextField.prototype.draw = function() {
	if(this.canvas) {
		this.canvas.pushMatrix();
		this.canvas.translate(this.pos.x, this.pos.y, this.pos.z);
		this.canvas.rotate(this.rotation);
		
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
		this.canvas.drawText(this.text, this.offset.x, this.offset.y);
		
		this.canvas.popMatrix();
	}
}