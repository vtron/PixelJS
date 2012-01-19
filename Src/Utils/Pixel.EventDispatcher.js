//-------------------------------------------------------
//Pixel.EventDispatcher.js
//Allows everything to dispense events like DOM elements and others to listen for them
//Based on http://www.nonobtrusive.com/2009/07/24/custom-events-in-javascript-by-making-your-own-dispatcher-class/
//with data passing added

Pixel.EventDispatcher = Class.extend({
	events:[],
	
	init: function() {
	},
	
	//-------------------------------------------------------
	addEventListener: function(event,callback){
		this.events[event] = this.events[event] || [];
		if ( this.events[event] ) {
			this.events[event].push(callback);
		}
	},
	
	
	//-------------------------------------------------------
	removeEventListener: function(event,callback){
		if ( this.events[event] ) {
			var listeners = this.events[event];
			for ( var i = listeners.length-1; i>=0; --i ){
				if ( listeners[i] === callback ) {
					listeners.splice( i, 1 );
					return true;
				}
			}
		}
		return false;
	},
	
	
	//-------------------------------------------------------
	dispatch: function(event, data) {
		if ( this.events[event] ) {
			var listeners = this.events[event], len = listeners.length;
			while ( len-- ) {
				listeners[len](data);	//callback with self
			}		
		}
	}
}); 




/*
Pixel.EventDispatcher = function() {
	this.events=[];
}


//-------------------------------------------------------
Pixel.EventDispatcher.prototype.addEventListener = function(event,callback){
	this.events[event] = this.events[event] || [];
	if ( this.events[event] ) {
		this.events[event].push(callback);
	}
}


//-------------------------------------------------------
Pixel.EventDispatcher.prototype.removeEventListener = function(event,callback){
	if ( this.events[event] ) {
		var listeners = this.events[event];
		for ( var i = listeners.length-1; i>=0; --i ){
			if ( listeners[i] === callback ) {
				listeners.splice( i, 1 );
				return true;
			}
		}
	}
	return false;
}


//-------------------------------------------------------
Pixel.EventDispatcher.prototype.dispatch = function(event, data) {
	if ( this.events[event] ) {
		var listeners = this.events[event], len = listeners.length;
		while ( len-- ) {
			listeners[len](data);	//callback with self
		}		
	}
}
*/