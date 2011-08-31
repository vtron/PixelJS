//-------------------------------------------------------
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
};