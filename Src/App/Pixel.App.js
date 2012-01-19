//-------------------------------------------------------
//Pixel.App.js
Pixel.App = Pixel.Canvas.extend({
	init:function() {
		this._super();
		
		this.bSetup = false;
		this.bRunning = true;
		
		this.bIsMobileApp = false;
		
		//FPS
		this.fps			= 60;
		this.curFPS			= 0;
		this.bShowFPS		= false;
		this.nFPSSamples	= 50;
		this.fpsSamples		= [];
		this.curFpsSample	= -1;
		this.curFps			= 0;
		this.fpsFont		= new Pixel.Font("Verdana", 10, Pixel.TEXT_ALIGN_LEFT);
		
		this.startTime	= 0;
		this.prevTime	= 0;
		
		this.startTime = new Date().getTime();
		this.prevTime = this.startTime;
		
		//FPS Font
		this.fpsFont = new Pixel.Font("Verdana", 10, Pixel.TEXT_ALIGN_LEFT);
		
		//Event Listeners
		var self = this;
		
		if(Pixel.isTouchDevice()) {
			this.canvas.addEventListener('touchstart',		function(e) { self.touchStartListener.call(self, e) },	false);
			this.canvas.addEventListener("touchmove",		function(e) { self.touchMovedListener.call(self, e) },	false);
			this.canvas.addEventListener("touchend",		function(e) { self.touchEndListener.call(self, e) },	false);
		} else {	
			this.canvas.addEventListener("mousedown",		function(e) { self.mouseDownListener.call(self, e) },	false);
			this.canvas.addEventListener("mousemove",		function(e) { self.mouseMovedListener.call(self, e) },	false);
			this.canvas.addEventListener("mouseup",			function(e) { self.mouseUpListener.call(self, e) },		false);
		}
	},
	
	//-------------------------------------------------------
	start: function() {
		this.bRunning = true;
	},
	
	//-------------------------------------------------------
	stop: function() {
		this.bRunning = false;
	},
	
	
	//-------------------------------------------------------
	setup: function() {
	},
	
	
	//-------------------------------------------------------
	update: function() {
	},
	
	
	//-------------------------------------------------------
	draw: function() {
	},
	
	
	//-------------------------------------------------------
	run: function() {
		if(this.bRunning) {
			//Run App Setup if uninitalised
			if(this.setup != undefined && this.bSetup == false) {
				this.setup();
				this.bSetup = true;
			}
		
			this.update();
			this.draw();
			
			if(this.bShowFPS) {
				this.updateFPS();
				this.drawFPS();
			}
			
			window.requestAnimFrame(this.run.bind(this));
		}
	},
	

	//-------------------------------------------------------
	//FPS
	//-------------------------------------------------------
	setFPS: function(fps) {
		this.fps = fps;
	},
	
	
	//-------------------------------------------------------
	getFPS: function() {
		return this.fps;
	},
	
	
	//-------------------------------------------------------
	showFPS: function() {
		//Clear samples
		for(var i=0;i<this.fpsSamples.length; i++) {
			this.fpsSamples[i] = 0;
		}
		
		this.bShowFPS = true;
	},
	
	
	//-------------------------------------------------------
	hideFPS: function() {
		this.bShowFPS = false;
	},
	
	
	//-------------------------------------------------------
	updateFPS: function() {
		this.curFpsSample++;
		if(this.curFpsSample >= this.nFPSSamples) {
			this.curFpsSample = 0;
		}
		
		var curTime = this.getElapsedTime();
		this.fpsSamples[this.curFpsSample] = 1000.0/(curTime - this.prevTime);
		
		var avgFps = 0;
		for(var i=0;i<this.fpsSamples.length; i++) {
			avgFps += this.fpsSamples[i];
		}
		
		avgFps /= this.fpsSamples.length;
		
		this.curFps = Math.floor(avgFps);
		
		this.prevTime = curTime;
	},
	
	
	//-------------------------------------------------------
	drawFPS: function() {
		this.setFont(this.fpsFont);
		
		this.setFillColor(0,0,0);
		this.drawText("FPS: " + this.curFps.toFixed(2), 20, 20);
		this.setFillColor(255,255,2550);
		this.drawText("FPS: " + this.curFps.toFixed(2), 22, 22);
	},
	
	
	//-------------------------------------------------------
	//Time
	getElapsedTime: function() {
		var curTime = new Date().getTime();
		return curTime - this.startTime;
	},
	
	
	//-------------------------------------------------------
	//Events
	
	
	
	//-------------------------------------------------------
	//Touch Events (touch start, touchemoved, touchend)
	//Touch Events have an id and position (x,y)
	touches: [],
	
	
	//-------------------------------------------------------
	touchStartListener: function(e) {
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
	},
	
	
	
	//-------------------------------------------------------
	touchMovedListener: function(e) {
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
	},
	
	
	
	//-------------------------------------------------------
	touchEndListener: function(e) {
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
	},
	
	
	//-------------------------------------------------------
	//Mouse Events
	//Mouse Events (touch start, touchemoved, touchend)
	//Mouse Events have an x and y position
	
	bMouseDown: false,
	
	//-------------------------------------------------------
	mouseDownListener: function(e) {
		this.bMouseDown = true;
		
		//Get Position of Event
		var position = Pixel.getRelativeMouseCoords(e, this.canvas);
			
		if(this.bIsMobileApp) {
			this.dispatch("touchstart", {id:0, x:position.x, y: position.y});
		} else {
			this.dispatch("mousedown", position);
		}
	},
	
	
	//-------------------------------------------------------
	mouseMovedListener: function(e) {
		if(this.bMouseDown) {
			this.mouseDraggedListener(e);
		}
		
		//Get Position of Event
		var position = Pixel.getRelativeMouseCoords(e, this.canvas);
				
		if(this.bIsMobileApp) {
			this.dispatch("touchmoved", {id:0, x:position.x, y: position.y});
		} else {
			this.dispatch("mousemoved", position);
		}
	},
	
	
	//-------------------------------------------------------
	mouseUpListener: function(e) {
		this.bMouseDown = false;
		
		//Get Position of Event
		var position = Pixel.getRelativeMouseCoords(e, this.canvas);
			
		if(this.bIsMobileApp) {
			this.dispatch("touchend", {id:0, x:position.x, y: position.y});
		} else {
			this.dispatch("mouseup", position);
		}
	},
	
	
	//-------------------------------------------------------
	mouseDraggedListener: function(e) {
		
	}
});