//Initializing various parameters
let width = 800;
let height = 800;
let col = 51;
let row = 51;
let source;
let target;
let mesh = new Array(row);
let S;
let stack = [];
let started = false;

function heuristic(a, b) {
  return Math.sqrt((a.i - b.i) ** 2 + (b.j - a.j) ** 2);
}

function setup() {
  createCanvas(width, height);
  canvas = createCanvas(width, height);
  cv = canvas.parent("canvasContainer");

  reset();
  // for (let i = 0; i < mesh.length; i++) {
  //   mesh[i] = new Array(col);
  // }

  // for (let i = 0; i < row; i++) {
  //   for (let j = 0; j < col; j++) {
  //     mesh[i][j] = new tile(i, j);
  //     mesh[i][j].display('white');
  //   }
  // }


  // for (let i = 0; i < row; i++) {
  //   for (let j = 0; j < col; j++) {
  //     mesh[i][j].getNeighbors(i, j);
  //   }
  // }


  // source = mesh[33][22];
  // target = mesh[44][30];
  // source.display('green');
  // target.display('red');

  // stack.push(source);
  // noLoop();

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
    var temp = cur;
    S.push(temp);
    while (temp.parent) {
      S.push(temp.parent);
      temp = temp.parent;
    }



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
