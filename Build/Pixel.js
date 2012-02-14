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





//-------------------------------------------------------
//Radians & Degrees
//-------------------------------------------------------
Pixel.radToDeg = function(rad) {
	return rad * (180/Math.PI);
};

Pixel.degToRad = function(deg) {
	return deg * (Math.PI/180);
};




//-------------------------------------------------------
//Mapping/Distance
//-----------------------------------------------------
Pixel.map = function(iStart, iStop, value, oStart, oStop, bClamp) {
	value = oStart + (oStop - oStart) * ((value - iStart) / (iStop - iStart));
	return bClamp ? Pixel.clamp(value) : value;
}

//-----------------------------------------------------
Pixel.clamp = function(value, lowVal,highVal) {
	value = Math.max(value,lowVal);
	value = Math.min(value,highVal);
	return value;
}


//-----------------------------------------------------
Pixel.dist = function(x1,y1,x2,y2, bSigned) {
	var dist = Math.sqrt(Math.pow((x2-x1),2) + Math.pow(y2-y1,2));
	
	return bSigned ? dist : Math.abs(dist);
}


//-----------------------------------------------------
Pixel.getAngle = function(x1, y1, x2, y2) {
	return Math.atan2(y2 - y1, x2 - x1);
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
		
		this.shapePos = {x:0,y:0};
	},
	
	
	//-------------------------------------------------------
	clear: function(x,y,width,height) {
		this.ctx.clearRect(x,y,width,height);
		//console.log(width);
	},
	
	
	//-------------------------------------------------------
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
		
		if(pxImage.isLoaded()) {
			this.ctx.drawImage(pxImage.image, x, y);
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
	drawSquare: function(x,y,size) {
		this.rectangle(x,y,size,size);
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

Pixel.RendererWebGL = Class.extend({
	init: function(canvas) {
		//Get GL Ref
		this.getGlRef(canvas);
        
        
	},
	
	
	//-------------------------------------------------------
	getGlRef: function(canvas) {
		//See if we can get a WebGL ref
		try {
            this.gl = canvas.getContext("experimental-webgl");
            this.gl.viewportWidth = canvas.width;
            this.gl.viewportHeight = canvas.height;
        } catch (e) {
        	this.gl = null;
        	Pixel.log("Could not initialise WebGL");
        }
	},
	
	
	//-------------------------------------------------------
	createShader: function(id) {
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
            shader = this.gl.createShader(gl.FRAGMENT_SHADER);
        } else if (shaderScript.type == "x-shader/x-vertex") {
            shader = this.gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }

        this.gl.shaderSource(shader, str);
        this.gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            alert(this.gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }
});//-------------------------------------------------------
//Pixel.Color.js

//Color class
Pixel.Color = Class.extend({
	init: function(r,g,b,a) {
		this.r = 0;
		this.g = 0;
		this.b = 0;
		
		this.h = 0;
		this.s = 0;
		this.l = 0;
		this.v = 0;
	},


	//-------------------------------------------------------
	set: function(r,g,b,a) {
		if(r != undefined) this.r = r;
		if(g != undefined) this.g = g;
		if(b != undefined) this.b = b;
		
		this.a = a != undefined ? a : 1;
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
};//-------------------------------------------------------
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
		
		//Cursor, useful for text layout
		cursorX = 0;
		cursorY = 0;
		
		//Pixel doubling for iOS 
		this.bPixelDoubling = window.devicePixelRatio >= 2;
		
		//Init Vars
		//this.setPos(0,0);
		this.setSize(50,400);
		
		//Set Renderer (default is 2D)
		this.setRenderer(this.canvas, renderer);
	},


	//-------------------------------------------------------
	//Size Info
	
	//-------------------------------------------------------
	setSize: function(width,height) {
		this.width = width;
		this.height = height;
		
		this.canvas.setAttribute('width',	this.width);
		this.canvas.setAttribute('height',	this.height);
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
		if(!this.renderer) {
			switch(rendererType) {
				case Pixel.RENDER_MODE_2D:
					Pixel.log("Starting 2D Renderer");
					this.renderer = new Pixel.Renderer2D(canvasElement);
					return;
					
				case Pixel.RENDER_MODE_WEBGL:
					this.renderer = new Pixel.RendererWebGL(canvasElement);
					if(this.renderer.gl) {
						Pixel.log("WebGL renderer initialized");
						return;
					} else {
						delete this.renderer;	
					}
					break;
				default:
					Pixel.log("Renderer Type does not exist");
					this.setRenderer(canvasElement, Pixel.RENDER_MODE_2D);
					break;
			}
			
			if(!this.renderer) this.setRenderer(canvasElement, Pixel.RENDER_MODE_2D);
		}
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
		this.renderer.drawImage(pxImage, x, y);
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
	init: function() {
		this._super;
		
		if(url != undefined) this.load(url);
	
		this.bAllocated = false;
		this.canvas = null;
		this.imageData = null;
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
		Pixel.Object.prototype.setSize.call(this, width,height);
		
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