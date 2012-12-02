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
	for(var i=0; i<this.children.length; i++) {
		this.children[i].update();
	}
}

//-------------------------------------------------------
Pixel.Object.prototype.draw = function() {
	this.canvas.pushMatrix();
	this.canvas.translate(this.pos.x, this.pos.y, this.pos.z);
	//this.canvas.scale(this.scale.x, this.scale.y);
	
	
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