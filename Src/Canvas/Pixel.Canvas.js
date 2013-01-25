//-------------------------------------------------------
//Pixel.Canvas.js
//Canvas Wrapper, implements Renderer functions and adds DOM specific stuff 
//+ generic vars shared between renderers (i.e. Cursor)

Pixel.Canvas = function(renderer) {
	Pixel.Object.call(this);

	//Create Canvas Element
	this.element = document.createElement('canvas');
	this.element.innerHTML = "Your browser does not support HTML5 Canvas.";
	this.pos = {
		x:0,
		y:0
	}
	
	//This is the main drawing point, 
	//so any children added will receive this as their canvas to draw to
	this.canvas = this;
	
	this.width	= 0;
	this.height = 0;
	
	//BG Color
	this.backgroundColor = null;
	
	//Cursor, useful for text layout
	cursorX = 0;
	cursorY = 0;
	
	//Pixel doubling for iOS 
	this.bPixelDoubling = window.devicePixelRatio >= 2;
	
	//Set Renderer
	this.setRenderer(this.element, renderer);
	
	//Init Vars
	//this.setPos(0,0);
	this.setSize(400,400);
	
	//Events
	var self = this;
	this.element.addEventListener("mousedown",		function(e) { self.mouseDownListener.call(self, e) },	false);
	this.element.addEventListener("mousemove",		function(e) { self.mouseMovedListener.call(self, e) },	false);
	this.element.addEventListener("mouseup",		function(e) { self.mouseUpListener.call(self, e) },		false);
};


Pixel.Canvas.prototype = Object.create(Pixel.Object.prototype);

//-------------------------------------------------------
// !Size Info

//-------------------------------------------------------
Pixel.Canvas.prototype.setSize = function(width,height) {
	this.width	= width;
	this.height = height;
	
	this.element.style.width	= width;
	this.element.style.height	= height;
	
	this.element.setAttribute("width",	width	* window.devicePixelRatio);
	this.element.setAttribute("height",	height	* window.devicePixelRatio);
	
	this.renderer.setSize(width, height);
};


//-------------------------------------------------------
Pixel.Canvas.prototype.getWidth = function() {
	return this.width;
};


//-------------------------------------------------------
Pixel.Canvas.prototype.getHeight = function() {
	return this.height;
};

//-------------------------------------------------------
Pixel.Canvas.prototype.enableNativeResolution = function() {
	this.renderer.scale(window.devicePixelRatio, window.devicePixelRatio);
}


//-------------------------------------------------------
// !Cursor
//-------------------------------------------------------
Pixel.Canvas.prototype.setCursor = function(x,y) {
	this.cursorX = x;
	this.cursorY = y;
};


//-------------------------------------------------------
// !Drawing
//-------------------------------------------------------
Pixel.Canvas.prototype.setRenderer = function(element, rendererType) {
	if(rendererType == Pixel.RENDERER_WEBGL) {
		this.renderer = new Pixel.RendererWebGL(element);
		if(this.renderer.gl) {
			Pixel.log("WebGL renderer initialized");
			return;
		} else {
			delete this.renderer;
			Pixel.log("Failed to create WebGL Renderer");	
		}
	}
	
	//Default is 2D
	this.renderer = new Pixel.Renderer2D(element);
};

//-------------------------------------------------------
Pixel.Canvas.prototype.getRenderer = function() {
	return this.renderer.type;
};

//-------------------------------------------------------
Pixel.Canvas.prototype.setBackgroundColor = function(r,g,b,a) {
	this.renderer.setBackgroundColor(r,g,b,a);
};

//-------------------------------------------------------
Pixel.Canvas.prototype.clear =  function(x,y,width,height) { 
	this.renderer.clear(x,y,width,height); 
};


//-------------------------------------------------------
//!COLOR	
//-------------------------------------------------------
Pixel.Canvas.prototype.setFillColor = function(r,g,b,a) {
	if(g != undefined) {
		this.renderer.setFillColor(r,g,b,a);
	} else {
		this.renderer.setFillColor(r.r, r.g, r.b, r.a);
	}
};


//-------------------------------------------------------
Pixel.Canvas.prototype.noFill = function() {
	this.renderer.noFill();
};


//-------------------------------------------------------
//Accepts a Pixel.Color object or r,g,b,a
Pixel.Canvas.prototype.setStrokeColor = function(r,g,b,a) {
	if(g != undefined) {
		this.renderer.setStrokeColor(r,g,b,a);
	} else {
		this.renderer.setStrokeColor(r.r, r.g, r.b, r.a);
	}
};

//-------------------------------------------------------
Pixel.Canvas.prototype.noStroke = function() {
	this.renderer.noStroke();
};


//-------------------------------------------------------
Pixel.Canvas.prototype.setStrokeSize = function(size) {
	if(size) {
		this.renderer.setStrokeSize(size);
	} else {
		this.renderer.noStroke();
	}
};

//-------------------------------------------------------
Pixel.Canvas.prototype.setLineCap = function(style) {
	this.renderer.setLineCap(style);
};



//-------------------------------------------------------
// !IMAGES
//-------------------------------------------------------
Pixel.Canvas.prototype.drawImage = function(image, x, y, width, height) {
	this.renderer.drawImage(image, x,y, width, height);
};



//-------------------------------------------------------
// !SHAPES

//-------------------------------------------------------
Pixel.Canvas.prototype.beginShape = function(x,y) {
	this.renderer.beginShape(x,y);
};


//-------------------------------------------------------
Pixel.Canvas.prototype.addVertex = function(x,y, bEnd) {
	this.renderer.addVertex(x,y, bEnd);
};


//-------------------------------------------------------
Pixel.Canvas.prototype.endShape = function(x,y) {
	this.renderer.endShape(x,y);
};


//-------------------------------------------------------
Pixel.Canvas.prototype.drawLine = function(x1,y1,x2,y2) {
	this.renderer.drawLine(x1,y1,x2,y2);
};



//-------------------------------------------------------
Pixel.Canvas.prototype.dashedLine = function (fromX, fromY, toX, toY, pattern) {
	this.renderer.dashedLine(fromX, fromY, toX, toY, pattern);  
};


//-------------------------------------------------------
Pixel.Canvas.prototype.drawRect = function(x,y,width,height) {
	this.renderer.drawRect(x,y,width,height);
},


//-------------------------------------------------------
Pixel.Canvas.prototype.drawRoundedRect = function(x,y,width,height, borderRadius) {
	this.renderer.drawRoundedRect(x,y,width,height, borderRadius);
};


//-------------------------------------------------------
Pixel.Canvas.prototype.drawSquare = function(x,y,size) {
	this.renderer.drawSquare(x,y,size);
};


//-------------------------------------------------------
Pixel.Canvas.prototype.drawEllipse = function(x,y,width,height) {
	this.renderer.drawEllipse(x,y,width,height);
};



//-------------------------------------------------------
Pixel.Canvas.prototype.drawCircle = function(x,y,size) {
	this.renderer.drawCircle(x,y,size);
};


//-------------------------------------------------------
//!TRANSFORMATIONS
//-------------------------------------------------------
Pixel.Canvas.prototype.pushMatrix = function() {
	this.renderer.pushMatrix();
};


//-------------------------------------------------------
Pixel.Canvas.prototype.popMatrix = function() {
	this.renderer.popMatrix();
};


//-------------------------------------------------------
Pixel.Canvas.prototype.translate = function(x,y) {
	this.renderer.translate(x,y);
};



//-------------------------------------------------------
Pixel.Canvas.prototype.scale = function(x,y) {
	this.renderer.scale(x,y);
};


//-------------------------------------------------------
Pixel.Canvas.prototype.rotate =  function(angle) {
	this.renderer.rotate(angle);
};


//-------------------------------------------------------
Pixel.Canvas.prototype.transform = function(m11, m12, m21, m22, dx, dy) {
	this.renderer.transform(m11, m12, m21, m22, dx, dy);
};

//-------------------------------------------------------
Pixel.Canvas.prototype.setTransform = function(m11, m12, m21, m22, dx, dy) {
	this.renderer.setTransform(m11, m12, m21, m22, dx, dy);
};



//-------------------------------------------------------
//!TEXT

//-------------------------------------------------------	
Pixel.Canvas.prototype.setFont = function(font, size) {
	this.renderer.setFont(font,size);
};


//-------------------------------------------------------
Pixel.Canvas.prototype.setTextAlignment = function(alignment) {
	this.renderer.setTextAlignment(alignment);
};


//-------------------------------------------------------
Pixel.Canvas.prototype.setTextBaseline = function(baseline) {
	this.renderer.setTextBaseline(baseline);
};


//-------------------------------------------------------
Pixel.Canvas.prototype.getTextWidth = function(string) {
	return this.renderer.getTextWidth(string);
};


//-------------------------------------------------------
Pixel.Canvas.prototype.drawText = function(string, x, y) {
	if(x != undefined) {
		this.renderer.drawText(string, x, y);
	} else {
		this.renderer.drawText(string, this.cursorX, this.cursorY);
	}
};


//-------------------------------------------------------
Pixel.Canvas.prototype.drawTextfield = function(textfield) {
	this.renderer.drawTextfield(textfield);
};







//-------------------------------------------------------
//!EVENTS


//-------------------------------------------------------
Pixel.Canvas.prototype.mouseDownListener = function(e) {
	this.bMouseDown = true;
	
	//Get Position of Event
	var position = Pixel.getRelativeMouseCoords(e, this.element);
	
	console.log(position);
};


//-------------------------------------------------------
Pixel.Canvas.prototype.mouseMovedListener = function(e) {
	if(this.bMouseDown) {
		//this.mouseDraggedListener(e);
	}
	
	//Get Position of Event
	var position = Pixel.getRelativeMouseCoords(e, this.element);
};


//-------------------------------------------------------
Pixel.Canvas.prototype.mouseUpListener = function(e) {
	this.bMouseDown = false;
	
	//Get Position of Event
	var position = Pixel.getRelativeMouseCoords(e, this.element);
};