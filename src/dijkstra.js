//Initializing various parameters
let width = 800;
let height = 800;
let col = 10;
let row = 10;
let source;
let target;
let mesh = new Array(row);
let Q=[];
let S =[];
let started = false;


function setup() {
  createCanvas(width, height);
  canvas=createCanvas(width, height);
  cv = canvas.parent("canvasContainer");

  reset();

}

function draw() {
  if (started) {
    background(255);

    if (Q.length > 0) {
      let u = Q[0];
      for (let i = 1; i < Q.length; i++) {
        if (Q[i].distance < u.distance) {
          u = Q[i];
        } else {
          u = Q[0];
        }
      }

      removeElement(Q, u)

      if (u == target) {
        let u = target;
        if (u.parent || u == source)
          while (u) {
            S.unshift(u);
            u = u.parent;
          }
        console.log('found it!');

        noLoop();
      }

      let neighbors = u.neighbors;
      for (let i = 0; i < neighbors.length; i++) {
        if (!neighbors[i].isObstacle) {
          if (Q.includes(neighbors[i])) {
            alt = u.distance + euclideanDistance(u, neighbors[i]);
            if (alt < neighbors[i].distance) {
              neighbors[i].distance = alt;
              neighbors[i].parent = u;
            }
          } else {
            continue;
          }
        }
      }
    }

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (!mesh[i][j].isObstacle) {
          mesh[i][j].display('white');
        }
      }
    }

    for (let i = 0; i < Q.length; i++) {
      Q[i].display('green')
    }

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (mesh[i][j].isObstacle) {
          mesh[i][j].display('black');
        }
      }
    }

    for (let i = 0; i < S.length; i++) {
      S[i].display('red');
    }


  }
}
