if(!Pixel) {
	var Pixel = {};
	if(!px) var px = Pixel;
}

Pixel.Canvas = new Class({
	Extends:Events, 
	
	element:null,
	
	//FPS
	fps:60,
	bRunning:true,
	
	//Drawing
	ctx:null,
	bFill:true,
	bStroke:false,
	
	pos:{
		x:0,
		y:0
	},
	
	size:{
		width:0,
		height:0
	},
	
	bPixelDoubling:window.devicePixelRatio >= 2,
	
	initialize:function(x,y,width,height) {
		this.setPos(x,y);
		this.setSize(width,height);
		
		//Get Transformation (iPhone4 vs 3G/3GS)
		var transform;
		if(window.devicePixelRatio >= 2) {
			transform="scale3d(2,2,0) translate3d(" + this.pos.x + "px, " + this.pos.y + "px,0px)";
		} else {
			transform="translate3d(0px,0px,0px)";
		}
		
		//Create Canvas
		this.element = new Element('canvas', {
			width:this.size.width,
			height:this.size.height,
			styles: {
				position:"absolute",
				top:"0px",
				left:"0px",
				"-webkit-transform-origin":"0 0 0",
				"-webkit-transform":transform
			}
		});
		
		//Event Listeners
		$(document.body).addEvent("touchstart", this.touchStartListener.bind(this));
		$(document.body).addEvent("touchmove", this.touchMovedListener.bind(this));
		$(document.body).addEvent("touchend",	this.touchEndListener.bind(this));
		
		//Get Context
		this.ctx = this.element.getContext('2d');
	},
	
	//-------------------------------------------------------
	setPos: function(x,y) {
		this.pos.x	= x;
		this.pos.y	= y;
	},
	
	
	//-------------------------------------------------------
	setSize: function(width,height) {
		this.size.width		= width;
		this.size.height	= height;
	},
	
	//-------------------------------------------------------
	setFPS: function(fps) {
		this.fps = fps;
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
			
			this.run.delay(1000/this.fps, this);
		}
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
	//COLOR & FILL/STROKE
	
	//-------------------------------------------------------
	clear: function() {
		this.ctx.clearRect(0,0, this.size.width, this.size.height);
	},
	
	
	//-------------------------------------------------------
	setColor:function(r,g,b,a) {
		r = Math.round(r);
		g = Math.round(g);
		b = Math.round(b);
	
		//Hex
		if(g==undefined) {
			this.ctx.fillStyle		= "rgb(" + r + "," + r + "," + r + ")";
			this.ctx.strokeStyle	= "rgb(" + r + "," + r + "," + r + ")";
			return;
		} 
		
		//RGB
		if(a==undefined) {
			this.ctx.fillStyle		= "rgb(" + r + "," + g + "," + b + ")";
			this.ctx.strokeStyle	= "rgb(" + r + "," + g + "," + b + ")";
			return;
		} 
		
		//RGBA
		this.ctx.fillStyle		= "rgba(" + r + "," + g + "," + b + "," + a + ")";
		this.ctx.strokeStyle	= "rgba(" + r + "," + g + "," + b + "," + a + ")";
	},
	
	
	//-------------------------------------------------------
	fill: function() {
		this.bFill = true;
	},
	
	
	//-------------------------------------------------------
	noFill: function() {
		this.bFill = false;
	},
	
	
	//-------------------------------------------------------
	stroke: function(size) {
		this.bStroke = true;
		this.ctx.lineWidth = size;
	},
	
	
	//-------------------------------------------------------
	noStroke: function() {
		this.bStroke = false;
	},
	
	
	//-------------------------------------------------------
	//IMAGE DRAWING
	drawImage: function(pxImage, x, y) {
		this.ctx.drawImage(pxImage.image, x, y);
		//this.ctx.putImageData(pxImage.imageData, x, y);
	},
	
	
	//-------------------------------------------------------
	//SHAPE DRAWING
	
	//-------------------------------------------------------
	drawLine: function(x1,y1,x2,y2) {
		this.ctx.beginPath();
		this.ctx.moveTo(x1,y1);
		this.ctx.lineTo(x2,y2);
		this.ctx.stroke();
	},
	
	
	//-------------------------------------------------------
	drawRect: function(x,y,width,height) {
		if(this.bFill) this.ctx.fillRect(x,y,width,height);
		if(this.bStroke) this.ctx.strokeRect(x,y,width,height);
	},
	
	
	//-------------------------------------------------------
	drawSquare: function(x,y,size) {
		this.rectangle(x,y,size,size);
	},
	
	
	//-------------------------------------------------------
	drawEllipse: function(x,y,width,height) {
		var kappa = .5522848;
	      ox = (width / 2) * kappa, // control point offset horizontal
	      oy = (height / 2) * kappa, // control point offset vertical
	      xe = x + width,           // x-end
	      ye = y + height,           // y-end
	      xm = x + width / 2,       // x-middle
	      ym = y + height / 2;       // y-middle
	
	  this.ctx.beginPath();
	  this.ctx.moveTo(x, ym);
	  this.ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
	  this.ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
	  this.ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
	  this.ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
	  this.ctx.closePath();
	  
	  if(this.bStroke) this.ctx.stroke();
	  if(this.bFill) this.ctx.fill();
	},
	
	
	//-------------------------------------------------------
	drawCircle: function(x,y,radius) {
		this.ctx.beginPath();
		this.ctx.arc(x, y, radius, 0, Math.PI*2,false);
		
		if(this.bStroke) this.ctx.stroke();
	  	if(this.bFill) this.ctx.fill();
	},
	
	
	
	//-------------------------------------------------------
	//TRANSFORMATIONS
	
	//-------------------------------------------------------
	pushMatrix: function() {
		this.ctx.save();
	},
	
	//-------------------------------------------------------
	popMatrix: function() {
		this.ctx.restore();
	},
	
	
	//-------------------------------------------------------
	translate: function(x,y) {
		this.ctx.translate(x,y);
	},
	
	
	//-------------------------------------------------------
	scale: function(x,y) {
		this.ctx.scale(x,y);
	},
	
	
	//-------------------------------------------------------
	rotate: function(angle) {
		this.ctx.rotate(angle);
	},
	
	
	//-------------------------------------------------------
	transform: function(m11, m12, m21, m22, dx, dy) {
		this.ctx.transform(m11, m12, m21, m22, dx, dy);
	},
	
	
	//-------------------------------------------------------
	setTransform: function(m11, m12, m21, m22, dx, dy) {
		this.ctx.setTransform(m11, m12, m21, m22, dx, dy);
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