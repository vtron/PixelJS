//-------------------------------------------------------
//Pixel.Shader.js
//Loads and Compiles a gl shader
//Based on Learning WebGL Code (http://www.learningwebgl.com)
Pixel.getShaderProgram = function(gl, id, vars) {
	var fragment	= Pixel.compileShader(gl, id + "-fs");
	var vertex		= Pixel.compileShader(gl, id + "-vs");
	
	return Pixel.createShaderProgram(gl, fragment, vertex, vars);
};


//-------------------------------------------------------
Pixel.compileShader = function(gl, id) {
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
};


//-------------------------------------------------------
Pixel.createShaderProgram = function(gl, fragmentShader, vertexShader, vars) {
	if(fragmentShader && vertexShader) {
        program = gl.createProgram();
        gl.attachShader(program, fragmentShader);
        gl.attachShader(program, vertexShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        gl.useProgram(program);

		//Set Uniforms
		program.pMatrixUniform	= gl.getUniformLocation(program, "uPMatrix");
        program.mvMatrixUniform	= gl.getUniformLocation(program, "uMVMatrix");
		
		var uniforms = vars["uniforms"];
			if(uniforms) {
			for(var i=0; i<uniforms.length; i++) {
				program[uniforms[i]] = gl.getUniformLocation(program, uniforms[i]);
			}
		}
		
		//Set Attributes
		var attributes = vars["attributes"];
		if(attributes) {
			for(var i=0; i<attributes.length; i++) {
				program[attributes[i]] = gl.getAttribLocation(program, attributes[i]);
				gl.enableVertexAttribArray(program[attributes[i]]);
			}
		}

		return program;
    } else {
    	Pixel.log("Failed to compile shader program.");
    }
};