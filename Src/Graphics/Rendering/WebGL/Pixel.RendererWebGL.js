//-------------------------------------------------------
//Pixel.RendererWebGL.js
//WebGL Rendering
//Most code based on learningwebgl.com

//Matrix math uses the gl-matrix lib by Toji https://github.com/toji/gl-matrix/

Pixel.RendererWebGL = Class.extend({
	init: function(canvas) {
		this.fillColor		= new Pixel.Color();
		this.strokeColor	= new Pixel.Color();
	
		//Get GL Ref
		this.gl = this.initGL(canvas);
        
        //Compile default shader
        this.shaderProgram = Pixel.getShaderProgram(this.gl, "pixelDefault-shader");
        
        //Create Matrices
    	this.pMatrix		= mat4.create();
        this.mvMatrixStack	= [];
        this.mvMatrix		= mat4.create();
    	
        this.gl.enable(this.gl.DEPTH_TEST);
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
    getNormalizedCoordinates: function(x, y) {
    	var newX = Pixel.Math.map(0.0, this.gl.viewportWidth, x, 0.0, 2.0);
    	var newY = Pixel.Math.map(0.0, this.gl.viewportHeight, y, 0.0, -2.0);
    
    	return {x:newX, y:newY};
    },
    
    //-------------------------------------------------------
    setSize: function(width, height) {
    	this.gl.viewportWidth	= width;
        this.gl.viewportHeight	= height;
    },
    
	
	//-------------------------------------------------------
	clear: function(x,y,width,height, color) {
		this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
        
        var bgColor = Pixel.normalizeRGB(color);
        this.gl.clearColor(bgColor.r, bgColor.g, bgColor.b, color.a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        
        mat4.ortho(-1, 1, -1, 1, -1, 1, this.pMatrix);
        
        mat4.identity(this.mvMatrix);
        mat4.translate(this.mvMatrix, [-1, 1, 0]);
		
	},
	
	
	//-------------------------------------------------------
	setFillColor: function(r,g,b,a) {
		this.fillColor.set(r,g,b,a);
		this.fillColor.normalizeRGB();
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
		var topLeft = this.getNormalizedCoordinates(x,y);
		var bottomRight = this.getNormalizedCoordinates(x+width,y+height);
		
		var x1 = topLeft.x;
		var x2 = bottomRight.x;
		
		var y1 = topLeft.y;
		var y2 = bottomRight.y;
		
		//Vertex Buffer
		var vertices = [
			x1,		y1,		0.0,
            x1,		y2,		0.0,
            x2,		y1,		0.0,
           	x2,		y2,		0.0
        ];
        
        
		var vertexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
		
		//Color Buffer
		var colors = [];
		for(var i=0; i<4; i++) {
			colors.push(this.fillColor.r);
			colors.push(this.fillColor.g);
			colors.push(this.fillColor.b);
			colors.push(this.fillColor.a);
		}
		
		var colorBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(colors), this.gl.STATIC_DRAW);
		
		//Draw
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, 3, this.gl.FLOAT, false, 0, 0);
        
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
    	this.gl.vertexAttribPointer(this.shaderProgram.vertexColorAttribute, 4, this.gl.FLOAT, false, 0, 0);
        
        this.setMatrixUniforms();
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
	},
	
	
	//-------------------------------------------------------
	drawRoundedRect: function(x,y,width,height, radius) {
	},
	
	
	//-------------------------------------------------------
	drawSquare: function(x,y,size) {
		this.drawRect(x,y, size, size);
	},
	
	
	//-------------------------------------------------------
	drawEllipse: function(x,y,width,height) {
		var topLeft = this.getNormalizedCoordinates(x,y);
		var bottomRight = this.getNormalizedCoordinates(x+width,y+height);
		
		var x1 = topLeft.x;
		var x2 = bottomRight.x;
		
		var y1 = topLeft.y;
		var y2 = bottomRight.y;
		
		//Create Buffers
		var vertices = [];
		var colors = [];
		
		for(var i=0; i<(360*3); i+=3) {
			vertices.push(x1 + Math.cos(Pixel.Math.degreesToRadians(i)) * (x2 - x1));
			vertices.push(y1 + Math.sin(Pixel.Math.degreesToRadians(i)) * (y2 - y1));
			vertices.push(0.0);
			
			colors.push(this.fillColor.r);
			colors.push(this.fillColor.g);
			colors.push(this.fillColor.b);
			colors.push(this.fillColor.a);
		}
		
		var vertexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
		
		var colorBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(colors), this.gl.STATIC_DRAW);
		
		//Draw Points
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
		this.gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, 3, this.gl.FLOAT, false, 0, 0);
		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
    	this.gl.vertexAttribPointer(this.shaderProgram.vertexColorAttribute, 4, this.gl.FLOAT, false, 0, 0);
    	
		this.setMatrixUniforms();
        this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, 360);
	},
	
	
	//-------------------------------------------------------
	drawCircle: function(x,y,radius) {
		this.drawEllipse(x,y, radius, radius);
	},
	
	
	//-------------------------------------------------------
	//TRANSFORMATIONS
	//-------------------------------------------------------
	pushMatrix: function() {
		var copy = mat4.create();
    	mat4.set(this.mvMatrix, copy);
    	this.mvMatrixStack.push(copy);
	},
	
	
	//-------------------------------------------------------
	popMatrix: function() {
		if (this.mvMatrixStack.length == 0) {
      		throw "Invalid popMatrix!";
    	}
    	
    	this.mvMatrix = this.mvMatrixStack.pop();
	},
	
	
	//-------------------------------------------------------
	translate: function(x,y) {
		var pos = this.getNormalizedCoordinates(x,y);
		mat4.translate(this.mvMatrix, [pos.x, pos.y, 0]);
	},
	
	
	//-------------------------------------------------------
	scale: function(x,y) {
		mat4.scale(this.mvMatrix, [x,y,0.0]);
	},
	
	
	//-------------------------------------------------------
	rotate: function(angle) {
		mat4.rotate(this.mvMatrix, Pixel.Math.degreesToRadians(angle), [0, 0, 1]);
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