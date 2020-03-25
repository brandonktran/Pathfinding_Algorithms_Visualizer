//Initializing various parameters
let width = 800;
let height = 800;
let col = 50;
let row = 50;
let source;
let target;
let mesh = new Array(row);
let S;
let queue=[];
let discovered = [];
let started = false;

function heuristic(a, b) {
  return Math.sqrt((a.i - b.i) ** 2 + (b.j - a.j) ** 2);
}

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
  source.display('green');
  target.display('red');

  discovered.push(source);
  queue.push(source);
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
    var temp = cur;
    S.push(temp);
    while (temp.parent) {
      S.push(temp.parent);
      temp = temp.parent;
    }



    for (let i = 0; i < S.length; i++) {
      S[i].display('yellow');
    }

    target.display('blue');


  }
}
