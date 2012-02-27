//-------------------------------------------------------
//Pixel.RendererWebGL.js
//WebGL Rendering
//Most code based on learningwebgl.com

//Matrix math uses the gl-matrix lib by Toji https://github.com/toji/gl-matrix/

Pixel.RendererWebGL = Class.extend({
	init: function(canvas) {
		this.bgColor		= new Pixel.Color();
		this.fillColor		= new Pixel.Color();
		this.strokeColor	= new Pixel.Color();
		
		this.ellipseResolution = 360;
	
		//Get GL Ref
		this.gl = this.initGL(canvas);
		
		//Create buffers
		this.initBuffers();
        
        //Compile default shader
        this.basicShader	= Pixel.getShaderProgram(this.gl, "pixelBasic-shader", {attributes:["aVertexPosition","aVertexColor"]});
       	this.textureShader	= Pixel.getShaderProgram(this.gl, "pixelTexture-shader", {attributes:["aVertexPosition","aTextureCoord"], uniforms:["uSampler"]});
        this.shaderProgram  = null;
        
        //Create Matrices
    	this.pMatrix		= mat4.create();
        this.mvMatrixStack	= [];
        this.mvMatrix		= mat4.create();
        
        this.gl.disable(this.gl.DEPTH_TEST);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
		this.gl.enable(this.gl.BLEND);
	},

	
	//-------------------------------------------------------
	initGL: function(canvas) {
		//See if we can get a WebGL ref
		try {
            var gl = canvas.getContext("experimental-webgl", {alpha:false});
        	return gl;
        } catch (e) {
        	Pixel.log("Could not initialise WebGL");
        	return null;
        }
	},
	
	
	//-------------------------------------------------------
	//Buffers
	
	//-------------------------------------------------------
	initBuffers: function() {
		//Buffers for primitive types
		this.createEllipseBuffers(this.ellipseResolution);
		this.createRectBuffers();
		this.createTextureBuffers();
	},
	
	//-------------------------------------------------------
	createRectBuffers: function() {
		//Vertices
		var vertices = [
			0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0,
            0.0, 0.0, 0.0
        ];
        
		this.rectBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.rectBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.DYNAMIC_DRAW);
		
		//Colors
        var colorVertices = [];
		for(var i=0;i<16; i++) colorVertices.push(1.0);
		
		this.rectColorBuffer = this.gl.createBuffer(); 
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.rectColorBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(colorVertices), this.gl.DYNAMIC_DRAW);
	},
	
	
	//-------------------------------------------------------
	createEllipseBuffers: function(resolution) {
		//Check for previous buffer and clear if necessary
		if(this.ellipseBuffer) this.gl.deleteBuffer(this.ellipseBuffer);
		
		var vertices = [];
		for(var i=0; i<resolution * 3; i++) vertices.push(0.0);
		
		this.ellipseBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.ellipseBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.DYNAMIC_DRAW);
		
		var colorVertices = [];
		for(var i=0; i<resolution * 4; i++) colorVertices.push(0.0);
		
		this.ellipseColorBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.ellipseColorBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(colorVertices), this.gl.DYNAMIC_DRAW);
	},
	
	//-------------------------------------------------------
	createTextureBuffers: function() {
		var texCoords = [];
		for(var i=0; i<2*4; i++) texCoords.push(0.0);
		
		//Create VBO for texCoords
		this.texCoordBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(texCoords), this.gl.DYNAMIC_DRAW);
	},
	
	
	//-------------------------------------------------------
	//Textures
	//Non-pow2 stuff from http://webglfactory.blogspot.com/2011/05/adding-textures.html
	loadTexture: function(img) {
		//Create texture
		var tex = this.gl.createTexture();
		
		//Load pixels from img
		this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
    	this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
    	this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    	this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, img);
    	
    	if(Pixel.Math.isPowerOfTwo(img.width) && Pixel.Math.isPowerOfTwo(img.height)) {
    		 this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
             this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    	} else {
    		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    	}
    	
    	//this.gl.generateMipmap(this.gl.TEXTURE_2D);
    	
    	//Clean up
    	this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    	
		return tex;
	},
	
	
	//-------------------------------------------------------
	//Shaders
	setShader: function(program) {
		if(this.shaderProgram != program) {
			this.shaderProgram = program;
			this.gl.useProgram(program);
		}
	},
	
	//-------------------------------------------------------
	//GL Utils
	
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
	//Rendering functions
    
    //-------------------------------------------------------
    setSize: function(width, height) {
    	this.gl.viewportWidth	= width;
        this.gl.viewportHeight	= height;
    },
    
    //-------------------------------------------------------
    setBackgroundColor: function(r,g,b,a) {
    	this.bgColor.set(r,g,b,a);
    	this.bgColor.normalizeRGB();
   	},
	
	//-------------------------------------------------------
	clear: function(x,y,width,height, color) {
		this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
        
        this.gl.clearColor(this.bgColor.r, this.bgColor.g, this.bgColor.b, this.bgColor.a);
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
	drawImage: function(pxImage, x, y, width, height) {
		if(pxImage.isLoaded()) {
			//Set Shader
			this.setShader(this.textureShader);
			
			//Create texture if necessary
			if(!pxImage.texture) {
				//Create texture
				pxImage.texture = this.loadTexture(pxImage.image);
			} 
			
			//Get width & height
			width	= width	 || pxImage.image.width;
			height	= height || pxImage.image.height;
			
			//Define vertices
			var topLeft		= this.getNormalizedCoordinates(x,y);
			var bottomRight = this.getNormalizedCoordinates(x+width,y+height);
			
			var x1 = topLeft.x;
			var x2 = bottomRight.x;
			
			var y1 = topLeft.y;
			var y2 = bottomRight.y;
			
			var vertices = [
				x1,		y1,		0.0,
	            x1,		y2,		0.0,
	            x2,		y1,		0.0,
	           	x2,		y2,		0.0
	        ];
	        
	        //Vertex Buffer
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.rectBuffer);
	        this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, new Float32Array(vertices));
	        this.gl.vertexAttribPointer(this.shaderProgram.aVertexPosition, 3, this.gl.FLOAT, false, 0, 0);
			
			//Tex Coord Buffer
			//tl, bl, tr, br
			var texCoords = [
	      		0.0, 1.0,
	      		0.0, 0.0,
	      		1.0, 1.0,
				1.0, 0.0,
			];
			
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
	        this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, new Float32Array(texCoords));
        	this.gl.vertexAttribPointer(this.shaderProgram.aTextureCoord, 2, this.gl.FLOAT, false, 0, 0);
        	
        	
        	//Draw
        	this.gl.activeTexture(this.gl.TEXTURE0);
    		this.gl.bindTexture(this.gl.TEXTURE_2D, pxImage.texture);
    		this.gl.uniform1i(this.shaderProgram.uSampler, 0);
    		
    		this.setMatrixUniforms();
			this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
        }
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
		this.setShader(this.basicShader);
		
		//Define vertices
		var topLeft		= this.getNormalizedCoordinates(x,y);
		var bottomRight = this.getNormalizedCoordinates(x+width,y+height);
		
		var x1 = topLeft.x;
		var x2 = bottomRight.x;
		
		var y1 = topLeft.y;
		var y2 = bottomRight.y;
		
		
		var vertices = [
			x1,		y1,		0.0,
            x1,		y2,		0.0,
            x2,		y1,		0.0,
           	x2,		y2,		0.0
        ];
        
        //Fill Vertex Buffer
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.rectBuffer);
        this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, new Float32Array(vertices));
        this.gl.vertexAttribPointer(this.shaderProgram.aVertexPosition, 3, this.gl.FLOAT, false, 0, 0);
		
		//Fill Color Buffer
		var colors = [];
		for(var i=0; i<4; i++) {
			colors.push(this.fillColor.r);
			colors.push(this.fillColor.g);
			colors.push(this.fillColor.b);
			colors.push(this.fillColor.a);
		}
		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.rectColorBuffer);
        this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, new Float32Array(colors));
    	this.gl.vertexAttribPointer(this.shaderProgram.aVertexColor, 4, this.gl.FLOAT, false, 0, 0);
		
		//Draw  Fill      
        this.setMatrixUniforms();
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
        //this.gl.drawArrays(this.gl.LINE_LOOP, 0, 4);
/*
        //-----------
        //Stroke
        //Draw Stroke
        vertices = [
			x1,		y1,		0.0,
            x1,		y2,		0.0,
            x2,		y2,		0.0,
           	x2,		y1,		0.0
        ];
        
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.rectBuffer);
        this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, new Float32Array(vertices));
        this.gl.vertexAttribPointer(this.shaderProgram.aVertexPosition, 3, this.gl.FLOAT, false, 0, 0);
        
        colors = [];
        for(var i=0; i<4; i++) {
			colors.push(this.strokeColor.r);
			colors.push(this.strokeColor.g);
			colors.push(this.strokeColor.b);
			colors.push(this.strokeColor.a);
		}
		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.rectColorBuffer);
        this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, new Float32Array(colors));
    	this.gl.vertexAttribPointer(this.shaderProgram.aVertexColor, 4, this.gl.FLOAT, false, 0, 0);
		
		this.gl.drawArrays(this.gl.LINE_LOOP, 0, 4);
*/
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
		this.setShader(this.basicShader);
		
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
		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.ellipseBuffer);
		this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, new Float32Array(vertices));
		this.gl.vertexAttribPointer(this.shaderProgram.aVertexPosition, 3, this.gl.FLOAT, false, 0, 0);
		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.ellipseColorBuffer);
		this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, new Float32Array(colors));
    	this.gl.vertexAttribPointer(this.shaderProgram.aVertexColor, 4, this.gl.FLOAT, false, 0, 0);
		
		//Draw Points
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
		//Multiply angle by -1 to reverse, lines up with Canvas2D rotation
		angle *= -1;
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