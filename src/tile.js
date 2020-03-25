//creating tile class
function tile(i, j) {
  this.i = i;
  this.j = j;
  this.parent = undefined;
  this.distance = Infinity;
  this.isObstacle =false;
  this.visited = false;


}

tile.prototype.display = function display(color) {
  stroke(0);
  fill(color);
  rect(this.i * width / col, this.j * height / row, width / col, height/row);
}

tile.prototype.getNeighbors = function getNeighbors() {
  this.neighbors = [];

  if (this.i<row-1) {
    this.neighbors.push(mesh[this.i + 1][this.j]);
  }
  if (this.j<col-1) {
    this.neighbors.push(mesh[this.i][this.j + 1]);
  }
  if (this.i > 0) {
    this.neighbors.push(mesh[this.i - 1][this.j]);
  }
  if (this.j > 0) {
    this.neighbors.push(mesh[this.i][this.j - 1]);
  }

  //diagonal neighbors
  if (this.i < row - 1 && this.j < col - 1) {
    this.neighbors.push(mesh[this.i + 1][this.j + 1]);
  }
  if (this.i > 0 && this.j > 0) {
    this.neighbors.push(mesh[this.i - 1][this.j - 1]);
  }
  if (this.i < row - 1 && this.j > 0) {
    this.neighbors.push(mesh[this.i + 1][this.j-1]);
  }
  if (this.i > 0 && this.j < col - 1) {
    this.neighbors.push(mesh[this.i - 1][this.j + 1]);
  }
}



// Helper functons
function removeElement(arr, elt) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

function euclideanDistance(x, y) {
  return dist(x.i, x.j, y.i, y.j);

}
