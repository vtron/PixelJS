//-------------------------------------------------------
//-------------------------------------------------------
//Main Object
Pixel.Object = function() {
	this.canvas				= null;
	
	this.name				= "";
	
	this.pos				= new Pixel.Point(0,0,0);
	this.offset				= new Pixel.Point(0,0,0);
	
	this.width				= 0;
	this.height 			= 0;
	this.bounds 			= new Pixel.Rect(0,0,0,0);
	this.shouldDrawBounds 	= false;
	
	this.rotation			= 0;
	this.alignment			= Pixel.ALIGNMENT_TOP_LEFT;
	this.scaleAmount		= new Pixel.Point(1,1,0);
	this.rotation			= 0;
	
	this.cache				= null;
	this.isCaching			= false;
	
	this.visible			= true;
	
	this.parent				= null;
	this.children			= [];
}


//-------------------------------------------------------
Pixel.Object.prototype.update = function() {
	for(var i=0; i<this.children.length; i++)  {
		this.children[i].update();
	}
}


//-------------------------------------------------------
Pixel.Object.prototype.draw = function() {
	if(this.children.length != 0 && this.canvas && this.visible) {
		this.calculateBounds();
		this.calculateOffset();
		
		this.canvas.pushMatrix();
		this.canvas.translate(this.pos.x + this.offset.x, this.pos.y + this.offset.y, 0);
		this.canvas.rotate(this.rotation);
		this.canvas.scale(this.scaleAmount.x, this.scaleAmount.y);
		
		if(this.isCaching == false) {
			for(var i=0; i<this.children.length; i++) {
				this.children[i].draw();
			}
		} else {
			this.canvas.drawImage(this.cache.element, 0, 0, this.cache.getWidth(), this.cache.getHeight());
		}
		
		if(this.shouldDrawBounds) {
			this.drawBounds();
		}
		
		this.canvas.popMatrix();
	} else {
		console.log("No children");
	}
}

//-------------------------------------------------------
Pixel.Object.prototype.setCanvas = function(canvas) {
	this.canvas = canvas;
	
	var i=this.children.length;
	while(i--) {
		this.children[i].setCanvas(canvas);
	}
}

//-------------------------------------------------------
Pixel.Object.prototype.setVisible = function(isVisible) {
	this.visible = isVisible;
}


//-------------------------------------------------------
//! Children
//-------------------------------------------------------

//-------------------------------------------------------
Pixel.Object.prototype.addChild = function(childObject) {
	if(childObject.parent != null) {
		childObject.parent.removeChild(childObject);
	}
	
	childObject.parent = this;
	
	this.children.push(childObject);
	
	if(this.isCaching == false) {
		childObject.setCanvas(this.canvas);
	} else {
		childObject.setCanvas(this.cache);
		this.doCaching();
	}
}


//-------------------------------------------------------
Pixel.Object.prototype.removeChild = function(childObject) {
	var index = this.children.lastIndexOf(childObject);
	if(index != -1) {
		this.children.splice(i, 1);
	}
	var i = this.children.length;
	while(i--) {
		if(this.children[i] == childObject) {
			childObject.parent = null;
			childObject.canvas = null;
			this.children.splice(i, 1);
			return true;
		}
	}
	
	return false;
}


//-------------------------------------------------------
Pixel.Object.prototype.moveChildForward = function(object) {
	//If its already on top, just return
	if(object == this.children[this.children.length-1]) {
		return false;
	} else {
		//Get the current index
		var index = this.children.lastIndexOf(object);
		
		if(index != -1) {
			this.children.splice(index, 1);
			
			if(index < this.children.length) {
				this.children.splice(index + 1, 0, object);
			} else {
				this.children.push(object);
			}
			return true;
		} else {
			return false;
		}
	}
}


//-------------------------------------------------------
Pixel.Object.prototype.moveChildToFront = function(object) {
	var index = this.children.lastIndexOf(object);
	
	if(index != -1) {
		this.children.splice(index, 1);
		this.children.push(object);
		return true;
	} else {
		return false;
	}
}


//-------------------------------------------------------
Pixel.Object.prototype.moveChildBackward = function(object) {
	//If its already last, just return
	if(object == this.children[0]) {
		return false;
	} else {
		//Get the current index
		var index = this.children.lastIndexOf(object);
		
		if(index != -1) {
			this.children.splice(index, 1);
			if(index -1 > 0) {
				this.children.splice(index - 1, 0, object);
			} else {
				this.children.unshift(object);
			}
			return true;
		} else {
			return false;
		}
	}
}


//-------------------------------------------------------
Pixel.Object.prototype.moveChildToBack = function(object) {
	var index = this.children.lastIndexOf(object);
	
	if(index != -1) {
		this.children.splice(index, 1);
		this.children.unshift(object);
		return true;
	} else {
		return false;
	}
}


//-------------------------------------------------------
//! Size
//-------------------------------------------------------

//-------------------------------------------------------
Pixel.Object.prototype.getWidth = function() {
	return this.bounds.width;
}


//-------------------------------------------------------
Pixel.Object.prototype.getHeight = function() {
	return this.bounds.height;
}


//-------------------------------------------------------
Pixel.Object.prototype.getSize = function() {
	return { "width": this.getWidth(), "height": this.getHeight() };
}


//-------------------------------------------------------
//! Bounds
//-------------------------------------------------------

//-------------------------------------------------------
Pixel.Object.prototype.getBounds = function() {
	this.calculateBounds();
	return this.bounds;
}

//-------------------------------------------------------
Pixel.Object.prototype.calculateBounds = function() {
	this.bounds.set(0,0,0,0);
	var childBounds;
	for(var i=0; i<this.children.length; i++) {
		childBounds = this.children[i].getBounds();
		childBounds.x += this.children[i].pos.x;
		childBounds.y += this.children[i].pos.y;
		this.bounds.include(childBounds);
	}
}

//-------------------------------------------------------
Pixel.Object.prototype.setDrawBounds = function(shouldDrawBounds) {
	this.shouldDrawBounds = shouldDrawBounds;
}

//-------------------------------------------------------
Pixel.Object.prototype.getDrawBounds = function() {
	return this.shouldDrawBounds;
}

//-------------------------------------------------------
Pixel.Object.prototype.drawBounds = function() {
	//Draw Frame
	this.canvas.setStrokeSize(1);
	this.canvas.setStrokeColor(255,0,0);
	this.canvas.noFill();
	
	this.canvas.drawRect(this.bounds.x, this.bounds.y, this.getWidth(), this.getHeight());
	
	//Draw Origin
	this.canvas.setFillColor(255,0,0);
	this.canvas.noStroke();
	
	this.canvas.drawRect(-2, -2, 4,4);
}


//-------------------------------------------------------
//! Alignment/Offset
//-------------------------------------------------------

//-------------------------------------------------------
Pixel.Object.prototype.setAlignment = function(alignment) {
	this.alignment = alignment;
}


//-------------------------------------------------------
//Returns offest (based on alignment) as Pixel.Point
Pixel.Object.prototype.calculateOffset = function() {
	switch(this.alignment) {
		case Pixel.ALIGNMENT_LEFT_TOP:
			this.offset.set(0, 0);
			break;
		
		case Pixel.ALIGNMENT_LEFT_CENTER:
			this.offset.set(0, -this.getHeight()/2);
			break;
		
		case Pixel.ALIGNMENT_LEFT_BOTTOM:
			this.offset.set(0, -this.getHeight());
			break;
		
		case Pixel.ALIGNMENT_RIGHT_TOP:
			this.offset.set(-this.getWidth(), 0);
			break;
		
		case Pixel.ALIGNMENT_RIGHT_CENTER:
			this.offset.set(-this.getWidth(), -this.getHeight()/2);
			break;
		
		case Pixel.ALIGNMENT_RIGHT_BOTTOM:
			this.offset.set(-this.getWidth(), -this.getHeight());
			break;
		
		case Pixel.ALIGNMENT_CENTER_TOP:
			this.offset.set(-this.getWidth()/2, 0);
			break;
		
		case Pixel.ALIGNMENT_CENTER_BOTTOM:
			this.offset.set(-this.getWidth()/2, -this.getHeight());
			break;
		
		case Pixel.ALIGNMENT_CENTER_CENTER:
			this.offset.set(-this.getWidth()/2, -this.getHeight()/2);
			break;
	}
}

//-------------------------------------------------------
//! Caching
//-------------------------------------------------------

//-------------------------------------------------------
Pixel.Object.prototype.setCaching = function(shouldCache) {
	this.isCaching = shouldCache;
	
	if(shouldCache) {
		if(this.cache == null) {
			this.createCache();
			//Set children to use this cache
			var i=this.children.length;
			while(i--) {
				this.children[i].setCanvas(this.cache);
			}
		}
		
		this.doCaching();
	} else {
		//Return children to original canvas
		var i=this.children.length;
		while(i--) {
			this.children[i].setCanvas(this.canvas);
		}
		
		//Free up the cache
		delete this.cache;
	}
}

//-------------------------------------------------------
Pixel.Object.prototype.createCache = function() {
	//Create canvas for caching
	this.cache = new Pixel.Canvas();
	this.calculateBounds();
	this.cache.setSize(this.getWidth() * window.devicePixelRatio, this.getHeight() * window.devicePixelRatio);
}

//-------------------------------------------------------
Pixel.Object.prototype.updateCache = function() {
	if(!this.isCaching) {
		this.setCaching(true);
	}
	
	this.doCaching();
}



//-------------------------------------------------------
Pixel.Object.prototype.doCaching = function() {
	this.calculateBounds();
	this.cache.setSize(this.getWidth() * window.devicePixelRatio, this.getHeight() * window.devicePixelRatio);
	console.log(this.cache.width);
	this.cache.pushMatrix();
	this.cache.scale(window.devicePixelRatio,window.devicePixelRatio,1);
	for(var i=0; i<this.children.length; i++) {
		this.children[i].draw();
	}
	this.cache.popMatrix();
}

//-------------------------------------------------------
//! Handlers
//-------------------------------------------------------

//-------------------------------------------------------
Pixel.Object.prototype.eventHandler = function(event) {
}


//-------------------------------------------------------
Pixel.Object.prototype.messageHandler = function(msg) {
}