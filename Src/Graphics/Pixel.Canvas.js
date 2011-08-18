if(!Pixel) {
	var Pixel = {};
	if(!px) var px = Pixel;
}


Pixel.Canvas = new Class({
	Implements:Pixel.Renderer,
	
	element:null,
	
	pos:{
		x:0,
		y:0
	},
	
	width:0,
	height:0,
	
	//Cursor, useful for text layout
	cursorX:0,
	cursorY:0,
	
	bPixelDoubling:window.devicePixelRatio >= 2,
	
	//-------------------------------------------------------
	initialize:function(renderMode) {
		//Create Canvas
		this.element = new Element('canvas', {
			width:this.width,
			height:this.height,
			styles: {
				position:"absolute",
				top:"0px",
				left:"0px",
				"-webkit-transform-origin":"0 0 0"
			}
		});
		
		//Init Vars
		this.setPos(0,0);
		this.setSize(50,50);
		
		//Set Renderer
		this.setRenderer(this.element, renderMode);
	},
	
	
	//-------------------------------------------------------
	//Position
	
	//-------------------------------------------------------
	setPos: function(x,y) {
		this.pos.x = x;
		this.pos.y = y;
		
		//Get Transformation (iPhone4 vs 3G/3GS)
		var transform = "";
		transform ="scale3d(" + window.devicePixelRatio + "," + window.devicePixelRatio +",0) ";
		transform += "translate3d(" + this.pos.x + "px, " + this.pos.y + "px,0px)";
		
		this.element.setStyle("-webkit-transform",transform);
	},
	
	
	//-------------------------------------------------------
	//Size Info
	
	//-------------------------------------------------------
	setSize: function(width,height, renderer) {
		this.width = width;
		this.height = height;
		
		this.element.set({
			width:this.width,
			height:this.height
		});
		
		
		
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
	}
});