/*
  global createCanvas, windowWidth, windowHeight, background, noStroke, random, ellipse, millis,
  width, height, HSB, colorMode, strokeWeight, line, sqrt, resizeCanvas, stroke
*/

// Code for the lines animation on the home screen and headers using the p5.js library

let cnv;
let dot_num, dots;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0);
  cnv.parent("sketch-div");
  colorMode(HSB, 360, 100, 100);
  dots = [];
  dot_num = 20;
  for (let d = 0; d < dot_num; d++) {
    dots.push(new Point());
  }
}
function draw() {
  resizeCanvas(windowWidth, windowHeight);
  background(0, 0, 20);

  for (let d of dots) {
    d.move();
  }
}

class Point {
  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.dx = random(-1, 1);
    this.dy = random(-1, 1);
    this.size = 5;
    this.duration = random(2, 5) * 1000;
    this.repeats = 1;
  }
  move() {
    noStroke();
    this.x += this.dx;
    this.y += this.dy;
    if (millis() >= this.duration * this.repeats) {
      this.dx = random(-1, 1);
      this.dy = random(-1, 1);
      this.duration = random(2, 5) * 1000;
      this.repeats++;
    }
    // come back if too far
    if (this.x > width + 100){
      this.dx = -1;
    } else if (this.x < -100){
      this.dx = 1;
    }
    if (this.y > height + 100){
      this.dy = -1;
    } else if (this.y < -100){
      this.dy = 1;
    }
    
    for (let other of dots) {
      if (!(this === other)) {
        stroke(0, 0, 100);
        let distance = sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
        let w = width - distance;
        w /= 12500;

        strokeWeight(w);
        line(this.x, this.y, other.x, other.y);
      }
    }
  }
  draw_line() {}
}
