function main() {
    let kanvas = document.getElementById("kanvas");
    let gl = kanvas.getContext("webgl");

    const vertices3 = [
        -0.9, 0.3,      0.0,    1, 1, 1,
        -0.9, 0.5,      0.0,    1, 1, 1,
        -0.7, 0.5,      0.0,    1, 1, 1,
        -0.5, 0.5,      0.0,    1, 1, 1,
        -0.5, 0.5,      0.0,    1, 1, 1,
        -0.5, 0.1,      0.0,    1, 1, 1,
        -0.5, 0.1,      0.0,    1, 1, 1,
        -0.5, -0.1,     0.0,    1, 1, 1,
        -0.5, -0.5,     0.0,    1, 1, 1,
        -0.5, -0.5,     0.0,    1, 1, 1,
        -0.8, -0.5,     0.0,    1, 1, 1,
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
        0, 1, 2, 0, 2, 3,
        4, 5, 6, 4, 6, 7,
        8, 9, 10, 8, 10, 11,
        12, 13, 14, 12, 14, 15,
        16, 17, 18, 16, 18, 19,
        20, 21, 22, 20, 22, 23,
        24, 25, 26, 27, 28, 29, 30,
        31
    ];

    const vertices9 = [
        // Number 9 (out)
        -0.47, -0.1,    0.0,    1, 1, 1,
        -0.47, 0.5,     0.0,    1, 1, 1,
        -0.19, 0.5,     0.0,    1, 1, 1,
        -0.09, 0.5,     0.0,    1, 1, 1,
        -0.09, 0.5,     0.0,    1, 1, 1,
        -0.09, 0.2,     0.0,    1, 1, 1,
        -0.09, 0.3,     0.0,    1, 1, 1,
        -0.09, 0.1,     0.0,    1, 1, 1,
        -0.09, -0.3,    0.0,    1, 1, 1,
        -0.09, -0.5,    0.0,    1, 1, 1,
        -0.3, -0.5,     0.0,    1, 1, 1,
        -0.47, -0.5,    0.0,    1, 1, 1,
        -0.47, -0.3,    0.0,    1, 1, 1,
        -0.37, -0.3,    0.0,    1, 1, 1,
        -0.37, -0.45,   0.0,    1, 1, 1,
        -0.2, -0.45,    0.0,    1, 1, 1,
        -0.2, -0.1,     0.0,    1, 1, 1,
        -0.2, -0.1,     0.0,    1, 1, 1,
    ];

    const indices9 = [
        0, 1, 2, 0, 2, 3,
        4, 5, 6, 4, 6, 7,
        8, 9, 10, 8, 10, 11,
        12, 13, 14, 12, 14, 15,
        16, 17, 18, 16, 18, 19,
        20, 21, 22, 20, 22, 23
    ];

    const objects = [
        {
            name: '3',
            vertices: vertices3,
            indices: indices3,
            length: 31,
            type: gl.LINE_LOOP
        },
        {
            name: '9',
            vertices: vertices9,
            indices: indices9,
            length: 31,
            type: gl.LINE_LOOP
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
    let scaleDelta = 0.0;
    let scaleSpeed = 0.0097;

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
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

