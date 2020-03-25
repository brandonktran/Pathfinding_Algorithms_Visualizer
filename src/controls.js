//start visualizer
function start() {
  started = true;
  loop();
}

//reset visualizer
function reset() {
  width = 800;
  height = 800;
  col = parseInt(slider_row.value);
  row = parseInt(slider_row.value);
  source;
  target;
  mesh = new Array(row);
  Q = [];
  S = [];

  started = false;


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


  source = mesh[0][0];
  source.display('green')
  source.distance = 0;
  target = mesh[row - 1][col - 1];
  target.display('red')


  // open.push(source);
  // noLoop();
}


//create obstacles
function mouseDragged() {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (mouseX > i * width / col && mouseX < (i + 1) * width / col && mouseY > j * height / row && mouseY < (j + 1) * height / row) {
        mesh[i][j].display('black');
        mesh[i][j].isObstacle = true;
      }
    }
  }
}

function mouseClicked() {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (mouseX > i * width / col && mouseX < (i + 1) * width / col && mouseY > j * height / row && mouseY < (j + 1) * height / row && mesh[i][j].isObstacle == false) {
        mesh[i][j].display('black');
        mesh[i][j].isObstacle = true;
      } else if (mouseX > i * width / col && mouseX < (i + 1) * width / col && mouseY > j * height / row && mouseY < (j + 1) * height / row) {
        mesh[i][j].display('white');
        mesh[i][j].isObstacle = false;
      }
    }
  }
}


let slider_row = document.getElementById("rows");
let output_row = document.getElementById("rows1");
output_row.innerHTML = slider_row.value;

slider_row.oninput = function () {
  output_row.innerHTML = this.value;
}
