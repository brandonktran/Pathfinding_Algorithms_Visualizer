function setup() {
  createCanvas(width, height);
  canvas = createCanvas(width, height);
  cv = canvas.parent("canvasContainer");

  reset();
  // noLoop();

}

function draw() {
  if (started) {
    // background(255);
    if (stack.length > 0 ) {
      var cur = stack.shift();


      if (cur == target) {
        noLoop();
        console.log('path found!')
      }

      let neighbors = cur.neighbors;

      for (i=0; i<neighbors.length; i++) {
        if (!visited.includes(neighbors[i]) && !neighbors[i].isObstacle) {
          stack.push(neighbors[i]);
          neighbors[i].parent = cur;
          visited.push(neighbors[i]);
        }
      }
    }



    for (let i = 0; i < stack.length; i++) {
      stack[i].display('red');
    }

    for (let i = 0; i < visited.length; i++) {
      visited[i].display('green');
    }

    S = [];
    retrace(S, cur);


    for (let i = 0; i < S.length; i++) {
      S[i].display('yellow');
    }

    drawPath();

    target.display('blue');


  }
}
