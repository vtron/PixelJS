Function.prototype.bind||(Function.prototype.bind=function(a){if("function"!==typeof this)throw new TypeError("Function.prototype.bind - what is trying to be fBound is not callable");var c=Array.prototype.slice.call(arguments,1),d=this,e=function(){},f=function(){return d.apply(this instanceof e?this:a||window,c.concat(Array.prototype.slice.call(arguments)))};e.prototype=this.prototype;f.prototype=new e;return f});
(function(){var a=!1,c=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/;this.Class=function(){};Class.extend=function(d){function e(){!a&&this.init&&this.init.apply(this,arguments)}var f=this.prototype;a=!0;var h=new this;a=!1;for(var i in d)h[i]="function"==typeof d[i]&&"function"==typeof f[i]&&c.test(d[i])?function(a,c){return function(){var d=this._super;this._super=f[a];var e=c.apply(this,arguments);this._super=d;return e}}(i,d[i]):d[i];e.prototype=h;e.prototype.constructor=e;e.extend=arguments.callee;
return e}})();"undefined"==typeof Pixel?(Pixel={version:"0.5"},"undefined"==typeof px&&(px=Pixel)):console.log("Pixel Namespace Already Exists!");Pixel.BROWSER_TYPE_CHROME="chrome";Pixel.BROWSER_TYPE_SAFARI="safari";Pixel.BROWSER_TYPE_FIREFOX="firefox";Pixel.BROWSER_TYPE_IPHONE="iphone";Pixel.RENDER_MODE_2D=0;Pixel.RENDER_MODE_WEBGL=1;Pixel.LINE_CAP_NORMAL="butt";Pixel.LINE_CAP_ROUND="round";Pixel.LINE_CAP_SQUARE="square";Pixel.TEXT_ALIGN_LEFT="left";Pixel.TEXT_ALIGN_CENTER="center";
Pixel.TEXT_ALIGN_RIGHT="right";Pixel.TEXT_BASELINE_TOP="top";Pixel.TEXT_BASELINE_HANGING="hanging";Pixel.TEXT_BASELINE_MIDDLE="middle";Pixel.TEXT_BASELINE_BOTTOM="bottom";Pixel.OBJECT_SHAPE_RECT=0;Pixel.OBJECT_SHAPE_CIRCLE=1;Pixel.ORIGIN_TOP_LEFT=0;Pixel.ORIGIN_CENTER_LEFT=1;Pixel.ORIGIN_BOTTOM_LEFT=2;Pixel.ORIGIN_TOP_RIGHT=3;Pixel.ORIGIN_CENTER_RIGHT=4;Pixel.ORIGIN_BOTTOM_RIGHT=5;Pixel.ORIGIN_TOP_CENTER=6;Pixel.ORIGIN_BOTTOM_CENTER=7;Pixel.ORIGIN_CENTER=8;
Pixel.isSet=function(a){return void 0!=a?a:!1};Pixel.log=function(a){console.log("PixelJS Log: "+a)};Pixel.isTouchDevice=function(){return"ontouchstart"in window};Pixel.hideAddressBar=function(){window.scrollTo(0,1)};window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();
Pixel.getRelativeMouseCoords=function(a,c){var d=0,e=0,f=0,h=0,f=c;do d+=f.offsetLeft,e+=f.offsetTop;while(f=f.offsetParent);f=a.pageX-d;h=a.pageY-e;return{x:f,y:h}};
Pixel.Rectangle=Class.extend({init:function(a,c,d,e){this.height=this.width=this.y=this.x=0;this.set(a,c,d,e)},initialize:function(a,c,d,e){this.set(a,c,d,e)},set:function(a,c,d,e){this.setPos(a,c);this.setSize(d,e)},setPos:function(a,c){Pixel.isSet(a)&&(this.x=a);Pixel.isSet(c)&&(this.y=c)},setSize:function(a,c){this.width=a;this.height=c},getPos:function(){return{x:this.x,y:this.y}},getSize:function(){return{width:this.width,height:this.height}},isInside:function(a,c){return a>this.x&&a<this.x+
this.width&&c>this.y&&c<this.y+this.height}});Pixel.Math={};Pixel.Math.radiansToDegrees=function(a){return a*(180/Math.PI)};Pixel.Math.degreesToRadians=function(a){return a*(Math.PI/180)};Pixel.Math.map=function(a,c,d,e,f,h){d=e+(f-e)*((d-a)/(c-a));return h?Pixel.clamp(d):d};Pixel.Math.clamp=function(a,c,d){a=Math.max(a,c);return a=Math.min(a,d)};Pixel.Math.dist=function(a,c,d,e,f){a=Math.sqrt(Math.pow(d-a,2)+Math.pow(e-c,2));return f?a:Math.abs(a)};
Pixel.Math.getAngle=function(a,c,d,e){return Math.atan2(e-c,d-a)};Pixel.Math.isPowerOfTwo=function(a){return 0==(a&a-1)};
Pixel.EventDispatcher=Class.extend({events:[],init:function(){},addEventListener:function(a,c){this.events[a]=this.events[a]||[];this.events[a]&&this.events[a].push(c)},removeEventListener:function(a,c){if(this.events[a])for(var d=this.events[a],e=d.length-1;0<=e;--e)if(d[e]===c)return d.splice(e,1),!0;return!1},dispatch:function(a,c){if(this.events[a])for(var d=this.events[a],e=d.length;e--;)d[e](c)}});
Pixel.Renderer2D=Class.extend({init:function(a){this.ctx=a.getContext("2d");this.bFill=!0;this.bStroke=!1;this.bgColor=new Pixel.Color;this.shapePos={x:0,y:0}},setBackgroundColor:function(a,c,d,e){this.bgColor.set(a,c,d,e)},clear:function(a,c,d,e){var f=this.ctx.fillStyle;this.ctx.fillStyle=this.getColorAsString(this.bgColor.r,this.bgColor.g,this.bgColor.b,this.bgColor.a);this.ctx.fillRect(a,c,d,e);this.ctx.fillStyle=f},setSize:function(){},getColorAsString:function(a,c,d,e){a=Math.round(a);c=Math.round(c);
d=Math.round(d);return void 0==c?"rgba("+a.r+","+a.g+","+a.b+","+a.a+")":void 0==e?"rgb("+a+","+c+","+d+")":"rgba("+a+","+c+","+d+","+e+")"},setFillColor:function(a,c,d,e){this.ctx.fillStyle=this.getColorAsString(a,c,d,e)},noFill:function(){this.bFill=!1},setStrokeColor:function(a,c,d,e){this.ctx.strokeStyle=this.getColorAsString(a,c,d,e);this.bStroke=!0},noStroke:function(){this.bStroke=!1},setStrokeSize:function(a){this.ctx.lineWidth=a},setLineCap:function(a){this.ctx.lineCap=a},shadow:function(a,
c,d){this.ctx.shadowBlur=a;this.ctx.shadowOffsetX=c;this.ctx.shadowOffsetY=d},setShadowColor:function(a,c,d,e){this.ctx.shadowColor=this.getColorAsString(a,c,d,e)},noShadow:function(){this.ctx.shadowBlur=0;this.ctx.shadowOffsetX=0;this.ctx.shadowOffsetY=0},drawImage:function(a,c,d,e,f){c=c||a.getPos().x;d=d||a.getPos().y;e=e||a.image.getWidth();f=f||a.image.getHeight();a.isLoaded()?this.ctx.drawImage(a.image,c,d,e,f):Pixel.log("Image not yet loaded!")},beginShape:function(a,c){this.ctx.beginPath();
this.ctx.moveTo(a,c);this.shapePos={x:a,y:c}},addVertex:function(a,c,d){this.ctx.lineTo(a,c);void 0!=d&&this.endShape();this.shapePos={x:a,y:c}},curveVertex:function(a,c){var d,e,f,h;d=this.shapePos.x;e=this.shapePos.y;d>a&&e>c||d<a&&e<c?(f=a,h=e):(f=d,h=c);radius=(Math.abs(d-a)+Math.abs(e-c))/2;this.ctx.arcTo(f,h,a,c,radius);this.shapePos={x:a,y:c}},endShape:function(a,c){this.ctx.closePath();this.shapePos={x:a,y:c};this.ctx.fill()},drawLine:function(a,c,d,e){this.ctx.beginPath();this.ctx.moveTo(a,
c);this.ctx.lineTo(d,e);this.ctx.stroke()},dashedLine:function(a,c,d,e,f){var h=function(a,c){return a<=c},i=function(a,c){return a>=c},j=function(a,c){return Math.min(a,c)},k=function(a,c){return Math.max(a,c)},l={thereYet:i,cap:j},i={thereYet:i,cap:j};0<c-e&&(i.thereYet=h,i.cap=k);0<a-d&&(l.thereYet=h,l.cap=k);this.ctx.moveTo(a,c);this.ctx.beginPath();for(var h=a,k=c,j=0,m=!0;!l.thereYet(h,d)||!i.thereYet(k,e);){var n=Math.atan2(e-c,d-a),o=f[j],h=l.cap(d,h+Math.cos(n)*o),k=i.cap(e,k+Math.sin(n)*
o);m?this.ctx.lineTo(h,k):this.ctx.moveTo(h,k);this.ctx.stroke();j=(j+1)%f.length;m=!m}},drawRect:function(a,c,d,e){void 0!=c?(this.bFill&&this.ctx.fillRect(a,c,d,e),this.bStroke&&this.ctx.strokeRect(a,c,d,e)):(this.bFill&&this.ctx.fillRect(a.x,a.y,a.width,a.height),this.bStroke&&this.ctx.strokeRect(a.x,a.y,a.width,a.height))},drawSquare:function(a,c,d){this.drawRect(a,c,d,d)},drawRoundedRect:function(a,c,d,e,f){"number"===typeof f&&(f={tl:f,tr:f,br:f,bl:f});this.beginShape();this.addVertex(a+d-f.tr,
c);this.curveVertex(a+d,c+f.tr);this.addVertex(a+d,c+e-f.br);this.curveVertex(a+d-f.br,c+e);this.addVertex(a+f.bl,c+e);this.curveVertex(a,c+e-f.bl);this.addVertex(a,c+f.tl);this.curveVertex(a+f.tl,c);this.endShape();this.bFill&&this.ctx.fill();this.bStroke&&this.ctx.stroke()},drawEllipse:function(a,c,d,e){ox=0.5522848*(d/2);oy=0.5522848*(e/2);xe=a+d;ye=c+e;xm=a+d/2;ym=c+e/2;this.ctx.beginPath();this.ctx.moveTo(a,ym);this.ctx.bezierCurveTo(a,ym-oy,xm-ox,c,xm,c);this.ctx.bezierCurveTo(xm+ox,c,xe,ym-
oy,xe,ym);this.ctx.bezierCurveTo(xe,ym+oy,xm+ox,ye,xm,ye);this.ctx.bezierCurveTo(xm-ox,ye,a,ym+oy,a,ym);this.ctx.closePath();this.bStroke&&this.ctx.stroke();this.bFill&&this.ctx.fill()},drawCircle:function(a,c,d){this.ctx.beginPath();this.ctx.arc(a,c,d,0,2*Math.PI,!1);this.bStroke&&this.ctx.stroke();this.bFill&&this.ctx.fill()},pushMatrix:function(){this.ctx.save()},popMatrix:function(){this.ctx.restore()},translate:function(a,c){this.ctx.translate(a,c)},scale:function(a,c){this.ctx.scale(a,c)},rotate:function(a){this.ctx.rotate(Pixel.Math.degreesToRadians(a))},
transform:function(a,c,d,e,f,h){this.ctx.transform(a,c,d,e,f,h)},setTransform:function(a,c,d,e,f,h){this.ctx.setTransform(a,c,d,e,f,h)},setFont:function(a,c){void 0==c?this.setFont(a.font,a.size):this.ctx.font=c+"pt "+a;this.setTextAlignment(a.alignment);this.setTextBaseline(a.baseline)},setTextAlignment:function(a){this.ctx.textAlign=a},setTextBaseline:function(a){this.ctx.textBaseline=a},getTextWidth:function(a){return this.ctx.measureText(a).width},drawText:function(a,c,d){void 0!=c?this.ctx.fillText(a,
c,d):this.ctx.fillText(a,this.cursorX,this.cursorY)},drawTextfield:function(a){this.setFont(a.font);this.setFillColor(a.color);this.drawText(a.text,a.pos.x,a.pos.y)}});
Pixel.RendererWebGL=Class.extend({init:function(a){this.bgColor=new Pixel.Color;this.fillColor=new Pixel.Color;this.bFill=!0;this.strokeColor=new Pixel.Color;this.bStroke=!1;this.ellipseResolution=360;this.gl=this.initGL(a);this.initBuffers();this.basicShader=Pixel.getShaderProgram(this.gl,"pixelBasic-shader",{attributes:["aVertexPosition","aVertexColor"]});this.textureShader=Pixel.getShaderProgram(this.gl,"pixelTexture-shader",{attributes:["aVertexPosition","aTextureCoord"],uniforms:["uSampler"]});
this.shaderProgram=null;this.pMatrix=mat4.create();this.mvMatrixStack=[];this.mvMatrix=mat4.create();this.gl.disable(this.gl.DEPTH_TEST);this.gl.depthFunc(this.gl.ALWAYS);this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA);this.gl.enable(this.gl.BLEND)},initGL:function(a){try{return a.getContext("experimental-webgl",{alpha:!1})}catch(c){return Pixel.log("Could not initialise WebGL"),null}},initBuffers:function(){this.createEllipseBuffers(this.ellipseResolution);this.createRectBuffers();
this.createTextureBuffers()},createRectBuffers:function(){this.rectBuffer=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.rectBuffer);this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([0,0,0,0,0,0,0,0,0,0,0,0]),this.gl.DYNAMIC_DRAW);for(var a=[],c=0;16>c;c++)a.push(1);this.rectColorBuffer=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.rectColorBuffer);this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(a),this.gl.DYNAMIC_DRAW)},setRectVertices:function(a,
c,d,e){var d=d||pxImage.image.width,e=e||pxImage.image.height,f=this.getNormalizedCoordinates(a,c),d=this.getNormalizedCoordinates(a+d,c+e),a=f.x,c=d.x,f=f.y,d=d.y,f=[a,d,0,a,f,0,c,f,0,c,d,0];this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.rectBuffer);this.gl.bufferSubData(this.gl.ARRAY_BUFFER,0,new Float32Array(f));this.gl.vertexAttribPointer(this.shaderProgram.aVertexPosition,3,this.gl.FLOAT,!1,0,0)},setRectColors:function(a){for(var c=[],d=0;4>d;d++)c.push(a.r),c.push(a.g),c.push(a.b),c.push(a.a);
this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.rectColorBuffer);this.gl.bufferSubData(this.gl.ARRAY_BUFFER,0,new Float32Array(c));this.gl.vertexAttribPointer(this.shaderProgram.aVertexColor,4,this.gl.FLOAT,!1,0,0)},createEllipseBuffers:function(a){this.ellipseBuffer&&this.gl.deleteBuffer(this.ellipseBuffer);for(var c=[],d=0;d<3*a;d++)c.push(0);this.ellipseBuffer=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.ellipseBuffer);this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(c),
this.gl.DYNAMIC_DRAW);c=[];for(d=0;d<4*a;d++)c.push(0);this.ellipseColorBuffer=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.ellipseColorBuffer);this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(c),this.gl.DYNAMIC_DRAW)},createTextureBuffers:function(){for(var a=[],c=0;8>c;c++)a.push(0);this.texCoordBuffer=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.texCoordBuffer);this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(a),this.gl.DYNAMIC_DRAW)},
loadTexture:function(a){var c=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,c);this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!0);this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0);this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,a);Pixel.Math.isPowerOfTwo(a.width)&&Pixel.Math.isPowerOfTwo(a.height)?(this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,
this.gl.NEAREST)):(this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE));this.gl.bindTexture(this.gl.TEXTURE_2D,null);return c},setRectTextureVertices:function(){this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.texCoordBuffer);this.gl.bufferSubData(this.gl.ARRAY_BUFFER,0,new Float32Array([0,0,0,1,1,
1,1,0]));this.gl.vertexAttribPointer(this.shaderProgram.aTextureCoord,2,this.gl.FLOAT,!1,0,0)},setTexture:function(a){this.gl.activeTexture(this.gl.TEXTURE0);this.gl.bindTexture(this.gl.TEXTURE_2D,a);this.gl.uniform1i(this.shaderProgram.uSampler,0)},setShader:function(a){this.shaderProgram!=a&&(this.shaderProgram=a,this.gl.useProgram(a))},setMatrixUniforms:function(){this.gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform,!1,this.pMatrix);this.gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform,
!1,this.mvMatrix)},getNormalizedCoordinates:function(a,c){var d=Pixel.Math.map(0,this.gl.viewportWidth,a,0,2),e=Pixel.Math.map(0,this.gl.viewportHeight,c,0,-2);return{x:d,y:e}},setSize:function(a,c){this.gl.viewportWidth=a;this.gl.viewportHeight=c},setBackgroundColor:function(a,c,d,e){this.bgColor.set(a,c,d,e);this.bgColor.normalizeRGB()},clear:function(){this.gl.viewport(0,0,this.gl.viewportWidth,this.gl.viewportHeight);this.gl.clearColor(this.bgColor.r,this.bgColor.g,this.bgColor.b,this.bgColor.a);
this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT);mat4.ortho(-1,1,-1,1,-1,1,this.pMatrix);mat4.identity(this.mvMatrix);mat4.translate(this.mvMatrix,[-1,1,0])},setFillColor:function(a,c,d,e){this.fillColor.set(a,c,d,e);this.fillColor.normalizeRGB();this.bFill=!0},noFill:function(){this.bFill=!1},setStrokeColor:function(a,c,d,e){this.strokeColor.set(a,c,d,e);this.strokeColor.normalizeRGB();this.bStroke=!0},noStroke:function(){this.bStroke=!1},setStrokeSize:function(a){this.gl.lineWidth(a)},
setLineCap:function(){},shadow:function(){},setShadowColor:function(){},noShadow:function(){},drawImage:function(a,c,d,e,f){a.isLoaded()&&(this.setShader(this.textureShader),a.texture||(a.texture=this.loadTexture(a.image)),this.setRectVertices(c,d,e,f),this.setRectTextureVertices(),this.setTexture(a.texture),this.setMatrixUniforms(),this.gl.drawArrays(this.gl.TRIANGLE_FAN,0,4))},beginShape:function(){},addVertex:function(){},curveVertex:function(){},endShape:function(){},drawLine:function(){},dashedLine:function(){},
drawRect:function(a,c,d,e){this.setShader(this.basicShader);this.setRectVertices(a,c,d,e);this.bFill&&(this.setRectColors(this.fillColor),this.setMatrixUniforms(),this.gl.drawArrays(this.gl.TRIANGLE_FAN,0,4));this.bStroke&&(this.setRectColors(this.strokeColor),this.setMatrixUniforms(),this.gl.drawArrays(this.gl.LINE_LOOP,0,4))},drawRoundedRect:function(){},drawSquare:function(a,c,d){this.drawRect(a,c,d,d)},drawEllipse:function(a,c,d,e){this.setShader(this.basicShader);for(var f=this.getNormalizedCoordinates(a,
c),d=this.getNormalizedCoordinates(a+d,c+e),a=f.x,c=d.x,f=f.y,d=d.y,e=[],h=[],i=0;1080>i;i+=3)e.push(a+Math.cos(Pixel.Math.degreesToRadians(i))*(c-a)),e.push(f+Math.sin(Pixel.Math.degreesToRadians(i))*(d-f)),e.push(0),h.push(this.fillColor.r),h.push(this.fillColor.g),h.push(this.fillColor.b),h.push(this.fillColor.a);this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.ellipseBuffer);this.gl.bufferSubData(this.gl.ARRAY_BUFFER,0,new Float32Array(e));this.gl.vertexAttribPointer(this.shaderProgram.aVertexPosition,
3,this.gl.FLOAT,!1,0,0);this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.ellipseColorBuffer);this.gl.bufferSubData(this.gl.ARRAY_BUFFER,0,new Float32Array(h));this.gl.vertexAttribPointer(this.shaderProgram.aVertexColor,4,this.gl.FLOAT,!1,0,0);this.setMatrixUniforms();this.gl.drawArrays(this.gl.TRIANGLE_FAN,0,360)},drawCircle:function(a,c,d){this.drawEllipse(a,c,d,d)},pushMatrix:function(){var a=mat4.create();mat4.set(this.mvMatrix,a);this.mvMatrixStack.push(a)},popMatrix:function(){if(0==this.mvMatrixStack.length)throw"Invalid popMatrix!";
this.mvMatrix=this.mvMatrixStack.pop()},translate:function(a,c){var d=this.getNormalizedCoordinates(a,c);mat4.translate(this.mvMatrix,[d.x,d.y,0])},scale:function(a,c){mat4.scale(this.mvMatrix,[a,c,0])},rotate:function(a){mat4.rotate(this.mvMatrix,Pixel.Math.degreesToRadians(-1*a),[0,0,1])},transform:function(){},setTransform:function(){},setFont:function(){},setTextAlignment:function(){},setTextBaseline:function(){},getTextWidth:function(){},drawText:function(){},drawTextfield:function(){}});
Pixel.getShaderProgram=function(a,c,d){var e=Pixel.compileShader(a,c+"-fs"),c=Pixel.compileShader(a,c+"-vs");return Pixel.createShaderProgram(a,e,c,d)};
Pixel.compileShader=function(a,c){var d=document.getElementById(c);if(!d)return null;for(var e="",f=d.firstChild;f;)3==f.nodeType&&(e+=f.textContent),f=f.nextSibling;if("x-shader/x-fragment"==d.type)d=a.createShader(a.FRAGMENT_SHADER);else if("x-shader/x-vertex"==d.type)d=a.createShader(a.VERTEX_SHADER);else return null;a.shaderSource(d,e);a.compileShader(d);return!a.getShaderParameter(d,a.COMPILE_STATUS)?(alert(a.getShaderInfoLog(d)),null):d};
Pixel.createShaderProgram=function(a,c,d,e){if(c&&d){program=a.createProgram();a.attachShader(program,c);a.attachShader(program,d);a.linkProgram(program);a.getProgramParameter(program,a.LINK_STATUS)||alert("Could not initialise shaders");a.useProgram(program);program.pMatrixUniform=a.getUniformLocation(program,"uPMatrix");program.mvMatrixUniform=a.getUniformLocation(program,"uMVMatrix");if(d=e.uniforms)for(c=0;c<d.length;c++)program[d[c]]=a.getUniformLocation(program,d[c]);if(e=e.attributes)for(c=
0;c<e.length;c++)program[e[c]]=a.getAttribLocation(program,e[c]),a.enableVertexAttribArray(program[e[c]]);return program}Pixel.log("Failed to compile shader program.")};
Pixel.Color=Class.extend({init:function(a,c,d,e){this.r=a||0;this.g=c||0;this.b=d||0;this.a=e||1;this.v=this.l=this.s=this.h=0},set:function(a,c,d,e){void 0!=a&&(this.r=a);void 0!=c&&(this.g=c);void 0!=d&&(this.b=d);this.a=void 0!=e?e:1},normalizeRGB:function(){this.r=Pixel.Math.map(0,255,this.r,0,1);this.g=Pixel.Math.map(0,255,this.g,0,1);this.b=Pixel.Math.map(0,255,this.b,0,1)},setHSL:function(a,c,d,e){void 0!=a&&(this.h=a);void 0!=c&&(this.s=g);void 0!=d&&(this.l=b);this.a=void 0!=e?e:1},setHSV:function(a,
c,d,e){void 0!=a&&(this.h=a);void 0!=c&&(this.s=g);void 0!=d&&(this.l=b);void 0!=e&&(this.a=e)},toHSL:function(){var a=Pixel.rgbToHSL(this.r,this.g,this.b);this.setHSL(a.h,a.s,a.l);return a},toHSV:function(){var a=Pixel.rgbToHSV(this.r,this.g,this.b);this.setHSV(a.h,a.s,a.v);return a}});
Pixel.rgbToHsl=function(a,c,d){a/=255;c/=255;d/=255;var e=Math.max(a,c,d),f=Math.min(a,c,d),h,i=(e+f)/2;if(e==f)h=f=0;else{var j=e-f,f=0.5<i?j/(2-e-f):j/(e+f);switch(e){case a:h=(c-d)/j+(c<d?6:0);break;case c:h=(d-a)/j+2;break;case d:h=(a-c)/j+4}h/=6}return{h:h,s:f,l:i}};
Pixel.hslToRgb=function(a,c,d){a=Pixel.map(a,0,360,0,1);c=Pixel.map(c,0,255,0,1);d=Pixel.map(d,0,255,0,1);if(0==c)d=c=a=d;else var e=function(a,c,d){0>d&&(d+=1);1<d&&(d-=1);return d<1/6?a+6*(c-a)*d:0.5>d?c:d<2/3?a+6*(c-a)*(2/3-d):a},f=0.5>d?d*(1+c):d+c-d*c,h=2*d-f,d=e(h,f,a+1/3),c=e(h,f,a),a=e(h,f,a-1/3);return{r:255*d,g:255*c,b:255*a}};
Pixel.rgbToHsv=function(a,c,d){a/=255;c/=255;d/=255;var e=Math.max(a,c,d),f=Math.min(a,c,d),h,i=e-f;if(e==f)h=0;else{switch(e){case a:h=(c-d)/i+(c<d?6:0);break;case c:h=(d-a)/i+2;break;case d:h=(a-c)/i+4}h/=6}return{h:h,s:0==e?0:i/e,v:e}};
Pixel.hsvToRgb=function(a,c,d){var a=Pixel.map(a,0,360,0,1),c=Pixel.map(c,0,255,0,1),d=Pixel.map(d,0,255,0,1),e,f,h,i=Math.floor(6*a),j=6*a-i,a=d*(1-c),k=d*(1-j*c),c=d*(1-(1-j)*c);switch(i%6){case 0:e=d;f=c;h=a;break;case 1:e=k;f=d;h=a;break;case 2:e=a;f=d;h=c;break;case 3:e=a;f=k;h=d;break;case 4:e=c;f=a;h=d;break;case 5:e=d,f=a,h=k}return{r:255*e,g:255*f,b:255*h}};
Pixel.normalizeRGB=function(a){var c=Pixel.Math.map(0,255,a.r,0,1),d=Pixel.Math.map(0,255,a.g,0,1),e=Pixel.Math.map(0,255,a.b,0,1);return new Pixel.Color(c,d,e,a.a)};
Pixel.Canvas=Pixel.EventDispatcher.extend({init:function(a){this.canvas=document.createElement("canvas");this.canvas.innerHTML="Your browser does not support HTML5 Canvas.";this.canvas.setAttribute("width",this.width);this.canvas.setAttribute("height",this.height);this.pos={x:0,y:0};this.height=this.width=0;this.backgroundColor=null;cursorY=cursorX=0;this.bPixelDoubling=2<=window.devicePixelRatio;this.setRenderer(this.canvas,a);this.setSize(400,400)},setSize:function(a,c){this.width=a;this.height=
c;this.canvas.setAttribute("width",this.width);this.canvas.setAttribute("height",this.height);this.renderer.setSize(a,c)},getWidth:function(){return this.width},getHeight:function(){return this.height},setCursor:function(a,c){this.cursorX=a;this.cursorY=c},setRenderer:function(a,c){if(c==Pixel.RENDER_MODE_WEBGL){this.renderer=new Pixel.RendererWebGL(a);if(this.renderer.gl){Pixel.log("WebGL renderer initialized");return}delete this.renderer;Pixel.log("Failed to create WebGL Renderer")}c!=Pixel.RENDER_MODE_2D&&
Pixel.log("Renderer Type does not exist");this.renderer=new Pixel.Renderer2D(a)},setBackgroundColor:function(a,c,d,e){this.renderer.setBackgroundColor(a,c,d,e)},clear:function(a,c,d,e){this.renderer.clear(a,c,d,e)},setFillColor:function(a,c,d,e){this.renderer.setFillColor(a,c,d,e)},noFill:function(){this.renderer.noFill()},setStrokeColor:function(a,c,d,e){this.renderer.setStrokeColor(a,c,d,e)},noStroke:function(){this.renderer.noStroke()},setStrokeSize:function(a){this.renderer.setStrokeSize(a)},
setLineCap:function(a){this.renderer.setLineCap(a)},drawImage:function(a,c,d,e,f){this.renderer.drawImage(a,c,d,e,f)},beginShape:function(a,c){this.renderer.beginShape(a,c)},addVertex:function(a,c,d){this.renderer.addVertex(a,c,d)},endShape:function(a,c){this.renderer.endShape(a,c)},drawLine:function(a,c,d,e){this.renderer.drawLine(a,c,d,e)},dashedLine:function(a,c,d,e,f){this.renderer.dashedLine(a,c,d,e,f)},drawRect:function(a,c,d,e){this.renderer.drawRect(a,c,d,e)},drawRoundedRect:function(a,c,
d,e,f){this.renderer.drawRoundedRect(a,c,d,e,f)},drawSquare:function(a,c,d){this.renderer.drawSquare(a,c,d)},drawEllipse:function(){this.renderer.drawEllipse()},drawCircle:function(a,c,d){this.renderer.drawCircle(a,c,d)},pushMatrix:function(){this.renderer.pushMatrix()},popMatrix:function(){this.renderer.popMatrix()},translate:function(a,c){this.renderer.translate(a,c)},scale:function(a,c){this.renderer.scale(a,c)},rotate:function(a){this.renderer.rotate(a)},transform:function(a,c,d,e,f,h){this.renderer.transform(a,
c,d,e,f,h)},setTransform:function(a,c,d,e,f,h){this.renderer.setTransform(a,c,d,e,f,h)},setFont:function(a,c){this.renderer.setFont(a,c)},setTextAlignment:function(a){this.renderer.setTextAlignment(a)},setTextBaseline:function(a){this.renderer.setTextBaseline(a)},getTextWidth:function(a){return this.renderer.getTextWidth(a)},drawText:function(a,c,d){void 0!=c?this.renderer.drawText(a,c,d):this.renderer.drawText(a,this.cursorX,this.cursorY)},drawTextfield:function(a){this.renderer.drawTextfield(a)}});
Pixel.Object=Pixel.EventDispatcher.extend({init:function(){this.bPressed=this.bInitPressed=!1;this.height=this.width=0;this.pos={x:0,y:0};this.radius=0;this.shapeMode=Pixel.OBJECT_SHAPE_RECT;this.rect=new Pixel.Rectangle;this._super()},show:function(){},hide:function(){},setPos:function(a,c){Pixel.isSet(a)&&(this.pos.x=a);Pixel.isSet(c)&&(this.pos.y=c);this.setRect()},getPos:function(){return this.pos},setSize:function(a,c){Pixel.isSet(a)&&(this.width=a);Pixel.isSet(c)&&(this.height=c);this.setRect()},
setRect:function(){this.rect.set(this.pos.x,this.pos.y,this.width,this.height)},getRect:function(){return this.rect},getWidth:function(){return this.width},getHeight:function(){return this.height},setShapeMode:function(a){this.shapeMode=a},isPressed:function(){return this.bPressed},touchStart:function(a){this.setRect(this.pos.x,this.pos.y,this.width,this.height);switch(this.shapeMode){case Pixel.OBJECT_SHAPE_RECT:this.bInitPressed=this.rect.isInside(a.x,a.y);break;case Pixel.OBJECT_SHAPE_CIRCLE:this.bInitPressed=
Pixel.dist(this.pos.x,this.pos.y,a.x,a.y)<2*this.radius}return this.bPressed=this.bInitPressed},touchMoved:function(a){if(this.bInitPressed)switch(this.shapeMode){case Pixel.OBJECT_SHAPE_RECT:this.bPressed=this.rect.isInside(a.x,a.y);break;case Pixel.OBJECT_SHAPE_CIRCLE:this.bPressed=Pixel.dist(this.pos.x,this.pos.y,a.x,a.y)<2*this.radius}return this.bPressed},touchEnd:function(){return this.bInitPressed=this.bPressed=!1}});
Pixel.Image=Pixel.Object.extend({init:function(a){this._super();this.bAllocated=!1;this.imageData=this.image=this.canvas=null;this.bLoaded=!1;this.texture=null;void 0!=a&&this.load(a)},load:function(a){this.clear();this.image=new Image;this.image.addEventListener("load",function(){this.bLoaded=!0;this.dispatch("loaded",this);this.setSize(this.image.width,this.image.height)}.bind(this));this.image.addEventListener("error",function(){console.log("Could not load image from '"+url+"'")});this.image.src=
a},isLoaded:function(){return this.bLoaded},clear:function(){this.bLoaded=!1;this.image=this.imageData=this.pixels=null},setSize:function(a,c){this._super(a,c);!1==this.bAllocated&&(this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.imageData=this.ctx.getImageData(0,0,this.getWidth(),this.getHeight()));this.canvas.setAttribute("width",this.width);this.canvas.setAttribute("height",this.height)},getImageData:function(){return this.imageData},getPixels:function(){return this.bLoaded?
(this.ctx.drawImage(this.image,0,0),this.imageData=this.ctx.getImageData(0,0,this.size.width,this.size.height),this.pixels=this.imageData.data):null},setFromPixels:function(a,c,d){this.clear();this.setSize(c,d);this.imageData=this.ctx.getImageData(0,0,this.size.width,this.size.height);this.pixels=this.imageData.data;for(c=a.length;c--;)this.pixels[c]=a[c];this.ctx.putImageData(this.imageData,0,0);this.image=new Element("img");this.image.addEvent("load",function(){this.image.removeEvent("load");this.dispatch("loaded",
this);this.bLoaded=!0}.bind(this));this.image.src=this.canvas.toDataURL("image/png")}});Pixel.FontSizeCvs=null;
Pixel.Font=Class.extend({init:function(a,c,d,e){this.font=a||"Arial";this.size=c||12;this.alignment=d||Pixel.TEXT_BASELINE_LEFT;this.baseline=e||Pixel.TEXT_BASELINE_TOP;null==Pixel.FontSizeCvs&&(Pixel.log("Creating 2D Canvas for fonts"),Pixel.FontSizeCvs=new Pixel.Canvas(Pixel.RENDER_MODE_2D))},setSize:function(a){this.size=a},setFont:function(a){this.font=a},setSize:function(a){this.size=a},setFont:function(a){this.font=a},setAlignment:function(a){this.alignment=a},setBaseline:function(a){this.baseline=
a},getSize:function(){return this.size},getTextWidth:function(a){Pixel.FontSizeCvs.setFont(this);return Pixel.FontSizeCvs.getTextWidth(a)},getTextHeight:function(){return Math.round(1.5*this.size)}});
Pixel.Textfield=Pixel.Object.extend({init:function(a,c){this._super();this.font=c||new Pixel.Font("Arial",14);this.color=new Pixel.Color(255,255,255,1);this.text=a||"Text not set";this.setText(this.text)},setFont:function(a,c,d,e){this.font=void 0!=c?new Pixel.Font(a,c,d,e):a},setColor:function(a,c,d,e){this.color.set(a,c,d,e)},setText:function(a){this.text=a;this.width=this.font.getTextWidth(this.text);this.height=this.font.getTextHeight(this.text);this.setRect()},setRect:function(){switch(this.font.alignment){case Pixel.TEXT_ALIGN_LEFT:switch(this.font.baseline){case Pixel.TEXT_BASELINE_TOP:this.rect.set(this.pos.x,
this.pos.y,this.width,this.height);break;case Pixel.TEXT_BASELINE_MIDDLE:this.rect.set(this.pos.x,this.pos.y-this.height/2,this.width,this.height);break;case Pixel.TEXT_BASELINE_BOTTOM:this.rect.set(this.pos.x,this.pos.y-this.height,this.width,this.height)}break;case Pixel.TEXT_ALIGN_CENTER:switch(this.font.baseline){case Pixel.TEXT_BASELINE_TOP:this.rect.set(this.pos.x-this.width/2,this.pos.y,this.width,this.height);break;case Pixel.TEXT_BASELINE_MIDDLE:this.rect.set(this.pos.x-this.width/2,this.pos.y-
this.height/2,this.width,this.height);break;case Pixel.TEXT_BASELINE_BOTTOM:this.rect.set(this.pos.x-this.width/2,this.pos.y-this.height,this.width,this.height)}break;case Pixel.TEXT_ALIGN_RIGHT:switch(this.font.baseline){case Pixel.TEXT_BASELINE_TOP:this.rect.set(this.pos.x-this.width,this.pos.y,this.width,this.height);break;case Pixel.TEXT_BASELINE_MIDDLE:this.rect.set(this.pos.x-this.width,this.pos.y-this.height/2,this.width,this.height);break;case Pixel.TEXT_BASELINE_BOTTOM:this.rect.set(this.pos.x-
this.width,this.pos.y-this.height,this.width,this.height)}}}});
Pixel.App=Pixel.Canvas.extend({init:function(a){this._super(a);this.bSetup=!1;this.bRunning=!0;this.bIsMobileApp=!1;this.fps=60;this.curFPS=0;this.bShowFPS=!1;this.curFps=0;this.nFPSSamples=50;this.fpsFont=new Pixel.Font("Verdana",10,Pixel.TEXT_ALIGN_LEFT);this.prevTime=this.startTime=0;this.prevTime=this.startTime=(new Date).getTime();this.fpsFont=new Pixel.Font("Verdana",10,Pixel.TEXT_ALIGN_LEFT);this.bClearBackground=!0;var c=this;Pixel.isTouchDevice()?(this.canvas.addEventListener("touchstart",
function(a){c.touchStartListener.call(c,a)},!1),this.canvas.addEventListener("touchmove",function(a){c.touchMovedListener.call(c,a)},!1),this.canvas.addEventListener("touchend",function(a){c.touchEndListener.call(c,a)},!1)):(this.canvas.addEventListener("mousedown",function(a){c.mouseDownListener.call(c,a)},!1),this.canvas.addEventListener("mousemove",function(a){c.mouseMovedListener.call(c,a)},!1),this.canvas.addEventListener("mouseup",function(a){c.mouseUpListener.call(c,a)},!1))},start:function(){this.bRunning=
!0;this.run()},stop:function(){this.bRunning=!1},setup:function(){},update:function(){},draw:function(){},run:function(){this.bRunning&&(void 0!=this.setup&&!1==this.bSetup&&(this.setup(),this.bSetup=!0),this.update(),this.bClearBackground&&this.clear(0,0,this.getWidth(),this.getHeight()),this.draw(),this.bShowFPS&&(this.updateFPS(),this.drawFPS()),window.requestAnimFrame(this.run.bind(this)))},setFPS:function(a){this.fps=a},getFPS:function(){return this.fps},showFPS:function(){this.curFPS=0;this.bShowFPS=
!0},hideFPS:function(){this.bShowFPS=!1},updateFPS:function(){var a=this.getElapsedTime();this.curFPS=(this.curFPS*(this.nFPSSamples-1)+1E3/(a-this.prevTime))/this.nFPSSamples;this.prevTime=a},drawFPS:function(){this.setFont(this.fpsFont);this.setFillColor(0,0,0);this.drawText("FPS: "+this.curFPS.toFixed(2),20,20);this.setFillColor(255,255,255);this.drawText("FPS: "+this.curFPS.toFixed(2),22,22)},getElapsedTime:function(){return(new Date).getTime()-this.startTime},touches:[],touchStartListener:function(a){for(var c=
0;c<a.changedTouches.length;c++){for(var d=null,e=0;e<this.touches.length;e++)if(null==this.touches[e]){d=e;break}null==d&&(d=this.touches.length);this.touches[d]={id:e,x:(!this.bPixelDoubling?a.changedTouches[c].pageX:a.changedTouches[c].pageX/2)-this.pos.x,y:(!this.bPixelDoubling?a.changedTouches[c].pageY:a.changedTouches[c].pageY/2)-this.pos.y,uniqueID:a.changedTouches[c].identifier};this.dispatch("touchstart",this.touches[d])}},touchMovedListener:function(a){for(var c=0;c<a.changedTouches.length;c++)for(var d=
a.changedTouches[c].identifier,e=0;e<this.touches.length;e++)if(null!=this.touches[e]&&d==this.touches[e].uniqueID){this.touches[e].pos={x:(!this.bPixelDoubling?a.changedTouches[c].pageX:a.changedTouches[c].pageX/2)-this.pos.x,y:(!this.bPixelDoubling?a.changedTouches[c].pageY:a.changedTouches[c].pageY/2)-this.pos.y};this.dispatch("touchmoved",this.touches[e]);break}},touchEndListener:function(a){for(var c=0;c<a.changedTouches.length;c++)for(var d=a.changedTouches[c].identifier,e=0;e<this.touches.length;e++)if(null!=
this.touches[e]&&d==this.touches[e].uniqueID){this.dispatch("touchend",this.touches[e]);this.touches[e]=null;break}},bMouseDown:!1,mouseDownListener:function(a){this.bMouseDown=!0;a=Pixel.getRelativeMouseCoords(a,this.canvas);this.bIsMobileApp?this.dispatch("touchstart",{id:0,x:a.x,y:a.y}):this.dispatch("mousedown",a)},mouseMovedListener:function(a){this.bMouseDown&&this.mouseDraggedListener(a);a=Pixel.getRelativeMouseCoords(a,this.canvas);this.bIsMobileApp?this.dispatch("touchmoved",{id:0,x:a.x,
y:a.y}):this.dispatch("mousemoved",a)},mouseUpListener:function(a){this.bMouseDown=!1;a=Pixel.getRelativeMouseCoords(a,this.canvas);this.bIsMobileApp?this.dispatch("touchend",{id:0,x:a.x,y:a.y}):this.dispatch("mouseup",a)},mouseDraggedListener:function(){}});
