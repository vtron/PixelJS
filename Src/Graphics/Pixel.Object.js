//-------------------------------------------------------
//-------------------------------------------------------
//Main Object
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
	
	width:0,
	height:0,
	
	radius:0,
	
	shapeMode: Pixel.OBJECT_SHAPE_RECT,
	
	tween: null,
	
	rect:new Pixel.Rectangle,
	
	//-------------------------------------------------------
	initialize:function() {
	},
	
	//-------------------------------------------------------
	show:function(args) {
		
	},
	
	//-------------------------------------------------------
	hide:function() {
	},
	
	//-------------------------------------------------------
	setPos:function(x,y, bTween) {
		if(Pixel.isSet(x)) this.pos.x = x;
		if(Pixel.isSet(y)) this.pos.y = y;
	},
	
	
	//-------------------------------------------------------
	getPos: function() {
		return this.pos;
	},
	
	
	//-------------------------------------------------------
	setSize:function(width, height) {
		if(Pixel.isSet(width))	this.width	= width;
		if(Pixel.isSet(height)) this.height = height;
	},
	
	
	//-------------------------------------------------------
	getWidth:function() {
		return this.width;
	},
	
	
	//-------------------------------------------------------
	getHeight:function() {
		return this.height
	},
	
	
	//-------------------------------------------------------
	setShapeMode: function(shapeMode) {
		this.shapeMode = shapeMode;
	},
	
	//-------------------------------------------------------
	//Event Listeners
	
	//-------------------------------------------------------
	isPressed: function() {
		return this.bPressed;
	},
	
	
	//-------------------------------------------------------
	touchStart:function(touch) {
		this.rect.set(this.pos.x, this.pos.y, this.width, this.height);
		
		//Touch Detection
		switch(this.shapeMode) {
			case Pixel.OBJECT_SHAPE_RECT:
				this.bInitPressed = (this.rect.isInside(touch.pos.x,touch.pos.y));
				break;
			case Pixel.OBJECT_SHAPE_CIRCLE:
				this.bInitPressed = Pixel.dist(this.pos.x, this.pos.y, touch.pos.x, touch.pos.y) < this.radius * 2;
				break;
			default:
				break;
		}
		
		this.bPressed = this.bInitPressed;
	},
	
	
	//-------------------------------------------------------
	touchMoved:function(touch) {
		if(this.bInitPressed) {
			switch(this.shapeMode) {
				case Pixel.OBJECT_SHAPE_RECT:
					this.bPressed	= (this.rect.isInside(touch.pos.x,touch.pos.y));
					break;
				case Pixel.OBJECT_SHAPE_CIRCLE:
					this.bPressed = Pixel.dist(this.pos.x, this.post.y, touch.pos.x, touch.pos.y) < this.radius * 2;
					break;
				default:
					break;
			}
		}
	},
	
	
	//-------------------------------------------------------
	touchEnd:function(touch) {
		this.bInitPressed = this.bPressed = false;
	}
});