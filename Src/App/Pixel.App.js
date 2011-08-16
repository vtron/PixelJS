//-------------------------------------------------------
//-------------------------------------------------------
//App Runner

if(!Pixel) {
	var Pixel = {};
	if(!px) var px = Pixel;
}

Pixel.App = new Class({
	Extends:Pixel.Canvas,
	Implements:Events,
	
	bSetup:false,
	bRunning:true,
	
	browserType: null,
	bIsMobileApp:false,
	
	fps:60,
	curFPS:0,
	bShowFPS:false,
	nFPSSamples:50,
	fpsSamples:[],
	curFpsSample:-1,
	curFps:0,
	
	startTime:0,
	prevTime:0,
	
	
	//-------------------------------------------------------
	initialize:function(renderMode, bIsMobileApp) {
		console.log(Pixel.getBrowserName());
		//Default to 2D Renderer
		this.parent(Pixel.RENDER_MODE_2D);
		
		this.startTime = new Date().getTime();
		this.prevTime = this.startTime;
		
		//Event Listeners
		if(Pixel.getBrowserName() == Pixel.BROWSER_TYPE_IPHONE) {
			$(document.body).addEvent("touchstart",		this.touchStartListener.bind(this));
			$(document.body).addEvent("touchmove",		this.touchMovedListener.bind(this));
			$(document.body).addEvent("touchend",		this.touchEndListener.bind(this));
		} else {		
			$(document.body).addEvent("mousedown",		this.mouseDownListener.bind(this));
			$(document.body).addEvent("mousemove",		this.mouseMovedListener.bind(this));
			$(document.body).addEvent("mouseup",		this.mouseUpListener.bind(this));
		}
		
		//Start Tweening
		TWEEN.start();
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
		this.setFont("Verdana", 10);
		
		
		this.setColor(0,0,0);
		this.drawText("FPS: " + this.curFps.toFixed(2), 20, 20);
		this.setColor(255,255,2550);
		this.drawText("FPS: " + this.curFps.toFixed(2), 22, 22);
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
	
	//-------------------------------------------------------
	//Touch Listener
	touches:[],
	
	//Default functions (called by listeners, extend in App)
	
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
		if(this.touchMoved != undefined) {
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
		}
	},
	
	
	//-------------------------------------------------------
	touchEndListener: function(e) {
		if(this.touchEnd != undefined) {
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
	},
	
	
	//-------------------------------------------------------
	//Mouse Listeners
	
	bMouseDown:false,
	
	//-------------------------------------------------------
	mouseDownListener: function(e) {
		this.bMouseDown = true;
		
		//Get Position of Event
		var position = {
			x:e.client.x,
			y:e.client.y
		}
			
		if(this.bIsMobileApp) {
			if(this.touchStart != undefined) {
				this.touchStart({id:0, pos:position});
			}
		} else {
			if(this.mouseDown != undefined) {
				this.mouseDown(position.x, pos.y);
			}
		}
	},
	
	//-------------------------------------------------------
	mouseMovedListener: function(e) {
		if(this.bMouseDown) {
			this.mouseDraggedListener(e);
		}
		
		//Get Position of Event
		var position = {
			x:e.client.x,
			y:e.client.y
		}
			
		if(this.bIsMobileApp) {
			if(this.touchMoved != undefined) {
				this.touchMoved({id:0, pos:position});
			}
		} else {
			if(this.mouseMoved != undefined) {
				this.mouseMoved(pos.x, pos.y);
			}
		}
	},
	
	
	//-------------------------------------------------------
	mouseUpListener: function(e) {
		this.bMouseDown = false;
		
		//Get Position of Event
		var position = {
			x:e.client.x,
			y:e.client.y
		}
			
		if(this.bIsMobileApp) {
			if(this.touchEnd != undefined) {
				this.touchEnd({id:0, pos:position});
			}
		} else {
			if(this.mouseUp != undefined) {
				this.mouseUp(pos.x, pos.y);
			}
		}
	},
	
	
	//-------------------------------------------------------
	mouseDraggedListener: function(e) {
		
	}
	
});