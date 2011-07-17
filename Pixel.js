if(!Pixel) {
	var Pixel = {};
	if(!px) var px = Pixel;
}

Pixel.App = new Class({
	Extends:Events, 
	Implements:Pixel.Renderer,
	
	element:null,
	
	bRunning:true,
	
	fps:60,
	curFPS:0,
	bShowFPS:false,
	fpsSamples:[25],
	curFpsSample:-1,
	curFps:0,
	
	startTime:0,
	prevTime:0,
	
	pos:{
		x:0,
		y:0
	},
	
	size:{
		width:0,
		height:0
	},
	
	bPixelDoubling:window.devicePixelRatio >= 2,
	
	
	//-------------------------------------------------------
	initialize:function() {
		//Create Canvas
		this.element = new Element('canvas', {
			width:this.size.width,
			height:this.size.height,
			styles: {
				position:"absolute",
				top:"0px",
				left:"0px",
				"-webkit-transform-origin":"0 0 0"
			}
		});
		
		this.setPos(0,0);
		this.setSize(50,50);
		this.setRenderer(Pixel.RENDER_MODE_2D);
		
		this.startTime = new Date().getTime();
		this.prevTime = this.startTime;
		
		//Event Listeners
		$(document.body).addEvent("touchstart", this.touchStartListener.bind(this));
		$(document.body).addEvent("touchmove", this.touchMovedListener.bind(this));
		$(document.body).addEvent("touchend",	this.touchEndListener.bind(this));
		
		
		
		//Get Context
		this.ctx = this.element.getContext('2d');
		
		//Run App Setup
		if(this.setup != undefined) this.setup();
		
		
	},
	
	
	//-------------------------------------------------------
	setPos: function(x,y) {
		this.pos.x	= x;
		this.pos.y	= y;
		
		//Get Transformation (iPhone4 vs 3G/3GS)
		var transform = "";
		if(this.bPixelDoubling) {
			transform ="scale3d(2,2,0) ";
		}
		
		transform += "translate3d(" + this.pos.x + "px, " + this.pos.y + "px,0px)";
		
		this.element.setStyle("-webkit-transform",transform);
	},
	
	
	//-------------------------------------------------------
	setSize: function(width,height, renderer) {
		this.size.width		= width;
		this.size.height	= height;
		
		this.element.set({
			width:this.size.width,
			height:this.size.height
		});
		
		if(renderer != undefined) {
			this.setRenderer(renderer);
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
	run: function() {
		if(this.bRunning) {
			this.update();
			this.draw();
			
			if(this.bShowFPS) {
				this.updateFPS();
				this.drawFPS();
			}
			
			this.run.delay(1000/this.fps, this);
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
	//Size Info
	
	//-------------------------------------------------------
	getWidth: function() {
		return this.size.width;
	},
	
	
	//-------------------------------------------------------
	getHeight: function() {
		return this.size.height;
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