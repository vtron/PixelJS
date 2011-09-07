//-------------------------------------------------------
//Pixel.Renderer2D.js
//2D Rendering

Pixel.Renderer2D = function(canvas) {
	this.ctx		= canvas.getContext('2d');
	this.bFill		= true;
	this.bStroke	= false;
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
}



//-------------------------------------------------------
Pixel.Renderer2D.prototype.addVertex = function(x,y, bEnd) {
	this.ctx.lineTo(x,y);
	
	if(bEnd != undefined) {
		this.endShape();
	}
}



//-------------------------------------------------------
Pixel.Renderer2D.prototype.endShape = function(x,y) {
	this.ctx.closePath();
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
		console.log('yea');
		this.ctx.fillText(string, this.cursorX, this.cursorY);
	}
}



//-------------------------------------------------------
Pixel.Renderer2D.prototype.drawTextfield = function(tf) {
	this.setFont(tf.font);
	this.useColor(tf.color);
	this.drawText(tf.text, tf.pos.x, tf.pos.y);
}