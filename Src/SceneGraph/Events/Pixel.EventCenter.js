//-------------------------------------------------------
//!Event Listener


//-------------------------------------------------------
//!EVENT CENTER
Pixel.EventCenter = {};
Pixel.EventCenter.queue = {};
Pixel.EventCenter.listeners = {};

Pixel.EventCenter.Listener = function() {
	this.object		= null;
	this.responder	= null;
	this.data		= {};
}




//-------------------------------------------------------
//!EVENT SUBSCRIPTIONS

//-------------------------------------------------------
Pixel.EventCenter.addListener = function(eventType, object, responder, data) {
	var listeners = Pixel.EventCenter.listeners;
	
	if(!(eventType in listeners)) {
		listeners[eventType] = [];
	}
	
	var thisListener		= new Pixel.EventCenter.Listener();
	thisListener.object		= object;
	thisListener.responder 	= responder;
	
	if(data != undefined)
		thisListener.data = data;
		
	listeners[eventType].push(thisListener);
}


//-------------------------------------------------------
Pixel.EventCenter.removeListener = function(object, event) {
	var listeners = Pixel.EventCenter.listeners;
	
	if(event in listeners) {
		for(var i=0; i<listeners[event].length; i++) {
			if(listeners[event][i].object == object) {
				listeners[event].splice(i, 1);
				return;
			}
		}
	}
}


//-------------------------------------------------------
Pixel.EventCenter.removeAllListeners = function(object) {
	var listeners = Pixel.EventCenter.listeners;
	
	for(var key in listeners) {
		removeListener(key, object);
	}
}



//-------------------------------------------------------
//!OBJECT SORTING
//We need to sort by draw orders to make hit testing work with layers!
Pixel.EventCenter.sortListenersByDrawOrder = function(listeners) {
	listeners.sort(function(a, b) {
		return b.object.drawOrder - a.object.drawOrder;
	});
}




//-------------------------------------------------------
//!EVENT DISPATCHING

//-------------------------------------------------------
Pixel.EventCenter.queueEvent = function(event, canvas) {
	if(!(canvas in Pixel.EventCenter.queue)) {
		Pixel.EventCenter.queue[canvas] = [];
	}
	
	Pixel.EventCenter.queue[canvas].push(event);
}


//-------------------------------------------------------
Pixel.EventCenter.dispatchEvents = function(canvas) {
	if(!(canvas in Pixel.EventCenter.queue)) {
		return; //No events for this canvas ever sent,don't bother
	}
	
	var queue		= Pixel.EventCenter.queue[canvas];
	var listeners	= Pixel.EventCenter.listeners;
	
	for(var i=0; i<queue.length; i++) {
		var thisEvent = queue[i];
		
		if(queue[i].type in listeners) {
			Pixel.EventCenter.sortListenersByDrawOrder(listeners[thisEvent.type]);
			
			for(var j=0; j<listeners[queue[i].type].length; j++) {
				if(thisEvent.propogate) {
					var listeningObject = listeners[thisEvent.type][j].object;
					var responder		= listeners[thisEvent.type][j].responder;
					
					if(listeningObject.getCanvas() == canvas) {
						//Dispatch event to object
						thisEvent.data = listeners[thisEvent.type][j].data;
						
						if(Pixel.isMouseEvent(thisEvent.type)) {
							this.handleMouseEvent(thisEvent, listeningObject, responder);
						}
						
						else if(Pixel.isKeyEvent(thisEvent.type)) {
							responder.eventHandler(thisEvent);
						}
					}
				} else {
					break;
				}
			}
		}
	}
	
	//Empty the queue
	Pixel.EventCenter.queue[canvas] = [];
}




//-------------------------------------------------------
//!MOUSE EVENTS

//-------------------------------------------------------
Pixel.EventCenter.handleMouseEvent = function(event, object, responder) {
	//Send basic event
	event.localPosition = object.globalToLocal(event.position);
	event.source 		= object;
	
	switch(event.type) {
		case Pixel.MOUSE_DOWN_INSIDE_EVENT:
		case Pixel.MOUSE_UP_INSIDE_EVENT:
			if(!object.pointInside(event.localPosition)) {
				return;
			}
			break;
	}
	
	responder.eventHandler(event);
}




//-------------------------------------------------------
//!KEYBOARD EVENTS




//-------------------------------------------------------
//!TOUCH EVENTS


