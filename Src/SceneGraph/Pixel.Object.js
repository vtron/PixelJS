//-------------------------------------------------------
//-------------------------------------------------------
//Main Object
Pixel.Object = function() {
	this.canvas = null;
	
	this.name	= "";
	
	this.pos		= new Pixel.Point(0,0,0);
	this.offset		= new Pixel.Point(0,0,0);
	
	this.rotation	= 0;
	this.alignment	= Pixel.ALIGNMENT_TOP_LEFT;
	this.scaling	= new Pixel.Point(1,1,0);
	this.rotation	= 0;
	
	this.visible = true;
	
	this.parent   = null;
	this.children = [];
}


//-------------------------------------------------------
Pixel.Object.prototype.update = function() {
	for(var i=0; i<this.children.length; i++)  {
		this.children[i].update();
	}
}


//-------------------------------------------------------
Pixel.Object.prototype.draw = function() {
	this.canvas.pushMatrix();
	this.canvas.translate(this.pos.x, this.pos.y, this.pos.z);
	this.canvas.rotate(this.rotation);
	this.canvas.scale(this.scaling.x, this.scaling.y);
	
	for(var i=0; i<this.children.length; i++) {
		this.children[i].draw();
	}
	
	this.canvas.popMatrix();
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
//! Children
//-------------------------------------------------------

//-------------------------------------------------------
Pixel.Object.prototype.addChild = function(childObject) {
	if(childObject.parent != null) {
		childObject.parent.removeChild(childObject);
	}
	
	childObject.parent = this;
	
	childObject.setCanvas(this.canvas);
	
	this.children.push(childObject);
}


//-------------------------------------------------------
Pixel.Object.prototype.removeChild = function(childObject) {
	var index = this.children.lastIndexOf(object);
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
	return this.getBounds.width;
}


//-------------------------------------------------------
Pixel.Object.prototype.getHeight = function() {
	return this.getBounds.height;
}


//-------------------------------------------------------
//Needs to be implmented
Pixel.Object.prototype.getBounds = function() {
	return new Pixel.Rect();
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
			this.offset.set(0, -this.height/2);
			break;
		
		case Pixel.ALIGNMENT_LEFT_BOTTOM:
			this.offset.set(0, -this.height);
			break;
		
		case Pixel.ALIGNMENT_RIGHT_TOP:
			this.offset.set(-this.width, 0);
			break;
		
		case Pixel.ALIGNMENT_RIGHT_CENTER:
			this.offset.set(-this.width, -this.height/2);
			break;
		
		case Pixel.ALIGNMENT_RIGHT_BOTTOM:
			this.offset.set(-this.width, -this.height);
			break;
		
		case Pixel.ALIGNMENT_CENTER_TOP:
			this.offset.set(-this.width/2, 0);
			break;
		
		case Pixel.ALIGNMENT_CENTER_BOTTOM:
			this.offset.set(-this.width/2, -this.height);
			break;
		
		case Pixel.ALIGNMENT_CENTER_CENTER:
			this.offset.set(-this.width/2, -this.height/2);
			break;
	}
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