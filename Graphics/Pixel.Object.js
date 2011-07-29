if(!Pixel) {
	var Pixel = {};
	if(!px) var px = Pixel;
}

Pixel.Object = new Class({
	bInitPressed:false,
	bPressed:false,
	pos: {
		x:0,
		y:0
	},
	
	rect:new Pixel.Rectangle,
	
	//-------------------------------------------------------
	initialize:function() {
	},
	
	
	//-------------------------------------------------------
	setPos:function(x,y) {
		this.rect.setPos(x,y);
		
		this.pos = this.rect.getPos();
	},
	
	
	//-------------------------------------------------------
	getPos: function() {
		return this.pos;
	},
	
	
	//-------------------------------------------------------
	setSize:function(width, height) {
		this.rect.setSize(width, height);
	},
	
	
	
	
	//-------------------------------------------------------
	getWidth:function() {
		return this.rect.getSize().width;
	},
	
	
	//-------------------------------------------------------
	getHeight:function() {
		return this.rect.getSize().height
	},
	
	
	
	//-------------------------------------------------------
	//Event Listeners
	
	//-------------------------------------------------------
	isPressed: function() {
		return this.bPressed;
	},
	
	//-------------------------------------------------------
	touchStart:function(touch) {
		this.bInitPressed	= (this.rect.isInside(touch.pos.x,touch.pos.y));
		this.bPressed		= this.bInitPressed;
	},
	
	//-------------------------------------------------------
	touchMoved:function() {
		if(this.bInitPressed) {
			this.bPressed = (this.rect.isInside(touch.pos.x,touch.pos.y));
		}
	},
	
	//-------------------------------------------------------
	touchEnd:function() {
		this.bInitPressed = this.bPressed = false;
	}
})