//-------------------------------------------------------
//Pixel.Renderer.js
//Abstract Class for Rendering, calls the appropriate renderer and passes items
//Works as both a ghetto Javascript Interface and a way to Implement drawing functionality in main app
//Right now a bit overkill b/c only 2D rendering is implemented :)

Pixel.Renderer = function(canvasElement, rendererType) {
	
}


//-------------------------------------------------------
Pixel.Renderer.prototype.setRenderer = function(canvasElement, rendererType) {
	switch(rendererType) {
		case Pixel.RENDER_MODE_2D:
			this.renderer = new Pixel.Renderer2D(canvasElement);
			break;
		case Pixel.RENDER_MODE_WEBGL:
			Pixel.log("WebGL Renderer not yet implemented!");
			break;
		default:
			//Pixel.log("Renderer Type does not exist");
			break;
	}
}


//-------------------------------------------------------
Pixel.Renderer.prototype.clear = function(x,y,width,height) { 
	this.renderer.clear(x,y,width,height); 
}


//-------------------------------------------------------
//COLOR	
//-------------------------------------------------------
Pixel.Renderer.prototype.setColor = function(r,g,b,a) {
	this.renderer.setColor(r,g,b,a);
}



//-------------------------------------------------------
Pixel.Renderer.prototype.useColor = function(color) {
	this.renderer.useColor(color);
}



//-------------------------------------------------------
Pixel.Renderer.prototype.fill = function() {
	this.renderer.fill();
}



//-------------------------------------------------------
Pixel.Renderer.prototype.noFill = function() {
	this.renderer.noFill();
}



//-------------------------------------------------------
Pixel.Renderer.prototype.stroke = function(size) {
	this.renderer.stroke(size);
}



//-------------------------------------------------------
Pixel.Renderer.prototype.noStroke = function() {
	this.renderer.noStroke();
}



//-------------------------------------------------------
//IMAGE DRAWING
//-------------------------------------------------------
Pixel.Renderer.prototype.drawImage = function(pxImage, x, y, width, height) {
	this.renderer.drawImage(pxImage, x, y);
}



//-------------------------------------------------------
//SHAPE DRAWING

//-------------------------------------------------------
Pixel.Renderer.prototype.beginShape = function(x,y) {
	this.renderer.beginShape(x,y);
}



//-------------------------------------------------------
Pixel.Renderer.prototype.addVertex = function(x,y, bEnd) {
	this.renderer.addVertex(x,y, bEnd);
}



//-------------------------------------------------------
Pixel.Renderer.prototype.endShape = function(x,y) {
	this.renderer.endShape(x,y);
}



//-------------------------------------------------------
Pixel.Renderer.prototype.drawLine = function(x1,y1,x2,y2) {
	this.renderer.drawLine(x1,y1,x2,y2);
}



//-------------------------------------------------------
Pixel.Renderer.prototype.dashedLine = function (fromX, fromY, toX, toY, pattern) {
	this.renderer.dashedLine(fromX, fromY, toX, toY, pattern);  
}



//-------------------------------------------------------
Pixel.Renderer.prototype.drawRect = function(x,y,width,height) {
	this.renderer.drawRect(x,y,width,height);
}



//-------------------------------------------------------
Pixel.Renderer.prototype.drawSquare = function(x,y,size) {
	this.renderer.drawSquare(x,y,size);
}



//-------------------------------------------------------
Pixel.Renderer.prototype.drawEllipse = function(x,y,width,height) {
	this.renderer.drawEllipse();
}



//-------------------------------------------------------
Pixel.Renderer.prototype.drawCircle = function(x,y,radius) {
	this.renderer.drawCircle(x,y,radius);
}



//-------------------------------------------------------
//TRANSFORMATIONS
//-------------------------------------------------------
Pixel.Renderer.prototype.pushMatrix = function() {
	this.renderer.pushMatrix();
}



//-------------------------------------------------------
Pixel.Renderer.prototype.popMatrix = function() {
	this.renderer.popMatrix();
}



//-------------------------------------------------------
Pixel.Renderer.prototype.translate = function(x,y) {
	this.renderer.translate(x,y);
}



//-------------------------------------------------------
Pixel.Renderer.prototype.scale = function(x,y) {
	this.renderer.scale(x,y);
}



//-------------------------------------------------------
Pixel.Renderer.prototype.rotate = function(angle) {
	this.renderer.rotate(angle);
}



//-------------------------------------------------------
Pixel.Renderer.prototype.transform = function(m11, m12, m21, m22, dx, dy) {
	this.renderer.transform(m11, m12, m21, m22, dx, dy);
}



//-------------------------------------------------------
Pixel.Renderer.prototype.setTransform = function(m11, m12, m21, m22, dx, dy) {
	this.renderer.setTransform(m11, m12, m21, m22, dx, dy);
}



//-------------------------------------------------------
//TEXT

//-------------------------------------------------------	
Pixel.Renderer.prototype.setFont = function(font, size) {
	this.renderer.setFont(font,size);
}



//-------------------------------------------------------
Pixel.Renderer.prototype.setTextAlignment = function(alignment) {
	this.renderer.setTextAlignment(alignment);
}



//-------------------------------------------------------
Pixel.Renderer.prototype.setTextBaseline = function(baseline) {
	this.renderer.setTextBaseline(baseline);
}



//-------------------------------------------------------
Pixel.Renderer.prototype.getTextWidth = function(string) {
	return this.renderer.getTextWidth(string);
}



//-------------------------------------------------------
Pixel.Renderer.prototype.drawText = function(string, x, y) {
	if(x != undefined) {
		this.renderer.drawText(string, x, y);
	} else {
		this.renderer.drawText(string, this.cursorX, this.cursorY);
	}
}



//-------------------------------------------------------
Pixel.Renderer.prototype.drawTextfield = function(textfield) {
	this.renderer.drawTextfield(textfield);
}