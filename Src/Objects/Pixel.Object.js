//-------------------------------------------------------
//-------------------------------------------------------
//Main Object
Pixel.Object = function() {
	this.canvas = null;
	
	this.name	= "";
	
	this.pos		= new Pixel.Point(0,0,0);
	this.offset		= new Pixel.Point(0,0,0);
	
	this.rotation	= 0;
	//this.scale		= new Pixel.Point(1,1,0);
	this.alignment	= Pixel.ALIGNMENT_TOP_LEFT;
	
	this.visible = true;
	
	this.parent   = null;
	this.children = [];
}


//-------------------------------------------------------
Pixel.Object.prototype.update = function() {
	var i = this.children.length;
	
	while(i--) {
		this.children[i].update();
	}
}


//-------------------------------------------------------
Pixel.Object.prototype.draw = function() {
	this.canvas.pushMatrix();
	this.canvas.translate(this.pos.x, this.pos.y, this.pos.z);
	//this.canvas.scale(this.scale.x, this.scale.y);
	
	var i = this.children.length;
	while(i--) {
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
//Returns poPoint
Pixel.Object.prototype.calculateOffset = function() {
	switch(this.alignment) {
		case Pixel.ALIGNMENT_TOP_LEFT:
			this.offset.set(0, 0);
			break;
		
		case Pixel.ALIGNMENT_CENTER_LEFT:
			this.offset.set(0, -this.height/2);
			break;
		
		case Pixel.ALIGNMENT_BOTTOM_LEFT:
			this.offset.set(0, -this.height);
			break;
		
		case Pixel.ALIGNMENT_TOP_RIGHT:
			this.offset.set(-this.width, 0);
			break;
		
		case Pixel.ALIGNMENT_CENTER_RIGHT:
			this.offset.set(-this.width, -this.height/2);
			break;
		
		case Pixel.ALIGNMENT_BOTTOM_RIGHT:
			this.offset.set(-this.width, -this.height);
			break;
		
		case Pixel.ALIGNMENT_TOP_CENTER:
			this.offset.set(-this.width/2, 0);
			break;
		
		case Pixel.ALIGNMENT_BOTTOM_CENTER:
			this.offset.set(-this.width/2, -this.height);
			break;
		
		case Pixel.ALIGNMENT_CENTER_CENTER:
			this.offset.set(-this.width/2, -this.height/2);
			break;
	}
}


//-------------------------------------------------------
Pixel.Object.prototype.eventHandler = function(event) {
}


//-------------------------------------------------------
Pixel.Object.prototype.messageHandler = function(msg) {
}