window.onload = init;

let canvas, ctx, w, h;
let circle;
let keys = {};

function init() {
  console.log("page chargée");
  
  canvas = document.querySelector("#gameCanvas");
  w = canvas.width;
  h = canvas.height;
  
  ctx = canvas.getContext('2d');
  
  circle = new Circle(w / 2, h / 2, 20);
  
  
  window.addEventListener("keydown", function(e) {
    keys[e.key] = true;
    console.log(keys);
  });
  window.addEventListener("keyup", function(e) {
      keys[e.key] = false;
      console.log(keys);
  });
    
  draw();
  
  moveCircle();
  //move();
}

function draw() {
  ctx.clearRect(0, 0, w, h);
  circle.draw(ctx);
}


function moveCircle() {
  if (keys['ArrowUp'] && keys['ArrowRight']) {
    circle.y -= 5 / Math.sqrt(2);
    circle.x += 5 / Math.sqrt(2);
  } else if (keys['ArrowUp'] && keys['ArrowLeft']) {
    circle.y -= 5 / Math.sqrt(2);
    circle.x -= 5 / Math.sqrt(2);
  } else if (keys['ArrowDown'] && keys['ArrowRight']) {
    circle.y += 5 / Math.sqrt(2);
    circle.x += 5 / Math.sqrt(2);
  } else if (keys['ArrowDown'] && keys['ArrowLeft']) {
    circle.y += 5 / Math.sqrt(2);
    circle.x -= 5 / Math.sqrt(2);
  } else {
    if (keys['ArrowUp']) {
      circle.y -= 5;
    }
    if (keys['ArrowDown']) {
      circle.y += 5;
    }
    if (keys['ArrowRight']) {
      circle.x += 5;
    }
    if (keys['ArrowLeft']) {
      circle.x -= 5;
    }
  }
  draw();
  requestAnimationFrame(moveCircle);
}


function move() {

  circle.y += 5;
  draw();
  requestAnimationFrame(move);
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