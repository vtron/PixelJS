//-------------------------------------------------------
//Pixel.RendererWebGL.js
//WebGL Rendering

Pixel.RendererWebGL = Class.extend({
	init: function(canvas) {
		//Get GL Ref
		this.gl = this.initGL(canvas);
        
        //Compile default shader
        this.shaderProgram = Pixel.getShaderProgram(this.gl, "pixelDefault-shader");
        console.log(this.shaderProgram);
        
        //Create Matrices
        this.mvMatrix	= mat4.create();
    	this.pMatrix	= mat4.create();
    	
    	this.gl.clearColor(0.0, 1.0, 0.0, 1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        
        
        //Create Buffers
		this.triangleVertexPositionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.triangleVertexPositionBuffer);
        var vertices = [
             0.0,  1.0,  0.0,
            -1.0, -1.0,  0.0,
             1.0, -1.0,  0.0
        ];
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
        this.triangleVertexPositionBuffer.itemSize = 3;
        this.triangleVertexPositionBuffer.numItems = 3;
        
		this.squareVertexPositionBuffer;
		
		this.squareVertexPositionBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
		
		var vertices = [
             1.0,  1.0,  0.0,
            -1.0,  1.0,  0.0,
             1.0, -1.0,  0.0,
            -1.0, -1.0,  0.0
        ];
        
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
        this.squareVertexPositionBuffer.itemSize = 3;
        this.squareVertexPositionBuffer.numItems = 4;
	},

	
	//-------------------------------------------------------
	initGL: function(canvas) {
		//See if we can get a WebGL ref
		try {
            var gl = canvas.getContext("experimental-webgl");
        	return gl;
        } catch (e) {
        	Pixel.log("Could not initialise WebGL");
        	return null;
        }
	},
	
	//-------------------------------------------------------
	setMatrixUniforms: function() {
        this.gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform,		false, this.pMatrix);
        this.gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform,	false, this.mvMatrix);
    },
    
    //-------------------------------------------------------
    //Takes numbers from pixel space to 
    getNormalizedCoordinates: function() {
    },
    
    //-------------------------------------------------------
    setSize: function(width, height) {
    	this.gl.viewportWidth	= width;
        this.gl.viewportHeight	= height;
    },
    
	
	//-------------------------------------------------------
	clear: function(x,y,width,height) {
        this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
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
		//Draw
        mat4.perspective(45, this.gl.viewportWidth / this.gl.viewportHeight, 0.1, 100.0, this.pMatrix);
		mat4.identity(this.mvMatrix);
		
		mat4.translate(this.mvMatrix, [-1.5, 0.0, -7.0]);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.triangleVertexPositionBuffer);
        this.gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.triangleVertexPositionBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
        this.setMatrixUniforms();
        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.triangleVertexPositionBuffer.numItems);


        mat4.translate(this.mvMatrix, [3.0, 0.0,0.0]);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.squareVertexPositionBuffer);
        this.gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, this.squareVertexPositionBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
        this.setMatrixUniforms();
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, this.squareVertexPositionBuffer.numItems);
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