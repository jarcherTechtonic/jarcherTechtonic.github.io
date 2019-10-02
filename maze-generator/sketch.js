var cols, rows;
var cellWidth = 20;
var cells = [];
var current;
var stack = [];

function setup() {
  createCanvas(400,400);
  cols = floor(width/cellWidth);
  rows = floor(height/cellWidth);

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      cells.push(cell);
    }
  }

  current = cells[0]
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

function draw() {
  background(51);
  for (var i = 0; i < cells.length; i++) {
    cells[i].show();
  }

  current.visited = true;
  current.highlight();
  var nextCell = current.checkNeighbors();
  if (nextCell) {
    nextCell.visited = true;
    stack.push(current);
    removeWalls(current, nextCell);
    current = nextCell;
  } else if (stack.length > 0) {
    current = stack.pop();
    current.inStack = true;
  }
}

function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

