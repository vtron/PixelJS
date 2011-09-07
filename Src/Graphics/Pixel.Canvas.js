//-------------------------------------------------------
//Pixel.Canvas.js
//Canvas Wrapper, implements Renderer functions and adds DOM specific stuff 
//+ generic vars shared between renderers (i.e. Cursor)

Pixel.Canvas = function() {
	Pixel.Renderer.call(this);
	
	//Create Canvas
	this.canvas = document.createElement('canvas');
	this.canvas.innerHTML = "Your browser does not support HTML5 Canvas."
	this.canvas.setAttribute('width', this.width);
	this.canvas.setAttribute('height', this.height);
	
	//this.canvas.webkitTransformOrigin = "0 0 0";
	
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

Pixel.Canvas.prototype = new Pixel.Renderer();


//-------------------------------------------------------
//Position

//-------------------------------------------------------
Pixel.Canvas.prototype.setPos = function(x,y) {
	this.pos.x = x;
	this.pos.y = y;
	
	//Get Transformation (iPhone4 vs 3G/3GS)
	var transform = "";
	transform ="scale3d(" + window.devicePixelRatio + "," + window.devicePixelRatio +",0) ";
	transform += "translate3d(" + this.pos.x + "px, " + this.pos.y + "px,0px)";
	
	this.canvas.style.webkitTransform = transform;
},


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