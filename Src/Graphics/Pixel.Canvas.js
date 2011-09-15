//-------------------------------------------------------
//Pixel.Canvas.js
//Canvas Wrapper, implements Renderer functions and adds DOM specific stuff 
//+ generic vars shared between renderers (i.e. Cursor)

Pixel.Canvas = function() {
	Pixel.EventDispatcher(this);
	
	//Create Canvas
	this.canvas = document.createElement('canvas');
	this.canvas.innerHTML = "Your browser does not support HTML5 Canvas."
	this.canvas.setAttribute('width', this.width);
	this.canvas.setAttribute('height', this.height);
	
	this.pos = {
		x:0,
		y:0
	}
	
	this.width = 0;
	this.height = 0;
	
	//Cursor, useful for text layout
	cursorX = 0;
	cursorY = 0;
	
	//Pixel doubling for iOS 
	this.bPixelDoubling = window.devicePixelRatio >= 2;
	
	//Init Vars
	//this.setPos(0,0);
	this.setSize(50,400);
	
	//Set Renderer (default is 2D)
	this.setRenderer(this.canvas, Pixel.RENDER_MODE_2D);
}

Pixel.Canvas.prototype = new Pixel.EventDispatcher();



//-------------------------------------------------------
//Size Info

//-------------------------------------------------------
Pixel.Canvas.prototype.setSize = function(width,height, renderer) {
	this.width = width;
	this.height = height;
	
	this.canvas.setAttribute('width',	this.width);
	this.canvas.setAttribute('height',	this.height);
	
	
	if(renderer != undefined) {
		this.setRenderer(renderer);
	}
}



//-------------------------------------------------------
Pixel.Canvas.prototype.getWidth = function() {
	return this.width;
}



//-------------------------------------------------------
Pixel.Canvas.prototype.getHeight = function() {
	return this.height;
}



//-------------------------------------------------------
//Cursor
//-------------------------------------------------------
Pixel.Canvas.prototype.setCursor = function(x,y) {
	this.cursorX = x;
	this.cursorY = y;
}







//-------------------------------------------------------
//Drawing
//-------------------------------------------------------
Pixel.Canvas.prototype.setRenderer = function(canvasElement, rendererType) {
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
Pixel.Canvas.prototype.clear = function(x,y,width,height) { 
	this.renderer.clear(x,y,width,height); 
}


//-------------------------------------------------------
//COLOR	
//-------------------------------------------------------
Pixel.Canvas.prototype.setColor = function(r,g,b,a) {
	this.renderer.setColor(r,g,b,a);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.useColor = function(color) {
	this.renderer.useColor(color);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.fill = function() {
	this.renderer.fill();
}



//-------------------------------------------------------
Pixel.Canvas.prototype.noFill = function() {
	this.renderer.noFill();
}



//-------------------------------------------------------
Pixel.Canvas.prototype.stroke = function(size) {
	this.renderer.stroke(size);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.noStroke = function() {
	this.renderer.noStroke();
}



//-------------------------------------------------------
//IMAGE DRAWING
//-------------------------------------------------------
Pixel.Canvas.prototype.drawImage = function(pxImage, x, y, width, height) {
	this.renderer.drawImage(pxImage, x, y);
}



//-------------------------------------------------------
//SHAPE DRAWING

//-------------------------------------------------------
Pixel.Canvas.prototype.beginShape = function(x,y) {
	this.renderer.beginShape(x,y);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.addVertex = function(x,y, bEnd) {
	this.renderer.addVertex(x,y, bEnd);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.endShape = function(x,y) {
	this.renderer.endShape(x,y);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.drawLine = function(x1,y1,x2,y2) {
	this.renderer.drawLine(x1,y1,x2,y2);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.dashedLine = function (fromX, fromY, toX, toY, pattern) {
	this.renderer.dashedLine(fromX, fromY, toX, toY, pattern);  
}



//-------------------------------------------------------
Pixel.Canvas.prototype.drawRect = function(x,y,width,height) {
	this.renderer.drawRect(x,y,width,height);
}

//-------------------------------------------------------
Pixel.Canvas.prototype.drawRoundedRect = function(x,y,width,height, borderRadius) {
	this.renderer.drawRoundedRect(x,y,width,height, borderRadius);
}

//-------------------------------------------------------
Pixel.Canvas.prototype.drawSquare = function(x,y,size) {
	this.renderer.drawSquare(x,y,size);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.drawEllipse = function(x,y,width,height) {
	this.renderer.drawEllipse();
}



//-------------------------------------------------------
Pixel.Canvas.prototype.drawCircle = function(x,y,radius) {
	this.renderer.drawCircle(x,y,radius);
}



//-------------------------------------------------------
//TRANSFORMATIONS
//-------------------------------------------------------
Pixel.Canvas.prototype.pushMatrix = function() {
	this.renderer.pushMatrix();
}



//-------------------------------------------------------
Pixel.Canvas.prototype.popMatrix = function() {
	this.renderer.popMatrix();
}



//-------------------------------------------------------
Pixel.Canvas.prototype.translate = function(x,y) {
	this.renderer.translate(x,y);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.scale = function(x,y) {
	this.renderer.scale(x,y);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.rotate = function(angle) {
	this.renderer.rotate(angle);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.transform = function(m11, m12, m21, m22, dx, dy) {
	this.renderer.transform(m11, m12, m21, m22, dx, dy);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.setTransform = function(m11, m12, m21, m22, dx, dy) {
	this.renderer.setTransform(m11, m12, m21, m22, dx, dy);
}



//-------------------------------------------------------
//TEXT

//-------------------------------------------------------	
Pixel.Canvas.prototype.setFont = function(font, size) {
	this.renderer.setFont(font,size);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.setTextAlignment = function(alignment) {
	this.renderer.setTextAlignment(alignment);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.setTextBaseline = function(baseline) {
	this.renderer.setTextBaseline(baseline);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.getTextWidth = function(string) {
	return this.renderer.getTextWidth(string);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.drawText = function(string, x, y) {
	if(x != undefined) {
		this.renderer.drawText(string, x, y);
	} else {
		this.renderer.drawText(string, this.cursorX, this.cursorY);
	}
}



//-------------------------------------------------------
Pixel.Canvas.prototype.drawTextfield = function(textfield) {
	this.renderer.drawTextfield(textfield);
}