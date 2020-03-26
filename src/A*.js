// algorithm implemented following pseudocode on Wiki's A* algorithm page (https://en.wikipedia.org/wiki/A*_search_algorithm)

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
    if (openList.length > 0) {
      let m = openList[0];
      for (let i = 1; i < openList.length; i++) {
        if (openList[i].f < m.f) {
          m = openList[i];
        } else {
          m = openList[0];
        }
      }
      var cur = m;
      if (m==target) {
        noLoop();
        console.log('shortest path found!')
      }

      removeElement(openList, m);
      closedList.push(m);

      let neighbors = cur.neighbors;

      for (i=0; i< neighbors.length; i++) {
        if (closedList.includes(neighbors[i])) {
          continue;
        }
        cost = cur.g + Math.sqrt((cur.i - neighbors[i].i) ** 2 + (cur.j - neighbors[i].j) ** 2);
        if (openList.includes(neighbors[i]) && cost < neighbors[i].g) {
          removeElement(openList, neighbors[i]);
        }
        if (closedList.includes(neighbors[i]) && cost < neighbors[i].g && !neighbors[i].isObstacle ) {
          removeElement(closedList, neighbors[i]);
        }
        if (!openList.includes(neighbors[i]) && !closedList.includes(neighbors[i]) && !neighbors[i].isObstacle) {
          openList.push(neighbors[i]);
          neighbors[i].g = cost;
          neighbors[i].h = heuristic(neighbors[i], target);
          neighbors[i].f = neighbors[i].g + neighbors[i].h;
          neighbors[i].parent = cur;
        }
      }

    }

    for (let i = 0; i < openList.length; i++) {
      openList[i].display('red');
    }
    for (let i = 0; i < closedList.length; i++) {
      closedList[i].display('green');
    }

    S = [];
    retrace(S, cur)


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
