//-------------------------------------------------------
//Pixel.js
//Main Class, creates library




//-------------------------------------------------------
//Create Main Class Object, checking for namespace
if(typeof Pixel == 'undefined') {
	Pixel = {
		'version': '0.1'
	};
	
	//Create Alias
	if(typeof px == 'undefined') px = Pixel;
} else {
	console.log("Pixel Namespace Already Exists!");
}




//-------------------------------------------------------
//Pixel.Constants.js
//Constant var names for various settings


//Browser Type
Pixel.BROWSER_TYPE_CHROME	= "chrome";
Pixel.BROWSER_TYPE_SAFARI	= "safari"
Pixel.BROWSER_TYPE_FIREFOX	= "firefox"
Pixel.BROWSER_TYPE_IPHONE	= "iphone"

//Render Modes
Pixel.RENDERER_2D		= 0;
Pixel.RENDERER_WEBGL	= 1;

//Line Cap
Pixel.LINE_CAP_NORMAL			= 0,
Pixel.LINE_CAP_ROUND			= 1,
Pixel.LINE_CAP_SQUARE			= 2;

//Font Alignment
Pixel.TEXT_ALIGN_LEFT			= 0,
Pixel.TEXT_ALIGN_CENTER			= 1,
Pixel.TEXT_ALIGN_RIGHT			= 2;

//Font Baseline
Pixel.TEXT_BASELINE_TOP			= 0,
Pixel.TEXT_BASELINE_HANGING		= 1,
Pixel.TEXT_BASELINE_MIDDLE		= 2,
Pixel.TEXT_BASELINE_BOTTOM		= 3;

//Object SHape
Pixel.OBJECT_SHAPE_RECT			= 0,
Pixel.OBJECT_SHAPE_CIRCLE		= 1;

//Object Origins
Pixel.ALIGNMENT_TOP_LEFT		= 0,
Pixel.ALIGNMENT_CENTER_LEFT		= 1,
Pixel.ALIGNMENT_BOTTOM_LEFT		= 2;

Pixel.ALIGNMENT_TOP_RIGHT		= 3,
Pixel.ALIGNMENT_CENTER_RIGHT	= 4,
Pixel.ALIGNMENT_BOTTOM_RIGHT	= 5,

Pixel.ALIGNMENT_TOP_CENTER		= 6,
Pixel.ALIGNMENT_BOTTOM_CENTER	= 7,
Pixel.ALIGNMENT_CENTER			= 8;

//Tween Types
/*
Pixel.NO_EASE		= TWEEN.Easing.Linear.EaseNone;

Pixel.EASE_IN_QUAD		= TWEEN.Easing.Quadratic.EaseIn;
Pixel.EASE_OUT_QUAD		= TWEEN.Easing.Quadratic.EaseOut;
Pixel.EASE_IN_OUT_QUAD	= TWEEN.Easing.Quadratic.EaseInOut;

Pixel.EASE_IN_CUBE		= TWEEN.Easing.Cubic.EaseIn;
Pixel.EASE_OUT_CUBE		= TWEEN.Easing.Cubic.EaseOut;
Pixel.EASE_IN_OUT_CUBE	= TWEEN.Easing.Cubic.EaseInOut;

Pixel.EASE_IN_QUART		= TWEEN.Easing.Quartic.EaseIn;
Pixel.EASE_OUT_QUART	= TWEEN.Easing.Quartic.EaseOut;
Pixel.EASE_IN_OUT_QUART	= TWEEN.Easing.Quartic.EaseInOut;

Pixel.EASE_IN_QUINT		= TWEEN.Easing.Quintic.EaseIn;
Pixel.EASE_OUT_QUINT	= TWEEN.Easing.Quintic.EaseOut;
Pixel.EASE_IN_OUT_QUINT	= TWEEN.Easing.Quintic.EaseInOut;

Pixel.EASE_IN_SIN		= TWEEN.Easing.Sinusoidal.EaseIn;
Pixel.EASE_OUT_SIN		= TWEEN.Easing.Sinusoidal.EaseOut;
Pixel.EASE_IN_OUT_SIN	= TWEEN.Easing.Sinusoidal.EaseInOut;

Pixel.EASE_IN_EXPO		= TWEEN.Easing.Exponential.EaseIn;
Pixel.EASE_OUT_EXPO		= TWEEN.Easing.Exponential.EaseOut;
Pixel.EASE_IN_OUT_EXPO	= TWEEN.Easing.Exponential.EaseInOut;

Pixel.EASE_IN_CIRC		= TWEEN.Easing.Circular.EaseIn;
Pixel.EASE_OUT_CIRC		= TWEEN.Easing.Circular.EaseOut;
Pixel.EASE_IN_OUT_CIRC	= TWEEN.Easing.Circular.EaseInOut;
*///-------------------------------------------------------
//Pixel.Utils.js


//-------------------------------------------------------
Pixel.isSet = function(item) { return item != undefined ? item : false; };


//-------------------------------------------------------
Pixel.log = function(message) {
	console.log("PixelJS Log: " + message)
};

//-------------------------------------------------------
//IPHONE (maybe android too but only tested on iPhone so far)

//Touch device detection
//from http://stackoverflow.com/questions/2607248/optimize-website-for-touch-devices
Pixel.isTouchDevice = function() {
	return "ontouchstart" in window;
}

Pixel.scale = window.devicePixelRatio;

//Hide menu bar
Pixel.hideAddressBar = function() {
	window.scrollTo(0,1);
};

//-------------------------------------------------------
//RequestAnimationFrame finder by Paul Irish
//from http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();



//Mouse Coords relative to an element
//from http://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element
Pixel.getRelativeMouseCoords = function(event, element){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = element;

    do{
        totalOffsetX += currentElement.offsetLeft;
        totalOffsetY += currentElement.offsetTop;
    }
    while(currentElement = currentElement.offsetParent)
    
    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;
    
    return {x:canvasX, y:canvasY}
}//-------------------------------------------------------
//Utils
//Various classes and functions that make math easier
Pixel.Math = new Object;


//-------------------------------------------------------
//Radians & Degrees
//-------------------------------------------------------
Pixel.Math.radiansToDegrees = function(rad) {
	return rad * (180/Math.PI);
};

Pixel.Math.degreesToRadians = function(deg) {
	return deg * (Math.PI/180);
};




//-------------------------------------------------------
//Mapping/Distance
//-----------------------------------------------------
Pixel.Math.map = function(iStart, iStop, value, oStart, oStop, bClamp) {
	value = oStart + (oStop - oStart) * ((value - iStart) / (iStop - iStart));
	return bClamp ? Pixel.clamp(value) : value;
}

//-----------------------------------------------------
Pixel.Math.clamp = function(value, lowVal,highVal) {
	value = Math.max(value,lowVal);
	value = Math.min(value,highVal);
	return value;
}


//-----------------------------------------------------
Pixel.Math.dist = function(x1,y1,x2,y2, bSigned) {
	var dist = Math.sqrt(Math.pow((x2-x1),2) + Math.pow(y2-y1,2));
	
	return bSigned ? dist : Math.abs(dist);
}


//-----------------------------------------------------
Pixel.Math.getAngle = function(x1, y1, x2, y2) {
	return Math.atan2(y2 - y1, x2 - x1);
}

//-----------------------------------------------------
Pixel.Math.isPowerOfTwo = function(value) {
	return ((value & (value - 1)) == 0);
}
//-------------------------------------------------------
//-------------------------------------------------------
//Point Class

Pixel.Point = function(x,y,z) {
	this.x = x || 0.0;
	this.y = y || 0.0;
	this.z = z || 0.0;
}

Pixel.Point.prototype.set = function(x,y,z) {
	this.x = x || 0.0;
	this.y = y || 0.0;
	this.z = z || 0.0;
}//-------------------------------------------------------
//Pixel.Math.js
//Various classes and functions that make math easier

Pixel.Rect = function(x,y,width,height) {
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
		
	this.set(x,y,width,height);
}


//-------------------------------------------------------
Pixel.Rect.prototype.set = function(x,y,width,height) {
	this.setPos(x,y);
	this.setSize(width,height);
}


//-------------------------------------------------------
Pixel.Rect.prototype.setPos = function(x,y) {
	if(Pixel.isSet(x)) this.x = x;
	if(Pixel.isSet(y)) this.y = y;
}


//-------------------------------------------------------
Pixel.Rect.prototype.setSize = function(width,height) {
	this.width	= width;
	this.height = height;
}


//-------------------------------------------------------
Pixel.Rect.prototype.getPos = function() {
	return {
		x:this.x,
		y:this.y
	};
}


//-------------------------------------------------------
Pixel.Rect.prototype.getSize = function() {
	return {
		width:this.width,
		height:this.height
	}
}

//-------------------------------------------------------
//Takes poPoint or x,y coordinate
Pixel.Rect.prototype.pointInside = function(x,y) {
	if(y != undefined) {
		return (x > this.x) && (x < this.x + this.width) && (y > this.y) && (y < this.y + this.height);
	} else {
		return (x.x > this.x) && (x.x < this.x + this.width) && (x.y > this.y) && (x.y < this.y + this.height);
	}
}

//-------------------------------------------------------
Pixel.Rect.prototype.include = function(rect) {
	if(rect.x < this.x) this.x = rect.x;
	if(rect.y < this.y) this.y = rect.y;
	
	if(rect.x + rect.width	> this.width)	this.width	= rect.x + rect.width;
	if(rect.y + rect.height > this.height)	this.height = rect.y + rect.height;
}//-------------------------------------------------------
//-------------------------------------------------------
//Main Object
Pixel.Object = function() {
	this.canvas = null;
	
	this.name	= "";
	
	this.pos		= new Pixel.Point(0,0,0);
	this.offset		= new Pixel.Point(0,0,0);
	
	this.rotation	= 0;
	//this.scale		= new Pixel.Point(1,1,0);
	this.alignment	= Pixel.ALIGNMENT_TOP_LEFT;
	
	this.visible = true;
	
	this.parent   = null;
	this.children = [];
}

//-------------------------------------------------------
Pixel.Object.prototype.update = function() {
	for(var i=0; i<this.children.length; i++) {
		this.children[i].update();
	}
}

//-------------------------------------------------------
Pixel.Object.prototype.draw = function() {
	this.canvas.pushMatrix();
	this.canvas.translate(this.pos.x, this.pos.y, this.pos.z);
	//this.canvas.scale(this.scale.x, this.scale.y);
	
	
	for(var i=0; i<this.children.length; i++) {
		this.children[i].draw();
	}
	
	this.canvas.popMatrix();
}

//-------------------------------------------------------
Pixel.Object.prototype.addChild = function(childObject) {
	if(childObject.parent != null) {
		childObject.parent.removeChild(childObject);
	}
	
	childObject.parent = this;
	childObject.canvas = this.canvas;
	
	this.children.push(childObject);
}

//-------------------------------------------------------
Pixel.Object.prototype.removeChild = function(childObject) {
	var i = this.children.length;
	while(i--) {
		if(this.children[i] == childObject) {
			childObject.parent = null;
			childObject.canvas = null;
			this.children.splice(i, 1);
			return;
		}
	}
}

//-------------------------------------------------------
Pixel.Object.prototype.getWidth = function() {
	return this.getBounds.width;
}

//-------------------------------------------------------
Pixel.Object.prototype.getHeight = function() {
	return this.getBounds.height;
}

//-------------------------------------------------------
//Needs to be implmented
Pixel.Object.prototype.getBounds = function() {
	return new Pixel.Rect();
}

//-------------------------------------------------------
//Returns poPoint
Pixel.Object.prototype.calculateOffset = function() {
	switch(this.alignment) {
		case Pixel.ALIGNMENT_TOP_LEFT:
			this.offset.set(0, 0);
			break;
		
		case Pixel.ALIGNMENT_CENTER_LEFT:
			this.offset.set(0, -this.height/2);
			break;
		
		case Pixel.ALIGNMENT_BOTTOM_LEFT:
			this.offset.set(0, -this.height);
			break;
		
		case Pixel.ALIGNMENT_TOP_RIGHT:
			this.offset.set(-this.width, 0);
			break;
		
		case Pixel.ALIGNMENT_CENTER_RIGHT:
			this.offset.set(-this.width, -this.height/2);
			break;
		
		case Pixel.ALIGNMENT_BOTTOM_RIGHT:
			this.offset.set(-this.width, -this.height);
			break;
		
		case Pixel.ALIGNMENT_TOP_CENTER:
			this.offset.set(-this.width/2, 0);
			break;
		
		case Pixel.ALIGNMENT_BOTTOM_CENTER:
			this.offset.set(-this.width/2, -this.height);
			break;
		
		case Pixel.ALIGNMENT_CENTER_CENTER:
			this.offset.set(-this.width/2, -this.height/2);
			break;
	}
}

//-------------------------------------------------------
Pixel.Object.prototype.eventHandler = function(event) {
}


//-------------------------------------------------------
Pixel.Object.prototype.messageHandler = function(msg) {
}//-------------------------------------------------------
//-------------------------------------------------------
//Shape2D

Pixel.Shape2D = function() {
	Pixel.Object.call(this);
	
	this.width	= 0;
	this.height = 0;
	
	this.fillColor			= new Pixel.Color(255,255,255);
	this._fillEnabled		= false;
	
	this.strokeColor		= new Pixel.Color();
	this.strokeSize			= 1;
	this._strokeEnabled		= false;
}

Pixel.Shape2D.prototype = Object.create(Pixel.Object.prototype);


//-------------------------------------------------------
//Fill

//-------------------------------------------------------
Pixel.Shape2D.prototype.enableFill = function() {
	this._fillEnabled = true;
}

//-------------------------------------------------------
Pixel.Shape2D.prototype.disableStroke = function() {
	this._fillEnabled = false;
}

//-------------------------------------------------------
//Stroke

//-------------------------------------------------------
Pixel.Shape2D.prototype.setStrokeSize = function(size) {
	this.strokeSize = size;
}

//-------------------------------------------------------
Pixel.Shape2D.prototype.enableStroke = function() {
	this._strokeEnabled = true;
}

//-------------------------------------------------------
Pixel.Shape2D.prototype.disableStroke = function() {
	this._strokeEnabled = false;
}

//-------------------------------------------------------
Pixel.Shape2D.prototype.setStrokeSize = function(size) {
	this.strokeSize = size;
}

//-------------------------------------------------------
//Width

//-------------------------------------------------------
Pixel.Shape2D.prototype.setWidth = function(width) {
	this.width = width;
	return this;
}


//-------------------------------------------------------
Pixel.Shape2D.prototype.getWidth = function() {
	return this.width;
}

//-------------------------------------------------------
//Height


//-------------------------------------------------------
Pixel.Shape2D.prototype.setHeight = function() {
	this.height = height;
	return this;
}


//-------------------------------------------------------
Pixel.Shape2D.prototype.getHeight = function() {
	return this.height;
}

//-------------------------------------------------------
//Size/Bounds

//-------------------------------------------------------
Pixel.Shape2D.prototype.getSize = function() {
	var size = {
		width:this.width,
		heigiht:this.height
	}
	
	return size;
}

//-------------------------------------------------------
Pixel.Shape2D.prototype.getBounds = function() {
	return new Pixel.Rect(this.pos.x, this.pos.y, this.width, this.height);
}




//-------------------------------------------------------
//-------------------------------------------------------
//RectShape

Pixel.RectShape = function() {
	Pixel.Shape2D.call(this);
}

Pixel.RectShape.prototype = Object.create(Pixel.Shape2D.prototype);


//-------------------------------------------------------
Pixel.RectShape.prototype.draw = function() {
	if(this.canvas) {
		this.canvas.pushMatrix();
		this.canvas.translate(this.pos.x, this.pos.y, this.pos.z);
		this.canvas.rotate(this.rotation);
		
		this.canvas.setFillColor(this.fillColor);
		this.canvas.setStrokeSize(this.strokeSize);
		this.canvas.setStrokeColor(this.strokeColor);
		
		this.calculateOffset();
		this.canvas.drawRect(this.offset.x, this.offset.y, this.width, this.height);
		
		this.canvas.popMatrix();
	}
}


//-------------------------------------------------------
//-------------------------------------------------------
//OvalShape

Pixel.OvalShape = function() {
	Pixel.Shape2D.call(this);
}

Pixel.OvalShape.prototype = Object.create(Pixel.Shape2D.prototype);


//-------------------------------------------------------
Pixel.OvalShape.prototype.draw = function() {
	if(this.canvas) {		
		this.canvas.setFillColor(this.fillColor);
		this.canvas.setStrokeSize(this.strokeSize);
		this.canvas.setStrokeColor(this.strokeColor);
		
		this.calculateOffset();
		
		this.canvas.pushMatrix();
		this.canvas.translate(this.pos.x, this.pos.y, this.pos.z);
		this.canvas.rotate(this.rotation);
		
		if(this.width == this.height) {
			this.canvas.drawCircle(this.offset.x, this.offset.y, this.width);
		} else {	
			this.canvas.drawEllipse(this.offset.x, this.offset.y, this.width, this.height);
		}
		
		this.canvas.popMatrix();
	}
}//-------------------------------------------------------
//Pixel.Canvas.js
//Canvas Wrapper, implements Renderer functions and adds DOM specific stuff 
//+ generic vars shared between renderers (i.e. Cursor)

Pixel.Canvas = function(renderer) {
	Pixel.Object.call(this);

	//Create Canvas Element
	this.element = document.createElement('canvas');
	this.element.innerHTML = "Your browser does not support HTML5 Canvas.";
	this.pos = {
		x:0,
		y:0
	}
	
	//This is the main drawing point, 
	//so any children added will receive this as their canvas to draw to
	this.canvas = this;
	
	this.width	= 0;
	this.height = 0;
	
	//BG Color
	this.backgroundColor = null;
	
	//Cursor, useful for text layout
	cursorX = 0;
	cursorY = 0;
	
	//Pixel doubling for iOS 
	this.bPixelDoubling = window.devicePixelRatio >= 2;
	
	//Set Renderer
	this.setRenderer(this.element, renderer);
	
	//Init Vars
	//this.setPos(0,0);
	this.setSize(400,400);
};


Pixel.Canvas.prototype = Object.create(Pixel.Object.prototype);

//-------------------------------------------------------
//Size Info

//-------------------------------------------------------
Pixel.Canvas.prototype.setSize = function(width,height) {
	this.width	= width;
	this.height = height;
	
	this.element.style.width		= width/window.devicePixelRatio;
	this.element.style.height	= height/window.devicePixelRatio;
	
	this.element.setAttribute("width",	width);
	this.element.setAttribute("height",	height);
	
	this.renderer.setSize(width, height);
};


//-------------------------------------------------------
Pixel.Canvas.prototype.getWidth = function() {
	return this.width;
};


//-------------------------------------------------------
Pixel.Canvas.prototype.getHeight = function() {
	return this.height;
};


//-------------------------------------------------------
//Cursor
//-------------------------------------------------------
Pixel.Canvas.prototype.setCursor = function(x,y) {
	this.cursorX = x;
	this.cursorY = y;
};


//-------------------------------------------------------
//Drawing
//-------------------------------------------------------
Pixel.Canvas.prototype.setRenderer = function(element, rendererType) {
	if(rendererType == Pixel.RENDERER_WEBGL) {
		this.renderer = new Pixel.RendererWebGL(element);
		if(this.renderer.gl) {
			Pixel.log("WebGL renderer initialized");
			return;
		} else {
			delete this.renderer;
			Pixel.log("Failed to create WebGL Renderer");	
		}
	}
	
	//Default is 2D
	this.renderer = new Pixel.Renderer2D(element);
};

//-------------------------------------------------------
Pixel.Canvas.prototype.getRenderer = function() {
	return this.renderer.type;
};

//-------------------------------------------------------
Pixel.Canvas.prototype.setBackgroundColor = function(r,g,b,a) {
	this.renderer.setBackgroundColor(r,g,b,a);
};

//-------------------------------------------------------
Pixel.Canvas.prototype.clear =  function(x,y,width,height) { 
	this.renderer.clear(x,y,width,height); 
};


//-------------------------------------------------------
//COLOR	
//-------------------------------------------------------
Pixel.Canvas.prototype.setFillColor = function(r,g,b,a) {
	if(g != undefined) {
		this.renderer.setFillColor(r,g,b,a);
	} else {
		this.renderer.setFillColor(r.r, r.g, r.b, r.a);
	}
};


//-------------------------------------------------------
Pixel.Canvas.prototype.noFill = function() {
	this.renderer.noFill();
};


//-------------------------------------------------------
//Accepts a Pixel.Color object or r,g,b,a
Pixel.Canvas.prototype.setStrokeColor = function(r,g,b,a) {
	if(g != undefined) {
		this.renderer.setStrokeColor(r,g,b,a);
	} else {
		this.renderer.setStrokeColor(r.r, r.g, r.b, r.a);
	}
};

//-------------------------------------------------------
Pixel.Canvas.prototype.noStroke = function() {
	this.renderer.noStroke();
};


//-------------------------------------------------------
Pixel.Canvas.prototype.setStrokeSize = function(size) {
	if(size) {
		this.renderer.setStrokeSize(size);
	} else {
		this.renderer.noStroke();
	}
};

//-------------------------------------------------------
Pixel.Canvas.prototype.setLineCap = function(style) {
	this.renderer.setLineCap(style);
};



//-------------------------------------------------------
//IMAGE DRAWING
//-------------------------------------------------------
Pixel.Canvas.prototype.drawImage = function(pxImage, x, y, width, height) {
	//this.renderer.pushMatrix();
	//this.renderer.translate(x,y);
	//if(width && width	!= pxImage.image.width)		this.renderer.scale(width/pxImage.width, 1.0);
	//if(height&& height	!= pxImage.image.height)	this.renderer.scale(1.0, height/pxImage.height);
	this.renderer.drawImage(pxImage, x,y, width, height);
	//this.renderer.popMatrix();
};



//-------------------------------------------------------
//SHAPE DRAWING

//-------------------------------------------------------
Pixel.Canvas.prototype.beginShape = function(x,y) {
	this.renderer.beginShape(x,y);
};


//-------------------------------------------------------
Pixel.Canvas.prototype.addVertex = function(x,y, bEnd) {
	this.renderer.addVertex(x,y, bEnd);
};


//-------------------------------------------------------
Pixel.Canvas.prototype.endShape = function(x,y) {
	this.renderer.endShape(x,y);
};


//-------------------------------------------------------
Pixel.Canvas.prototype.drawLine = function(x1,y1,x2,y2) {
	this.renderer.drawLine(x1,y1,x2,y2);
};



//-------------------------------------------------------
Pixel.Canvas.prototype.dashedLine = function (fromX, fromY, toX, toY, pattern) {
	this.renderer.dashedLine(fromX, fromY, toX, toY, pattern);  
};


//-------------------------------------------------------
Pixel.Canvas.prototype.drawRect = function(x,y,width,height) {
	this.renderer.drawRect(x,y,width,height);
},


//-------------------------------------------------------
Pixel.Canvas.prototype.drawRoundedRect = function(x,y,width,height, borderRadius) {
	this.renderer.drawRoundedRect(x,y,width,height, borderRadius);
};


//-------------------------------------------------------
Pixel.Canvas.prototype.drawSquare = function(x,y,size) {
	this.renderer.drawSquare(x,y,size);
};


//-------------------------------------------------------
Pixel.Canvas.prototype.drawEllipse = function(x,y,width,height) {
	this.renderer.drawEllipse();
};



//-------------------------------------------------------
Pixel.Canvas.prototype.drawCircle = function(x,y,radius) {
	this.renderer.drawCircle(x,y,radius);
};


//-------------------------------------------------------
//TRANSFORMATIONS
//-------------------------------------------------------
Pixel.Canvas.prototype.pushMatrix = function() {
	this.renderer.pushMatrix();
};


//-------------------------------------------------------
Pixel.Canvas.prototype.popMatrix = function() {
	this.renderer.popMatrix();
};


//-------------------------------------------------------
Pixel.Canvas.prototype.translate = function(x,y) {
	this.renderer.translate(x,y);
};



//-------------------------------------------------------
Pixel.Canvas.prototype.scale = function(x,y) {
	this.renderer.scale(x,y);
};


//-------------------------------------------------------
Pixel.Canvas.prototype.rotate =  function(angle) {
	this.renderer.rotate(angle);
};


//-------------------------------------------------------
Pixel.Canvas.prototype.transform = function(m11, m12, m21, m22, dx, dy) {
	this.renderer.transform(m11, m12, m21, m22, dx, dy);
};

//-------------------------------------------------------
Pixel.Canvas.prototype.setTransform = function(m11, m12, m21, m22, dx, dy) {
	this.renderer.setTransform(m11, m12, m21, m22, dx, dy);
};



//-------------------------------------------------------
//TEXT

//-------------------------------------------------------	
Pixel.Canvas.prototype.setFont = function(font, size) {
	this.renderer.setFont(font,size);
};


//-------------------------------------------------------
Pixel.Canvas.prototype.setTextAlignment = function(alignment) {
	this.renderer.setTextAlignment(alignment);
};


//-------------------------------------------------------
Pixel.Canvas.prototype.setTextBaseline = function(baseline) {
	this.renderer.setTextBaseline(baseline);
};


//-------------------------------------------------------
Pixel.Canvas.prototype.getTextWidth = function(string) {
	return this.renderer.getTextWidth(string);
};


//-------------------------------------------------------
Pixel.Canvas.prototype.drawText = function(string, x, y) {
	if(x != undefined) {
		this.renderer.drawText(string, x, y);
	} else {
		this.renderer.drawText(string, this.cursorX, this.cursorY);
	}
};


//-------------------------------------------------------
Pixel.Canvas.prototype.drawTextfield = function(textfield) {
	this.renderer.drawTextfield(textfield);
};//-------------------------------------------------------
//Pixel.App.js


Pixel.App = function(renderer) {
	Pixel.Canvas.call(this, renderer);
	
	//Status
	this.bSetup		= false;
	this.bRunning	= true;
	
	//FPS
/*
	this.fps			= 60;
	this.curFPS			= 0;
	this.bShowFPS		= false;
	this.curFps			= 0;
	this.nFPSSamples	= 50;
	this.fpsFont		= new Pixel.Font("Verdana", 10, Pixel.TEXT_ALIGN_LEFT);
*/
	
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
/*
	if(Pixel.isTouchDevice()) {
		this.canvas.addEventListener('touchstart',		function(e) { self.touchStartListener.call(self, e) },	false);
		this.canvas.addEventListener("touchmove",		function(e) { self.touchMovedListener.call(self, e) },	false);
		this.canvas.addEventListener("touchend",		function(e) { self.touchEndListener.call(self, e) },	false);
	} else {	
		this.canvas.addEventListener("mousedown",		function(e) { self.mouseDownListener.call(self, e) },	false);
		this.canvas.addEventListener("mousemove",		function(e) { self.mouseMovedListener.call(self, e) },	false);
		this.canvas.addEventListener("mouseup",			function(e) { self.mouseUpListener.call(self, e) },		false);
	}
*/

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
Pixel.App.prototype.setup = function() {
};


//-------------------------------------------------------
Pixel.App.prototype.run = function() {
	if(this.bRunning) {
		//Run App Setup if uninitalised
		if(this.setup != undefined && this.bSetup == false) {
			this.setup();
			this.bSetup = true;
		}
	
		
		this.update();
		
		if(this.bClearBackground) this.clear(0,0, this.getWidth(), this.getHeight());
		this.draw();
		
		if(this.bShowFPS) {
			this.updateFPS();
			this.drawFPS();
		}
		
		window.requestAnimFrame(this.run.bind(this));
	}
};


//-------------------------------------------------------
//FPS
//-------------------------------------------------------
/*
Pixel.App.prototype.setFPS = function(fps) {
	this.fps = fps;
};


//-------------------------------------------------------
Pixel.App.prototype.getFPS = function() {
	return this.fps;
};


//-------------------------------------------------------
Pixel.App.prototype.showFPS = function() {
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
};


//-------------------------------------------------------
Pixel.App.prototype.drawFPS = function() {
	this.setFont(this.fpsFont);
	
	this.setFillColor(0,0,0);
	this.drawText("FPS: " + this.curFPS.toFixed(2), 20, 20);
	this.setFillColor(255,255,255);
	this.drawText("FPS: " + this.curFPS.toFixed(2), 22, 22);
};
*/


//-------------------------------------------------------
//Time
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


//-------------------------------------------------------
//Mouse Events
//Mouse Events (touch start, touchemoved, touchend)
//Mouse Events have an x and y position

//-------------------------------------------------------
Pixel.App.prototype.mouseDownListener = function(e) {
	this.bMouseDown = true;
	
	//Get Position of Event
	var position = Pixel.getRelativeMouseCoords(e, this.canvas);
		
	if(this.bIsMobileApp) {
		this.dispatch("touchstart", {id:0, x:position.x, y: position.y});
	} else {
		this.dispatch("mousedown", position);
	}
};


//-------------------------------------------------------
Pixel.App.prototype.mouseMovedListener = function(e) {
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
};


//-------------------------------------------------------
Pixel.App.prototype.mouseUpListener = function(e) {
	this.bMouseDown = false;
	
	//Get Position of Event
	var position = Pixel.getRelativeMouseCoords(e, this.canvas);
		
	if(this.bIsMobileApp) {
		this.dispatch("touchend", {id:0, x:position.x, y: position.y});
	} else {
		this.dispatch("mouseup", position);
	}
};


//-------------------------------------------------------
Pixel.App.prototype.mouseDraggedListener = function(e) {
	
};
*/ //-------------------------------------------------------
//Pixel.Renderer2D.js
//2D Rendering

Pixel.Renderer2D = function(canvas) {
	this.type 		= Pixel.RENDERER_2D;
	this.ctx		= canvas.getContext('2d');
	this.bFill		= true;
	this.bStroke	= false;
	this.bgColor	= new Pixel.Color();
	
	this.shapePos = {x:0,y:0};
};

//-------------------------------------------------------
Pixel.Renderer2D.prototype.setBackgroundColor = function(r,g,b,a) {
	this.bgColor.set(r,g,b,a);
};

//-------------------------------------------------------
Pixel.Renderer2D.prototype.clear = function(x,y,width,height) {
	//Store cur fill
	var curFill		= this.ctx.fillStyle;
	
	//Draw rect over BG for 2D Canvas
	this.ctx.fillStyle =  this.getColorAsString(this.bgColor.r, this.bgColor.g, this.bgColor.b, this.bgColor.a);
	this.ctx.fillRect(x,y,width,height);
	
	//Reset cur fill
	this.ctx.fillStyle = curFill;
	
	//this.ctx.clearRect(x,y,width,height);
};

//-------------------------------------------------------
Pixel.Renderer2D.prototype.setSize = function(width, height) {};


//-------------------------------------------------------
//Specific to 2D Canvas, sets color in correct format
Pixel.Renderer2D.prototype.getColorAsString = function(r,g,b,a) {
	r = Math.round(r);
	g = Math.round(g);
	b = Math.round(b);

	//Set using color Object if only first var is combined (ghetto overloading?)
	if(g==undefined) {
		return "rgba(" + r.r + "," + r.g + "," + r.b + "," + r.a + ")";
	} 
		
	//RGB
	if(a==undefined) {
		return "rgb(" + r + "," + g + "," + b + ")";
	} 
	
	//RGBA
	return "rgba(" + r + "," + g + "," + b + "," + a + ")";
};


//-------------------------------------------------------
Pixel.Renderer2D.prototype.setFillColor = function(r,g,b,a) {
	this.ctx.fillStyle = this.getColorAsString(r,g,b,a);
};

//-------------------------------------------------------
Pixel.Renderer2D.prototype.noFill = function() {
	this.bFill = false;
};

//-------------------------------------------------------
Pixel.Renderer2D.prototype.setStrokeColor = function(r,g,b,a) {
	this.ctx.strokeStyle = this.getColorAsString(r,g,b,a);
	this.bStroke = true;
};


//-------------------------------------------------------
Pixel.Renderer2D.prototype.noStroke = function() {
	this.bStroke = false;
};


//-------------------------------------------------------
Pixel.Renderer2D.prototype.setStrokeSize = function(size) {
	this.ctx.lineWidth = size;
};

//-------------------------------------------------------
Pixel.Renderer2D.prototype.setLineCap = function(style) {
	this.ctx.lineCap = style;
};
	
//-------------------------------------------------------
Pixel.Renderer2D.prototype.shadow = function(size, xOffset, yOffset) {
	this.ctx.shadowBlur = size;
	this.ctx.shadowOffsetX = xOffset;
	this.ctx.shadowOffsetY = yOffset;
};


//-------------------------------------------------------
Pixel.Renderer2D.prototype.setShadowColor = function(r,g,b,a) {
	this.ctx.shadowColor	= this.getColorAsString(r,g,b,a)
};


//-------------------------------------------------------
Pixel.Renderer2D.prototype.noShadow = function() {
	this.ctx.shadowBlur		= 0;
	this.ctx.shadowOffsetX	= 0;
	this.ctx.shadowOffsetY	= 0;
};


//-------------------------------------------------------
//IMAGE DRAWING
Pixel.Renderer2D.prototype.drawImage = function(pxImage, x, y, w, h) {
	x = x || pxImage.getPos().x;
	y = y || pxImage.getPos().y;
	w = w || pxImage.image.getWidth();
	h = h || pxImage.image.getHeight();
	
	if(pxImage.isLoaded()) {
		this.ctx.drawImage(pxImage.image, x, y, w, h);
	} else {
		Pixel.log("Image not yet loaded!");
	}
};


//-------------------------------------------------------
//SHAPE DRAWING

//-------------------------------------------------------
Pixel.Renderer2D.prototype.beginShape = function(x,y) {
	this.ctx.beginPath();
	this.ctx.moveTo(x,y);
	
	this.shapePos = {"x":x,"y":y};
};


//-------------------------------------------------------
Pixel.Renderer2D.prototype.addVertex = function(x,y, bEnd) {
	this.ctx.lineTo(x,y);
	
	if(bEnd != undefined) {
		this.endShape();
	}
	
	this.shapePos = {"x":x,"y":y};
};


//-------------------------------------------------------
Pixel.Renderer2D.prototype.curveVertex = function(x, y) {
	var x0,y0,x1,x2, y1, y2;
	
	x0 = this.shapePos.x;
	y0 = this.shapePos.y;
	
	x2 = x;  
	y2 = y;
	
	if((x0 > x && y0 > y) || (x0 < x && y0 < y)) {
		x1 = x2;
		y1 = y0;
	} else {
		x1 = x0;
		y1 = y2;
	}
	
	radius = (Math.abs(x0 - x2) + Math.abs(y0 - y2))/2;
	this.ctx.arcTo(x1, y1, x2, y2, radius);
	
	this.shapePos = {"x":x,"y":y};
};


//-------------------------------------------------------
Pixel.Renderer2D.prototype.endShape = function(x,y) {
	this.ctx.closePath();
	this.shapePos = {"x":x,"y":y};
	
	this.ctx.fill();
};


//-------------------------------------------------------
Pixel.Renderer2D.prototype.drawLine = function(x1,y1,x2,y2) {
	this.ctx.beginPath();
	this.ctx.moveTo(x1,y1);
	this.ctx.lineTo(x2,y2);
	this.ctx.stroke();
};


//-------------------------------------------------------
//Dashed line code from http://davidowens.wordpress.com/2010/09/07/html-5-canvas-and-dashed-lines/
Pixel.Renderer2D.prototype.dashedLine = function (fromX, fromY, toX, toY, pattern) {
// Our growth rate for our line can be one of the following:
  //   (+,+), (+,-), (-,+), (-,-)
  // Because of this, our algorithm needs to understand if the x-coord and
  // y-coord should be getting smaller or larger and properly cap the values
  // based on (x,y).
  var lt = function (a, b) { return a <= b; };
  var gt = function (a, b) { return a >= b; };
  var capmin = function (a, b) { return Math.min(a, b); };
  var capmax = function (a, b) { return Math.max(a, b); };

  var checkX = { thereYet: gt, cap: capmin };
  var checkY = { thereYet: gt, cap: capmin };

  if (fromY - toY > 0) {
    checkY.thereYet = lt;
    checkY.cap = capmax;
  }
  if (fromX - toX > 0) {
    checkX.thereYet = lt;
    checkX.cap = capmax;
  }

  this.ctx.moveTo(fromX, fromY);
  this.ctx.beginPath();
  var offsetX = fromX;
  var offsetY = fromY;
  var idx = 0, dash = true;
  while (!(checkX.thereYet(offsetX, toX) && checkY.thereYet(offsetY, toY))) {
    var ang = Math.atan2(toY - fromY, toX - fromX);
    var len = pattern[idx];

    offsetX = checkX.cap(toX, offsetX + (Math.cos(ang) * len));
    offsetY = checkY.cap(toY, offsetY + (Math.sin(ang) * len));

    if (dash) this.ctx.lineTo(offsetX, offsetY);
    else this.ctx.moveTo(offsetX, offsetY);
    
    this.ctx.stroke();

    idx = (idx + 1) % pattern.length;
    dash = !dash;
  }
};


//-------------------------------------------------------
Pixel.Renderer2D.prototype.drawRect = function(x,y,width,height) {
	if(y != undefined) {
		if(this.bFill) this.ctx.fillRect(x,y,width,height);
		if(this.bStroke) this.ctx.strokeRect(x,y,width,height);
	} else {
		var r = x;
		if(this.bFill) this.ctx.fillRect(r.x,r.y, r.width, r.height);
		if(this.bStroke) this.ctx.strokeRect(r.x, r.y,r.width, r.height);
	}
};


//-------------------------------------------------------
Pixel.Renderer2D.prototype.drawSquare = function(x,y,size) {
	this.drawRect(x,y,size,size);
};


//-------------------------------------------------------
Pixel.Renderer2D.prototype.drawRoundedRect = function(x,y,width,height, radius) {
	if(typeof(radius) === 'number') {
		radius = {
			"tl":radius,
			"tr":radius,
			"br":radius,
			"bl":radius
		}
	}
	
	this.beginShape();
	
	//Top Right
	this.addVertex(x + width-radius.tr, y);
	this.curveVertex(x + width, y + radius.tr);
	
	//Bottom Right
	this.addVertex(x + width, y + height - radius.br);
	this.curveVertex(x + width - radius.br, y + height);
	
	//Bottom Left
	this.addVertex(x + radius.bl, y + height);
	this.curveVertex(x, y + height - radius.bl);
	
	//Top Left
	this.addVertex(x, y + radius.tl);
	this.curveVertex(x + radius.tl, y);
	
	this.endShape();
	
	if(this.bFill)	this.ctx.fill();
	if(this.bStroke) this.ctx.stroke();
};


//-------------------------------------------------------
//From http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
Pixel.Renderer2D.prototype.drawEllipse = function(x,y,width,height) {
	var kappa = .5522848;
      ox = (width / 2) * kappa, 	// control point offset horizontal
      oy = (height / 2) * kappa, 	// control point offset vertical
      xe = x + width,           	// x-end
      ye = y + height,          	// y-end
      xm = x + width / 2,       	// x-middle
      ym = y + height / 2;      	// y-middle

  this.ctx.beginPath();
  this.ctx.moveTo(x, ym);
  this.ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  this.ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  this.ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  this.ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  this.ctx.closePath();
  
  if(this.bStroke)	this.ctx.stroke();
  if(this.bFill)	this.ctx.fill();
};


//-------------------------------------------------------
Pixel.Renderer2D.prototype.drawCircle = function(x,y,radius) {
	this.ctx.beginPath();
	this.ctx.arc(x, y, radius, 0, Math.PI*2,false);
	
	if(this.bStroke) this.ctx.stroke();
  	if(this.bFill) this.ctx.fill();
};


//-------------------------------------------------------
//TRANSFORMATIONS
//-------------------------------------------------------
Pixel.Renderer2D.prototype.pushMatrix = function() {
	this.ctx.save();
};


//-------------------------------------------------------
Pixel.Renderer2D.prototype.popMatrix = function() {
	this.ctx.restore();
};


//-------------------------------------------------------
Pixel.Renderer2D.prototype.translate = function(x,y) {
	this.ctx.translate(x,y);
};


//-------------------------------------------------------
Pixel.Renderer2D.prototype.scale = function(x,y) {
	this.ctx.scale(x,y);
};


//-------------------------------------------------------
Pixel.Renderer2D.prototype.rotate = function(angle) {
	this.ctx.rotate(Pixel.Math.degreesToRadians(angle));
};


//-------------------------------------------------------
Pixel.Renderer2D.prototype.transform = function(m11, m12, m21, m22, dx, dy) {
	this.ctx.transform(m11, m12, m21, m22, dx, dy);
};


//-------------------------------------------------------
Pixel.Renderer2D.prototype.setTransform = function(m11, m12, m21, m22, dx, dy) {
	this.ctx.setTransform(m11, m12, m21, m22, dx, dy);
};


//-------------------------------------------------------
//FONTS/TEXT
//-------------------------------------------------------

//-------------------------------------------------------
Pixel.Renderer2D.prototype.setFont = function(font, size) {
	if(size == undefined) {
		this.setFont(font.font, font.size);
	} else {
		this.ctx.font = size + "pt " + font;
	}
	
	this.setTextAlignment(font.alignment);
	this.setTextBaseline(font.baseline);
};


//-------------------------------------------------------
Pixel.Renderer2D.prototype.setTextAlignment = function(alignment) {
	this.ctx.textAlign = alignment;
};


//-------------------------------------------------------
Pixel.Renderer2D.prototype.setTextBaseline = function(baseline) {
	this.ctx.textBaseline = baseline;
};


//-------------------------------------------------------
Pixel.Renderer2D.prototype.getTextWidth = function(string) {
	return this.ctx.measureText(string).width;
};


//-------------------------------------------------------
Pixel.Renderer2D.prototype.drawText = function(string, x, y) {
	if(x != undefined) {
		this.ctx.fillText(string, x, y);
	} else {
		this.ctx.fillText(string, this.cursorX, this.cursorY);
	}
};


//-------------------------------------------------------
Pixel.Renderer2D.prototype.drawTextfield = function(tf) {
	this.setFont(tf.font);
	this.setFillColor(tf.color);
	this.drawText(tf.text, tf.pos.x, tf.pos.y);
};//-------------------------------------------------------
//Pixel.Color.js

//Color class
Pixel.Color = function(r,g,b,a) {
	this.r = r || 0.0;
	this.g = g || 0.0;
	this.b = b || 0.0;
	this.a = a || 1.0;
	
	this.h = 0.0;
	this.s = 0.0;
	this.l = 0.0;
	this.v = 0.0;
}


//-------------------------------------------------------
Pixel.Color.prototype.init = function(r,g,b,a) {
	this.r = r || 0.0;
	this.g = g || 0.0;
	this.b = b || 0.0;
	this.a = a || 1.0;
};
	

//-------------------------------------------------------
Pixel.Color.prototype.set = function(r,g,b,a) {
	if(r != undefined) this.r = r;
	if(g != undefined) this.g = g;
	if(b != undefined) this.b = b;
	
	this.a = a != undefined ? a : 1;
};
	
	
//-------------------------------------------------------
Pixel.Color.prototype.normalizeRGB = function() {
	this.r = Pixel.Math.map(0.0, 255.0, this.r, 0.0, 1.0);
	this.g = Pixel.Math.map(0.0, 255.0, this.g, 0.0, 1.0);
	this.b = Pixel.Math.map(0.0, 255.0, this.b, 0.0, 1.0);
};
	
	
//-------------------------------------------------------
Pixel.Color.prototype.setHSL = function(h,s,l,a) {
	if(h != undefined) this.h = h;
	if(s != undefined) this.s = g;
	if(l != undefined) this.l = b;
	
	this.a = a != undefined ? a : 1;
};
	
	
//-------------------------------------------------------
Pixel.Color.prototype.setHSV = function(h,s,v,a) {
	if(h != undefined) this.h = h;
	if(s != undefined) this.s = g;
	if(v != undefined) this.l = b;
	if(a != undefined) this.a = a;
};
	
	
//-------------------------------------------------------
Pixel.Color.prototype.toHSL = function() {
	var hsl = Pixel.rgbToHSL(this.r, this.g, this.b);
	this.setHSL(hsl.h, hsl.s, hsl.l);
	return hsl;
};
	
	
//-------------------------------------------------------
Pixel.Color.prototype.toHSV = function() {
	var hsv = Pixel.rgbToHSV(this.r, this.g, this.b);
	this.setHSV(hsv.h, hsv.s, hsv.v);
	return hsv;
}


//-------------------------------------------------------
//Color Utils

//-------------------------------------------------------
//From http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
Pixel.rgbToHsl = function(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {"h":h, "s":s, "l":l};
};



//-------------------------------------------------------
//From http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
Pixel.hslToRgb = function(h, s, l){
	h = Pixel.map(h, 0, 360, 0, 1);
	s = Pixel.map(s, 0, 255, 0, 1);
	l = Pixel.map(l, 0, 255, 0, 1);
	
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return {"r":r * 255, "g": g * 255, "b": b * 255};
};



//-------------------------------------------------------
//From http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
Pixel.rgbToHsv = function(r, g, b){
    r = r/255, g = g/255, b = b/255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max == 0 ? 0 : d / max;

    if(max == min){
        h = 0; // achromatic
    }else{
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {"h":h, "s":s, "v":v};
};



//-------------------------------------------------------
//From http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
Pixel.hsvToRgb = function(h, s, v){
	h = Pixel.map(h, 0, 360, 0, 1);
	s = Pixel.map(s, 0, 255, 0, 1);
	v = Pixel.map(v, 0, 255, 0, 1);
	
    var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch(i % 6){
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return {"r": r * 255, "g": g * 255, "b": b * 255};
};

//-------------------------------------------------------
//Convert to RGB 0.0 to 1.0 
Pixel.normalizeRGB = function(color) {
	var r = Pixel.Math.map(0.0, 255.0, color.r, 0.0, 1.0);
	var g = Pixel.Math.map(0.0, 255.0, color.g, 0.0, 1.0);
	var b = Pixel.Math.map(0.0, 255.0, color.b, 0.0, 1.0);
	
	return new Pixel.Color(r,g,b, color.a);
}