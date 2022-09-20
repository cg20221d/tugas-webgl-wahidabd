/**@type{HTMLCanvasElement} */
function main() {
    var kanvas = document.getElementById("kanvas");
    var gl = kanvas.getContext("webgl");
    
    var vertices = [
        // Number 3
        -0.9, 0.3,
        -0.9, 0.5,
        -0.7, 0.5,
        -0.5, 0.5,
        -0.5, 0.5,
        -0.5, 0.1,
        -0.5, 0.1,
        -0.5, -0.1,
        -0.5, -0.5,
        -0.5, -0.5,
        -0.8, -0.5,
        -0.9, -0.5,
        -0.9, -0.3,
        -0.8, -0.3,
        -0.8, -0.45,
        -0.6, -0.45,
        -0.6, -0.1,
        -0.8, -0.1,
        -0.8, 0.1,
        -0.6, 0.1,
        -0.6, 0.45,
        -0.8, 0.45,
        -0.8, 0.3,

        // Number 9 (out)
        -0.47, -0.1,
        -0.47, 0.5,
        -0.19, 0.5,
        -0.09, 0.5,
        -0.09, 0.5,
        -0.09, 0.2,
        -0.09, 0.3,
        -0.09, 0.1,
        -0.09, -0.3,
        -0.09, -0.5,
        -0.3, -0.5,
        -0.47, -0.5,
        -0.47, -0.3,
        -0.37, -0.3,
        -0.37, -0.45,
        -0.2, -0.45,
        -0.2, -0.1,
        -0.2, -0.1,
        // (in)
        -0.37, 0.1,
        -0.37, 0.4,
        -0.2, 0.4,
        -0.2, 0.1,

        // Alphabet I
        0.2, -0.5,
        0.2, 0.5,
        0.1, 0.5,
        0.1, -0.5
    ];

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Vertex shader
    var vertexShaderCode = `
    attribute vec2 aPosition;
    void main() {
        float x = aPosition.x;
        float y = aPosition.y;
        gl_PointSize = 10.0;
        gl_Position = vec4(x, y, 0.0, 1.0);
    }
    `;

    var vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderObject, vertexShaderCode);
    gl.compileShader(vertexShaderObject);

    // Fragment shader
    var fragmentShaderCode = `
    precision mediump float;
    void main() {
        float r = 255.0;
        float g = 255.0;
        float b = 255.0;
        gl_FragColor = vec4(r, g, b, 1.0);
    }
    `;

    var fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
    gl.compileShader(fragmentShaderObject);

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShaderObject);
    gl.attachShader(shaderProgram, fragmentShaderObject);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);


    // Kita mengajari GPU bagaimana caranya mengoleksi
    // nilai posisi dari ARRAY_BUFFER
    // untuk setiap verteks yang sedang diproses
    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    gl.clearColor(0.0, 0.0, 255.0, 1.0); // Orange
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.LINE_LOOP, 0, 23);
    gl.drawArrays(gl.LINE_LOOP, 23, 18);
    gl.drawArrays(gl.LINE_LOOP, 41, 4);
    gl.drawArrays(gl.LINE_LOOP, 45, 4);
}