const main = () =>{
    const canvas = document.querySelector('#kanvas');
    const gl = canvas.getContext('webgl');

    var vertices3 = [
        -0.9, 0.3,      0.0,    1, 1, 1,
        -0.9, 0.5,      0.0,    1, 1, 1,
        -0.5, 0.5,      0.0,    1, 1, 1,
        -0.5, -0.5,     0.0,    1, 1, 1,
        -0.9, -0.5,     0.0,    1, 1, 1,
        -0.9, -0.3,     0.0,    1, 1, 1,
        -0.8, -0.3,     0.0,    1, 1, 1,
        -0.8, -0.45,    0.0,    1, 1, 1,
        -0.6, -0.45,    0.0,    1, 1, 1,
        -0.6, -0.1,     0.0,    1, 1, 1,
        -0.8, -0.1,     0.0,    1, 1, 1,
        -0.8, 0.1,      0.0,    1, 1, 1,
        -0.6, 0.1,      0.0,    1, 1, 1,
        -0.6, 0.45,     0.0,    1, 1, 1,
        -0.8, 0.45,     0.0,    1, 1, 1,
        -0.8, 0.3,      0.0,    1, 1, 1,
    ];

    var indices3 = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
        22, 23, 24, 25, 26
    ];


    var verticesI = [
        0.8, -0.6,   1.0,    1, 1, 1,
        0.8, 0.5,   1.0,    1, 1, 1,
        0.6, 0.5,   1.0,    1, 1, 1,
        0.6, -0.6,   1.0,    1, 1, 1,
    ];

    var indicesI = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14
    ];


    var verticesCube = [
        // Face A       // Putih
        -1, -1, -1,     1, 1, 1,    // Index:  0
        1, -1, -1,     1, 1, 1,    // Index:  1
        1,  1, -1,     1, 1, 1,     // Index:  2
        -1,  1, -1,     1, 1, 1,     // Index:  3
        // Face B       // Putih
        -1, -1,  1,     1, 1, 1,     // Index:  4
        1, -1,  1,     1, 1, 1,     // Index:  5
        1,  1,  1,     1, 1, 1,     // Index:  6
        -1,  1,  1,     1, 1, 1,     // Index:  7
        // Face C       // Putih
        -1, -1, -1,     1, 1, 1,     // Index:  8
        -1,  1, -1,     1, 1, 1,     // Index:  9
        -1,  1,  1,     1, 1, 1,     // Index: 10
        -1, -1,  1,     1, 1, 1,     // Index: 11
        // Face D       // Putih
        1, -1, -1,     1, 1, 1,     // Index: 12
        1,  1, -1,     1, 1, 1,     // Index: 13
        1,  1,  1,     1, 1, 1,     // Index: 14
        1, -1,  1,     1, 1, 1,      // Index: 15
        // Face E       // Putih
        -1, -1, -1,     1, 1, 1,    // Index: 16
        -1, -1,  1,     1, 1, 1,    // Index: 17
        1, -1,  1,     1, 1, 1,    // Index: 18
        1, -1, -1,     1, 1, 1,    // Index: 19
        // Face F       // White
        -1,  1, -1,     1, 1, 1,      // Index: 20
        -1,  1,  1,     1, 1, 1,      // Index: 21
        1,  1,  1,     1, 1, 1,      // Index: 22
        1,  1, -1,     1, 1, 1,      // Index: 23
    ];

    var indicesCube = [
        0, 1, 2,     0, 2, 3,     // Face A
        4, 5, 6,     4, 6, 7,     // Face B
        8, 9, 10,    8, 10, 11,   // Face C
        12, 13, 14,  12, 14, 15,  // Face D
        16, 17, 18,  16, 18, 19,  // Face E
        20, 21, 22,  20, 22, 23   // Face F
    ];

    const objects = [
        {
            vertices: vertices3,
            indices: indices3,
            length: indices3.length,
            type: gl.LINE_LOOP,
        },
        {
            vertices: verticesI,
            indices: indicesI,
            length: indicesI.length,
            type: gl.TRIANGLE_FAN,
        },
        {
            vertices: verticesCube,
            indices: indicesCube,
            length: indicesI.length,
            type: gl.TRIANGLES,
        },
    ]

    // vertex shader
    const vertexShaderCode =
        `
  attribute vec3 aPosition;
  attribute vec3 aColor;
  uniform mat4 uModel;
  uniform mat4 uView;
  uniform mat4 uProjection;
  varying vec3 vColor;
  void main() {
    gl_Position = uProjection * uView * uModel * vec4(aPosition, 1.0);
    vColor = aColor;
  }`

    const vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderObject, vertexShaderCode);
    gl.compileShader(vertexShaderObject); //sampai sini sudah menjadi .o

    // fragmen shader
    const fragmenShaderCode = `
  precision mediump float;
  varying vec3 vColor;
  uniform vec3 uAmbientConstant;      // merepresentasikan warna sumber cahaya
  uniform float uAmbientIntensity;    // merepresentasikan intensitas cahaya sekitar
  void main(){
    vec3 ambient = uAmbientConstant * uAmbientIntensity;
    vec3 phong = ambient;
    gl_FragColor = vec4(phong * vColor, 1.0);
  }`

    const fragmenShaaderObject = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmenShaaderObject, fragmenShaderCode);
    gl.compileShader(fragmenShaaderObject); //sampai sini sudah menjadi .o

    // shader program
    const shaderProgram = gl.createProgram(); //(.exe)
    gl.attachShader(shaderProgram, vertexShaderObject);
    gl.attachShader(shaderProgram, fragmenShaaderObject);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    // varoaible lokal
    var rotateX = 0;
    var rotateY = 0;
    var canvasWidth = 12
    var horizontalSpeed = 0.132;
    var horizontalDelta = 0.0;
    var verticalDelta = 0.0;
    var scaleDelta = 0.0;
    var scaleSpeed = 0.05;

    // View
    var cameraX = 0.0;
    var cameraZ = 7.5;
    var view = glMatrix.mat4.create();

    glMatrix.mat4.lookAt(
        view,
        [cameraX, 0.0, cameraZ],
        [cameraX, 0.0, 0],
        [0.0, 1.0, 0.0]
    );

    var perspective = glMatrix.mat4.create();
    glMatrix.mat4.perspective(perspective, Math.PI/2.4, 1.0, 0.5, 50.0);

    const draw = (vertices, indices, start=0, end, type=gl.LINE_LOOP) =>{
        const buffer = gl.createBuffer();
        const indexBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

        const aPosition = gl.getAttribLocation(shaderProgram, 'aPosition');
        const aColor = gl.getAttribLocation(shaderProgram, 'aColor');

        gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false,
            6 * Float32Array.BYTES_PER_ELEMENT,
            0 * Float32Array.BYTES_PER_ELEMENT
        );

        gl.enableVertexAttribArray(aPosition);

        gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false,
            6 * Float32Array.BYTES_PER_ELEMENT,
            3 * Float32Array.BYTES_PER_ELEMENT
        );
        gl.enableVertexAttribArray(aColor);

        // Untuk pencahayaan dan pembayangan
        var uAmbientConstant = gl.getUniformLocation(shaderProgram, "uAmbientConstant");
        var uAmbientIntensity = gl.getUniformLocation(shaderProgram, "uAmbientIntensity");
        gl.uniform3fv(uAmbientConstant, [1.0, 1.0, 1.0]);   // warna sumber cahaya
        gl.uniform1f(uAmbientIntensity, 0.432);               // intensitas cahaya: 43.2%

        gl.drawElements(type, indices.length, gl.UNSIGNED_SHORT, 0);
    }

    const animate3 = () =>{
        var model = glMatrix.mat4.create();

        if (horizontalDelta >= (canvasWidth/2) || horizontalDelta <= (-canvasWidth/2+1)) {
            horizontalSpeed = horizontalSpeed * -1;
        }

        horizontalDelta += horizontalSpeed;

        glMatrix.mat4.translate(model, model, [horizontalDelta, verticalDelta, 0.0]);

        var uModel = gl.getUniformLocation(shaderProgram, "uModel");
        var uView = gl.getUniformLocation(shaderProgram, "uView");
        var uProjection = gl.getUniformLocation(shaderProgram, "uProjection");

        gl.uniformMatrix4fv(uModel,false, model);
        gl.uniformMatrix4fv(uView, false, view);
        gl.uniformMatrix4fv(uProjection, false, perspective);

        draw(objects[0].vertices, objects[0].indices, 0, objects[0].length, objects[0].type);
    }


    const animateI = () =>{
        var model = glMatrix.mat4.create();

        glMatrix.mat4.rotateX(
            model, model, rotateX
        );

        var uModel = gl.getUniformLocation(shaderProgram, "uModel");
        var uView = gl.getUniformLocation(shaderProgram, "uView");
        var uProjection = gl.getUniformLocation(shaderProgram, "uProjection");

        gl.uniformMatrix4fv(uModel,false, model);
        gl.uniformMatrix4fv(uView, false, view);
        gl.uniformMatrix4fv(uProjection, false, perspective);

        draw(objects[1].vertices, objects[1].indices, 0, objects[1].length, objects[1].type);
    }

    const animateCube = () =>{
        var model = glMatrix.mat4.create();

        glMatrix.mat4.translate(model, model, [0, 0, -20]);

        var uModel = gl.getUniformLocation(shaderProgram, "uModel");
        var uView = gl.getUniformLocation(shaderProgram, "uView");
        var uProjection = gl.getUniformLocation(shaderProgram, "uProjection");

        gl.uniformMatrix4fv(uModel,false, model);
        gl.uniformMatrix4fv(uView, false, view);
        gl.uniformMatrix4fv(uProjection, false, perspective);

        draw(objects[2].vertices, objects[2].indices, 0, objects[2].length, objects[2].type);
    }

    function onKeydown(event) {
        if (event.keyCode == 65 || event.keyCode == 37) { // a / arrow kiri
            rotateY -= 0.2;
        } else if (event.keyCode == 68 || event.keyCode == 39) { // d / arrow kanan
            rotateY += 0.2;
        }

        if (event.keyCode == 87 || event.keyCode == 38) { // w / arrow atas
            rotateX -= 0.2;
        } else if (event.keyCode == 83 || event.keyCode == 40) { // s / arrow bawah
            rotateX += 0.2;
        }
    }
    document.addEventListener("keydown", onKeydown);

    const render = () => {
        gl.clearColor(0.0, 0.0, 255.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        animate3();
        // animate2();
        animateI();
        animateCube();
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}