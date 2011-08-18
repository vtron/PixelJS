//------------------------------------------------------
//Abstract Class for Rendering, calls the appropriate renderer and passes items
//Works as both a ghetto Javascript Interface and a way to Implement drawing functionality in main app
//Right now a bit overkill b/c only 2D rendering is implemented :)

if(!Pixel) {
	var Pixel = {};
	if(!px) var px = Pixel;
}



Pixel.Renderer = new Class({
	renderer:null,
	
	//-------------------------------------------------------
	setRenderer: function(canvasElement, rendererType) {
		switch(rendererType) {
			case Pixel.RENDER_MODE_2D:
				this.renderer = new Pixel.Renderer2D(canvasElement);
				break;
			case Pixel.RENDER_MODE_WEBGL:
				Pixel.log("WebGL Renderer not yet implemented!");
				break;
			default:
				Pixel.log("Renderer Type does not exist");
				break;
		}
	},
	
	
	//-------------------------------------------------------
	clear: function(x,y,width,height) { 
		this.renderer.clear(x,y,width,height); 
	},


	//-------------------------------------------------------
	//COLOR	
	//-------------------------------------------------------
	setColor: function(r,g,b,a) {
		this.renderer.setColor(r,g,b,a);
	},
	
	//-------------------------------------------------------
	useColor: function(color) {
		this.renderer.useColor(color);
	},
	
	//-------------------------------------------------------
	fill: function() {
		this.renderer.fill();
	},
	
	//-------------------------------------------------------
	noFill: function() {
		this.renderer.noFill();
	},
	
	//-------------------------------------------------------
	stroke: function(size) {
		this.renderer.stroke(size);
	},
	
	//-------------------------------------------------------
	noStroke: function() {
		this.renderer.noStroke();
	},
	
	
	//-------------------------------------------------------
	//IMAGE DRAWING
	//-------------------------------------------------------
	drawImage: function(pxImage, x, y) {
		this.renderer.drawImage(pxImage, x, y);
	},
	
	
	
	//-------------------------------------------------------
	//SHAPE DRAWING
	
	//-------------------------------------------------------
	beginShape:function(x,y) {
		this.renderer.beginShape(x,y);
	},
	
	//-------------------------------------------------------
	addVertex:function(x,y, bEnd) {
		this.renderer.addVertex(x,y, bEnd);
	},
	
	//-------------------------------------------------------
	endShape:function(x,y) {
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
});