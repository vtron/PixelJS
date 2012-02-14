//-------------------------------------------------------
//Pixel.Shader.js
//Loads and Compiles a gl shader
//Based on Learning WebGL Code (http://www.learningwebgl.com)

Pixel.Shader = Class.extend({
	init: function(gl, id) {
		this.fragment	= compile(id + "-fs");
		this.vertex		= compile(id + "-vs");
		
		createProgram();
	},
	
	//-------------------------------------------------------
	compile: function(id) {
		var shaderScript = document.getElementById(id);
        if (!shaderScript) {
            return null;
        }

        var str = "";
        var k = shaderScript.firstChild;
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }

        var shader;
        if (shaderScript.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (shaderScript.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }

        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
	},
	
	//-------------------------------------------------------
	createProgram: function() {
		if(this.fragmentShader && this.vertexShader) {
	        this.shaderProgram = gl.createProgram();
	        gl.attachShader(this.shaderProgram, this.vertexShader);
	        gl.attachShader(this.shaderProgram, this.fragmentShader);
	        gl.linkProgram(this.shaderProgram);
	
	        if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
	            alert("Could not initialise shaders");
	        }
	
	        gl.useProgram(this.shaderProgram);
	
	        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
	        gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
	
	        shaderProgram.vertexColorAttribute = gl.getAttribLocation(this.shaderProgram, "aVertexColor");
	        gl.enableVertexAttribArray(this.shaderProgram.vertexColorAttribute);
	
	        shaderProgram.pMatrixUniform	= gl.getUniformLocation(this.shaderProgram,	"uPMatrix");
	        shaderProgram.mvMatrixUniform	= gl.getUniformLocation(this.shaderProgram,	"uMVMatrix");
        } else {
        	Pixel.log("Failed to compile shader program.");
        }
	},
	
	render: function() {
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

        mat4.identity(mvMatrix);

        mat4.translate(mvMatrix, [-1.5, 0.0, -7.0]);
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, triangleVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, triangleVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

        setMatrixUniforms();
        gl.drawArrays(gl.TRIANGLES, 0, triangleVertexPositionBuffer.numItems);

        mat4.translate(mvMatrix, [3.0, 0.0, 0.0]);
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, squareVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

        setMatrixUniforms();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems);
    },
    
    
	
});
