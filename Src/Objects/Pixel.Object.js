//-------------------------------------------------------
//-------------------------------------------------------
//Main Object
//(function () {
	Pixel.Object = function() {
		this.canvas = null;
		
		this.width	= 0;
		this.height = 0;
		
		this.pos = new Pixel.Point(0,0,0);
		
		this.visible = true;
		
		this.parent   = null;
		this.children = [];
	}
	
	//-------------------------------------------------------
	Pixel.Object.prototype.update = function() {
		for(var i=0; i<this.children.length; i++) {
			this.children[i].update();
		}
	}
	
	//-------------------------------------------------------
	Pixel.Object.prototype.draw = function() {
		for(var i=0; i<this.children.length; i++) {
			this.children[i].draw();
		}
		
		this.canvas.popMatrix();
	}
	
	//-------------------------------------------------------
	Pixel.Object.prototype.addChild = function(childObject) {
		if(childObject.parent != null) {
			childObject.parent.removeChild(childObject);
		}
		
		childObject.parent = this;
		childObject.canvas = this.canvas;
		
		this.children.push(childObject);
	}
	
	//-------------------------------------------------------
	Pixel.Object.prototype.removeChild = function(childObject) {
		var i = this.children.length;
		while(i--) {
			if(this.children[i] == childObject) {
				childObject.parent = null;
				childObject.canvas = null;
				this.children.splice(i, 1);
				return;
			}
		}
	}
	
	//-------------------------------------------------------
	Pixel.Object.prototype.eventHandler = function(event) {
	}
	
	
	//-------------------------------------------------------
	Pixel.Object.prototype.messageHandler = function(msg) {
	}
//})();

/*

Pixel.Object = Pixel.EventDispatcher.extend({
	init: function() {
		this.bInitPressed = false;
		this.bPressed = false;
		this.width = 0;
		this.height = 0;
		
		this.pos = {
			x:0,
			y:0
		};
		
		this.radius = 0;
		
		this.shapeMode = Pixel.OBJECT_SHAPE_RECT;
		
		this.rect = new Pixel.Rectangle();
		
		this._super();
	},
	
	
	//-------------------------------------------------------
	show: function() {
	
	},
	
	
	//-------------------------------------------------------
	hide: function() {
	},
	
	
	//-------------------------------------------------------
	setPos: function(x,y) {
		if(Pixel.isSet(x)) this.pos.x = x;
		if(Pixel.isSet(y)) this.pos.y = y;
		
		this.setRect();
	},
	
	
	//-------------------------------------------------------
	getPos: function() {
		return this.pos;
	},
	
	
	//-------------------------------------------------------
	setSize: function(width, height) {
		if(Pixel.isSet(width))	this.width	= width;
		if(Pixel.isSet(height)) this.height = height;
		
		this.setRect();
	},
	
	
	//-------------------------------------------------------
	//Set Rect, for touches, can be overridden for cases like textfields (alignment + baseline issues)
	setRect: function() {
		this.rect.set(this.pos.x, this.pos.y, this.width, this.height);
	},
	
	
	//-------------------------------------------------------
	getRect: function() {
		return this.rect;
	},
	
	
	//-------------------------------------------------------
	getWidth: function() {
		return this.width;
	},
	
	
	//-------------------------------------------------------
	getHeight: function() {
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
	touchStart: function(touch) {
		this.setRect(this.pos.x, this.pos.y, this.width, this.height);
		
		//Touch Detection
		switch(this.shapeMode) {
			case Pixel.OBJECT_SHAPE_RECT:
				this.bInitPressed = (this.rect.isInside(touch.x,touch.y));
				break;
			case Pixel.OBJECT_SHAPE_CIRCLE:
				this.bInitPressed = Pixel.dist(this.pos.x, this.pos.y, touch.x, touch.y) < this.radius * 2;
				break;
			default:
				break;
		}
		
		this.bPressed = this.bInitPressed;
		return this.bPressed;
	},
	
	
	//-------------------------------------------------------
	touchMoved: function(touch) {
		if(this.bInitPressed) {
			switch(this.shapeMode) {
				case Pixel.OBJECT_SHAPE_RECT:
					this.bPressed	= (this.rect.isInside(touch.x,touch.y));
					break;
				case Pixel.OBJECT_SHAPE_CIRCLE:
					this.bPressed = Pixel.dist(this.pos.x, this.pos.y, touch.x, touch.y) < this.radius * 2;
					break;
				default:
					break;
			}
		}
		
		return this.bPressed;
	},
	
	
	//-------------------------------------------------------
	touchEnd: function(touch) {
		this.bInitPressed = this.bPressed = false;
		return this.bPressed;
	}
});
*/