//-------------------------------------------------------
//Pixel.TypeLayout.js
//Font class with added capabilities like position, size, etc
Pixel.TextLayout = function() {
	this.lines		= [];
	this.textAlignment	= Pixel.TEXT_ALIGN_LEFT;
	this.leading	= null;
}

//-------------------------------------------------------
Pixel.TextLayout.prototype.doLayout = function(text, font, textSize, leading, bboxWidth, bboxHeight) {
	this.lines = [];
	
	var cursorX = 0,
		cursorY = 0;
	
	var words = text.split(" ");
	var curLine = this.newLine();
	
	for(var i=0; i<words.length; i++) {
		curLine.width	= font.getTextWidth(curLine.text,	textSize);
		var wordWidth	= font.getTextWidth(words[i], 		textSize);
		
		if(curLine.width + wordWidth < bboxWidth) {
			curLine.text += words[i] +  " ";
		} else {
			//Get metrics and add line
			curLine.metrics = font.getTextMetrics(curLine.text, textSize);
			curLine.pos.x = this.getLineXPos(bboxWidth, curLine.metrics.width);
			curLine.pos.y = cursorY;
			this.lines.push(curLine);
				
			//Set cursor to next line, including leading
			//Default leading is 1.2 times the text size until changed manually
			if(this.leading == null) {
				cursorY += curLine.metrics.height * 1.2;
			} else {
				cursorY += curLine.metrics.descent + this.leading;
			}
			
			//Begin new line		
			curLine = this.newLine();
			curLine.text = words[i];
		}
	}
	
	//Get metrics and add final line
	curLine.metrics = font.getTextMetrics(curLine.text, textSize);
	curLine.pos.x	= this.getLineXPos(bboxWidth, curLine.metrics.width);
	curLine.pos.y	= cursorY;
	this.lines.push(curLine);
}


//-------------------------------------------------------
Pixel.TextLayout.prototype.getLineXPos = function(bboxWidth, lineWidth) {
	var xPos = 0;
	
	//Set Horizontal position
	switch(this.textAlignment) {
		case Pixel.TEXT_ALIGN_LEFT:
			break;
		
		case Pixel.TEXT_ALIGN_CENTER:
			xPos = bboxWidth/2 - lineWidth/2;
			break;
			
		case Pixel.TEXT_ALIGN_RIGHT:
			xPos = bboxWidth - lineWidth;
			break;
	}
	
	return xPos;
}


//-------------------------------------------------------
Pixel.TextLayout.prototype.getLines = function() {
	return this.lines;
}

//-------------------------------------------------------
Pixel.TextLayout.prototype.newLine = function() {
	return {
		text:"",
		pos: new Pixel.Point(),
		metrics: null
	}
}
