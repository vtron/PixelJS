
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
Pixel.MouseEvent = function() {
	Pixel.Event.call(this);
	
	this.position		= null;
	this.localPosition	= null;
}

Pixel.MouseEvent.prototype = Object.create(Pixel.Event.prototype);



Pixel.isMouseEvent = function(eventType) {
	if(	eventType == Pixel.MOUSE_DOWN_EVENT	||
		eventType == Pixel.MOUSE_MOVE_EVENT ||
		eventType == Pixel.MOUSE_UP_EVENT) 
	{
		return true;
	};
		
	return false;
}