//-------------------------------------------------------
//-------------------------------------------------------
//Main Object

Pixel.Object = function() {
	this.bInitPressed = false;
	this.bPressed = false;
	
	this.pos = {
		x:0,
		y:0
	}
	
	this.width = 0;
	this.height = 0;
	
	this.radius = 0;
	
	this.shapeMode = Pixel.OBJECT_SHAPE_RECT;
	
	this.rect = new Pixel.Rectangle();
}


//-------------------------------------------------------
Pixel.Object.prototype.show = function() {
},


//-------------------------------------------------------
Pixel.Object.prototype.hide = function() {
},


//-------------------------------------------------------
Pixel.Object.prototype.setPos = function(x,y) {
	if(Pixel.isSet(x)) this.pos.x = x;
	if(Pixel.isSet(y)) this.pos.y = y;
	
	this.setRect();
},


//-------------------------------------------------------
Pixel.Object.prototype.getPos = function() {
	return this.pos;
},


//-------------------------------------------------------
Pixel.Object.prototype.setSize = function(width, height) {
	if(Pixel.isSet(width))	this.width	= width;
	if(Pixel.isSet(height)) this.height = height;
	
	this.setRect();
},


//-------------------------------------------------------
//Set Rect, for touches, can be overridden for cases like textfields (alignment + baseline issues)
Pixel.Object.prototype.setRect = function() {
	this.rect.set(this.pos.x, this.pos.y, this.width, this.height);
},


//-------------------------------------------------------
Pixel.Object.prototype.getRect = function() {
	return this.rect;
},


//-------------------------------------------------------
Pixel.Object.prototype.getWidth = function() {
	return this.width;
},


//-------------------------------------------------------
Pixel.Object.prototype.getHeight = function() {
	return this.height
},


//-------------------------------------------------------
Pixel.Object.prototype.setShapeMode = function(shapeMode) {
	this.shapeMode = shapeMode;
},

//-------------------------------------------------------
//Event Listeners

//-------------------------------------------------------
Pixel.Object.prototype.isPressed = function() {
	return this.bPressed;
},


//-------------------------------------------------------
Pixel.Object.prototype.touchStart = function(touch) {
	this.setRect(this.pos.x, this.pos.y, this.width, this.height);
	
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
	return this.bPressed;
},


//-------------------------------------------------------
Pixel.Object.prototype.touchMoved = function(touch) {
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
	
	return this.bPressed;
},


//-------------------------------------------------------
Pixel.Object.prototype.touchEnd = function(touch) {
	this.bInitPressed = this.bPressed = false;
	return this.bPressed;
}