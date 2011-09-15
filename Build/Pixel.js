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
}

//-------------------------------------------------------
//Touch device detection
//from http://stackoverflow.com/questions/2607248/optimize-website-for-touch-devices
Pixel.isTouchDevice = function() {
	return "ontouchstart" in window;
}

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

Pixel.Rectangle = function(x,y,width,height) {
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	
	this.set(x,y,width,height);
}


//-------------------------------------------------------
Pixel.Rectangle.prototype.initialize = function(x,y,width,height) { 
	this.set(x,y,width,height);
}


//-------------------------------------------------------
Pixel.Rectangle.prototype.set = function(x,y,width,height) {
	this.setPos(x,y);
	this.setSize(width,height);
}

//-------------------------------------------------------
Pixel.Rectangle.prototype.setPos =  function(x,y) {
	if(Pixel.isSet(x)) this.x = x;
	if(Pixel.isSet(y)) this.y = y;
}

//-------------------------------------------------------
Pixel.Rectangle.prototype.setSize = function(width,height) {
	this.width	= width;
	this.height = height;
}

//-------------------------------------------------------
Pixel.Rectangle.prototype.getPos = function() {
	return {
		x:this.x,
		y:this.y
	};
}

//-------------------------------------------------------
Pixel.Rectangle.prototype.getSize = function() {
	return {
		width:this.width,
		height:this.height
	}
}

//-------------------------------------------------------
Pixel.Rectangle.prototype.isInside = function(x,y) {
	return (x > this.x) && (x < this.x + this.width) && (y > this.y) && (y < this.y + this.height);
}



//-------------------------------------------------------
//Convert Radians to Degrees
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
Pixel.map = function(value, iStart, iStop, oStart, oStop, bClamp) {
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
//-------------------------------------------------------
//Pixel.Renderer2D.js
//2D Rendering

Pixel.Renderer2D = function(canvas) {
	this.ctx		= canvas.getContext('2d');
	this.bFill		= true;
	this.bStroke	= false;
	
	
	this.shapePos = {x:0,y:0};
}


//-------------------------------------------------------
Pixel.Renderer2D.prototype.clear = function(x,y,width,height) {
	this.ctx.clearRect(x,y,width,height);
	//console.log(width);
}



//-------------------------------------------------------
Pixel.Renderer2D.prototype.setColor = function(r,g,b,a) {
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
}



//-------------------------------------------------------
Pixel.Renderer2D.prototype.useColor = function(color) {
	this.ctx.fillStyle		= "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
	this.ctx.strokeStyle	= "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
}



//-------------------------------------------------------
Pixel.Renderer2D.prototype.fill = function() {
	this.bFill = true;
}



//-------------------------------------------------------
Pixel.Renderer2D.prototype.noFill = function() {
	this.bFill = false;
}



//-------------------------------------------------------
Pixel.Renderer2D.prototype.stroke =  function(size) {
	this.bStroke = true;
	this.ctx.lineWidth = size;
}



//-------------------------------------------------------
Pixel.Renderer2D.prototype.noStroke = function() {
	this.bStroke = false;
}



//-------------------------------------------------------
//IMAGE DRAWING
Pixel.Renderer2D.prototype.drawImage = function(pxImage, x, y, w, h) {
	x = x || pxImage.getPos().x;
	y = y || pxImage.getPos().y;
	
	if(pxImage.isLoaded()) {
		this.ctx.drawImage(pxImage.image, x, y);
	} else {
		Pixel.log("Image not yet loaded!");
	}
}



//-------------------------------------------------------
//SHAPE DRAWING

//-------------------------------------------------------
Pixel.Renderer2D.prototype.beginShape = function(x,y) {
	this.ctx.beginPath();
	this.ctx.moveTo(x,y);
	
	this.shapePos = {"x":x,"y":y};
}



//-------------------------------------------------------
Pixel.Renderer2D.prototype.addVertex = function(x,y, bEnd) {
	this.ctx.lineTo(x,y);
	
	if(bEnd != undefined) {
		this.endShape();
	}
	
	this.shapePos = {"x":x,"y":y};
}


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
}


//-------------------------------------------------------
Pixel.Renderer2D.prototype.endShape = function(x,y) {
	this.ctx.closePath();
	this.shapePos = {"x":x,"y":y};
	
	this.ctx.fill();
}



//-------------------------------------------------------
Pixel.Renderer2D.prototype.drawLine = function(x1,y1,x2,y2) {
	this.ctx.beginPath();
	this.ctx.moveTo(x1,y1);
	this.ctx.lineTo(x2,y2);
	this.ctx.stroke();
}




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
}



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
}

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
}

//-------------------------------------------------------
Pixel.Renderer2D.prototype.drawSquare = function(x,y,size) {
	this.rectangle(x,y,size,size);
}



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
  
  if(this.bStroke) this.ctx.stroke();
  if(this.bFill) this.ctx.fill();
}



//-------------------------------------------------------
Pixel.Renderer2D.prototype.drawCircle = function(x,y,radius) {
	this.ctx.beginPath();
	this.ctx.arc(x, y, radius, 0, Math.PI*2,false);
	
	if(this.bStroke) this.ctx.stroke();
  	if(this.bFill) this.ctx.fill();
}



//-------------------------------------------------------
//TRANSFORMATIONS
//-------------------------------------------------------
Pixel.Renderer2D.prototype.pushMatrix = function() {
	this.ctx.save();
}



//-------------------------------------------------------
Pixel.Renderer2D.prototype.popMatrix = function() {
	this.ctx.restore();
}



//-------------------------------------------------------
Pixel.Renderer2D.prototype.translate = function(x,y) {
	this.ctx.translate(x,y);
}



//-------------------------------------------------------
Pixel.Renderer2D.prototype.scale = function(x,y) {
	this.ctx.scale(x,y);
}



//-------------------------------------------------------
Pixel.Renderer2D.prototype.rotate = function(angle) {
	this.ctx.rotate(angle);
}



//-------------------------------------------------------
Pixel.Renderer2D.prototype.transform = function(m11, m12, m21, m22, dx, dy) {
	this.ctx.transform(m11, m12, m21, m22, dx, dy);
}



//-------------------------------------------------------
Pixel.Renderer2D.prototype.setTransform = function(m11, m12, m21, m22, dx, dy) {
	this.ctx.setTransform(m11, m12, m21, m22, dx, dy);
}



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
}



//-------------------------------------------------------
Pixel.Renderer2D.prototype.setTextAlignment = function(alignment) {
	this.ctx.textAlign = alignment;
}



//-------------------------------------------------------
Pixel.Renderer2D.prototype.setTextBaseline = function(baseline) {
	this.ctx.textBaseline = baseline;
}



//-------------------------------------------------------
Pixel.Renderer2D.prototype.getTextWidth = function(string) {
	return this.ctx.measureText(string).width;
}



//-------------------------------------------------------
Pixel.Renderer2D.prototype.drawText = function(string, x, y) {
	if(x != undefined) {
		this.ctx.fillText(string, x, y);
	} else {
		this.ctx.fillText(string, this.cursorX, this.cursorY);
	}
}



//-------------------------------------------------------
Pixel.Renderer2D.prototype.drawTextfield = function(tf) {
	this.setFont(tf.font);
	this.useColor(tf.color);
	this.drawText(tf.text, tf.pos.x, tf.pos.y);
}//-------------------------------------------------------
//Pixel.Color.js
//Color class

Pixel.Color = function(r,g,b,a) {
	this.r = 0;
	this.g = 0;
	this.b = 0;
	
	this.h = 0;
	this.s = 0;
	this.l = 0;
	this.v = 0;
}



//-------------------------------------------------------
Pixel.Color.prototype.set = function(r,g,b,a) {
	if(r != undefined) this.r = r;
	if(g != undefined) this.g = g;
	if(b != undefined) this.b = b;
	
	this.a = a != undefined ? a : 1;
}


//-------------------------------------------------------
Pixel.Color.prototype.setHSL = function(h,s,l,a) {
	if(h != undefined) this.h = h;
	if(s != undefined) this.s = g;
	if(l != undefined) this.l = b;
	
	this.a = a != undefined ? a : 1;
}


//-------------------------------------------------------
Pixel.Color.prototype.setHSV = function(h,s,v,a) {
	if(h != undefined) this.h = h;
	if(s != undefined) this.s = g;
	if(v != undefined) this.l = b;
	if(a != undefined) this.a = a;
}


//-------------------------------------------------------
Pixel.Color.prototype.toHSL = function() {
	var hsl = Pixel.rgbToHSL(this.r, this.g, this.b);
	this.setHSL(hsl.h, hsl.s, hsl.l);
	return hsl;
}


//-------------------------------------------------------
Pixel.Color.prototype.toHSV = function() {
	var hsv = Pixel.rgbToHSV(this.r, this.g, this.b);
	this.setHSV(hsv.h, hsv.s, hsv.v);
	return hsv;
}



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

Pixel.Canvas = function() {
	Pixel.EventDispatcher(this);
	
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
	this.setRenderer(this.canvas, Pixel.RENDER_MODE_2D);
}

Pixel.Canvas.prototype = new Pixel.EventDispatcher();



//-------------------------------------------------------
//Size Info

//-------------------------------------------------------
Pixel.Canvas.prototype.setSize = function(width,height, renderer) {
	this.width = width;
	this.height = height;
	
	this.canvas.setAttribute('width',	this.width);
	this.canvas.setAttribute('height',	this.height);
	
	
	if(renderer != undefined) {
		this.setRenderer(renderer);
	}
}



//-------------------------------------------------------
Pixel.Canvas.prototype.getWidth = function() {
	return this.width;
}



//-------------------------------------------------------
Pixel.Canvas.prototype.getHeight = function() {
	return this.height;
}



//-------------------------------------------------------
//Cursor
//-------------------------------------------------------
Pixel.Canvas.prototype.setCursor = function(x,y) {
	this.cursorX = x;
	this.cursorY = y;
}







//-------------------------------------------------------
//Drawing
//-------------------------------------------------------
Pixel.Canvas.prototype.setRenderer = function(canvasElement, rendererType) {
	switch(rendererType) {
		case Pixel.RENDER_MODE_2D:
			this.renderer = new Pixel.Renderer2D(canvasElement);
			break;
		case Pixel.RENDER_MODE_WEBGL:
			Pixel.log("WebGL Renderer not yet implemented!");
			break;
		default:
			//Pixel.log("Renderer Type does not exist");
			break;
	}
}


//-------------------------------------------------------
Pixel.Canvas.prototype.clear = function(x,y,width,height) { 
	this.renderer.clear(x,y,width,height); 
}


//-------------------------------------------------------
//COLOR	
//-------------------------------------------------------
Pixel.Canvas.prototype.setColor = function(r,g,b,a) {
	this.renderer.setColor(r,g,b,a);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.useColor = function(color) {
	this.renderer.useColor(color);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.fill = function() {
	this.renderer.fill();
}



//-------------------------------------------------------
Pixel.Canvas.prototype.noFill = function() {
	this.renderer.noFill();
}



//-------------------------------------------------------
Pixel.Canvas.prototype.stroke = function(size) {
	this.renderer.stroke(size);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.noStroke = function() {
	this.renderer.noStroke();
}



//-------------------------------------------------------
//IMAGE DRAWING
//-------------------------------------------------------
Pixel.Canvas.prototype.drawImage = function(pxImage, x, y, width, height) {
	this.renderer.drawImage(pxImage, x, y);
}



//-------------------------------------------------------
//SHAPE DRAWING

//-------------------------------------------------------
Pixel.Canvas.prototype.beginShape = function(x,y) {
	this.renderer.beginShape(x,y);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.addVertex = function(x,y, bEnd) {
	this.renderer.addVertex(x,y, bEnd);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.endShape = function(x,y) {
	this.renderer.endShape(x,y);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.drawLine = function(x1,y1,x2,y2) {
	this.renderer.drawLine(x1,y1,x2,y2);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.dashedLine = function (fromX, fromY, toX, toY, pattern) {
	this.renderer.dashedLine(fromX, fromY, toX, toY, pattern);  
}



//-------------------------------------------------------
Pixel.Canvas.prototype.drawRect = function(x,y,width,height) {
	this.renderer.drawRect(x,y,width,height);
}

//-------------------------------------------------------
Pixel.Canvas.prototype.drawRoundedRect = function(x,y,width,height, borderRadius) {
	this.renderer.drawRoundedRect(x,y,width,height, borderRadius);
}

//-------------------------------------------------------
Pixel.Canvas.prototype.drawSquare = function(x,y,size) {
	this.renderer.drawSquare(x,y,size);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.drawEllipse = function(x,y,width,height) {
	this.renderer.drawEllipse();
}



//-------------------------------------------------------
Pixel.Canvas.prototype.drawCircle = function(x,y,radius) {
	this.renderer.drawCircle(x,y,radius);
}



//-------------------------------------------------------
//TRANSFORMATIONS
//-------------------------------------------------------
Pixel.Canvas.prototype.pushMatrix = function() {
	this.renderer.pushMatrix();
}



//-------------------------------------------------------
Pixel.Canvas.prototype.popMatrix = function() {
	this.renderer.popMatrix();
}



//-------------------------------------------------------
Pixel.Canvas.prototype.translate = function(x,y) {
	this.renderer.translate(x,y);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.scale = function(x,y) {
	this.renderer.scale(x,y);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.rotate = function(angle) {
	this.renderer.rotate(angle);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.transform = function(m11, m12, m21, m22, dx, dy) {
	this.renderer.transform(m11, m12, m21, m22, dx, dy);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.setTransform = function(m11, m12, m21, m22, dx, dy) {
	this.renderer.setTransform(m11, m12, m21, m22, dx, dy);
}



//-------------------------------------------------------
//TEXT

//-------------------------------------------------------	
Pixel.Canvas.prototype.setFont = function(font, size) {
	this.renderer.setFont(font,size);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.setTextAlignment = function(alignment) {
	this.renderer.setTextAlignment(alignment);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.setTextBaseline = function(baseline) {
	this.renderer.setTextBaseline(baseline);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.getTextWidth = function(string) {
	return this.renderer.getTextWidth(string);
}



//-------------------------------------------------------
Pixel.Canvas.prototype.drawText = function(string, x, y) {
	if(x != undefined) {
		this.renderer.drawText(string, x, y);
	} else {
		this.renderer.drawText(string, this.cursorX, this.cursorY);
	}
}



//-------------------------------------------------------
Pixel.Canvas.prototype.drawTextfield = function(textfield) {
	this.renderer.drawTextfield(textfield);
}//-------------------------------------------------------
//-------------------------------------------------------
//Main Object

Pixel.Object = function() {
	this.bInitPressed = false;
	this.bPressed = false;
	
	this.pos = {
		x:0,
		y:0
	}
	
	this.width = 0;
	this.height = 0;
	
	this.radius = 0;
	
	this.shapeMode = Pixel.OBJECT_SHAPE_RECT;
	
	this.rect = new Pixel.Rectangle();
	
	Pixel.EventDispatcher.call(this);
}

Pixel.Object.prototype = new Pixel.EventDispatcher();


//-------------------------------------------------------
Pixel.Object.prototype.show = function() {
},


//-------------------------------------------------------
Pixel.Object.prototype.hide = function() {
},


//-------------------------------------------------------
Pixel.Object.prototype.setPos = function(x,y) {
	if(Pixel.isSet(x)) this.pos.x = x;
	if(Pixel.isSet(y)) this.pos.y = y;
	
	this.setRect();
},


//-------------------------------------------------------
Pixel.Object.prototype.getPos = function() {
	return this.pos;
},


//-------------------------------------------------------
Pixel.Object.prototype.setSize = function(width, height) {
	if(Pixel.isSet(width))	this.width	= width;
	if(Pixel.isSet(height)) this.height = height;
	
	this.setRect();
},


//-------------------------------------------------------
//Set Rect, for touches, can be overridden for cases like textfields (alignment + baseline issues)
Pixel.Object.prototype.setRect = function() {
	this.rect.set(this.pos.x, this.pos.y, this.width, this.height);
},


//-------------------------------------------------------
Pixel.Object.prototype.getRect = function() {
	return this.rect;
},


//-------------------------------------------------------
Pixel.Object.prototype.getWidth = function() {
	return this.width;
},


//-------------------------------------------------------
Pixel.Object.prototype.getHeight = function() {
	return this.height
},


//-------------------------------------------------------
Pixel.Object.prototype.setShapeMode = function(shapeMode) {
	this.shapeMode = shapeMode;
},

//-------------------------------------------------------
//Event Listeners

//-------------------------------------------------------
Pixel.Object.prototype.isPressed = function() {
	return this.bPressed;
},


//-------------------------------------------------------
Pixel.Object.prototype.touchStart = function(touch) {
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
Pixel.Object.prototype.touchMoved = function(touch) {
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
Pixel.Object.prototype.touchEnd = function(touch) {
	this.bInitPressed = this.bPressed = false;
	return this.bPressed;
}//-------------------------------------------------------
//Pixel.Image.js
//Forloading, storing, manipulating, etc

Pixel.Image = function(url) {
	Pixel.Object.call(this);
	
	if(url != undefined) this.load(url);
	
	this.bAllocated = false;
}

Pixel.Image.prototype = new Pixel.Object();


//-------------------------------------------------------
Pixel.Image.prototype.load = function(src) {
	this.clear();
	
	this.image = new Image();
	var self = this;
	this.image.addEventListener("load", function() { 
		self.bLoaded = true;
		
		//Get Size of Image
		self.setSize(this.width, this.height);
	});
	
	
	this.image.addEventListener("error", function() {
		console.log("Could not load image from '" + url + "'");
	});
	
	
	this.image.src = src;
};



//-------------------------------------------------------
Pixel.Image.prototype.isLoaded = function() {
	return this.bLoaded;
};



//-------------------------------------------------------
Pixel.Image.prototype.clear = function() {
	this.bLoaded	= false;
	this.pixels		= null;
	this.imageData	= null;
	this.image		= null;
};



//-------------------------------------------------------
Pixel.Image.prototype.setSize = function(width, height) {
	Pixel.Object.prototype.setSize.call(this, width,height);
	
	if(this.bAllocated == false) {			
		//Get Canvas Ref
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.imageData = this.ctx.getImageData(0,0,this.getWidth(), this.getHeight());
	}
	
	
	this.canvas.setAttribute("width", this.width);
	this.canvas.setAttribute("height", this.height);
};



//-------------------------------------------------------
Pixel.Image.prototype.getImageData = function() {
	return this.imageData;
};



//-------------------------------------------------------
Pixel.Image.prototype.getPixels = function() {
	if(this.bLoaded) {			
		this.ctx.drawImage(this.image, 0,0);
		this.imageData	= this.ctx.getImageData(0,0,this.size.width, this.size.height)
		this.pixels		= this.imageData.data;
		return this.pixels;
	}
	return null;
};



//-------------------------------------------------------
Pixel.Image.prototype.setFromPixels = function(pixels, width, height){
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
		this.bLoaded = true;
	}.bind(this));
	
	this.image.src = this.canvas.toDataURL("image/png");
};//-------------------------------------------------------
//Pixel.Font.js
//Used for storing font information for convenience 

Pixel.FontSizeCvs = null;

Pixel.Font = function(font, size, alignment, baseline) {
	this.font		= font || "Arial";
	this.size		= size || 12;
	this.alignment	= alignment || Pixel.TEXT_BASELINE_LEFT;
	this.baseline	= baseline || Pixel.TEXT_BASELINE_TOP;
	
	//Create canvas for getting sizes, if not defined yet
	if(Pixel.FontSizeCvs == null) {
		Pixel.FontSizeCvs = new Pixel.Canvas(Pixel.RENDER_MODE_2D);
	}
}


//-------------------------------------------------------
Pixel.Font.prototype.setSize = function(size) {
	this.size = size;
}


//-------------------------------------------------------
Pixel.Font.prototype.setFont = function(font) {
	this.font = font;
}


//-------------------------------------------------------
Pixel.Font.prototype.setSize = function(size) {
	this.size = size;
}


//-------------------------------------------------------
Pixel.Font.prototype.setFont = function(font) {
	this.font = font;
}

//-------------------------------------------------------
Pixel.Font.prototype.setAlignment = function(alignment) {
	this.alignment = alignment;
}


//-------------------------------------------------------
Pixel.Font.prototype.setBaseline = function(baseline) {
	this.baseline = baseline;
}

//-------------------------------------------------------
Pixel.Font.prototype.getSize = function() {
	return this.size;
}

//-------------------------------------------------------
Pixel.Font.prototype.getTextWidth = function(text) {
	Pixel.FontSizeCvs.setFont(this);
	return Pixel.FontSizeCvs.getTextWidth(text);
}

//-------------------------------------------------------
Pixel.Font.prototype.getTextHeight = function() {
	return Math.round(this.size * 1.5);
}//-------------------------------------------------------
//Pixel.Textfield.js
//Font class with added capabilities like position, size, etc


Pixel.Textfield = function(text, font) {
	Pixel.Object.call(this);

	this.font 	= font || new Pixel.Font("Arial", 14);
	this.color	= new Pixel.Color(255,255,255,1);
	
	this.text	= text || "Text not set";
	this.setText(this.text);
}

Pixel.Textfield.prototype = new Pixel.Object();


//-------------------------------------------------------
Pixel.Textfield.prototype.setFont = function(font, size, alignment, baseline) {
	if(size != undefined) {
		this.font = new Pixel.Font(font, size, alignment, baseline);
	} else {
		this.font = font;
	}
}

//-------------------------------------------------------
Pixel.Textfield.prototype.setColor = function(r,g,b,a) {
	this.color.set(r,g,b,a);
}

//-------------------------------------------------------
Pixel.Textfield.prototype.setText = function(text) {
	this.text = text;
	
	this.width	= this.font.getTextWidth(this.text);
	this.height	= this.font.getTextHeight(this.text);
	
	this.setRect();
}


//-------------------------------------------------------
Pixel.Textfield.prototype.setRect = function() {
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
}//-------------------------------------------------------
//Pixel.App.js
Pixel.App = function() {
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
}

Pixel.App.prototype = new Pixel.Canvas();



//-------------------------------------------------------
Pixel.App.prototype.start = function() {
	this.bRunning = true;
}


//-------------------------------------------------------
Pixel.App.prototype.stop = function() {
	this.bRunning = false;
}


//-------------------------------------------------------
//Empty functions in case someone doesn't want to define them
Pixel.App.prototype.setup = function(){};
Pixel.App.prototype.update = function(){};
Pixel.App.prototype.draw = function(){};	



//-------------------------------------------------------
Pixel.App.prototype.run = function() {
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
}

//-------------------------------------------------------
//FPS
//-------------------------------------------------------
Pixel.App.prototype.setFPS = function(fps) {
	this.fps = fps;
}


//-------------------------------------------------------
Pixel.App.prototype.getFPS = function() {
	return this.fps;
}

//-------------------------------------------------------
Pixel.App.prototype.showFPS = function() {
	//Clear samples
	for(var i=0;i<this.fpsSamples.length; i++) {
		this.fpsSamples[i] = 0;
	}
	
	this.bShowFPS = true;
}




//-------------------------------------------------------
Pixel.App.prototype.hideFPS = function() {
	this.bShowFPS = false;
}




//-------------------------------------------------------
Pixel.App.prototype.updateFPS = function() {
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
}




//-------------------------------------------------------
Pixel.App.prototype.drawFPS = function() {
	this.setFont(this.fpsFont);
	
	this.setColor(0,0,0);
	this.drawText("FPS: " + this.curFps.toFixed(2), 20, 20);
	this.setColor(255,255,2550);
	this.drawText("FPS: " + this.curFps.toFixed(2), 22, 22);
}




//-------------------------------------------------------
//Time
Pixel.App.prototype.getElapsedTime = function() {
	var curTime = new Date().getTime();
	return curTime - this.startTime;
}



//-------------------------------------------------------
//Events



//-------------------------------------------------------
//Touch Events (touch start, touchemoved, touchend)
//Touch Events have an id and position (x,y)
Pixel.App.prototype.touches = [],


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
}



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
}



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
}


//-------------------------------------------------------
//Mouse Events
//Mouse Events (touch start, touchemoved, touchend)
//Mouse Events have an x and y position

Pixel.App.prototype.bMouseDown = false,

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
}


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
}



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
}



//-------------------------------------------------------
Pixel.App.prototype.mouseDraggedListener = function(e) {
	
}
