function setup() {
  createCanvas(width, height);
  canvas = createCanvas(width, height);
  cv = canvas.parent("canvasContainer");

  for (let i = 0; i < mesh.length; i++) {
    mesh[i] = new Array(col);
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      mesh[i][j] = new tile(i, j);
      mesh[i][j].display('white');
    }
  }


  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      mesh[i][j].getNeighbors(i, j);
    }
  }


  source = mesh[33][22];
  target = mesh[44][30];
  source.g = 0;
  source.f = source.g;
  source.display('green');
  target.display('red');

  openList.push(source);
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
      if (m == target) {
        noLoop();
        console.log('shortest path found!')
      }

      removeElement(openList, m);
      closedList.push(m);

      let neighbors = cur.neighbors;

      for (i = 0; i < neighbors.length; i++) {
        if (closedList.includes(neighbors[i])) {
          continue;
        }
        cost = cur.g + Math.sqrt((cur.i - neighbors[i].i) ** 2 + (cur.j - neighbors[i].j) ** 2);
        if (openList.includes(neighbors[i]) && cost < neighbors[i].g) {
          removeElement(openList, neighbors[i]);
        }
        if (closedList.includes(neighbors[i]) && cost < neighbors[i].g && !neighbors[i].isObstacle) {
          removeElement(closedList, neighbors[i]);
        }
        if (!openList.includes(neighbors[i]) && !closedList.includes(neighbors[i]) && !neighbors[i].isObstacle) {
          openList.push(neighbors[i]);
          neighbors[i].g = cost;
          neighbors[i].f = neighbors[i].g
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
    retrace(S, cur);


    for (let i = 0; i < S.length; i++) {
      S[i].display('yellow');
    }

    drawPath(S);

    target.display('blue');


  }
}
