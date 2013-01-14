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
Pixel.ALIGNMENT_LEFT_TOP		= 0,
Pixel.ALIGNMENT_LEFT_CENTER		= 1,
Pixel.ALIGNMENT_LEFT_BOTTOM		= 2;

Pixel.ALIGNMENT_RIGHT_TOP		= 3,
Pixel.ALIGNMENT_RIGHT_CENTER	= 4,
Pixel.ALIGNMENT_RIGHT_BOTTOM	= 5,

Pixel.ALIGNMENT_CENTER_TOP		= 6,
Pixel.ALIGNMENT_CENTER_BOTTOM	= 7,
Pixel.ALIGNMENT_CENTER_CENTER	= 8;

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
	console.log("PixelJS: " + message)
};

//-------------------------------------------------------
//IPHONE (maybe android too but only tested on iPhone so far)

//Touch device detection
//from http://stackoverflow.com/questions/2607248/optimize-website-for-touch-devices
Pixel.isTouchDevice = function() {
	return "ontouchstart" in window;
}

Pixel.getDeviceScale = function() {
	return window.devicePixelRatio;
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
//Utils
//Various classes and functions that make math easier
Pixel.Math = new Object;


//-------------------------------------------------------
//! Radians & Degrees
//-------------------------------------------------------
Pixel.Math.radiansToDegrees = function(rad) {
	return rad * (180/Math.PI);
};

Pixel.Math.degreesToRadians = function(deg) {
	return deg * (Math.PI/180);
};




//-------------------------------------------------------
//! Mapping/Distance
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
Pixel.Rect.prototype.top = function() {
	return this.y;
}

//-------------------------------------------------------
Pixel.Rect.prototype.right = function() {
	return this.x + this.width;
}

//-------------------------------------------------------
Pixel.Rect.prototype.bottom = function() {
	return this.y + this.height;
}

//-------------------------------------------------------
Pixel.Rect.prototype.left = function() {
	return this.x;
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
	if(rect.left() < this.left()) this.x = rect.x;
	if(rect.top() < this.top()) this.y = rect.y;
	
	if(rect.right() > this.right())		this.width	+= rect.right()-this.right();
	if(rect.bottom() > this.bottom())	this.height	+= rect.bottom()-this.bottom();
}//-------------------------------------------------------
//Pixel.Font.js
//Used for storing font information for convenience 

//Empty canvas object for rendering
Pixel.FontSizeCvs = null;

Pixel.Font = function(family) {
	this.fontFamily	= family || "Arial";
	this.alignment	= Pixel.TEXT_ALIGN_LEFT;
	this.baseline	= Pixel.TEXT_BASELINE_TOP;
	
	//Create canvas for getting sizes, if not defined yet
	if(Pixel.FontSizeCvs == null) {
		Pixel.FontSizeCvs = new Pixel.Canvas(Pixel.RENDER_MODE_2D);
	}
}

//-------------------------------------------------------
Pixel.Font.prototype.setFamily = function(family) {
	this.fontFamily = fontName;
}

//-------------------------------------------------------
Pixel.Font.prototype.getFamily = function(family) {
	return this.fontFamily;
}


//-------------------------------------------------------
Pixel.Font.prototype.setBaseline = function(baseline) {
	this.baseline = baseline;
}


//-------------------------------------------------------
Pixel.Font.prototype.getTextWidth = function(text, size) {
	Pixel.FontSizeCvs.setFont(this.fontFamily, size);
	return Pixel.FontSizeCvs.getTextWidth(text);
}

//-------------------------------------------------------
Pixel.Font.prototype.getTextHeight = function(text, size) {
	var text = document.createElement('span');
	text.style.font = size + "px " + this.fontFamily;
	text.innerHTML	= text;
	
	var block = document.createElement('div');
	block.style.display = "inline-block";
	block.style.width="1px";
	block.style.height="0px";
	
	var div = document.createElement('div');
	div.appendChild(text);
	div.appendChild(block);
	
	document.body.appendChild(div);
	
	try {
		var result = {};
		
		block.style.verticalAlign = 'baseline';
		result.ascent = block.offsetTop - text.offsetTop;
		
		block.style.verticalAlign = 'bottom';
		result.height = block.offsetTop - text.offsetTop;
		
		result.descent = result.height - result.ascent;
	
	} finally {
		document.body.removeChild(div);
	}
	
	return result;
}

//-------------------------------------------------------
Pixel.Font.prototype.getTextMetrics = function(text, size) {
	var tWidth	= this.getTextWidth(text, size);
	var tHeight = this.getTextHeight(text, size);
	
	return {
		width: tWidth,
		height: tHeight.height,
		ascent: tHeight.ascent,
		descent: tHeight.descent
	}
}//-------------------------------------------------------
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
//Returns color as rgba(r,g,b,a) string
Pixel.Color.prototype.toRGBAString = function() {
	return Pixel.getColorAsRGBAString(this.r,this.g, this.b, this.a);
};


//-------------------------------------------------------
//Color Utils

//-------------------------------------------------------
//Returns color as rgba(r,g,b,a) string
Pixel.getColorAsRGBAString = function(r,g,b,a) {
	r = Math.round(r);
	g = Math.round(g);
	b = Math.round(b);

	//Set using color Object if only first var is combined (ghetto overloading?)
	if(g==undefined) {
		return "rgba(" + r + "," + g + "," + b + "," + a + ")";
	} 
		
	//RGB
	if(a==undefined) {
		return "rgba(" + r + "," + g + "," + b + ",255)";
	} 
	
	//RGBA
	return "rgba(" + r + "," + g + "," + b + "," + a + ")";
};



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
//-------------------------------------------------------
//Main Object
Pixel.Object = function() {
	this.canvas				= null;
	
	this.name				= "";
	
	this.pos				= new Pixel.Point(0,0,0);
	this.offset				= new Pixel.Point(0,0,0);
	
	this.width				= 0;
	this.height 			= 0;
	this.bounds 			= new Pixel.Rect(0,0,0,0);
	this.shouldDrawBounds 	= false;
	
	this.rotation			= 0;
	this.alignment			= Pixel.ALIGNMENT_TOP_LEFT;
	this.scaleAmount		= new Pixel.Point(1,1,0);
	this.rotation			= 0;
	
	this.cache				= null;
	this.isCaching			= false;
	
	this.visible			= true;
	
	this.parent				= null;
	this.children			= [];
}


//-------------------------------------------------------
Pixel.Object.prototype.update = function() {
	for(var i=0; i<this.children.length; i++)  {
		this.children[i].update();
	}
}


//-------------------------------------------------------
Pixel.Object.prototype.draw = function() {
	if(this.children.length != 0 && this.canvas && this.visible) {
		this.calculateBounds();
		this.calculateOffset();
		
		this.canvas.pushMatrix();
		this.canvas.translate(this.pos.x + this.offset.x, this.pos.y + this.offset.y, 0);
		this.canvas.rotate(this.rotation);
		this.canvas.scale(this.scaleAmount.x, this.scaleAmount.y);
		
		if(this.isCaching == false) {
			for(var i=0; i<this.children.length; i++) {
				this.children[i].draw();
			}
		} else {
			this.canvas.drawImage(this.cache.element, 0, 0, this.cache.getWidth(), this.cache.getHeight());
		}
		
		if(this.shouldDrawBounds) {
			this.drawBounds();
		}
		
		this.canvas.popMatrix();
	} else {
		console.log("No children");
	}
}

//-------------------------------------------------------
Pixel.Object.prototype.setCanvas = function(canvas) {
	this.canvas = canvas;
	
	var i=this.children.length;
	while(i--) {
		this.children[i].setCanvas(canvas);
	}
}

//-------------------------------------------------------
Pixel.Object.prototype.setVisible = function(isVisible) {
	this.visible = isVisible;
}


//-------------------------------------------------------
//! Children
//-------------------------------------------------------

//-------------------------------------------------------
Pixel.Object.prototype.addChild = function(childObject) {
	if(childObject.parent != null) {
		childObject.parent.removeChild(childObject);
	}
	
	childObject.parent = this;
	
	this.children.push(childObject);
	
	if(this.isCaching == false) {
		childObject.setCanvas(this.canvas);
	} else {
		childObject.setCanvas(this.cache);
		this.doCaching();
	}
}


//-------------------------------------------------------
Pixel.Object.prototype.removeChild = function(childObject) {
	var index = this.children.lastIndexOf(childObject);
	if(index != -1) {
		this.children.splice(i, 1);
	}
	var i = this.children.length;
	while(i--) {
		if(this.children[i] == childObject) {
			childObject.parent = null;
			childObject.canvas = null;
			this.children.splice(i, 1);
			return true;
		}
	}
	
	return false;
}


//-------------------------------------------------------
Pixel.Object.prototype.moveChildForward = function(object) {
	//If its already on top, just return
	if(object == this.children[this.children.length-1]) {
		return false;
	} else {
		//Get the current index
		var index = this.children.lastIndexOf(object);
		
		if(index != -1) {
			this.children.splice(index, 1);
			
			if(index < this.children.length) {
				this.children.splice(index + 1, 0, object);
			} else {
				this.children.push(object);
			}
			return true;
		} else {
			return false;
		}
	}
}


//-------------------------------------------------------
Pixel.Object.prototype.moveChildToFront = function(object) {
	var index = this.children.lastIndexOf(object);
	
	if(index != -1) {
		this.children.splice(index, 1);
		this.children.push(object);
		return true;
	} else {
		return false;
	}
}


//-------------------------------------------------------
Pixel.Object.prototype.moveChildBackward = function(object) {
	//If its already last, just return
	if(object == this.children[0]) {
		return false;
	} else {
		//Get the current index
		var index = this.children.lastIndexOf(object);
		
		if(index != -1) {
			this.children.splice(index, 1);
			if(index -1 > 0) {
				this.children.splice(index - 1, 0, object);
			} else {
				this.children.unshift(object);
			}
			return true;
		} else {
			return false;
		}
	}
}


//-------------------------------------------------------
Pixel.Object.prototype.moveChildToBack = function(object) {
	var index = this.children.lastIndexOf(object);
	
	if(index != -1) {
		this.children.splice(index, 1);
		this.children.unshift(object);
		return true;
	} else {
		return false;
	}
}


//-------------------------------------------------------
//! Size
//-------------------------------------------------------

//-------------------------------------------------------
Pixel.Object.prototype.getWidth = function() {
	return this.bounds.width;
}


//-------------------------------------------------------
Pixel.Object.prototype.getHeight = function() {
	return this.bounds.height;
}


//-------------------------------------------------------
Pixel.Object.prototype.getSize = function() {
	return { "width": this.getWidth(), "height": this.getHeight() };
}


//-------------------------------------------------------
//! Bounds
//-------------------------------------------------------

//-------------------------------------------------------
Pixel.Object.prototype.getBounds = function() {
	this.calculateBounds();
	return this.bounds;
}

//-------------------------------------------------------
Pixel.Object.prototype.calculateBounds = function() {
	this.bounds.set(0,0,0,0);
	var childBounds;
	for(var i=0; i<this.children.length; i++) {
		childBounds = this.children[i].getBounds();
		childBounds.x += this.children[i].pos.x;
		childBounds.y += this.children[i].pos.y;
		this.bounds.include(childBounds);
	}
}

//-------------------------------------------------------
Pixel.Object.prototype.setDrawBounds = function(shouldDrawBounds) {
	this.shouldDrawBounds = shouldDrawBounds;
}

//-------------------------------------------------------
Pixel.Object.prototype.getDrawBounds = function() {
	return this.shouldDrawBounds;
}

//-------------------------------------------------------
Pixel.Object.prototype.drawBounds = function() {
	//Draw Frame
	this.canvas.setStrokeSize(1);
	this.canvas.setStrokeColor(255,0,0);
	this.canvas.noFill();
	
	this.canvas.drawRect(this.bounds.x, this.bounds.y, this.getWidth(), this.getHeight());
	
	//Draw Origin
	this.canvas.setFillColor(255,0,0);
	this.canvas.noStroke();
	
	this.canvas.drawRect(-2, -2, 4,4);
}


//-------------------------------------------------------
//! Alignment/Offset
//-------------------------------------------------------

//-------------------------------------------------------
Pixel.Object.prototype.setAlignment = function(alignment) {
	this.alignment = alignment;
}


//-------------------------------------------------------
//Returns offest (based on alignment) as Pixel.Point
Pixel.Object.prototype.calculateOffset = function() {
	switch(this.alignment) {
		case Pixel.ALIGNMENT_LEFT_TOP:
			this.offset.set(0, 0);
			break;
		
		case Pixel.ALIGNMENT_LEFT_CENTER:
			this.offset.set(0, -this.getHeight()/2);
			break;
		
		case Pixel.ALIGNMENT_LEFT_BOTTOM:
			this.offset.set(0, -this.getHeight());
			break;
		
		case Pixel.ALIGNMENT_RIGHT_TOP:
			this.offset.set(-this.getWidth(), 0);
			break;
		
		case Pixel.ALIGNMENT_RIGHT_CENTER:
			this.offset.set(-this.getWidth(), -this.getHeight()/2);
			break;
		
		case Pixel.ALIGNMENT_RIGHT_BOTTOM:
			this.offset.set(-this.getWidth(), -this.getHeight());
			break;
		
		case Pixel.ALIGNMENT_CENTER_TOP:
			this.offset.set(-this.getWidth()/2, 0);
			break;
		
		case Pixel.ALIGNMENT_CENTER_BOTTOM:
			this.offset.set(-this.getWidth()/2, -this.getHeight());
			break;
		
		case Pixel.ALIGNMENT_CENTER_CENTER:
			this.offset.set(-this.getWidth()/2, -this.getHeight()/2);
			break;
	}
}

//-------------------------------------------------------
//! Caching
//-------------------------------------------------------

//-------------------------------------------------------
Pixel.Object.prototype.setCaching = function(shouldCache) {
	this.isCaching = shouldCache;
	
	if(shouldCache) {
		if(this.cache == null) {
			this.createCache();
			//Set children to use this cache
			var i=this.children.length;
			while(i--) {
				this.children[i].setCanvas(this.cache);
			}
		}
		
		this.doCaching();
	} else {
		//Return children to original canvas
		var i=this.children.length;
		while(i--) {
			this.children[i].setCanvas(this.canvas);
		}
		
		//Free up the cache
		delete this.cache;
	}
}

//-------------------------------------------------------
Pixel.Object.prototype.createCache = function() {
	//Create canvas for caching
	this.cache = new Pixel.Canvas();
	this.calculateBounds();
	this.cache.setSize(this.getWidth() * window.devicePixelRatio, this.getHeight() * window.devicePixelRatio);
}

//-------------------------------------------------------
Pixel.Object.prototype.updateCache = function() {
	if(!this.isCaching) {
		this.setCaching(true);
	}
	
	this.doCaching();
}



//-------------------------------------------------------
Pixel.Object.prototype.doCaching = function() {
	this.calculateBounds();
	this.cache.setSize(this.getWidth() * window.devicePixelRatio, this.getHeight() * window.devicePixelRatio);
	console.log(this.cache.width);
	this.cache.pushMatrix();
	this.cache.scale(window.devicePixelRatio,window.devicePixelRatio,1);
	for(var i=0; i<this.children.length; i++) {
		this.children[i].draw();
	}
	this.cache.popMatrix();
}

//-------------------------------------------------------
//! Handlers
//-------------------------------------------------------

//-------------------------------------------------------
Pixel.Object.prototype.eventHandler = function(event) {
}


//-------------------------------------------------------
Pixel.Object.prototype.messageHandler = function(msg) {
}//-------------------------------------------------------
//-------------------------------------------------------
//Pixel.Shape2D.js
//Contains a base shape for 2D shapes

//-------------------------------------------------------
//-------------------------------------------------------
// !Shape2D

Pixel.Shape2D = function() {
	Pixel.Object.call(this);
	
	this.fillColor			= new Pixel.Color(255,255,255);
	this.fillEnabled		= true;
	
	this.strokeColor		= new Pixel.Color();
	this.strokeSize			= 1;
	this.strokeEnabled		= false;
}

Pixel.Shape2D.prototype = Object.create(Pixel.Object.prototype);

//-------------------------------------------------------
//! Override addChid to throw error,
//Shape objects can't have children

//-------------------------------------------------------
Pixel.Shape2D.prototype.addChild = function(child) {
	Pixel.log("Error: Children cannot be added to a shape object");
}

//-------------------------------------------------------
//! Fill

//-------------------------------------------------------
Pixel.Shape2D.prototype.enableFill = function() {
	this.fillEnabled = true;
}


//-------------------------------------------------------
Pixel.Shape2D.prototype.disableFill = function() {
	this.fillEnabled = false;
}


//-------------------------------------------------------
Pixel.Shape2D.prototype.setFillColor = function(r,g,b,a) {
	this.fillColor.set(r,g,b,a);
}

//-------------------------------------------------------
//! Stroke
//-------------------------------------------------------
Pixel.Shape2D.prototype.enableStroke = function() {
	this.strokeEnabled = true;
}


//-------------------------------------------------------
Pixel.Shape2D.prototype.disableStroke = function() {
	this.strokeEnabled = false;
}


//-------------------------------------------------------
Pixel.Shape2D.prototype.setStrokeSize = function(size) {
	this.strokeSize = size;
	this.strokeEnabled = true;
}


//-------------------------------------------------------
Pixel.Shape2D.prototype.setStrokeColor = function(r,g,b,a) {
	this.strokeColor.set(r,g,b,a);
}


//-------------------------------------------------------
//! Size
//-------------------------------------------------------
Pixel.Shape2D.prototype.getWidth = function() {
	return this.width;
}

//-------------------------------------------------------
Pixel.Shape2D.prototype.setWidth = function(width) {
	this.width = width;
}


//-------------------------------------------------------
Pixel.Shape2D.prototype.getHeight = function() {
	return this.height;
}


//-------------------------------------------------------
Pixel.Shape2D.prototype.setHeight = function(height) {
	this.height = height;
}


//-------------------------------------------------------
Pixel.Shape2D.prototype.getSize = function() {
	return { "width": this.getWidth(), "height": this.getHeight() };
}


//-------------------------------------------------------
Pixel.Shape2D.prototype.setSize = function(width, height) {
	this.setWidth(width);
	this.setHeight(height);
}

//-------------------------------------------------------
//! Bounds
//-------------------------------------------------------

//-------------------------------------------------------
Pixel.Shape2D.prototype.getBounds = function() {
	this.calculateOffset();
	return new Pixel.Rect(this.offset.x, this.offset.y, this.getWidth(), this.getHeight());
}//-------------------------------------------------------
//-------------------------------------------------------
// !RectShape

Pixel.RectShape = function() {
	Pixel.Shape2D.call(this);
}

Pixel.RectShape.prototype = Object.create(Pixel.Shape2D.prototype);


//-------------------------------------------------------
Pixel.RectShape.prototype.draw = function() {
	if(this.canvas && this.visible) {
		this.canvas.pushMatrix();
		this.canvas.translate(this.pos.x, this.pos.y, this.pos.z);
		this.canvas.rotate(this.rotation);
		
		if(this.fillEnabled) {
			this.canvas.setFillColor(this.fillColor);
		} else {
			this.canvas.noFill();
		}
		
		if(this.strokeEnabled) {
			this.canvas.setStrokeSize(this.strokeSize);
			this.canvas.setStrokeColor(this.strokeColor);
		} else {
			this.canvas.noStroke();
		}
		
		this.calculateOffset();
		this.canvas.drawRect(this.offset.x, this.offset.y, this.width, this.height);
		
		this.canvas.popMatrix();
	}
}//-------------------------------------------------------
//-------------------------------------------------------
// !EllipseShape

Pixel.EllipseShape = function() {
	Pixel.Shape2D.call(this);
}

Pixel.EllipseShape.prototype = Object.create(Pixel.Shape2D.prototype);


//-------------------------------------------------------
Pixel.EllipseShape.prototype.draw = function() {
	if(this.canvas && this.visible) {
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
//Pixel.Image.js
//For loading, storing, manipulating, etc
Pixel.ImageShape = function(image) {
	Pixel.Shape2D.call(this);
	
	this.image		= null;
	this.imageData	= null;
	this.pixels		= null;
	
	this.load(image);
}

Pixel.ImageShape.prototype = Object.create(Pixel.Shape2D.prototype);


//-------------------------------------------------------
Pixel.ImageShape.prototype.load = function(image) {
	if(image != undefined) {
		//Load from existing Pixel Canvas
		if(image instanceof Pixel.Canvas) {
			this.image	= image.element;
			this.width	= image.width;
			this.height	= image.height;
		} 
		
		//Just keep a reference if it is already loaded
		else if(image.tagName == "CANVAS" || image instanceof Image) {
			this.image = image;
			this.width = this.image.width;
			this.height	= this.image.height;
		}
		
			//If its a string, we need to load the image with a callback
		else if(typeof(image) ==  "string") {
			this.image = new Image();
			
			//Add load listener to set default widht/height of image
			var self = this;
			this.image.onload = function() {
				//If the image width/height arent' set or are 0,
				//Use the value from the image
				if(self.width == 0 || this.height == 0) {			
					self.width		= this.width;
					self.height		= this.height;
				}
			}
			
			this.image.src = image;
		}
	}
}


//-------------------------------------------------------
Pixel.ImageShape.prototype.draw = function() {
	if(this.canvas && this.visible) {
		//Make sure image isn't null
		if(this.image == null) return;
		
		//If its a JS Image Obj, make sure it is loaded
		if((typeof(this.image) == "image") && (this.image.complete == false)) return;
		
		//Otherwise, draw it
		this.canvas.pushMatrix();
		this.canvas.translate(this.pos.x, this.pos.y, this.pos.z);
		this.canvas.rotate(this.rotation);

		this.calculateOffset();
		this.canvas.drawImage(this.image, this.offset.x, this.offset.y, this.width, this.height);
		
		if(this.strokeWidth > 0) {
			this.canvas.setStrokeSize(this.strokeWidth);
			this.canvas.setStrokeColor(this.strokeColor);
			this.canvas.noFill();
			this.canvas.drawRect(this.offset.x, this.offset.y, this.width, this.height);
		}
		
		this.canvas.popMatrix();
	}
}

//-------------------------------------------------------
//Chage the image to a 2D Canvas containing the image
//so we can access pixels, only done if necessary
Pixel.ImageShape.prototype.convertImageToCanvas = function() {
	var tmpCvs		= document.createElement("canvas");
	tmpCvs.width	= this.image.width;
	tmpCvs.height	= this.image.height;
	tmpCvs.getContext('2d').drawImage(this.image, 0, 0, this.image.width, this.image.height);
	
	this.image = tmpCvs;
}


//-------------------------------------------------------
Pixel.ImageShape.prototype.getPixels = function() {
	if(this.image) {
		if(this.image.tagName != "CANVAS" || !this.pixels) {
			this.convertImageToCanvas();
		}
		
		this.imageData	= this.image.getContext('2d').getImageData(0,0, this.image.width, this.image.height);
		this.pixels		= this.imageData.data;
		
		return this.pixels;
	} else {
		Pixel.log("Get Pixels: Image not loaded");
	}
}


//-------------------------------------------------------
Pixel.ImageShape.prototype.setPixels = function(pixels) {
	if(this.image.tagName != "CANVAS" || !this.pixels) {
		this.convertImageToCanvas();
	}
	
	this.imageData.data = pixels;
	this.image.getContext('2d').putImageData(this.imageData, 0, 0);
}

/*
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
});*/
//-------------------------------------------------------
//Pixel.TextField.js
//Font class with added capabilities like position, size, etc
Pixel.TextField = function(font) {
	Pixel.Shape2D.call(this);
	
	//Size
	this.width	= 100;
	this.height = 50;
	
	this.textWidth	= 0;
	this.textHeight	= 0;
	this.useTextBounds	= false; //Use the text bounds vs the frame of the textfield?
	
	//Text Properties
	this.font			= font || new Pixel.Font("Arial", 14);
	this.leading		= null;
	
	this.textAlignment	= Pixel.TEXT_ALIGN_LEFT;
	this.textColor		= new Pixel.Color(255,255,255,1);
	this.textSize		= 10;
	
	this.text			= "";
	
	this.hideOverflow	= false;
	
	//Layout
	this.lines		= [];
	
	
	//Default to transparent BG
	this.fillEnabled	= false;
}

Pixel.TextField.prototype = Object.create(Pixel.Shape2D.prototype);



//-------------------------------------------------------
//!Size

//-------------------------------------------------------
Pixel.TextField.prototype.setUseTextBounds = function(useTextBounds) {
	this.useTextBounds = useTextBounds;
}

//-------------------------------------------------------
Pixel.TextField.prototype.getUseTextBounds = function(useTextBounds) {
	return this.useTextBounds;
}


//-------------------------------------------------------
Pixel.TextField.prototype.getWidth = function() {
	if(this.useTextBounds) {
		return this.textWidth;
	} else {
		return this.width;
	}
}

//-------------------------------------------------------
Pixel.TextField.prototype.getHeight = function() {
	if(this.useTextBounds) {
		return this.textHeight;
	} else {
		return this.height;
	}
}

//-------------------------------------------------------
Pixel.TextField.prototype.getBounds = function() {
	this.calculateOffset();
	this.bounds.set(this.offset.x, this.offset.y, this.getWidth(), this.getHeight());
	return this.bounds;
}


//-------------------------------------------------------
//!Text Properties


//-------------------------------------------------------
Pixel.TextField.prototype.setFont = function(font) {
	if(font instanceof Pixel.Font) {
		this.font = font;
	} else {
		Pixel.log("Not a valid Pixel font object.");
	}
}


//-------------------------------------------------------
Pixel.TextField.prototype.setTextColor = function(r,g,b,a) {
	this.textColor.set(r,g,b,a);
}


//-------------------------------------------------------
Pixel.TextField.prototype.setTextSize = function(size) {
	this.textSize = size;
}


//-------------------------------------------------------
Pixel.TextField.prototype.setTextAlignment = function(textAlignment) {
	this.textAlignment = textAlignment;
}


//-------------------------------------------------------
Pixel.TextField.prototype.getTextAlignment = function() {
	return this.textAlignment;
}


//-------------------------------------------------------
Pixel.TextField.prototype.setLeading = function(leading) {
	this.leading = leading;
}


//-------------------------------------------------------
Pixel.TextField.prototype.getLeading = function() {
	return this.leading;
}


//-------------------------------------------------------
Pixel.TextField.prototype.setHideOverflow = function(hideOverflow) {
	this.hideOverflow = hideOverflow;
}


//-------------------------------------------------------
Pixel.TextField.prototype.getText = function(text) {
	return this.hideOverflow;
}


//-------------------------------------------------------
Pixel.TextField.prototype.setText = function(text) {
	this.text = text.toString();
}


//-------------------------------------------------------
Pixel.TextField.prototype.getText = function(text) {
	return this.text;
}


//-------------------------------------------------------
//!Layout

//-------------------------------------------------------
Pixel.TextField.prototype.doLayout = function() {
	this.lines = [];
	this.textWidth	= 0;
	this.textHeight = 0;
	
	var cursorX = 0,
		cursorY = 0;
	
	var words	= this.text.split(" ");
	var curLine = this.newLine();
	
	var nWords = words.length;
	for(var i=0; i<nWords; i++) {
		curLine.width	= this.font.getTextWidth(curLine.text,	this.textSize);
		var wordWidth	= this.font.getTextWidth(words[i], 		this.textSize);
		
		if(curLine.width + wordWidth < this.width) {
			curLine.text += words[i];
			if(i!= nWords-1) curLine.text +=   " ";
		} else {
			//Get metrics and add line
			curLine.metrics = this.font.getTextMetrics(curLine.text, this.textSize);
			curLine.pos.x = this.getLineXPos(curLine.metrics.width);
			curLine.pos.y = cursorY;
			this.lines.push(curLine);
				
			//Set cursor to next line, including leading
			//Default leading is 1.2 times the text size until changed manually
			
			if(this.leading == null) this.leading = curLine.metrics.height * 1.2;
			cursorY += curLine.metrics.descent + this.leading;
			
			//Check for overflow, 
			//If it is set and we're past the box we're done
			var newLineBottom = cursorY +curLine.metrics.descent + this.leading;
			
			if(this.hideOverflow &&  newLineBottom > this.height) {
				this.calculateTextBounds();
				return;
			} 
			
			//Otherwise, we begin new line		
			curLine = this.newLine();
			curLine.text = words[i];
		}
	}
	
	//Get metrics and add final line
	curLine.metrics = this.font.getTextMetrics(curLine.text, this.textSize);
	curLine.pos.x	= this.getLineXPos(curLine.metrics.width);
	curLine.pos.y	= cursorY;
	
	this.lines.push(curLine);
	
	//Set the final width & height of the text (no leading)
	this.calculateTextBounds();
}


//-------------------------------------------------------
Pixel.TextField.prototype.getLineXPos = function(lineWidth) {
	var xPos = 0;
	
	//Set Horizontal position
	switch(this.textAlignment) {
		case Pixel.TEXT_ALIGN_LEFT:
			break;
		
		case Pixel.TEXT_ALIGN_CENTER:
			xPos = this.width/2 - lineWidth/2;
			break;
			
		case Pixel.TEXT_ALIGN_RIGHT:
			xPos = this.width - lineWidth;
			break;
	}
	
	return xPos;
}


//-------------------------------------------------------
Pixel.TextField.prototype.getLines = function() {
	return this.lines;
}


//-------------------------------------------------------
Pixel.TextField.prototype.newLine = function() {
	return {
		text:"",
		pos: new Pixel.Point(),
		metrics: null
	}
}

//-------------------------------------------------------
//Calculate the width of the text box based on the widest line
Pixel.TextField.prototype.calculateTextBounds = function() {
	for(var i=0; i<this.lines.length; i++) {
		this.textWidth = (this.lines[i].metrics.width > this.textWidth) ? this.lines[i].metrics.width : this.textWidth;
	}
	
	var lastLine = this.lines[this.lines.length - 1];
	this.textHeight = lastLine.pos.y + lastLine.metrics.height;
}


//-------------------------------------------------------
Pixel.TextField.prototype.draw = function() {
	if(this.canvas && this.visible) {
		this.canvas.pushMatrix();
		
		this.canvas.translate(this.pos.x, this.pos.y, this.pos.z);
		this.canvas.rotate(this.rotation);
		this.canvas.scale(this.scaleAmount.x, this.scaleAmount.y);
		
		if(this.fillEnabled) {
			this.canvas.setFillColor(this.fillColor);
		} else {
			this.canvas.noFill();
		}
		
		if(this.strokeEnabled) {
			this.canvas.setStrokeSize(this.strokeSize);
			this.canvas.setStrokeColor(this.strokeColor);
		} else {
			this.canvas.noStroke();
		}
		
		this.calculateOffset();
		var bounds = this.getBounds();
		this.canvas.drawRect(this.offset.x, this.offset.y, bounds.width, bounds.height);
		
		this.canvas.setFillColor(this.textColor);
		this.canvas.setFont(this.font.fontFamily, this.textSize);
		this.canvas.setTextBaseline(this.font.baseline);
		
		var nLines = this.lines.length;
		for(var i=0; i<nLines; i++) {
			var thisLine = this.lines[i];
			this.canvas.drawText(thisLine.text, this.offset.x + thisLine.pos.x, this.offset.y + thisLine.pos.y);
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
// !Size Info

//-------------------------------------------------------
Pixel.Canvas.prototype.setSize = function(width,height) {
	this.width	= width;
	this.height = height;
	
	this.element.style.width	= width;
	this.element.style.height	= height;
	
	this.element.setAttribute("width",	width	* window.devicePixelRatio);
	this.element.setAttribute("height",	height	* window.devicePixelRatio);
	
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
Pixel.Canvas.prototype.enableNativeResolution = function() {
	this.renderer.scale(window.devicePixelRatio, window.devicePixelRatio);
}


//-------------------------------------------------------
// !Cursor
//-------------------------------------------------------
Pixel.Canvas.prototype.setCursor = function(x,y) {
	this.cursorX = x;
	this.cursorY = y;
};


//-------------------------------------------------------
// !Drawing
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
//!COLOR	
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
// !IMAGES
//-------------------------------------------------------
Pixel.Canvas.prototype.drawImage = function(image, x, y, width, height) {
	this.renderer.drawImage(image, x,y, width, height);
};



//-------------------------------------------------------
// !SHAPES

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
	this.renderer.drawEllipse(x,y,width,height);
};



//-------------------------------------------------------
Pixel.Canvas.prototype.drawCircle = function(x,y,size) {
	this.renderer.drawCircle(x,y,size);
};


//-------------------------------------------------------
//!TRANSFORMATIONS
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
//!TEXT

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
}; //-------------------------------------------------------
//Pixel.Renderer2D.js
//2D Rendering

Pixel.Renderer2D = function(canvas) {
	this.type 		= Pixel.RENDERER_2D;
	this.ctx		= canvas.getContext('2d');
	this.bFill		= true;
	this.bStroke	= false;
	this.bgColor	= new Pixel.Color();
	
	this.shapePos = {x:0,y:0};
	
	console.log(this.ctx.scale);
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
	this.ctx.fillStyle =  this.bgColor.toRGBAString();
	this.ctx.fillRect(x,y,width,height);
	
	//Reset cur fill
	this.ctx.fillStyle = curFill;
	
	//this.ctx.clearRect(x,y,width,height);
};

//-------------------------------------------------------
Pixel.Renderer2D.prototype.setSize = function(width, height) {};


//-------------------------------------------------------
Pixel.Renderer2D.prototype.setFillColor = function(r,g,b,a) {
	this.ctx.fillStyle = Pixel.getColorAsRGBAString(r,g,b,a);
	this.bFill = true;
};

//-------------------------------------------------------
Pixel.Renderer2D.prototype.noFill = function() {
	this.bFill = false;
};

//-------------------------------------------------------
Pixel.Renderer2D.prototype.setStrokeColor = function(r,g,b,a) {
	this.ctx.strokeStyle = Pixel.getColorAsRGBAString(r,g,b,a);
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
	this.ctx.shadowColor	= Pixel.getColorAsString(r,g,b,a)
};


//-------------------------------------------------------
Pixel.Renderer2D.prototype.noShadow = function() {
	this.ctx.shadowBlur		= 0;
	this.ctx.shadowOffsetX	= 0;
	this.ctx.shadowOffsetY	= 0;
};


//-------------------------------------------------------
//IMAGE DRAWING
Pixel.Renderer2D.prototype.drawImage = function(image, x, y, w, h) {
	this.ctx.drawImage(image, x, y, w, h);
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
Pixel.Renderer2D.prototype.drawCircle = function(x,y,size) {
	this.ctx.beginPath();
	this.ctx.arc(x + size/2, y + size/2, size/2, 0, Math.PI*2, false);
	
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
		console.log(font);
		this.setFont(font.fontFamily, font.size);
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
	switch(baseline) {
		case Pixel.TEXT_BASELINE_TOP:
			this.ctx.textBaseline = "top";
			break;
		case Pixel.TEXT_BASELINE_MIDDLE:
			this.ctx.textBaseline = "middle";
			break;
		case Pixel.TEXT_BASELINE_BOTTOM:
			this.ctx.textBaseline = "bottom";
			break;
	}
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
		}
		
		window.requestAnimFrame(this.run.bind(this));
	}
};


//-------------------------------------------------------
//FPS
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
*/