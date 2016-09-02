const canvas = document.getElementById('c');
const context = canvas.getContext('2d');

const {
  width,
  height
} = canvas;

const iterations = 5;

let randomFactor = height / 3;

function randomise(val) {
  let rangeStart = Math.max(20, val - randomFactor);
  let rangeEnd = rangeStart + randomFactor;
  let change = Math.floor((Math.random() * (rangeEnd - rangeStart) + rangeStart));
  return change;
}

class LineSegment {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
  order() {
    return {
      x1: Math.min(this.x1, this.x2),
      y1: Math.min(this.y1, this.y2),
      x2: Math.max(this.x1, this.x2),
      y2: Math.max(this.y1, this.y2)
    };
  }
  getMidPoint() {
    let o = this.order();
    return {
      x: o.x1 + (o.x2 - o.x1) / 2,
      y: o.y1 + (o.y2 - o.y1) / 2
    };
  }
}

var lines = [];

let newLines = [];

function make() {
  randomFactor = height / 1.5;
  let y1 = Math.floor(Math.random() * height);
  let y2 = Math.floor(Math.random() * height);
  lines = [new LineSegment(0, y1, width, y2)];
  newLines = [];
  for (let i = 0; i < iterations; i++) {
    for (let l = 0; l < lines.length; l++) {
      let line = lines[l];
      let mid = line.getMidPoint();
      mid.y = randomise(mid.y);
      newLines.push(new LineSegment(line.x1, line.y1, mid.x, mid.y));
      newLines.push(new LineSegment(mid.x, mid.y, line.x2, line.y2));
    }
    lines = newLines;
    newLines = [];
    randomFactor = Math.ceil(randomFactor / 2);
  }
  draw();
}

function draw() {
  context.clearRect(0, 0, width, height);
  context.beginPath();
  context.fillStyle = '#CCC';
  context.moveTo(0, height);
  lines.forEach((line) => {
    context.lineTo(line.x1, line.y1);
    context.lineTo(line.x2, line.y2);
  });
  context.lineTo(width, height);
  context.fill();
  context.closePath();
}

document.getElementById('draw').addEventListener('click', (e) => {
  e.preventDefault();
  make();
});

make();