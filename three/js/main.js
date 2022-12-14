function main() {
    let kanvas = document.getElementById("kanvas");
    let gl = kanvas.getContext("webgl");

    const vertices3 = [
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

    const indices3 = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
        22, 23, 24, 25, 26
    ];

    const vertices9 = [
        -0.47, -0.1,    0.0,    1, 1, 1,
        -0.47, 0.5,     0.0,    1, 1, 1,
        -0.09, 0.5,     0.0,    1, 1, 1,
        -0.09, 0.1,     0.0,    1, 1, 1,
        -0.09, -0.5,    0.0,    1, 1, 1,
        -0.47, -0.5,    0.0,    1, 1, 1,
        -0.47, -0.3,    0.0,    1, 1, 1,
        -0.37, -0.3,    0.0,    1, 1, 1,
        -0.37, -0.45,   0.0,    1, 1, 1,
        -0.2, -0.45,    0.0,    1, 1, 1,
        -0.2, -0.1,     0.0,    1, 1, 1,
        -0.2, -0.1,     0.0,    1, 1, 1,
    ];

    const indices9 = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21
    ];

    const verticesIn9 = [
        -0.37, 0.1, 0.0,    1, 1, 1,
        -0.37, 0.4, 0.0,    1, 1, 1,
        -0.2, 0.4,  0.0,    1, 1, 1,
        -0.2, 0.1,  0.0,    1, 1, 1,
    ];

    const indicesIn9 = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14
    ];

    const verticesI = [
        -1.2, -2.5,   0.0,    1, 1, 1,
        -1.2, -1.2,   0.0,    1, 1, 1,
        -1.0, -1.2,   0.0,    1, 1, 1,
        -1.0, -2.5,   0.0,    1, 1, 1,
    ];

    const indicesI = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14
    ];

    const verticesD = [
        0.1, -2.5, 0.0,    1, 1, 1,
        0.1, -1.2,  0.0,    1, 1, 1,
        0.45, -1.2,  0.0,    1, 1, 1,
        0.7, -1.2,   0.0,    1, 1, 1,
        0.78, -1.32, 0.0,    1, 1, 1,
        0.78, -2.32,0.0,    1, 1, 1,
        0.7, -2.5,  0.0,    1, 1, 1,
    ];

    const indicesD = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17
    ];

    const verticesInD = [
        0.33, -2.4, 0.0,    0, 0, 255,
        0.33, -1.4,  0.0,    0, 0, 255,
        0.52, -1.4,  0.0,    0, 0, 255,
        0.58, -1.5,   0.0,    0, 0, 255,
        0.58, -2.2,  0.0,    0, 0, 255,
        0.58, -2.3,  0.0,    0, 0, 255,
        0.52, -2.4, 0.0,    0, 0, 255,
    ];

    const indicesInD = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17
    ];

    var verticesCube = [
        // Face A       // Red
        -0.3, -0.3, -0.3, 1, 0, 0,    // Index:  0
        0.3, -0.3, -0.3, 1, 0, 0,    // Index:  1
        0.3, 0.3, -0.3, 1, 0, 0,    // Index:  2
        -0.3, 0.3, -0.3, 1, 0, 0,    // Index:  3
        // Face B       // Yellow
        -0.3, -0.3, 0.3, 1, 1, 0,    // Index:  4
        0.3, -0.3, 0.3, 1, 1, 0,    // Index:  5
        0.3, 0.3, 0.3, 1, 1, 0,    // Index:  6
        -0.3, 0.3, 0.3, 1, 1, 0,    // Index:  7
        // Face C       // Green
        -0.3, -0.3, -0.3, 0, 1, 0,    // Index:  8
        -0.3, 0.3, -0.3, 0, 1, 0,    // Index:  9
        -0.3, 0.3, 0.3, 0, 1, 0,    // Index: 10
        -0.3, -0.3, 0.3, 0, 1, 0,    // Index: 11
        // Face D       // Blue
        0.3, -0.3, -0.3, 0, 0, 1,    // Index: 12
        0.3, 0.3, -0.3, 0, 0, 1,    // Index: 13
        0.3, 0.3, 0.3, 0, 0, 1,    // Index: 14
        0.3, -0.3, 0.3, 0, 0, 1,    // Index: 15
        // Face E       // Orange
        -0.3, -0.3, -0.3, 1, 0.5, 0,  // Index: 16
        -0.3, -0.3, 0.3, 1, 0.5, 0,  // Index: 17
        0.3, -0.3, 0.3, 1, 0.5, 0,  // Index: 18
        0.3, -0.3, -0.3, 1, 0.5, 0,  // Index: 19
        // Face F       // White
        -0.3, 0.3, -0.3, 1, 1, 1,    // Index: 20
        -0.3, 0.3, 0.3, 1, 1, 1,    // Index: 21
        0.3, 0.3, 0.3, 1, 1, 1,    // Index: 22
        0.3, 0.3, -0.3, 1, 1, 1     // Index: 23
    ];

    var indicesCube = [
        0, 1, 2, 0, 2, 3,     // Face A
        4, 5, 6, 4, 6, 7,     // Face B
        8, 9, 10, 8, 10, 11,   // Face C
        12, 13, 14, 12, 14, 15,  // Face D
        16, 17, 18, 16, 18, 19,  // Face E
        20, 21, 22, 20, 22, 23   // Face F
    ];

    const objects = [
        {
            name: '3',
            vertices: vertices3,
            indices: indices3,
            length: 3,
            type: gl.LINE_LOOP
        },
        {
            name: '9',
            vertices: vertices9,
            indices: indices9,
            length: 9,
            type: gl.LINE_LOOP
        },
        {
            name: '9',
            vertices: verticesIn9,
            indices: indicesIn9,
            length: 4,
            type: gl.LINE_LOOP
        },
        {
            name: 'I',
            vertices: verticesI,
            indices: indicesI,
            length: 4,
            type: gl.TRIANGLE_FAN
        },
        {
            name: 'D',
            vertices: verticesD,
            indices: indicesD,
            length: 7,
            type: gl.TRIANGLE_FAN
        },
        {
            name: 'D',
            vertices: verticesInD,
            indices: indicesInD,
            length: 7,
            type: gl.TRIANGLE_FAN
        },
        {
            name: 'Cube',
            vertices: verticesCube,
            indices: indicesCube,
            length: 7,
            type: gl.TRIANGLES
        }
    ];

    // Vertex shader
    let vertexShaderCode = `
      attribute vec3 aPosition;   // Sebelumnya vec2, makanya tidak tergambar kubus :D
      attribute vec3 aColor;
      uniform mat4 uModel;
      uniform mat4 uView;
      uniform mat4 uProjection;
      varying vec3 vColor;
      void main() {
          gl_Position = uProjection * uView * uModel * vec4(aPosition, 1.0);
          vColor = aColor;
      }`;

    let vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderObject, vertexShaderCode);
    gl.compileShader(vertexShaderObject);   // sampai sini sudah jadi .o

    // Fragment shader
    let fragmentShaderCode = `
      precision mediump float;
      varying vec3 vColor;
      void main() {
          gl_FragColor = vec4(vColor, 1.0);
      }`;

    let fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
    gl.compileShader(fragmentShaderObject);   // sampai sini sudah jadi .o

    let shaderProgram = gl.createProgram(); // wadah dari executable (.exe)
    gl.attachShader(shaderProgram, vertexShaderObject);
    gl.attachShader(shaderProgram, fragmentShaderObject);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    // Variabel lokal
    let theta = 0.0;
    let freeze = false;
    let frameWidth = 9;
    let horizontalSpeed = 0.039; // NRP akhir 039
    let verticalSpeed = 0.0;
    let horizontalDelta = 0.0;
    let verticalDelta = 0.0;
    let scaleDelta = 0.4;
    let scaleSpeed = 0.05;
    var freezeN = 0;
    var freezeO = 0;
    var thetaX = 0.0;
    var thetaY = 0.0;

    // Variabel pointer ke GLSL
    let uModel = gl.getUniformLocation(shaderProgram, "uModel");
    // View
    let cameraX = 0.0;
    let cameraZ = 7.5;
    let uView = gl.getUniformLocation(shaderProgram, "uView");
    let view = mat4.create();
    mat4.lookAt(
        view,
        [cameraX, 0.0, cameraZ],    // the location of the eye or the camera
        [cameraX, 0.0, -10],        // the point where the camera look at
        [0.0, 1.0, 0.0]
    );
    // Projection
    let uProjection = gl.getUniformLocation(shaderProgram, "uProjection");
    let perspective = mat4.create();

    mat4.perspective(perspective, Math.PI/3, 1.0, 0.5, 50);

    function drawing (vertices, indices, start=0, end, glType=gl.LINE_LOOP) {
        const buffer = gl.createBuffer();
        const indexBuffer = gl.createBuffer();

        // bind buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

        const aPosition = gl.getAttribLocation(shaderProgram, 'aPosition');
        const aColor = gl.getAttribLocation(shaderProgram, 'aColor');
        // variable pointer ke GLSL
        gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false,
            6 * Float32Array.BYTES_PER_ELEMENT,
            0 * Float32Array.BYTES_PER_ELEMENT
        );
        gl.enableVertexAttribArray(aPosition);

        // gl.drawArrays(glType, start, end);

        gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false,
            6 * Float32Array.BYTES_PER_ELEMENT,
            3 * Float32Array.BYTES_PER_ELEMENT
        );
        gl.enableVertexAttribArray(aColor);

        gl.drawElements(glType, indices.length - 11, gl.UNSIGNED_SHORT, 0);
    }

    const animate3 = () =>{
        let model = mat4.create();

        if (horizontalDelta >= (frameWidth/2) || horizontalDelta <= (-frameWidth/2+1)) {
            horizontalSpeed = horizontalSpeed * -1;
        }
        horizontalDelta += horizontalSpeed;
        mat4.translate(model, model, [horizontalDelta, verticalDelta, 0.0]);

        let uModel = gl.getUniformLocation(shaderProgram, "uModel");
        let uView = gl.getUniformLocation(shaderProgram, "uView");
        let uProjection = gl.getUniformLocation(shaderProgram, "uProjection");
        gl.uniformMatrix4fv(uModel,false, model);
        gl.uniformMatrix4fv(uView, false, view);
        gl.uniformMatrix4fv(uProjection, false, perspective);
        drawing(objects[0].vertices, objects[0].indices, 0, objects[0].length, objects[0].type);
    }

    const animate9 = () =>{
        var model = mat4.create();

        if (scaleDelta >= 2 || scaleDelta <= -0.5) {
            scaleSpeed = scaleSpeed * -1;
        }
        scaleDelta += scaleSpeed;
        mat4.translate(model, model, [0, 0, scaleDelta]);

        var uModel = gl.getUniformLocation(shaderProgram, "uModel");
        var uView = gl.getUniformLocation(shaderProgram, "uView");
        var uProjection = gl.getUniformLocation(shaderProgram, "uProjection");
        gl.uniformMatrix4fv(uModel,false, model);
        gl.uniformMatrix4fv(uView, false, view);
        gl.uniformMatrix4fv(uProjection, false, perspective);
        drawing(objects[1].vertices, objects[1].indices, 0, objects[1].length, objects[1].type);
    }

    const animateIn9 = () =>{
        var model = mat4.create();

        if (scaleDelta >= 2 || scaleDelta <= -0.5) {
            scaleSpeed = scaleSpeed * -1;
        }
        scaleDelta += scaleSpeed;
        mat4.translate(model, model, [0, 0, scaleDelta]);

        var uModel = gl.getUniformLocation(shaderProgram, "uModel");
        var uView = gl.getUniformLocation(shaderProgram, "uView");
        var uProjection = gl.getUniformLocation(shaderProgram, "uProjection");
        gl.uniformMatrix4fv(uModel,false, model);
        gl.uniformMatrix4fv(uView, false, view);
        gl.uniformMatrix4fv(uProjection, false, perspective);
        drawing(objects[2].vertices, objects[2].indices, 0, objects[2].length, objects[2].type);
    }

    function onKeyPress(event) {
        if (event.keyCode == 37) { // left arrow
            freezeN = 1;
        } else if (event.keyCode == 39) { // right arrow
            freezeN = 2;
        } else if (event.keyCode == 38) { // up arrow
            freezeA = 1;
        } else if (event.keyCode == 40) { // down arrow
            freezeA = 2;
        }
    }

    document.addEventListener("keydown", onKeyPress, false);

    const animateI = () =>{
        var modely = mat4.create();
        mat4.rotateY(modely, modely, thetaY);

        if (freezeN == 1) {
            thetaY -= 0.01;
        } else if (freezeN == 2) {
            thetaY += 0.01;
        }

        let uModel = gl.getUniformLocation(shaderProgram, "uModel");
        let uView = gl.getUniformLocation(shaderProgram, "uView");
        let uProjection = gl.getUniformLocation(shaderProgram, "uProjection");
        gl.uniformMatrix4fv(uModel, false, modely);
        gl.uniformMatrix4fv(uView, false, view);
        gl.uniformMatrix4fv(uProjection, false, perspective);
        drawing(objects[3].vertices, objects[3].indices, 0, objects[3].length, objects[3].type);
    }

    const animateD = () =>{
        var modely = mat4.create();
        mat4.rotateX(modely, modely, thetaX);

        if (freezeN == 1) {
            thetaX -= 0.01;
        } else if (freezeN == 2) {
            thetaX += 0.01;
        }

        var uModel = gl.getUniformLocation(shaderProgram, "uModel");
        var uView = gl.getUniformLocation(shaderProgram, "uView");
        var uProjection = gl.getUniformLocation(shaderProgram, "uProjection");
        gl.uniformMatrix4fv(uModel, false, modely);
        gl.uniformMatrix4fv(uView, false, view);
        gl.uniformMatrix4fv(uProjection, false, perspective);
        drawing(objects[4].vertices, objects[4].indices, 0, objects[4].length, objects[4].type);
    }

    const animateInD = () =>{
        var modely = mat4.create();
        mat4.rotateX(modely, modely, thetaX);

        if (freezeN == 1) {
            thetaX -= 0.01;
        } else if (freezeN == 2) {
            thetaX += 0.01;
        }

        var uModel = gl.getUniformLocation(shaderProgram, "uModel");
        var uView = gl.getUniformLocation(shaderProgram, "uView");
        var uProjection = gl.getUniformLocation(shaderProgram, "uProjection");
        gl.uniformMatrix4fv(uModel, false, modely);
        gl.uniformMatrix4fv(uView, false, view);
        gl.uniformMatrix4fv(uProjection, false, perspective);
        drawing(objects[5].vertices, objects[5].indices, 0, objects[5].length, objects[5].type);
    }

    const animateCube = () => {
        var model = glMatrix.mat4.create();

        var uModel = gl.getUniformLocation(shaderProgram, "uModel");
        var uView = gl.getUniformLocation(shaderProgram, "uView");
        var uProjection = gl.getUniformLocation(shaderProgram, "uProjection");

        gl.uniformMatrix4fv(uModel, false, model);
        gl.uniformMatrix4fv(uView, false, view);
        gl.uniformMatrix4fv(uProjection, false, perspective);

        drawing(objects[6].vertices, objects[6].indices, 0, objects[6].length, objects[6].type );
    }

    // Kita mengajari GPU bagaimana caranya mengoleksi
    //  nilai posisi dari ARRAY_BUFFER
    //  untuk setiap verteks yang sedang diproses
    let aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false,
        6 * Float32Array.BYTES_PER_ELEMENT,
        0);
    gl.enableVertexAttribArray(aPosition);
    let aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false,
        6 * Float32Array.BYTES_PER_ELEMENT,
        3 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(aColor);

    // Grafika interaktif
    // Tetikus
    function onMouseClick(event) {
        freeze = !freeze;
    }

    document.addEventListener("click", onMouseClick);
    // Papan ketuk
    function onKeydown(event) {
        if (event.keyCode == 32) freeze = !freeze;  // spasi
        // Gerakan horizontal: a ke kiri, d ke kanan
        if (event.keyCode == 65) {  // a
            horizontalSpeed = -0.01;
        } else if (event.keyCode == 68) {   // d
            horizontalSpeed = 0.01;
        }
        // Gerakan vertikal: w ke atas, s ke bawah
        if (event.keyCode == 87) {  // w
            verticalSpeed = -0.01;
        } else if (event.keyCode == 83) {   // s
            verticalSpeed = 0.01;
        }
    }
    function onKeyup(event) {
        if (event.keyCode == 32) freeze = !freeze;
        if (event.keyCode == 65 || event.keyCode == 68) horizontalSpeed = 0.0;
        if (event.keyCode == 87 || event.keyCode == 83) verticalSpeed = 0.0;
    }
    document.addEventListener("keydown", onKeydown);
    document.addEventListener("keyup", onKeyup);

    function render() {
        gl.enable(gl.DEPTH_TEST);
        gl.clearColor(0.0, 0.0, 255.0, 1.0);  // Biru
        //            Merah     Hijau   Biru    Transparansi
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        if (!freeze) {
            theta += 0.005;
        }
        horizontalDelta += horizontalSpeed;
        verticalDelta -= verticalSpeed;
        let model = mat4.create(); // Membuat matriks identitas
        mat4.translate(
            model, model, [horizontalDelta, verticalDelta, 0.0]
        );
        mat4.rotateX(
            model, model, theta
        );
        mat4.rotateY(
            model, model, theta
        );
        mat4.rotateZ(
            model, model, theta
        );
        gl.uniformMatrix4fv(uModel, false, model);
        gl.uniformMatrix4fv(uView, false, view);
        gl.uniformMatrix4fv(uProjection, false, perspective);
        animate3();
        animate9();
        animateIn9();
        animateI();
        animateInD();
        animateD();
        animateInD();
        // animateCube();
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

