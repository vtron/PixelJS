//-------------------------------------------------------
//Pixel.TextField.js
//Font class with added capabilities like position, size, etc
Pixel.TextField = function(font) {
	Pixel.Shape2D.call(this);
	
	//Size
	this.width	= 100;
	this.height = 50;
	
	this.textWidth	= 0;
	this.textHeight	= 0;
	this.useTextBounds	= false; //Use the text bounds vs the frame of the textfield?
	
	//Text Properties
	this.font			= font || new Pixel.Font("Arial", 14);
	this.leading		= null;
	
	this.textAlignment	= Pixel.TEXT_ALIGN_LEFT;
	this.textColor		= new Pixel.Color(255,255,255,1);
	this.textSize		= 10;
	
	this.text			= "";
	
	this.hideOverflow	= false;
	
	//Layout
	this.lines		= [];
	
	
	//Default to transparent BG
	this.fillEnabled	= false;
}

Pixel.TextField.prototype = Object.create(Pixel.Shape2D.prototype);



//-------------------------------------------------------
//!Size

//-------------------------------------------------------
Pixel.TextField.prototype.setUseTextBounds = function(useTextBounds) {
	this.useTextBounds = useTextBounds;
}

//-------------------------------------------------------
Pixel.TextField.prototype.getUseTextBounds = function(useTextBounds) {
	return this.useTextBounds;
}


//-------------------------------------------------------
Pixel.TextField.prototype.getWidth = function() {
	if(this.useTextBounds) {
		return this.textWidth;
	} else {
		return this.width;
	}
}

//-------------------------------------------------------
Pixel.TextField.prototype.getHeight = function() {
	if(this.useTextBounds) {
		return this.textHeight;
	} else {
		return this.height;
	}
}

//-------------------------------------------------------
Pixel.TextField.prototype.getBounds = function() {
	this.calculateOffset();
	this.bounds.set(this.offset.x, this.offset.y, this.getWidth(), this.getHeight());
	return this.bounds;
}


//-------------------------------------------------------
//!Text Properties


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
	this.textAlignment = textAlignment;
}


//-------------------------------------------------------
Pixel.TextField.prototype.getTextAlignment = function() {
	return this.textAlignment;
}


//-------------------------------------------------------
Pixel.TextField.prototype.setLeading = function(leading) {
	this.leading = leading;
}


//-------------------------------------------------------
Pixel.TextField.prototype.getLeading = function() {
	return this.leading;
}


//-------------------------------------------------------
Pixel.TextField.prototype.setHideOverflow = function(hideOverflow) {
	this.hideOverflow = hideOverflow;
}


//-------------------------------------------------------
Pixel.TextField.prototype.getText = function(text) {
	return this.hideOverflow;
}


//-------------------------------------------------------
Pixel.TextField.prototype.setText = function(text) {
	this.text = text.toString();
}


//-------------------------------------------------------
Pixel.TextField.prototype.getText = function(text) {
	return this.text;
}


//-------------------------------------------------------
//!Layout

//-------------------------------------------------------
Pixel.TextField.prototype.doLayout = function() {
	this.lines = [];
	this.textWidth	= 0;
	this.textHeight = 0;
	
	var cursorX = 0,
		cursorY = 0;
	
	var words	= this.text.split(" ");
	var curLine = this.newLine();
	
	var nWords = words.length;
	for(var i=0; i<nWords; i++) {
		curLine.width	= this.font.getTextWidth(curLine.text,	this.textSize);
		var wordWidth	= this.font.getTextWidth(words[i], 		this.textSize);
		
		if(curLine.width + wordWidth < this.width) {
			curLine.text += words[i];
			if(i!= nWords-1) curLine.text +=   " ";
		} else {
			//Get metrics and add line
			curLine.metrics = this.font.getTextMetrics(curLine.text, this.textSize);
			curLine.position.x = this.getLineXPos(curLine.metrics.width);
			curLine.position.y = cursorY;
			this.lines.push(curLine);
				
			//Set cursor to next line, including leading
			//Default leading is 1.2 times the text size until changed manually
			
			if(this.leading == null) this.leading = curLine.metrics.height * 1.2;
			cursorY += curLine.metrics.descent + this.leading;
			
			//Check for overflow, 
			//If it is set and we're past the box we're done
			var newLineBottom = cursorY +curLine.metrics.descent + this.leading;
			
			if(this.hideOverflow &&  newLineBottom > this.height) {
				this.calculateTextBounds();
				return;
			} 
			
			//Otherwise, we begin new line		
			curLine = this.newLine();
			curLine.text = words[i];
		}
	}
	
	//Get metrics and add final line
	curLine.metrics = this.font.getTextMetrics(curLine.text, this.textSize);
	curLine.position.x	= this.getLineXPos(curLine.metrics.width);
	curLine.position.y	= cursorY;
	
	this.lines.push(curLine);
	
	//Set the final width & height of the text (no leading)
	this.calculateTextBounds();
}


//-------------------------------------------------------
Pixel.TextField.prototype.getLineXPos = function(lineWidth) {
	var xPos = 0;
	
	//Set Horizontal position
	switch(this.textAlignment) {
		case Pixel.TEXT_ALIGN_LEFT:
			break;
		
		case Pixel.TEXT_ALIGN_CENTER:
			xPos = this.width/2 - lineWidth/2;
			break;
			
		case Pixel.TEXT_ALIGN_RIGHT:
			xPos = this.width - lineWidth;
			break;
	}
	
	return xPos;
}


//-------------------------------------------------------
Pixel.TextField.prototype.getLines = function() {
	return this.lines;
}


//-------------------------------------------------------
Pixel.TextField.prototype.newLine = function() {
	return {
		text:"",
		position: new Pixel.Point(),
		metrics: null
	}
}

//-------------------------------------------------------
//Calculate the width of the text box based on the widest line
Pixel.TextField.prototype.calculateTextBounds = function() {
	for(var i=0; i<this.lines.length; i++) {
		this.textWidth = (this.lines[i].metrics.width > this.textWidth) ? this.lines[i].metrics.width : this.textWidth;
	}
	
	var lastLine = this.lines[this.lines.length - 1];
	this.textHeight = lastLine.position.y + lastLine.metrics.height;
}


//-------------------------------------------------------
Pixel.TextField.prototype.draw = function() {
	if(this.canvas && this.visible) {
		this.canvas.pushMatrix();
		
		this.canvas.translate(this.position.x, this.position.y, this.position.z);
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
		var bounds = this.getBounds();
		this.canvas.drawRect(this.offset.x, this.offset.y, bounds.width, bounds.height);
		
		this.canvas.setFillColor(this.textColor);
		this.canvas.setFont(this.font.fontFamily, this.textSize);
		this.canvas.setTextBaseline(this.font.baseline);
		
		var nLines = this.lines.length;
		for(var i=0; i<nLines; i++) {
			var thisLine = this.lines[i];
			this.canvas.drawText(thisLine.text, this.offset.x + thisLine.position.x, this.offset.y + thisLine.position.y);
		}
		
		this.canvas.popMatrix();
	}
}