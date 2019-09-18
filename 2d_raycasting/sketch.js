let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 10000;
const sceneW = 400;
const sceneH = 400;
let scene = [];

function setup() {
  createCanvas(800, 400);
  for (let i = 0; i < 5; i++) {
    let x1 = random(sceneW);
    let x2 = random(sceneW);
    let y1 = random(sceneH);
    let y2 = random(sceneH);
    walls[i] = new Boundary(x1, x2, y1, y2);
  }
  walls.push(new Boundary(0, 0, sceneW, 0));
  walls.push(new Boundary(sceneW, 0, sceneW, sceneH));
  walls.push(new Boundary(sceneW, sceneH, 0, sceneH));
  walls.push(new Boundary(0, sceneH, 0, 0));
  particle = new Particle();
}

function draw() {
  background(0);
  for (let wall of walls) {
    wall.show();
  }
  particle.update(noise(xoff) * width, noise(yoff) * height);
  particle.show();
  scene = particle.look(walls);

  xoff += 0.01;
  yoff += 0.01;
}