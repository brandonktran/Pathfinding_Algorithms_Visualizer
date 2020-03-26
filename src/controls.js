//Initializing various parameters
let width = 600;
let height = 600;
let col = 51;
let row = 51;
let source;
let target;
let mesh = new Array(row);
let S;
let openList = [];
let closedList = [];
let queue = [];
let discovered = [];
let stack = [];
let visited = [];
let started = false;


//start visualizer
function start() {
  started = true;
  loop();
}

//reset visualizer
function reset() {
  width = 600;
  height = 600;
  col = 51;  //parseInt(slider_row.value);
  row = 51; //parseInt(slider_row.value);
  source;
  target;
  mesh = new Array(row);
  Q = [];
  S = [];
  openList = [];
  closedList = [];
  queue = [];
  discovered = [];
  stack = [];
  visited = [];

  started = false;
  let sPos = document.getElementById("sourcePos");
  let sPosOutput = sPos.value.split(',');
  let targetPos = document.getElementById("targetPos");
  let targetPosOutput = targetPos.value.split(',');


  for (let i = 0; i < mesh.length; i++) {
    mesh[i] = new Array(col);
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      mesh[i][j] = new tile(i, j);
      mesh[i][j].display(200);
    }
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (!mesh[i][j].isObstacle) {
        Q.push(mesh[i][j]);
      }
    }
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      mesh[i][j].getNeighbors(i, j);
    }
  }


  source = mesh[parseInt(sPosOutput[0])][parseInt(sPosOutput[1])];
  target = mesh[parseInt(targetPosOutput[0])][parseInt(targetPosOutput[1])];
  source.g = 0;
  source.distance = 0;
  source.h = heuristic(start, target);
  source.f = source.g + source.h;
  source.display('purple');
  target.display('blue');

  openList.push(source);
  discovered.push(source);
  queue.push(source);
  visited.push(source);
  stack.push(source);
  // noLoop();
  // open.push(source);
}


//create obstacles
function mouseDragged() {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (mouseX > i * width / col && mouseX < (i + 1) * width / col && mouseY > j * height / row && mouseY < (j + 1) * height / row && mesh[i][j] != source && mesh[i][j] != target) {
        mesh[i][j].display('black');
        mesh[i][j].isObstacle = true;
      }
    }
  }
}

function mouseClicked() {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (mouseX > i * width / col && mouseX < (i + 1) * width / col && mouseY > j * height / row && mouseY < (j + 1) * height / row && mesh[i][j].isObstacle == false && mesh[i][j] != source && mesh[i][j] != target) {
        mesh[i][j].display('black');
        mesh[i][j].isObstacle = true;
      } else if (mouseX > i * width / col && mouseX < (i + 1) * width / col && mouseY > j * height / row && mouseY < (j + 1) * height / row && mesh[i][j] != source && mesh[i][j] != target) {
        mesh[i][j].display('white');
        mesh[i][j].isObstacle = false;
      }
    }
  }
}

// let slider_row = document.getElementById("rows");
// let output_row = document.getElementById("rows1");
// output_row.innerHTML = slider_row.value;

// slider_row.oninput = function () {
//   output_row.innerHTML = this.value;
// }
