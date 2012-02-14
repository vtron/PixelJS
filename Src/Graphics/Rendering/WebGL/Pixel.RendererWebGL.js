//-------------------------------------------------------
//Pixel.RendererWebGL.js
//WebGL Rendering

Pixel.RendererWebGL = Class.extend({
	init: function(canvas) {
		//Get GL Ref
		this.getGlRef(canvas);
        
        //Compile default shader
        this.shader = new Pixel.Shader("pixeljs-default-shader");
        
        //Create Matrices
        this.mvMatrix	= mat4.create();
    	this.pMatrix	= mat4.create();
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
	setMatrixUniforms: function() {
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    },
    
    //-------------------------------------------------------
    //Takes numbers from pixel space to 
    getNormalizedCoordinates: function() {
    }
    
	
	//-------------------------------------------------------
	clear: function(x,y,width,height) {
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
        mat4.identity(mvMatrix);

	},
	
	
	//-------------------------------------------------------
	setFillColor: function(r,g,b,a) {
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
	drawImage: function(pxImage, x, y, w, h) {
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
	},
	
	
	//-------------------------------------------------------
	drawRoundedRect: function(x,y,width,height, radius) {
	},
	
	
	//-------------------------------------------------------
	drawSquare: function(x,y,size) {
		squareVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        vertices = [
             1.0,  1.0,  0.0,
            -1.0,  1.0,  0.0,
             1.0, -1.0,  0.0,
            -1.0, -1.0,  0.0
        ];
	},
	
	
	//-------------------------------------------------------
	drawEllipse: function(x,y,width,height) {
	},
	
	
	//-------------------------------------------------------
	drawCircle: function(x,y,radius) {
	},
	
	
	//-------------------------------------------------------
	//TRANSFORMATIONS
	//-------------------------------------------------------
	pushMatrix: function() {
	},
	
	
	//-------------------------------------------------------
	popMatrix: function() {
	},
	
	
	//-------------------------------------------------------
	translate: function(x,y) {
	},
	
	
	//-------------------------------------------------------
	scale: function(x,y) {
	},
	
	
	//-------------------------------------------------------
	rotate: function(angle) {
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
});
});