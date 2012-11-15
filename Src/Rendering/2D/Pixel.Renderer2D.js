 //-------------------------------------------------------
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
  
  if(this.bStroke) this.ctx.stroke();
  if(this.bFill) this.ctx.fill();
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
};