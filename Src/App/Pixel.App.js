//-------------------------------------------------------
//Pixel.App.js


Pixel.App = function(renderer) {
	Pixel.Canvas.call(this, renderer);
	
	//Status
	this.bSetup		= false;
	this.bRunning	= true;
	
	//FPS
	this.fps			= 60;
	this.curFPS			= 0;
	this.bShowFPS		= false;
	this.curFps			= 0;
	this.nFPSSamples	= 50;
	this.fpsElement		= null;
	
	//Timer
	this.startTime		= new Date().getTime();
	this.prevTime		= this.startTime;
	
	//BG Stuff
	this.bClearBackground	= true;
	
	//Event Listeners
	this.touches		= [];
	this.bMouseDown		= false;
	
	//Mobile
	var self = this;
	this.bIsMobileApp = false;
};

Pixel.App.prototype = Object.create(Pixel.Canvas.prototype);


//-------------------------------------------------------
Pixel.App.prototype.start = function() {
	this.bRunning = true;
	this.run();
};


//-------------------------------------------------------
Pixel.App.prototype.stop = function() {
	this.bRunning = false;
};


//-------------------------------------------------------
Pixel.App.prototype.isRunning = function() {
	return this.bRunning;
};


//-------------------------------------------------------
Pixel.App.prototype.run = function() {
	if(this.bRunning) {
		//Calculates bounds on all children
		this.calculateBounds();
		
		//Dispatch Events
		Pixel.EventCenter.dispatchEvents(this);
		
		//Update All Children
		this.update();
		
		//Draw Everything
		if(this.bClearBackground) this.clear(0,0, this.getWidth(), this.getHeight());
		this.resetDrawOrder();
		this.drawTree();
		
		if(this.bShowFPS) {
			this.updateFPS();
		}
		
		window.requestAnimFrame(this.run.bind(this));
	}
};




//-------------------------------------------------------
//!FPS
//-------------------------------------------------------
Pixel.App.prototype.setFPS = function(fps) {
	this.fps = fps;
};


//-------------------------------------------------------
Pixel.App.prototype.getFPS = function() {
	return this.fps;
};


//-------------------------------------------------------
Pixel.App.prototype.showFPS = function() {
	if(this.fpsElement == null) {
		this.fpsElement = document.createElement("div");
		document.body.appendChild(this.fpsElement);
	}

	this.curFPS = 0.0;
	this.bShowFPS = true;
};


//-------------------------------------------------------
Pixel.App.prototype.hideFPS = function() {
	this.bShowFPS = false;
};


//-------------------------------------------------------
Pixel.App.prototype.updateFPS = function() {
	var curTime = this.getElapsedTime();
	var thisSample = 1000.0/(curTime - this.prevTime);
	
	this.curFPS = ((this.curFPS * (this.nFPSSamples-1)) + thisSample)/this.nFPSSamples;
	this.prevTime = curTime;
	
	this.fpsElement.innerHTML = this.curFPS;
};




//-------------------------------------------------------
//!Time
Pixel.App.prototype.getElapsedTime = function() {
	var curTime = new Date().getTime();
	return curTime - this.startTime;
};








/*
//-------------------------------------------------------
//Events



//-------------------------------------------------------
//Touch Events (touch start, touchemoved, touchend)
//Touch Events have an id and position (x,y)


//-------------------------------------------------------
Pixel.App.prototype.touchStartListener = function(e) {
	for(var i=0;i < e.changedTouches.length; i++) {
		//Find empty slot for touch
		var emptyTouchPos = null;
		for(var j=0; j<this.touches.length; j++) {
			if(this.touches[j]==null) {
				emptyTouchPos = j;
				break;
			}
		}
		
		//If slot not found, create new item in touches array (javascript way of doing things)
		if(emptyTouchPos == null) emptyTouchPos = this.touches.length;
		
		//Get the touch position, divide by half if pixel Doubling!
		var xPos = !this.bPixelDoubling ? e.changedTouches[i].pageX : e.changedTouches[i].pageX/2;
		var yPos = !this.bPixelDoubling ? e.changedTouches[i].pageY : e.changedTouches[i].pageY/2;
		
		//Set the touch
		this.touches[emptyTouchPos] = {
			id:j,
			x:xPos - this.pos.x,
			y:yPos - this.pos.y,
			uniqueID:e.changedTouches[i].identifier
		}
		
		//Deploy Event
		this.dispatch("touchstart", this.touches[emptyTouchPos]);
	}
};



//-------------------------------------------------------
Pixel.App.prototype.touchMovedListener = function(e) {
	//Get Changed touches, these are the ones that moved
	for(var i=0; i<e.changedTouches.length; i++) {
		//Get each touch's unique ID
		var uniqueID = e.changedTouches[i].identifier;
			
		//Find corresponding touch object
		for(var j=0; j<this.touches.length;j++) {
			if(this.touches[j] != null && uniqueID == this.touches[j].uniqueID) {
				//Get the touch position, divide by half if pixel Doubling!
				var xPos = !this.bPixelDoubling ? e.changedTouches[i].pageX : e.changedTouches[i].pageX/2;
				var yPos = !this.bPixelDoubling ? e.changedTouches[i].pageY : e.changedTouches[i].pageY/2;
				
				
				//Update touch pos
				this.touches[j].pos = {
					x:xPos - this.pos.x,
					y:yPos - this.pos.y
				}
				
				//Deploy Event
				this.dispatch("touchmoved", this.touches[j]);
				break;
			}
		}
	}
};



//-------------------------------------------------------
Pixel.App.prototype.touchEndListener = function(e) {
	for(var i=0; i<e.changedTouches.length; i++) {
		//Get each touch's unique ID
		var uniqueID = e.changedTouches[i].identifier;
		
		for(var j=0; j<this.touches.length; j++) {
			if(this.touches[j] != null && uniqueID == this.touches[j].uniqueID) {
				this.dispatch("touchend", this.touches[j]);
				this.touches[j] = null;
				break;
			}
		}
	}
};
*/