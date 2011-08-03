if(!Pixel) {
	var Pixel = {};
	if(!px) var px = Pixel;
}


Pixel.Canvas = new Class({
	Extends:Pixel.Object,
	Implements:Pixel.Renderer,
	
	element:null,
	
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
		this.parent(x,y);
		
		//Get Transformation (iPhone4 vs 3G/3GS)
		var transform = "";
		if(this.bPixelDoubling) {
			transform ="scale3d(2,2,0) ";
		}
		
		transform += "translate3d(" + this.pos.x + "px, " + this.pos.y + "px,0px)";
		
		this.element.setStyle("-webkit-transform",transform);
	},
	
	
	//-------------------------------------------------------
	//Size Info
	
	//-------------------------------------------------------
	setSize: function(width,height, renderer) {
		this.parent(width,height);
		
		this.element.set({
			width:this.getWidth(),
			height:this.getHeight()
		});
		
		
		
		if(renderer != undefined) {
			this.setRenderer(renderer);
		}
	}
});