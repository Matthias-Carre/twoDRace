window.onload = init;
import Player from './Player.js';

let canvas, ctx, w, h;
let player;
let keys = {};

function init() {
  console.log("page chargée");
  
  canvas = document.querySelector("#gameCanvas");
  w = canvas.width;
  h = canvas.height;
  
  ctx = canvas.getContext('2d');
  
  player = new Player("#5E8BDB",w / 2, h / 2);
  
  window.addEventListener("keydown", function(e) {
    keys[e.key] = true;
    console.log(keys);
  });
  window.addEventListener("keyup", function(e) {
      keys[e.key] = false;
      console.log(keys);
  });
    
  draw();
  
  movePlayer();
  //move();
}

function draw() {
  ctx.clearRect(0, 0, w, h);
  player.draw(ctx);
}

function movePlayer() {
  if (keys['ArrowUp'] && keys['ArrowRight']) {
    player.y_axis -= 5 / Math.sqrt(2);
    player.x_axis += 5 / Math.sqrt(2);
  } else if (keys['ArrowUp'] && keys['ArrowLeft']) {
    player.y_axis -= 5 / Math.sqrt(2);
    player.x_axis -= 5 / Math.sqrt(2);
  } else if (keys['ArrowDown'] && keys['ArrowRight']) {
    player.y_axis += 5 / Math.sqrt(2);
    player.x_axis += 5 / Math.sqrt(2);
  } else if (keys['ArrowDown'] && keys['ArrowLeft']) {
    player.y_axis += 5 / Math.sqrt(2);
    player.x_axis -= 5 / Math.sqrt(2);
  } else {
    if (keys['ArrowUp']) {
      player.y_axis -= 5;
    }
    if (keys['ArrowDown']) {
      player.y_axis += 5;
    }
    if (keys['ArrowRight']) {
      player.x_axis += 5;
    }
    if (keys['ArrowLeft']) {
      player.x_axis -= 5;
    }
  }
  draw();
  requestAnimationFrame(movePlayer);
}

function move() {
  player.y_axis += 5;
  draw();
  requestAnimationFrame(move);
}
