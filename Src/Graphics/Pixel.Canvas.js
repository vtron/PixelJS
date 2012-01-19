//-------------------------------------------------------
//Pixel.Canvas.js
//Canvas Wrapper, implements Renderer functions and adds DOM specific stuff 
//+ generic vars shared between renderers (i.e. Cursor)

Pixel.Canvas = Pixel.EventDispatcher.extend({
	init: function() {
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
		
		this._super();
	},


	//-------------------------------------------------------
	//Size Info
	
	//-------------------------------------------------------
	setSize: function(width,height, renderer) {
		this.width = width;
		this.height = height;
		
		this.canvas.setAttribute('width',	this.width);
		this.canvas.setAttribute('height',	this.height);
		
		
		if(renderer != undefined) {
			this.setRenderer(renderer);
		}
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
		this.renderer.drawImage(pxImage, x, y);
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