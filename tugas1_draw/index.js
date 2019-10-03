(function(global) {

  var gl, canvas, program;
  glUtils.SL.init({ callback: function() { main(); }});

  function main() {
    window.addEventListener('resize', resizer);

    canvas = document.getElementById("glcanvas");
    gl = glUtils.checkWebGL(canvas);

    // init shader & program
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    
    program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);
    
    resizer();
  }

  function draw() {
    gl.clearColor(0.0, 0.0, 0.0, 0.7);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var mainLinesVertices = new Float32Array([
      -0.8, -0.5, //a
      -0.65, -0.5, //b
      -0.59, -0.2, //c
      -0.41, -0.2, //d
      -0.35, -0.5, //e
      -0.2, -0.5, //f
      -0.4, +0.5, //g
      -0.6, +0.5  //h
    ]);
    
    var centerLinesVertices = new Float32Array([
      -0.56, -0.0, //==c
      -0.51, +0.3,
      -0.49, +0.3,
      -0.44, -0.0, //==d
    ]);
        
    var mainTriangleVerticesHelper = new Float32Array([
      +0.2, -0.5,
      +0.35, -0.5,
      +0.4, -0.2,
      +0.6, -0.2,
      +0.65, -0.5,
      +0.8, -0.5,
      +0.6, +0.5,
      +0.4, +0.5
    ]);

    var centerTriangleVerticesHelper = new Float32Array([
      +0.56, 0.0, //==c
      +0.51, +0.3,
      +0.49, +0.3,
      +0.44, 0.0, //==d
    ]);

    var TriangleVertices1 = new Float32Array([
      +0.6, +0.5,
      +0.4, +0.5,
      +0.49, +0.3,
      +0.51, +0.3
    ]);

    var TriangleVertices2 = new Float32Array([
      +0.4, +0.5,
      +0.3, 0.0,
      +0.44, 0.0,
      +0.49, +0.3
    ]);

    var TriangleVertices3 = new Float32Array([
      +0.6, +0.5,
      +0.7, 0.0,
      +0.56, 0.0,
      +0.51, +0.3
    ]);

    var TriangleVertices4 = new Float32Array([
      +0.6, -0.2,
      +0.7, 0.0,
      +0.3, 0.0,
      +0.4, -0.2
    ]);

    var TriangleVertices5 = new Float32Array([
      +0.3, 0.0,
      +0.4, -0.2,
      +0.2, -0.5,
    ]);
    
    var TriangleVertices6 = new Float32Array([
      +0.6, -0.2,
      +0.7, 0.0,
      +0.8, -0.5,
    ]);

    var TriangleVertices7 = new Float32Array([
      +0.2, -0.5,
      +0.35, -0.5,
      +0.4, -0.2,
    ]);

    var TriangleVertices8 = new Float32Array([
      +0.6, -0.2,
      +0.65, -0.5,
      +0.8, -0.5,
    ]);

    drawA(gl.LINE_LOOP, mainLinesVertices);
    drawA(gl.LINE_LOOP, centerLinesVertices);
    drawA(gl.LINE_LOOP, mainTriangleVerticesHelper);
    drawA(gl.LINE_LOOP, centerTriangleVerticesHelper);
    drawA(gl.TRIANGLE_FAN, TriangleVertices1);
    drawA(gl.TRIANGLE_FAN, TriangleVertices2);
    drawA(gl.TRIANGLE_FAN, TriangleVertices3);
    drawA(gl.TRIANGLE_FAN, TriangleVertices4);
    drawA(gl.TRIANGLE_FAN, TriangleVertices5);
    drawA(gl.TRIANGLE_FAN, TriangleVertices6);
    drawA(gl.TRIANGLE_FAN, TriangleVertices7);
    drawA(gl.TRIANGLE_FAN, TriangleVertices8);
  }

  function drawA(type, vertices) {
    var n = initBuffers(vertices);
    if(n < 0) {
      console.log('Failed to set the positions of the vertices');
      return;      
    }
    gl.drawArrays(type, 0, n);
  }

  function initBuffers(vertices) {
    var n = vertices.length / 2;
    
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(program, 'aPosition');
    if (aPosition < 0) {
      console.log('Failed to get the storage location of aPosition');
      return -1;
    }

    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);
    return n;
  }

  function resizer() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    draw();
  }

})(window | this);