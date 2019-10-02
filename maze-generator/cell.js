function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;
  this.inStack = false;

  this.checkNeighbors = function() {
    var neighbors = [];

    var top    = cells[index(i    , j - 1)];
    var right  = cells[index(i + 1, j    )];
    var bottom = cells[index(i    , j + 1)];
    var left   = cells[index(i - 1, j    )];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }
    if (neighbors.length > 0) {
      var rand = floor(random(0, neighbors.length));
      return neighbors[rand]
    } else {
      return undefined;
    }
  }

  this.show = function () {
    var x = this.i * cellWidth;
    var y = this.j * cellWidth;
    stroke(255);
    if (this.walls[0]) {
      line(x, y, x + cellWidth, y);
    }
    if (this.walls[1]) {
      line(x + cellWidth, y, x + cellWidth, y + cellWidth);
    }
    if (this.walls[2]) {
      line(x + cellWidth, y + cellWidth, x, y + cellWidth);
    }
    if (this.walls[3]) {
      line(x, y + cellWidth, x, y);
    }

    if (this.visited) {
      noStroke();
      fill(50, 200, 155);
      rect(x, y, cellWidth, cellWidth);
    }
  }

  this.highlight = function() {
    var x = this.i * cellWidth;
    var y = this.j * cellWidth;
    noStroke();
    fill(0, 0, 255, 100);
    rect(x, y , cellWidth, cellWidth);
  }

}