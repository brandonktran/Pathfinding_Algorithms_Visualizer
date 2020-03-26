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

    push();
    noFill();
    stroke(0);
    strokeWeight(2);
    beginShape();
    for (var i = 0; i < S.length; i++) {
      vertex(S[i].i * width / col + (width / col) / 2, S[i].j * height / row + (height / row) / 2);
    }
    endShape();
    pop();

    target.display('blue');


  }
}
