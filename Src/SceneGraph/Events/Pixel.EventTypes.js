
//------------------------------------------------------
//!Events

//----------------------------------------
//!GENERIC EVENT
Pixel.Event = function() {
	this.type = null;
	this.data = null;
	
	this.propogate = true;
}

//----------------------------------------
Pixel.Event.prototype.stopPropogation = function() {
	this.propogate = false;
}




//----------------------------------------
//!MOUSE EVENT
Pixel.MouseEvent = function(type, position) {
	Pixel.Event.call(this);
	
	this.type			= type;
	this.position		= position;
	this.localPosition	= null; //Set in Event Handler
}

Pixel.MouseEvent.prototype = Object.create(Pixel.Event.prototype);


Pixel.isMouseEvent = function(eventType) {
	if(	eventType == Pixel.MOUSE_DOWN_EVENT			||
		eventType == Pixel.MOUSE_DOWN_INSIDE_EVENT	||
		eventType == Pixel.MOUSE_MOVE_EVENT 		||
		eventType == Pixel.MOUSE_UP_EVENT 			||
		eventType == Pixel.MOUSE_UP_INSIDE_EVENT)
	{
		return true;
	};
		
	return false;
}




//----------------------------------------
//!KEY EVENT
Pixel.KeyEvent = function(type, charCode, keyCode) {
	Pixel.Event.call(this);
	
	this.type			= type;
	this.keyCode		= keyCode;
	this.charCode		= charCode;
}


Pixel.isKeyEvent = function(eventType) {
	if(	eventType == Pixel.KEY_DOWN_EVENT			||
		eventType == Pixel.KEY_PRESS_EVENT			||
		eventType == Pixel.KEY_UP_EVENT)
	{
		return true;
	};
	
	return false;
}
