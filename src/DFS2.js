function setup() {
  createCanvas(width, height);
  canvas = createCanvas(width, height);
  cv = canvas.parent("canvasContainer");

  reset();


}

function draw() {
  if (started) {
    // background(255);
    if (stack.length > 0) {
      var cur = stack.shift();

      if (cur == target) {
        noLoop();
        console.log('path found!')
      }

      if (!cur.visited) {
        cur.visited = true;
        let neighbors = cur.neighbors;
        for (i = 0; i < neighbors.length; i++) {
          if (!neighbors[i].visited && !neighbors[i].isObstacle) {
            stack.push(neighbors[i]);
            neighbors[i].parent = cur;
          } else {
            continue;
          }
        }
      }



    }

    for (let i = 0; i < stack.length; i++) {
      stack[i].display('red');
    }

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (mesh[i][j].visited) {
          mesh[i][j].display('green')
        };
      }
    }

    S = [];
    retrace (S, cur);



    for (let i = 0; i < S.length; i++) {
      S[i].display('yellow');
    }

    drawPath(S);

    target.display('blue');


  }
}
