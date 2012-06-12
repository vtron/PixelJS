//-------------------------------------------------------
//Pixel.Canvas.js
//Canvas Wrapper, implements Renderer functions and adds DOM specific stuff 
//+ generic vars shared between renderers (i.e. Cursor)

Pixel.Canvas = Pixel.EventDispatcher.extend({
	init: function(renderer) {
		//Create Canvas
		this.canvas = document.createElement('canvas');
		this.canvas.innerHTML = "Your browser does not support HTML5 Canvas.";
		this.pos = {
			x:0,
			y:0
		}
		
		this.width	= 0;
		this.height = 0;
		
		//BG Color
		this.backgroundColor = null;
		
		//Cursor, useful for text layout
		cursorX = 0;
		cursorY = 0;
		
		//Pixel doubling for iOS 
		this.bPixelDoubling = window.devicePixelRatio >= 2;
		
		//Set Renderer (default is 2D)
		this.setRenderer(this.canvas, renderer);
		
		//Init Vars
		//this.setPos(0,0);
		this.setSize(400,400);
	},


	//-------------------------------------------------------
	//Size Info
	
	//-------------------------------------------------------
	setSize: function(width,height) {
		
		this.width	= width;
		this.height = height;
		
		this.canvas.style.width		= width/window.devicePixelRatio;
		this.canvas.style.height	= height/window.devicePixelRatio;
		
		this.canvas.setAttribute("width",	width);
		this.canvas.setAttribute("height",	height);
		
		this.renderer.setSize(width, height);
	},


	//-------------------------------------------------------
	getWidth: function() {
		return this.width;
	},


	//-------------------------------------------------------
	getHeight: function() {
		return this.height;
	},


	//-------------------------------------------------------
	//Cursor
	//-------------------------------------------------------
	setCursor: function(x,y) {
		this.cursorX = x;
		this.cursorY = y;
	},


	//-------------------------------------------------------
	//Drawing
	//-------------------------------------------------------
	setRenderer: function(canvasElement, rendererType) {
		if(rendererType == Pixel.RENDER_MODE_WEBGL) {
			this.renderer = new Pixel.RendererWebGL(canvasElement);
			if(this.renderer.gl) {
				Pixel.log("WebGL renderer initialized");
				return;
			} else {
				delete this.renderer;
				Pixel.log("Failed to create WebGL Renderer");	
			}
		}
		
		//Default is 2D
		if(rendererType != Pixel.RENDER_MODE_2D) Pixel.log("Renderer Type does not exist");
		this.renderer = new Pixel.Renderer2D(canvasElement);
	},

	//-------------------------------------------------------
	setBackgroundColor: function(r,g,b,a) {
		this.renderer.setBackgroundColor(r,g,b,a);
	},

	//-------------------------------------------------------
	clear: function(x,y,width,height) { 
		this.renderer.clear(x,y,width,height); 
	},


	//-------------------------------------------------------
	//COLOR	
	//-------------------------------------------------------
	setFillColor: function(r,g,b,a) {
		this.renderer.setFillColor(r,g,b,a);
	},
	

	//-------------------------------------------------------
	noFill: function() {
		this.renderer.noFill();
	},

	
	//-------------------------------------------------------
	setStrokeColor: function(r,g,b,a) {
		this.renderer.setStrokeColor(r,g,b,a);
	},

	//-------------------------------------------------------
	noStroke: function() {
		this.renderer.noStroke();
	},


	//-------------------------------------------------------
	setStrokeSize: function(size) {
		this.renderer.setStrokeSize(size);
	},

	//-------------------------------------------------------
	setLineCap: function(style) {
		this.renderer.setLineCap(style);
	},
	


	//-------------------------------------------------------
	//IMAGE DRAWING
	//-------------------------------------------------------
	drawImage: function(pxImage, x, y, width, height) {
		//this.renderer.pushMatrix();
		//this.renderer.translate(x,y);
		//if(width && width	!= pxImage.image.width)		this.renderer.scale(width/pxImage.width, 1.0);
		//if(height&& height	!= pxImage.image.height)	this.renderer.scale(1.0, height/pxImage.height);
		this.renderer.drawImage(pxImage, x,y, width, height);
		//this.renderer.popMatrix();
	},



	//-------------------------------------------------------
	//SHAPE DRAWING
	
	//-------------------------------------------------------
	beginShape: function(x,y) {
		this.renderer.beginShape(x,y);
	},


	//-------------------------------------------------------
	addVertex: function(x,y, bEnd) {
		this.renderer.addVertex(x,y, bEnd);
	},


	//-------------------------------------------------------
	endShape: function(x,y) {
		this.renderer.endShape(x,y);
	},


	//-------------------------------------------------------
	drawLine: function(x1,y1,x2,y2) {
		this.renderer.drawLine(x1,y1,x2,y2);
	},



	//-------------------------------------------------------
	dashedLine: function (fromX, fromY, toX, toY, pattern) {
		this.renderer.dashedLine(fromX, fromY, toX, toY, pattern);  
	},


	//-------------------------------------------------------
	drawRect: function(x,y,width,height) {
		this.renderer.drawRect(x,y,width,height);
	},


	//-------------------------------------------------------
	drawRoundedRect: function(x,y,width,height, borderRadius) {
		this.renderer.drawRoundedRect(x,y,width,height, borderRadius);
	},


	//-------------------------------------------------------
	drawSquare: function(x,y,size) {
		this.renderer.drawSquare(x,y,size);
	},


	//-------------------------------------------------------
	drawEllipse: function(x,y,width,height) {
		this.renderer.drawEllipse();
	},



	//-------------------------------------------------------
	drawCircle: function(x,y,radius) {
		this.renderer.drawCircle(x,y,radius);
	},


	//-------------------------------------------------------
	//TRANSFORMATIONS
	//-------------------------------------------------------
	pushMatrix: function() {
		this.renderer.pushMatrix();
	},


	//-------------------------------------------------------
	popMatrix: function() {
		this.renderer.popMatrix();
	},


	//-------------------------------------------------------
	translate: function(x,y) {
		this.renderer.translate(x,y);
	},



	//-------------------------------------------------------
	scale: function(x,y) {
		this.renderer.scale(x,y);
	},


	//-------------------------------------------------------
	rotate: function(angle) {
		this.renderer.rotate(angle);
	},


	//-------------------------------------------------------
	transform: function(m11, m12, m21, m22, dx, dy) {
		this.renderer.transform(m11, m12, m21, m22, dx, dy);
	},

	//-------------------------------------------------------
	setTransform: function(m11, m12, m21, m22, dx, dy) {
		this.renderer.setTransform(m11, m12, m21, m22, dx, dy);
	},



	//-------------------------------------------------------
	//TEXT
	
	//-------------------------------------------------------	
	setFont: function(font, size) {
		this.renderer.setFont(font,size);
	},


	//-------------------------------------------------------
	setTextAlignment: function(alignment) {
		this.renderer.setTextAlignment(alignment);
	},
	
	
	//-------------------------------------------------------
	setTextBaseline: function(baseline) {
		this.renderer.setTextBaseline(baseline);
	},
	
	
	//-------------------------------------------------------
	getTextWidth: function(string) {
		return this.renderer.getTextWidth(string);
	},
	
	
	//-------------------------------------------------------
	drawText: function(string, x, y) {
		if(x != undefined) {
			this.renderer.drawText(string, x, y);
		} else {
			this.renderer.drawText(string, this.cursorX, this.cursorY);
		}
	},
	
	
	//-------------------------------------------------------
	drawTextfield: function(textfield) {
		this.renderer.drawTextfield(textfield);
	}
});