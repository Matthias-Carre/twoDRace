window.onload = init;

let canvas, ctx, w, h;
let circle;

function init() {
  console.log("page chargée");
  
  canvas = document.querySelector("#gameCanvas");
  w = canvas.width;
  h = canvas.height;
  
  ctx = canvas.getContext('2d');
  
  circle = new Circle(w / 2, h / 2, 20);
  draw();
  
  window.addEventListener('keydown', moveCircle);
}

function draw() {
  ctx.clearRect(0, 0, w, h);
  circle.draw(ctx);
}

function moveCircle(e) {
  switch(e.key) {
    case 'ArrowUp':
      circle.y -= 5;
      break;
    case 'ArrowDown':
      circle.y += 5;
      break;
    case 'ArrowLeft':
      circle.x -= 5;
      break;
    case 'ArrowRight':
      circle.x += 5;
      break;
  }
  draw();
}

class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
  }
}