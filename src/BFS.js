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
    if (queue.length >0) {
      var cur =queue.shift();
      if (cur === target) {
        console.log('path found!')
        noLoop();
      }
      let neighbors = cur.neighbors;
      for (i=0; i<neighbors.length;i++) {
        if (!discovered.includes(neighbors[i]) && !neighbors[i].isObstacle) {
          discovered.push(neighbors[i]);
          neighbors[i].parent = cur;
          queue.push(neighbors[i]);
        }
      }
    }


    for (let i = 0; i < queue.length; i++) {
      queue[i].display('red');
    }

    for (let i = 0; i < discovered.length; i++) {
      discovered[i].display('green');
    }

    S = [];
    retrace(S, cur);



    for (let i = 0; i < S.length; i++) {
      S[i].display('yellow');
    }

    drawPath(S);

    target.display('blue');


  }
}
