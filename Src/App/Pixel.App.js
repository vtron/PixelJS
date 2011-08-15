if(!Pixel) {
	var Pixel = {};
	if(!px) var px = Pixel;
}

    
Pixel.App = new Class({
	Extends:Pixel.Canvas,
	Implements:Events,
	
	bSetup:false,
	bRunning:true,
	
	fps:60,
	curFPS:0,
	bShowFPS:false,
	fpsSamples:[25],
	curFpsSample:-1,
	curFps:0,
	
	startTime:0,
	prevTime:0,
	
	
	//-------------------------------------------------------
	initialize:function(renderMode) {
		//Default to 2D Renderer
		this.parent(Pixel.RENDER_MODE_2D);
		
		this.startTime = new Date().getTime();
		this.prevTime = this.startTime;
		
		//Event Listeners
		$(document.body).addEvent("touchstart", this.touchStartListener.bind(this));
		$(document.body).addEvent("touchmove", this.touchMovedListener.bind(this));
		$(document.body).addEvent("touchend",	this.touchEndListener.bind(this));
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
	setFramerate: function(fps) {
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
		if(this.curFpsSample >= this.fpsSamples.length) {
			this.curFpsSample = 0;
		}
		
		var curTime = this.getElapsedTime();
		this.fpsSamples[this.curFpsSample] = 1000.0/(curTime - this.prevTime);
		
		var avgFps = 0;
		for(var i=0;i<this.fpsSamples.length; i++) {
			avgFps += this.fpsSamples[i];
		}
		
		avgFps /= this.fpsSamples.length;
		
		this.curFps = avgFps;
		
		this.prevTime = curTime;
	},
	
	//-------------------------------------------------------
	drawFPS: function() {
		this.setFont("Verdana", 10);
		
		this.drawText("FPS: " + this.curFps.toFixed(2), 20, 20);
	},
	
	
	//-------------------------------------------------------
	//Time
	getElapsedTime: function() {
		var curTime = new Date().getTime();
		return curTime - this.startTime;
	},
	
	
	//-------------------------------------------------------
	//Event Listeners
	//Events are sent to functions that can be implemented by extending classes
	//If event functions aren't implemented, they're ignored
	touches:[],
	
	
	//-------------------------------------------------------
	touchStartListener: function(e) {
		if(this.touchStart != undefined) {
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
					pos:{
						x:xPos - this.pos.x,
						y:yPos - this.pos.y
					},
					uniqueID:e.changedTouches[i].identifier
				}
				
				//Deploy Event		
				this.touchStart(this.touches[emptyTouchPos]);
			}
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
					this.touchMoved(this.touches[j]);
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
					this.touchEnd(this.touches[j]);
					this.touches[j] = null;
					break;
				}
			}
		}
	}
});