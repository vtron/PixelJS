//-------------------------------------------------------
//Pixel.js
//Main Class, creates library

//-------------------------------------------------------
//Define Bind for browsers that don't have it
//See https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {

    if (typeof this !== "function") // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be fBound is not callable");

    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP ? this : oThis || window, aArgs.concat(Array.prototype.slice.call(arguments)));    
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

//-------------------------------------------------------
//Basic class system by John Resig
//See http://ejohn.org/blog/simple-javascript-inheritance/
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
  // The base Class implementation (does nothing)
  this.Class = function(){};
  
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
    
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
    
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" && 
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
            
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
            
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
            
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
    
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
    
    // Populate our constructed prototype object
    Class.prototype = prototype;
    
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;
    
    return Class;
  };
})();



//-------------------------------------------------------
//Create Main Class Object, checking for namespace
if(typeof Pixel == 'undefined') {
	Pixel = {
		'version': '0.5'
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
Pixel.RENDER_MODE_2D		= 0;
Pixel.RENDER_MODE_WEBGL		= 1;

//Line Cap
Pixel.LINE_CAP_NORMAL	= "butt";
Pixel.LINE_CAP_ROUND	= "round";
Pixel.LINE_CAP_SQUARE	= "square";

//Font Alignment
Pixel.TEXT_ALIGN_LEFT	= "left";
Pixel.TEXT_ALIGN_CENTER = "center";
Pixel.TEXT_ALIGN_RIGHT	= "right";

//Font Baseline
Pixel.TEXT_BASELINE_TOP			= "top";
Pixel.TEXT_BASELINE_HANGING		= "hanging";
Pixel.TEXT_BASELINE_MIDDLE		= "middle";
Pixel.TEXT_BASELINE_BOTTOM		= "bottom";

//Object SHape
Pixel.OBJECT_SHAPE_RECT		= 0;
Pixel.OBJECT_SHAPE_CIRCLE	= 1;

//Object Origins
Pixel.ORIGIN_TOP_LEFT		= 0;
Pixel.ORIGIN_CENTER_LEFT	= 1;
Pixel.ORIGIN_BOTTOM_LEFT	= 2;

Pixel.ORIGIN_TOP_RIGHT		= 3;
Pixel.ORIGIN_CENTER_RIGHT	= 4;
Pixel.ORIGIN_BOTTOM_RIGHT	= 5;

Pixel.ORIGIN_TOP_CENTER		= 6;
Pixel.ORIGIN_BOTTOM_CENTER	= 7;
Pixel.ORIGIN_CENTER			= 8;

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
//Pixel.Math.js
//Various classes and functions that make math easier

Pixel.Rectangle = Class.extend({
	init: function(x,y,width,height) {
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
		
		this.set(x,y,width,height);
	},
	
	
	//-------------------------------------------------------
	initialize: function(x,y,width,height) { 
		this.set(x,y,width,height);
	},
	
	
	//-------------------------------------------------------
	set: function(x,y,width,height) {
		this.setPos(x,y);
		this.setSize(width,height);
	},
	
	
	//-------------------------------------------------------
	setPos: function(x,y) {
		if(Pixel.isSet(x)) this.x = x;
		if(Pixel.isSet(y)) this.y = y;
	},
	
	
	//-------------------------------------------------------
	setSize: function(width,height) {
		this.width	= width;
		this.height = height;
	},
	
	
	//-------------------------------------------------------
	getPos: function() {
		return {
			x:this.x,
			y:this.y
		};
	},
	
	
	//-------------------------------------------------------
	getSize: function() {
		return {
			width:this.width,
			height:this.height
		}
	},
	
	
	//-------------------------------------------------------
	isInside: function(x,y) {
		return (x > this.x) && (x < this.x + this.width) && (y > this.y) && (y < this.y + this.height);
	}
});


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
*///-------------------------------------------------------
//Pixel.Renderer2D.js
//2D Rendering

Pixel.Renderer2D = Class.extend({ 
	init:function(canvas) {
		this.ctx		= canvas.getContext('2d');
		this.bFill		= true;
		this.bStroke	= false;
		this.bgColor	= new Pixel.Color();
		
		this.shapePos = {x:0,y:0};
	},
	
	//-------------------------------------------------------
	setBackgroundColor: function(r,g,b,a) {
		this.bgColor.set(r,g,b,a);
	},
	
	//-------------------------------------------------------
	clear: function(x,y,width,height) {
		//Store cur fill
		var curFill		= this.ctx.fillStyle;
		
		//Draw rect over BG for 2D Canvas
		this.ctx.fillStyle =  this.getColorAsString(this.bgColor.r, this.bgColor.g, this.bgColor.b, this.bgColor.a);
		this.ctx.fillRect(x,y,width,height);
		
		//Reset cur fill
		this.ctx.fillStyle = curFill;
		
		//this.ctx.clearRect(x,y,width,height);
	},
	
	//-------------------------------------------------------
	setSize: function(width, height) {},
	
	
	//-------------------------------------------------------
	//Specific to 2D Canvas, sets color in correct format
	getColorAsString: function(r,g,b,a) {
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
	},
	
	
	//-------------------------------------------------------
	setFillColor: function(r,g,b,a) {
		this.ctx.fillStyle = this.getColorAsString(r,g,b,a);
	},
	
	//-------------------------------------------------------
	noFill: function() {
		this.bFill = false;
	},
	
	
	//-------------------------------------------------------
	setStrokeColor: function(r,g,b,a) {
		this.ctx.strokeStyle = this.getColorAsString(r,g,b,a);
		this.bStroke = true;
	},
	
	
	//-------------------------------------------------------
	noStroke: function() {
		this.bStroke = false;
	},
	

	//-------------------------------------------------------
	setStrokeSize: function(size) {
		this.ctx.lineWidth = size;
	},
	
	//-------------------------------------------------------
	setLineCap: function(style) {
		this.ctx.lineCap = style;
	},
		
	//-------------------------------------------------------
	shadow: function(size, xOffset, yOffset) {
		this.ctx.shadowBlur = size;
		this.ctx.shadowOffsetX = xOffset;
		this.ctx.shadowOffsetY = yOffset;
	},
	
	
	//-------------------------------------------------------
	setShadowColor: function(r,g,b,a) {
		this.ctx.shadowColor	= this.getColorAsString(r,g,b,a)
	},
	
	
	//-------------------------------------------------------
	noShadow: function() {
		this.ctx.shadowBlur		= 0;
		this.ctx.shadowOffsetX	= 0;
		this.ctx.shadowOffsetY	= 0;
	},
	
	
	//-------------------------------------------------------
	//IMAGE DRAWING
	drawImage: function(pxImage, x, y, w, h) {
		x = x || pxImage.getPos().x;
		y = y || pxImage.getPos().y;
		w = w || pxImage.image.getWidth();
		h = h || pxImage.image.getHeight();
		
		if(pxImage.isLoaded()) {
			this.ctx.drawImage(pxImage.image, x, y, w, h);
		} else {
			Pixel.log("Image not yet loaded!");
		}
	},
	
	
	//-------------------------------------------------------
	//SHAPE DRAWING
	
	//-------------------------------------------------------
	beginShape: function(x,y) {
		this.ctx.beginPath();
		this.ctx.moveTo(x,y);
		
		this.shapePos = {"x":x,"y":y};
	},
	
	
	//-------------------------------------------------------
	addVertex: function(x,y, bEnd) {
		this.ctx.lineTo(x,y);
		
		if(bEnd != undefined) {
			this.endShape();
		}
		
		this.shapePos = {"x":x,"y":y};
	},
	
	
	//-------------------------------------------------------
	curveVertex: function(x, y) {
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
	},
	
	
	//-------------------------------------------------------
	endShape: function(x,y) {
		this.ctx.closePath();
		this.shapePos = {"x":x,"y":y};
		
		this.ctx.fill();
	},
	
	
	//-------------------------------------------------------
	drawLine: function(x1,y1,x2,y2) {
		this.ctx.beginPath();
		this.ctx.moveTo(x1,y1);
		this.ctx.lineTo(x2,y2);
		this.ctx.stroke();
	},
	
	
	//-------------------------------------------------------
	//Dashed line code from http://davidowens.wordpress.com/2010/09/07/html-5-canvas-and-dashed-lines/
	dashedLine: function (fromX, fromY, toX, toY, pattern) {
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
	},
	
	
	//-------------------------------------------------------
	drawRect: function(x,y,width,height) {
		if(y != undefined) {
			if(this.bFill) this.ctx.fillRect(x,y,width,height);
			if(this.bStroke) this.ctx.strokeRect(x,y,width,height);
		} else {
			var r = x;
			if(this.bFill) this.ctx.fillRect(r.x,r.y, r.width, r.height);
			if(this.bStroke) this.ctx.strokeRect(r.x, r.y,r.width, r.height);
		}
	},
	
	
	//-------------------------------------------------------
	drawSquare: function(x,y,size) {
		this.drawRect(x,y,size,size);
	},
	
	
	//-------------------------------------------------------
	drawRoundedRect: function(x,y,width,height, radius) {
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
	},
	
	
	//-------------------------------------------------------
	//From http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
	drawEllipse: function(x,y,width,height) {
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
		this.ctx.rotate(Pixel.Math.degreesToRadians(angle));
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
	//FONTS/TEXT
	//-------------------------------------------------------
	
	//-------------------------------------------------------
	setFont: function(font, size) {
		if(size == undefined) {
			this.setFont(font.font, font.size);
		} else {
			this.ctx.font = size + "pt " + font;
		}
		
		this.setTextAlignment(font.alignment);
		this.setTextBaseline(font.baseline);
	},
	
	
	//-------------------------------------------------------
	setTextAlignment: function(alignment) {
		this.ctx.textAlign = alignment;
	},
	
	
	//-------------------------------------------------------
	setTextBaseline: function(baseline) {
		this.ctx.textBaseline = baseline;
	},
	
	
	//-------------------------------------------------------
	getTextWidth: function(string) {
		return this.ctx.measureText(string).width;
	},
	
	
	//-------------------------------------------------------
	drawText: function(string, x, y) {
		if(x != undefined) {
			this.ctx.fillText(string, x, y);
		} else {
			this.ctx.fillText(string, this.cursorX, this.cursorY);
		}
	},
	
	
	//-------------------------------------------------------
	drawTextfield: function(tf) {
		this.setFont(tf.font);
		this.setFillColor(tf.color);
		this.drawText(tf.text, tf.pos.x, tf.pos.y);
	}
});//-------------------------------------------------------
//Pixel.RendererWebGL.js
//WebGL Rendering
//Most code based on learningwebgl.com

//Matrix math uses the gl-matrix lib by Toji https://github.com/toji/gl-matrix/

Pixel.RendererWebGL = Class.extend({
	init: function(canvas) {
		this.bgColor		= new Pixel.Color();
		this.fillColor		= new Pixel.Color();
		this.strokeColor	= new Pixel.Color();
		
		this.ellipseResolution = 360;
	
		//Get GL Ref
		this.gl = this.initGL(canvas);
		
		//Create buffers
		this.initBuffers();
        
        //Compile default shader
        this.basicShader	= Pixel.getShaderProgram(this.gl, "pixelBasic-shader", {attributes:["aVertexPosition","aVertexColor"]});
       	this.textureShader	= Pixel.getShaderProgram(this.gl, "pixelTexture-shader", {attributes:["aVertexPosition","aTextureCoord"], uniforms:["uSampler"]});
        this.shaderProgram  = null;
        
        //Create Matrices
    	this.pMatrix		= mat4.create();
        this.mvMatrixStack	= [];
        this.mvMatrix		= mat4.create();
        
        this.gl.disable(this.gl.DEPTH_TEST);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
		this.gl.enable(this.gl.BLEND);
	},

	
	//-------------------------------------------------------
	initGL: function(canvas) {
		//See if we can get a WebGL ref
		try {
            var gl = canvas.getContext("experimental-webgl", {alpha:false});
        	return gl;
        } catch (e) {
        	Pixel.log("Could not initialise WebGL");
        	return null;
        }
	},
	
	
	//-------------------------------------------------------
	//Buffers
	
	//-------------------------------------------------------
	initBuffers: function() {
		//Buffers for primitive types
		this.createEllipseBuffers(this.ellipseResolution);
		this.createRectBuffers();
		this.createTextureBuffers();
	},
	
	//-------------------------------------------------------
	createRectBuffers: function() {
		//Vertices
		var vertices = [
			0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0
        ];
        
		this.rectBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.rectBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.DYNAMIC_DRAW);
		
		//Colors
        var colorVertices = [];
		for(var i=0;i<16; i++) colorVertices.push(1.0);
		
		this.rectColorBuffer = this.gl.createBuffer(); 
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.rectColorBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(colorVertices), this.gl.DYNAMIC_DRAW);
	},
	
	
	//-------------------------------------------------------
	createEllipseBuffers: function(resolution) {
		//Check for previous buffer and clear if necessary
		if(this.ellipseBuffer) this.gl.deleteBuffer(this.ellipseBuffer);
		
		var vertices = [];
		for(var i=0; i<resolution * 3; i++) vertices.push(0.0);
		
		this.ellipseBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.ellipseBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.DYNAMIC_DRAW);
		
		var colorVertices = [];
		for(var i=0; i<resolution * 4; i++) colorVertices.push(0.0);
		
		this.ellipseColorBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.ellipseColorBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(colorVertices), this.gl.DYNAMIC_DRAW);
	},
	
	//-------------------------------------------------------
	createTextureBuffers: function() {
		var texCoords = [];
		for(var i=0; i<2*4; i++) texCoords.push(0.0);
		
		//Create VBO for texCoords
		this.texCoordBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(texCoords), this.gl.DYNAMIC_DRAW);
	},
	
	
	//-------------------------------------------------------
	//Textures
	//Non-pow2 stuff from http://webglfactory.blogspot.com/2011/05/adding-textures.html
	loadTexture: function(img) {
		//Create texture
		var tex = this.gl.createTexture();
		
		//Load pixels from img
		this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
    	this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
    	this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    	this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, img);
    	
    	if(Pixel.Math.isPowerOfTwo(img.width) && Pixel.Math.isPowerOfTwo(img.height)) {
    		 this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
             this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    	} else {
    		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    	}
    	
    	//this.gl.generateMipmap(this.gl.TEXTURE_2D);
    	
    	//Clean up
    	this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    	
		return tex;
	},
	
	
	//-------------------------------------------------------
	//Shaders
	setShader: function(program) {
		if(this.shaderProgram != program) {
			this.shaderProgram = program;
			this.gl.useProgram(program);
		}
	},
	
	//-------------------------------------------------------
	//GL Utils
	
	//-------------------------------------------------------
	setMatrixUniforms: function() {
        this.gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform,		false, this.pMatrix);
        this.gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform,	false, this.mvMatrix);
    },
    
    //-------------------------------------------------------
    //Takes numbers from pixel space to 
    getNormalizedCoordinates: function(x, y) {
    	var newX = Pixel.Math.map(0.0, this.gl.viewportWidth, x, 0.0, 2.0);
    	var newY = Pixel.Math.map(0.0, this.gl.viewportHeight, y, 0.0, -2.0);
    
    	return {x:newX, y:newY};
    },
    
    
    //-------------------------------------------------------
	//Rendering functions
    
    //-------------------------------------------------------
    setSize: function(width, height) {
    	this.gl.viewportWidth	= width;
        this.gl.viewportHeight	= height;
    },
    
    //-------------------------------------------------------
    setBackgroundColor: function(r,g,b,a) {
    	this.bgColor.set(r,g,b,a);
    	this.bgColor.normalizeRGB();
   	},
	
	//-------------------------------------------------------
	clear: function(x,y,width,height, color) {
		this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
        
        this.gl.clearColor(this.bgColor.r, this.bgColor.g, this.bgColor.b, this.bgColor.a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        
        mat4.ortho(-1, 1, -1, 1, -1, 1, this.pMatrix);
        
        mat4.identity(this.mvMatrix);
        mat4.translate(this.mvMatrix, [-1, 1, 0]);
	},
	
	
	//-------------------------------------------------------
	setFillColor: function(r,g,b,a) {
		this.fillColor.set(r,g,b,a);
		this.fillColor.normalizeRGB();
	},
	
	//-------------------------------------------------------
	noFill: function() {
	},
	
	
	//-------------------------------------------------------
	setStrokeColor: function(r,g,b,a) {
	},
	
	
	//-------------------------------------------------------
	noStroke: function() {
	},
	

	//-------------------------------------------------------
	setStrokeSize: function(size) {
	},
	
	//-------------------------------------------------------
	setLineCap: function(style) {
	},
		
	//-------------------------------------------------------
	shadow: function(size, xOffset, yOffset) {
	},
	
	
	//-------------------------------------------------------
	setShadowColor: function(r,g,b,a) {
	},
	
	
	//-------------------------------------------------------
	noShadow: function() {
	},
	
	
	//-------------------------------------------------------
	//IMAGE DRAWING
	drawImage: function(pxImage, x, y, width, height) {
		if(pxImage.isLoaded()) {
			//Set Shader
			this.setShader(this.textureShader);
			
			//Create texture if necessary
			if(!pxImage.texture) {
				//Create texture
				pxImage.texture = this.loadTexture(pxImage.image);
			} 
			
			//Get width & height
			width	= width	 || pxImage.image.width;
			height	= height || pxImage.image.height;
			
			//Define vertices
			var topLeft		= this.getNormalizedCoordinates(x,y);
			var bottomRight = this.getNormalizedCoordinates(x+width,y+height);
			
			var x1 = topLeft.x;
			var x2 = bottomRight.x;
			
			var y1 = topLeft.y;
			var y2 = bottomRight.y;
			
			var vertices = [
				x1,		y1,		0.0,
	            x1,		y2,		0.0,
	            x2,		y1,		0.0,
	           	x2,		y2,		0.0
	        ];
	        
	        //Vertex Buffer
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.rectBuffer);
	        this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, new Float32Array(vertices));
	        this.gl.vertexAttribPointer(this.shaderProgram.aVertexPosition, 3, this.gl.FLOAT, false, 0, 0);
			
			//Tex Coord Buffer
			//tl, bl, tr, br
			var texCoords = [
	      		0.0, 1.0,
	      		0.0, 0.0,
	      		1.0, 1.0,
				1.0, 0.0,
			];
			
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
	        this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, new Float32Array(texCoords));
        	this.gl.vertexAttribPointer(this.shaderProgram.aTextureCoord, 2, this.gl.FLOAT, false, 0, 0);
        	
        	
        	//Draw
        	this.gl.activeTexture(this.gl.TEXTURE0);
    		this.gl.bindTexture(this.gl.TEXTURE_2D, pxImage.texture);
    		this.gl.uniform1i(this.shaderProgram.uSampler, 0);
    		
    		this.setMatrixUniforms();
			this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
        }
	},
	
	
	//-------------------------------------------------------
	//SHAPE DRAWING
	
	//-------------------------------------------------------
	beginShape: function(x,y) {
	},
	
	
	//-------------------------------------------------------
	addVertex: function(x,y, bEnd) {
	},
	
	
	//-------------------------------------------------------
	curveVertex: function(x, y) {
	},
	
	
	//-------------------------------------------------------
	endShape: function(x,y) {
	},
	
	
	//-------------------------------------------------------
	drawLine: function(x1,y1,x2,y2) {
	},
	
	
	//-------------------------------------------------------
	dashedLine: function (fromX, fromY, toX, toY, pattern) {
	},
	
	
	//-------------------------------------------------------
	drawRect: function(x,y,width,height) {
		this.setShader(this.basicShader);
		
		//Define vertices
		var topLeft		= this.getNormalizedCoordinates(x,y);
		var bottomRight = this.getNormalizedCoordinates(x+width,y+height);
		
		var x1 = topLeft.x;
		var x2 = bottomRight.x;
		
		var y1 = topLeft.y;
		var y2 = bottomRight.y;
		
		
		var vertices = [
			x1,		y1,		0.0,
            x1,		y2,		0.0,
            x2,		y1,		0.0,
           	x2,		y2,		0.0
        ];
        
        //Fill Vertex Buffer
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.rectBuffer);
        this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, new Float32Array(vertices));
        this.gl.vertexAttribPointer(this.shaderProgram.aVertexPosition, 3, this.gl.FLOAT, false, 0, 0);
		
		//Fill Color Buffer
		var colors = [];
		for(var i=0; i<4; i++) {
			colors.push(this.fillColor.r);
			colors.push(this.fillColor.g);
			colors.push(this.fillColor.b);
			colors.push(this.fillColor.a);
		}
		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.rectColorBuffer);
        this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, new Float32Array(colors));
    	this.gl.vertexAttribPointer(this.shaderProgram.aVertexColor, 4, this.gl.FLOAT, false, 0, 0);
		
		//Draw  Fill      
        this.setMatrixUniforms();
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
        //this.gl.drawArrays(this.gl.LINE_LOOP, 0, 4);
/*
        //-----------
        //Stroke
        //Draw Stroke
        vertices = [
			x1,		y1,		0.0,
            x1,		y2,		0.0,
            x2,		y2,		0.0,
           	x2,		y1,		0.0
        ];
        
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.rectBuffer);
        this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, new Float32Array(vertices));
        this.gl.vertexAttribPointer(this.shaderProgram.aVertexPosition, 3, this.gl.FLOAT, false, 0, 0);
        
        colors = [];
        for(var i=0; i<4; i++) {
			colors.push(this.strokeColor.r);
			colors.push(this.strokeColor.g);
			colors.push(this.strokeColor.b);
			colors.push(this.strokeColor.a);
		}
		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.rectColorBuffer);
        this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, new Float32Array(colors));
    	this.gl.vertexAttribPointer(this.shaderProgram.aVertexColor, 4, this.gl.FLOAT, false, 0, 0);
		
		this.gl.drawArrays(this.gl.LINE_LOOP, 0, 4);
*/
	},
	
	
	//-------------------------------------------------------
	drawRoundedRect: function(x,y,width,height, radius) {
	},
	
	
	//-------------------------------------------------------
	drawSquare: function(x,y,size) {
		this.drawRect(x,y, size, size);
	},
	
	
	//-------------------------------------------------------
	drawEllipse: function(x,y,width,height) {
		this.setShader(this.basicShader);
		
		var topLeft = this.getNormalizedCoordinates(x,y);
		var bottomRight = this.getNormalizedCoordinates(x+width,y+height);
		
		var x1 = topLeft.x;
		var x2 = bottomRight.x;
		
		var y1 = topLeft.y;
		var y2 = bottomRight.y;
		
		//Create Buffers
		var vertices = [];
		var colors = [];
		
		for(var i=0; i<(360*3); i+=3) {
			vertices.push(x1 + Math.cos(Pixel.Math.degreesToRadians(i)) * (x2 - x1));
			vertices.push(y1 + Math.sin(Pixel.Math.degreesToRadians(i)) * (y2 - y1));
			vertices.push(0.0);
			
			colors.push(this.fillColor.r);
			colors.push(this.fillColor.g);
			colors.push(this.fillColor.b);
			colors.push(this.fillColor.a);
		}
		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.ellipseBuffer);
		this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, new Float32Array(vertices));
		this.gl.vertexAttribPointer(this.shaderProgram.aVertexPosition, 3, this.gl.FLOAT, false, 0, 0);
		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.ellipseColorBuffer);
		this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, new Float32Array(colors));
    	this.gl.vertexAttribPointer(this.shaderProgram.aVertexColor, 4, this.gl.FLOAT, false, 0, 0);
		
		//Draw Points
		this.setMatrixUniforms();
        this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, 360);
	},
	
	
	//-------------------------------------------------------
	drawCircle: function(x,y,radius) {
		this.drawEllipse(x,y, radius, radius);
	},
	
	
	//-------------------------------------------------------
	//TRANSFORMATIONS
	//-------------------------------------------------------
	pushMatrix: function() {
		var copy = mat4.create();
    	mat4.set(this.mvMatrix, copy);
    	this.mvMatrixStack.push(copy);
	},
	
	
	//-------------------------------------------------------
	popMatrix: function() {
		if (this.mvMatrixStack.length == 0) {
      		throw "Invalid popMatrix!";
    	}
    	
    	this.mvMatrix = this.mvMatrixStack.pop();
	},
	
	
	//-------------------------------------------------------
	translate: function(x,y) {
		var pos = this.getNormalizedCoordinates(x,y);
		mat4.translate(this.mvMatrix, [pos.x, pos.y, 0]);
	},
	
	
	//-------------------------------------------------------
	scale: function(x,y) {
		mat4.scale(this.mvMatrix, [x,y,0.0]);
	},
	
	
	//-------------------------------------------------------
	rotate: function(angle) {
		//Multiply angle by -1 to reverse, lines up with Canvas2D rotation
		angle *= -1;
		mat4.rotate(this.mvMatrix, Pixel.Math.degreesToRadians(angle), [0, 0, 1]);
	},
	
	
	//-------------------------------------------------------
	transform: function(m11, m12, m21, m22, dx, dy) {
	},
	
	
	//-------------------------------------------------------
	setTransform: function(m11, m12, m21, m22, dx, dy) {
	},
	
	
	//-------------------------------------------------------
	//FONTS/TEXT
	//-------------------------------------------------------
	
	//-------------------------------------------------------
	setFont: function(font, size) {
	},
	
	
	//-------------------------------------------------------
	setTextAlignment: function(alignment) {
	},
	
	
	//-------------------------------------------------------
	setTextBaseline: function(baseline) {
	},
	
	
	//-------------------------------------------------------
	getTextWidth: function(string) {
	},
	
	
	//-------------------------------------------------------
	drawText: function(string, x, y) {
	},
	
	
	//-------------------------------------------------------
	drawTextfield: function(tf) {
	}
});//-------------------------------------------------------
//Pixel.Shader.js
//Loads and Compiles a gl shader
//Based on Learning WebGL Code (http://www.learningwebgl.com)
Pixel.getShaderProgram = function(gl, id, vars) {
	var fragment	= Pixel.compileShader(gl, id + "-fs");
	var vertex		= Pixel.compileShader(gl, id + "-vs");
	
	return Pixel.createShaderProgram(gl, fragment, vertex, vars);
};


//-------------------------------------------------------
Pixel.compileShader = function(gl, id) {
	var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }
        k = k.nextSibling;
    }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
};


//-------------------------------------------------------
Pixel.createShaderProgram = function(gl, fragmentShader, vertexShader, vars) {
	if(fragmentShader && vertexShader) {
        program = gl.createProgram();
        gl.attachShader(program, fragmentShader);
        gl.attachShader(program, vertexShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        gl.useProgram(program);

		//Set Uniforms
		program.pMatrixUniform	= gl.getUniformLocation(program, "uPMatrix");
        program.mvMatrixUniform	= gl.getUniformLocation(program, "uMVMatrix");
		
		var uniforms = vars["uniforms"];
			if(uniforms) {
			for(var i=0; i<uniforms.length; i++) {
				program[uniforms[i]] = gl.getUniformLocation(program, uniforms[i]);
			}
		}
		
		//Set Attributes
		var attributes = vars["attributes"];
		if(attributes) {
			for(var i=0; i<attributes.length; i++) {
				program[attributes[i]] = gl.getAttribLocation(program, attributes[i]);
				gl.enableVertexAttribArray(program[attributes[i]]);
			}
		}

		return program;
    } else {
    	Pixel.log("Failed to compile shader program.");
    }
};//-------------------------------------------------------
//Pixel.Color.js

//Color class
Pixel.Color = Class.extend({
	init: function(r,g,b,a) {
		this.r = r || 0.0;
		this.g = g || 0.0;
		this.b = b || 0.0;
		this.a = a || 1.0;
		
		this.h = 0.0;
		this.s = 0.0;
		this.l = 0.0;
		this.v = 0.0;
	},
	
	//-------------------------------------------------------
	set: function(r,g,b,a) {
		if(r != undefined) this.r = r;
		if(g != undefined) this.g = g;
		if(b != undefined) this.b = b;
		
		this.a = a != undefined ? a : 1;
	},
	
	
	//-------------------------------------------------------
	normalizeRGB: function() {
		this.r = Pixel.Math.map(0.0, 255.0, this.r, 0.0, 1.0);
		this.g = Pixel.Math.map(0.0, 255.0, this.g, 0.0, 1.0);
		this.b = Pixel.Math.map(0.0, 255.0, this.b, 0.0, 1.0);
	},
	
	
	//-------------------------------------------------------
	setHSL: function(h,s,l,a) {
		if(h != undefined) this.h = h;
		if(s != undefined) this.s = g;
		if(l != undefined) this.l = b;
		
		this.a = a != undefined ? a : 1;
	},
	
	
	//-------------------------------------------------------
	setHSV: function(h,s,v,a) {
		if(h != undefined) this.h = h;
		if(s != undefined) this.s = g;
		if(v != undefined) this.l = b;
		if(a != undefined) this.a = a;
	},
	
	
	//-------------------------------------------------------
	toHSL: function() {
		var hsl = Pixel.rgbToHSL(this.r, this.g, this.b);
		this.setHSL(hsl.h, hsl.s, hsl.l);
		return hsl;
	},
	
	
	//-------------------------------------------------------
	toHSV: function() {
		var hsv = Pixel.rgbToHSV(this.r, this.g, this.b);
		this.setHSV(hsv.h, hsv.s, hsv.v);
		return hsv;
	}
});


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
}//-------------------------------------------------------
//Pixel.Canvas.js
//Canvas Wrapper, implements Renderer functions and adds DOM specific stuff 
//+ generic vars shared between renderers (i.e. Cursor)

Pixel.Canvas = Pixel.EventDispatcher.extend({
	init: function(renderer) {
		//Create Canvas
		this.canvas = document.createElement('canvas');
		this.canvas.innerHTML = "Your browser does not support HTML5 Canvas."
		this.canvas.setAttribute('width', this.width);
		this.canvas.setAttribute('height', this.height);
		
		this.pos = {
			x:0,
			y:0
		}
		
		this.width = 0;
		this.height = 0;
		
		//BG Color
		this.backgroundColor = null;
		
		//Cursor, useful for text layout
		cursorX = 0;
		cursorY = 0;
		
		//Pixel doubling for iOS 
		this.bPixelDoubling = window.devicePixelRatio >= 2;
		
		//Set Renderer (default is 2D)
		this.setRenderer(this.canvas, renderer);
		
		//Init Vars
		//this.setPos(0,0);
		this.setSize(400,400);
	},


	//-------------------------------------------------------
	//Size Info
	
	//-------------------------------------------------------
	setSize: function(width,height) {
		this.width = width;
		this.height = height;
		
		this.canvas.setAttribute('width',	this.width);
		this.canvas.setAttribute('height',	this.height);
		
		this.renderer.setSize(width, height);
	},


	//-------------------------------------------------------
	getWidth: function() {
		return this.width;
	},


	//-------------------------------------------------------
	getHeight: function() {
		return this.height;
	},


	//-------------------------------------------------------
	//Cursor
	//-------------------------------------------------------
	setCursor: function(x,y) {
		this.cursorX = x;
		this.cursorY = y;
	},


	//-------------------------------------------------------
	//Drawing
	//-------------------------------------------------------
	setRenderer: function(canvasElement, rendererType) {
		if(rendererType == Pixel.RENDER_MODE_WEBGL) {
			this.renderer = new Pixel.RendererWebGL(canvasElement);
			if(this.renderer.gl) {
				Pixel.log("WebGL renderer initialized");
				return;
			} else {
				delete this.renderer;
				Pixel.log("Failed to create WebGL Renderer");	
			}
		}
		
		//Default is 2D
		if(rendererType != Pixel.RENDER_MODE_2D) Pixel.log("Renderer Type does not exist");
		this.renderer = new Pixel.Renderer2D(canvasElement);
	},

	//-------------------------------------------------------
	setBackgroundColor: function(r,g,b,a) {
		this.renderer.setBackgroundColor(r,g,b,a);
	},

	//-------------------------------------------------------
	clear: function(x,y,width,height) { 
		this.renderer.clear(x,y,width,height); 
	},


	//-------------------------------------------------------
	//COLOR	
	//-------------------------------------------------------
	setFillColor: function(r,g,b,a) {
		this.renderer.setFillColor(r,g,b,a);
	},
	

	//-------------------------------------------------------
	noFill: function() {
		this.renderer.noFill();
	},

	
	//-------------------------------------------------------
	setStrokeColor: function(r,g,b,a) {
		this.renderer.setStrokeColor(r,g,b,a);
	},

	//-------------------------------------------------------
	noStroke: function() {
		this.renderer.noStroke();
	},


	//-------------------------------------------------------
	setStrokeSize: function(size) {
		this.renderer.setStrokeSize(size);
	},

	//-------------------------------------------------------
	setLineCap: function(style) {
		this.renderer.setLineCap(style);
	},
	


	//-------------------------------------------------------
	//IMAGE DRAWING
	//-------------------------------------------------------
	drawImage: function(pxImage, x, y, width, height) {
		//this.renderer.pushMatrix();
		//this.renderer.translate(x,y);
		//if(width && width	!= pxImage.image.width)		this.renderer.scale(width/pxImage.width, 1.0);
		//if(height&& height	!= pxImage.image.height)	this.renderer.scale(1.0, height/pxImage.height);
		this.renderer.drawImage(pxImage, 0,0, width, height);
		//this.renderer.popMatrix();
	},



	//-------------------------------------------------------
	//SHAPE DRAWING
	
	//-------------------------------------------------------
	beginShape: function(x,y) {
		this.renderer.beginShape(x,y);
	},


	//-------------------------------------------------------
	addVertex: function(x,y, bEnd) {
		this.renderer.addVertex(x,y, bEnd);
	},


	//-------------------------------------------------------
	endShape: function(x,y) {
		this.renderer.endShape(x,y);
	},


	//-------------------------------------------------------
	drawLine: function(x1,y1,x2,y2) {
		this.renderer.drawLine(x1,y1,x2,y2);
	},



	//-------------------------------------------------------
	dashedLine: function (fromX, fromY, toX, toY, pattern) {
		this.renderer.dashedLine(fromX, fromY, toX, toY, pattern);  
	},


	//-------------------------------------------------------
	drawRect: function(x,y,width,height) {
		this.renderer.drawRect(x,y,width,height);
	},


	//-------------------------------------------------------
	drawRoundedRect: function(x,y,width,height, borderRadius) {
		this.renderer.drawRoundedRect(x,y,width,height, borderRadius);
	},


	//-------------------------------------------------------
	drawSquare: function(x,y,size) {
		this.renderer.drawSquare(x,y,size);
	},


	//-------------------------------------------------------
	drawEllipse: function(x,y,width,height) {
		this.renderer.drawEllipse();
	},



	//-------------------------------------------------------
	drawCircle: function(x,y,radius) {
		this.renderer.drawCircle(x,y,radius);
	},


	//-------------------------------------------------------
	//TRANSFORMATIONS
	//-------------------------------------------------------
	pushMatrix: function() {
		this.renderer.pushMatrix();
	},


	//-------------------------------------------------------
	popMatrix: function() {
		this.renderer.popMatrix();
	},


	//-------------------------------------------------------
	translate: function(x,y) {
		this.renderer.translate(x,y);
	},



	//-------------------------------------------------------
	scale: function(x,y) {
		this.renderer.scale(x,y);
	},


	//-------------------------------------------------------
	rotate: function(angle) {
		this.renderer.rotate(angle);
	},


	//-------------------------------------------------------
	transform: function(m11, m12, m21, m22, dx, dy) {
		this.renderer.transform(m11, m12, m21, m22, dx, dy);
	},

	//-------------------------------------------------------
	setTransform: function(m11, m12, m21, m22, dx, dy) {
		this.renderer.setTransform(m11, m12, m21, m22, dx, dy);
	},



	//-------------------------------------------------------
	//TEXT
	
	//-------------------------------------------------------	
	setFont: function(font, size) {
		this.renderer.setFont(font,size);
	},


	//-------------------------------------------------------
	setTextAlignment: function(alignment) {
		this.renderer.setTextAlignment(alignment);
	},
	
	
	//-------------------------------------------------------
	setTextBaseline: function(baseline) {
		this.renderer.setTextBaseline(baseline);
	},
	
	
	//-------------------------------------------------------
	getTextWidth: function(string) {
		return this.renderer.getTextWidth(string);
	},
	
	
	//-------------------------------------------------------
	drawText: function(string, x, y) {
		if(x != undefined) {
			this.renderer.drawText(string, x, y);
		} else {
			this.renderer.drawText(string, this.cursorX, this.cursorY);
		}
	},
	
	
	//-------------------------------------------------------
	drawTextfield: function(textfield) {
		this.renderer.drawTextfield(textfield);
	}
});//-------------------------------------------------------
//-------------------------------------------------------
//Main Object

Pixel.Object = Pixel.EventDispatcher.extend({
	init: function() {
		this.bInitPressed = false;
		this.bPressed = false;
		this.width = 0;
		this.height = 0;
		
		this.pos = {
			x:0,
			y:0
		};
		
		this.radius = 0;
		
		this.shapeMode = Pixel.OBJECT_SHAPE_RECT;
		
		this.rect = new Pixel.Rectangle();
		
		this._super();
	},
	
	
	//-------------------------------------------------------
	show: function() {
	
	},
	
	
	//-------------------------------------------------------
	hide: function() {
	},
	
	
	//-------------------------------------------------------
	setPos: function(x,y) {
		if(Pixel.isSet(x)) this.pos.x = x;
		if(Pixel.isSet(y)) this.pos.y = y;
		
		this.setRect();
	},
	
	
	//-------------------------------------------------------
	getPos: function() {
		return this.pos;
	},
	
	
	//-------------------------------------------------------
	setSize: function(width, height) {
		if(Pixel.isSet(width))	this.width	= width;
		if(Pixel.isSet(height)) this.height = height;
		
		this.setRect();
	},
	
	
	//-------------------------------------------------------
	//Set Rect, for touches, can be overridden for cases like textfields (alignment + baseline issues)
	setRect: function() {
		this.rect.set(this.pos.x, this.pos.y, this.width, this.height);
	},
	
	
	//-------------------------------------------------------
	getRect: function() {
		return this.rect;
	},
	
	
	//-------------------------------------------------------
	getWidth: function() {
		return this.width;
	},
	
	
	//-------------------------------------------------------
	getHeight: function() {
		return this.height
	},
	
	
	//-------------------------------------------------------
	setShapeMode: function(shapeMode) {
		this.shapeMode = shapeMode;
	},
	
	//-------------------------------------------------------
	//Event Listeners
	
	//-------------------------------------------------------
	isPressed: function() {
		return this.bPressed;
	},
	
	
	//-------------------------------------------------------
	touchStart: function(touch) {
		this.setRect(this.pos.x, this.pos.y, this.width, this.height);
		
		//Touch Detection
		switch(this.shapeMode) {
			case Pixel.OBJECT_SHAPE_RECT:
				this.bInitPressed = (this.rect.isInside(touch.x,touch.y));
				break;
			case Pixel.OBJECT_SHAPE_CIRCLE:
				this.bInitPressed = Pixel.dist(this.pos.x, this.pos.y, touch.x, touch.y) < this.radius * 2;
				break;
			default:
				break;
		}
		
		this.bPressed = this.bInitPressed;
		return this.bPressed;
	},
	
	
	//-------------------------------------------------------
	touchMoved: function(touch) {
		if(this.bInitPressed) {
			switch(this.shapeMode) {
				case Pixel.OBJECT_SHAPE_RECT:
					this.bPressed	= (this.rect.isInside(touch.x,touch.y));
					break;
				case Pixel.OBJECT_SHAPE_CIRCLE:
					this.bPressed = Pixel.dist(this.pos.x, this.pos.y, touch.x, touch.y) < this.radius * 2;
					break;
				default:
					break;
			}
		}
		
		return this.bPressed;
	},
	
	
	//-------------------------------------------------------
	touchEnd: function(touch) {
		this.bInitPressed = this.bPressed = false;
		return this.bPressed;
	}
});//-------------------------------------------------------
//Pixel.Image.js
//For loading, storing, manipulating, etc

Pixel.Image = Pixel.Object.extend({
	init: function(url) {
		this._super();
	
		this.bAllocated = false;
		this.canvas		= null;
		
		this.image		= null;
		this.imageData	= null;
		this.bLoaded	= false;
		
		//Texture is only set from webgl renderer
		//And is loaded 
		this.texture		= null;
		
		//Load image if URL is set
		if(url != undefined) this.load(url);
	},
	
	
	//-------------------------------------------------------
	load: function(src) {
		this.clear();
		
		this.image = new Image();
		
		this.image.addEventListener("load", function() { 
			this.bLoaded = true;
			this.dispatch("loaded", this);
			
			//Get Size of Image
			this.setSize(this.image.width, this.image.height);
		}.bind(this));
		
		
		this.image.addEventListener("error", function() {
			console.log("Could not load image from '" + url + "'");
		});
		
		
		this.image.src = src;
	},
	
	
	//-------------------------------------------------------
	isLoaded: function() {
		return this.bLoaded;
	},
	
	
	//-------------------------------------------------------
	clear: function() {
		this.bLoaded	= false;
		this.pixels		= null;
		this.imageData	= null;
		this.image		= null;
	},
	
	
	//-------------------------------------------------------
	setSize: function(width, height) {
		this._super(width, height);
		
		if(this.bAllocated == false) {			
			//Get Canvas Ref
			this.canvas = document.createElement('canvas');
			this.ctx = this.canvas.getContext('2d');
			this.imageData = this.ctx.getImageData(0,0,this.getWidth(), this.getHeight());
		}
		
		
		this.canvas.setAttribute("width", this.width);
		this.canvas.setAttribute("height", this.height);
	},
	
	
	//-------------------------------------------------------
	getImageData: function() {
		return this.imageData;
	},
	
	
	//-------------------------------------------------------
	getPixels: function() {
		if(this.bLoaded) {			
			this.ctx.drawImage(this.image, 0,0);
			this.imageData	= this.ctx.getImageData(0,0,this.size.width, this.size.height)
			this.pixels		= this.imageData.data;
			return this.pixels;
		}
		
		return null;
	},
	
	
	//-------------------------------------------------------
	setFromPixels: function(pixels, width, height){
		this.clear();
		
		//Resize the Canvas, get the new image data obj
		this.setSize(width, height);
		this.imageData	= this.ctx.getImageData(0,0,this.size.width, this.size.height);
		this.pixels		= this.imageData.data;
		
		//Copy pixels into image data
		var i=pixels.length;
		while(i--) this.pixels[i] = pixels[i];
		
		//Draw Data back into the canvas object
		this.ctx.putImageData(this.imageData, 0,0);
		
		//Store info as an IMG, drawing using drawImage() is WAY faster than putImageData()
		this.image = new Element("img");  
		this.image.addEvent("load", function() {
			this.image.removeEvent("load");
			this.dispatch("loaded", this);
			this.bLoaded = true;
		}.bind(this));
		
		this.image.src = this.canvas.toDataURL("image/png");
	}
});//-------------------------------------------------------
//Pixel.Font.js
//Used for storing font information for convenience 

//Empty canvas object for rendering
Pixel.FontSizeCvs = null;

Pixel.Font = Class.extend({
	init: function(font, size, alignment, baseline) {
		this.font		= font || "Arial";
		this.size		= size || 12;
		this.alignment	= alignment || Pixel.TEXT_BASELINE_LEFT;
		this.baseline	= baseline || Pixel.TEXT_BASELINE_TOP;
		
		//Create canvas for getting sizes, if not defined yet
		if(Pixel.FontSizeCvs == null) {
			Pixel.log("Creating 2D Canvas for fonts");
			Pixel.FontSizeCvs = new Pixel.Canvas(Pixel.RENDER_MODE_2D);
		}
	},


	//-------------------------------------------------------
	setSize: function(size) {
		this.size = size;
	},
	
	
	//-------------------------------------------------------
	setFont: function(font) {
		this.font = font;
	},
	
	
	//-------------------------------------------------------
	setSize: function(size) {
		this.size = size;
	},
	
	
	//-------------------------------------------------------
	setFont: function(font) {
		this.font = font;
	},
	
	
	//-------------------------------------------------------
	setAlignment: function(alignment) {
		this.alignment = alignment;
	},
	
	
	//-------------------------------------------------------
	setBaseline: function(baseline) {
		this.baseline = baseline;
	},
	
	
	//-------------------------------------------------------
	getSize: function() {
		return this.size;
	},
	
	
	//-------------------------------------------------------
	getTextWidth: function(text) {
		Pixel.FontSizeCvs.setFont(this);
		return Pixel.FontSizeCvs.getTextWidth(text);
	},
	
	
	//-------------------------------------------------------
	getTextHeight: function() {
		return Math.round(this.size * 1.5);
	}
});//-------------------------------------------------------
//Pixel.Textfield.js
//Font class with added capabilities like position, size, etc

Pixel.Textfield = Pixel.Object.extend({
	init: function(text, font) {
		this._super();
	
		this.font 	= font || new Pixel.Font("Arial", 14);
		this.color	= new Pixel.Color(255,255,255,1);
		
		this.text	= text || "Text not set";
		this.setText(this.text);
	},
	
	
	//-------------------------------------------------------
	setFont: function(font, size, alignment, baseline) {
		if(size != undefined) {
			this.font = new Pixel.Font(font, size, alignment, baseline);
		} else {
			this.font = font;
		}
	},
	
	
	//-------------------------------------------------------
	setColor: function(r,g,b,a) {
		this.color.set(r,g,b,a);
	},
	
	
	//-------------------------------------------------------
	setText: function(text) {
		this.text = text;
		
		this.width	= this.font.getTextWidth(this.text);
		this.height	= this.font.getTextHeight(this.text);
		
		this.setRect();
	},
	
	
	//-------------------------------------------------------
	setRect: function() {
		switch(this.font.alignment) {
			case Pixel.TEXT_ALIGN_LEFT:
				switch(this.font.baseline) {
					case Pixel.TEXT_BASELINE_TOP:
						this.rect.set(this.pos.x, this.pos.y, this.width, this.height);
						break;
					case Pixel.TEXT_BASELINE_MIDDLE:
						this.rect.set(this.pos.x, this.pos.y - this.height/2, this.width, this.height);
						break;
					case Pixel.TEXT_BASELINE_BOTTOM:
						this.rect.set(this.pos.x, this.pos.y - this.height, this.width, this.height);
						break;
				}
				break;
				
			case Pixel.TEXT_ALIGN_CENTER:
				switch(this.font.baseline) {
					case Pixel.TEXT_BASELINE_TOP:
						this.rect.set(this.pos.x - this.width/2, this.pos.y, this.width, this.height);
						break;
					case Pixel.TEXT_BASELINE_MIDDLE:
						this.rect.set(this.pos.x - this.width/2, this.pos.y - this.height/2, this.width, this.height);
						break;
					case Pixel.TEXT_BASELINE_BOTTOM:
						this.rect.set(this.pos.x - this.width/2, this.pos.y - this.height, this.width, this.height);
						break;
				}
				break;
				
			case Pixel.TEXT_ALIGN_RIGHT:
				switch(this.font.baseline) {
					case Pixel.TEXT_BASELINE_TOP:
						this.rect.set(this.pos.x - this.width, this.pos.y, this.width, this.height);
						break;
					case Pixel.TEXT_BASELINE_MIDDLE:
						this.rect.set(this.pos.x - this.width, this.pos.y - this.height/2, this.width, this.height);
						break;
					case Pixel.TEXT_BASELINE_BOTTOM:
						this.rect.set(this.pos.x - this.width, this.pos.y - this.height, this.width, this.height);
						break;
				}				
				break;
		}
	}
});//-------------------------------------------------------
//Pixel.App.js
Pixel.App = Pixel.Canvas.extend({
	init:function(renderer) {
		this._super(renderer);
		
		this.bSetup = false;
		this.bRunning = true;
		
		this.bIsMobileApp = false;
		
		//FPS
		this.fps			= 60;
		this.curFPS			= 0;
		this.bShowFPS		= false;
		this.curFps			= 0;
		this.nFPSSamples	= 50;
		this.fpsFont		= new Pixel.Font("Verdana", 10, Pixel.TEXT_ALIGN_LEFT);
		
		this.startTime	= 0;
		this.prevTime	= 0;
		
		this.startTime = new Date().getTime();
		this.prevTime = this.startTime;
		
		//FPS Font
		this.fpsFont = new Pixel.Font("Verdana", 10, Pixel.TEXT_ALIGN_LEFT);
		
		//BG Stuff
		this.bClearBackground	= true;
		
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
		this.run();
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
			
			if(this.bClearBackground) this.clear(0,0, this.getWidth(), this.getHeight());
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
		this.curFPS = 0.0;
		this.bShowFPS = true;
	},
	
	
	//-------------------------------------------------------
	hideFPS: function() {
		this.bShowFPS = false;
	},
	
	
	//-------------------------------------------------------
	updateFPS: function() {
		var curTime = this.getElapsedTime();
		var thisSample = 1000.0/(curTime - this.prevTime);
		
		this.curFPS = ((this.curFPS * (this.nFPSSamples-1)) + thisSample)/this.nFPSSamples;
		this.prevTime = curTime;
	},
	
	
	//-------------------------------------------------------
	drawFPS: function() {
		this.setFont(this.fpsFont);
		
		this.setFillColor(0,0,0);
		this.drawText("FPS: " + this.curFPS.toFixed(2), 20, 20);
		this.setFillColor(255,255,255);
		this.drawText("FPS: " + this.curFPS.toFixed(2), 22, 22);
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