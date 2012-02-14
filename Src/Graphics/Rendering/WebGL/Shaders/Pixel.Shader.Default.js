//Fragment
<script id="pixeljs-default-shader-fs" type="x-shader/x-fragment">
    precision mediump float;

	varying vec3 pos;
    varying vec4 vColor;

    void main(void) {
        gl_FragColor = vColor;
    }
</script>

//Vertex
<script id="pixeljs-default-shader-vs" type="x-shader/x-vertex">
    attribute vec3 aVertexPosition;
    attribute vec4 aVertexColor;

    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;

	varying vec3 pos;
    varying vec4 vColor;

    void main(void) {
        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
        pos			= aVertexPosition;
        vColor		= aVertexColor;
    }
</script>