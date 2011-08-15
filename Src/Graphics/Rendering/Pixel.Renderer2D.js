/* 2D Context Renderer */

if(!Pixel) {
	var Pixel = {};
	if(!px) var px = Pixel;
}


Pixel.Renderer2D = new Class({
	ctx:null,
	bFill:true,
	bStroke:false,
	
	initialize:function(canvas) {
		this.ctx = canvas.getContext('2d');
	},
	

	//-------------------------------------------------------
	clear: function(x,y,width,height) {
		this.ctx.clearRect(x,y,width,height);
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
		if(pxImage.isLoaded()) {
			if(x != undefined && y != undefined) {
				this.ctx.drawImage(pxImage.image, x, y);
			} else {
				this.ctx.drawImage(pxImage.image, pxImage.getPos().x, pxImage.getPos().y);
			}
		}	
	},
	
	
	//-------------------------------------------------------
	//SHAPE DRAWING
	
	//-------------------------------------------------------
	beginShape:function(x,y) {
		this.ctx.beginPath();
		this.ctx.moveTo(x,y);
	},
	
	//-------------------------------------------------------
	addVertex:function(x,y, bEnd) {
		this.ctx.lineTo(x,y);
		
		if(bEnd != undefined) {
			this.endShape();
		}
	},
	
	//-------------------------------------------------------
	endShape:function(x,y) {
		this.ctx.closePath();
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
	drawRect: function(x,y,width,height) {
		if(this.bFill) this.ctx.fillRect(x,y,width,height);
		if(this.bStroke) this.ctx.strokeRect(x,y,width,height);
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
	//FONTS
	//-------------------------------------------------------
	setFont: function(font, size) {
		this.ctx.font = size + "pt " + font;
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
	drawText: function(string, x, y) {
		this.ctx.fillText(string, x, y);
	}
});