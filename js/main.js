window.onload = init;
import Player from './Player.js';
import Obstacle from './Obstacle.js';
import Level from './Level.js';


let canvas, ctx, w, h;
let players=[];
let level1;
let keys = {};

async function init() {
  console.log("page chargée");
  
  canvas = document.querySelector("#gameCanvas");
  w = canvas.width;
  h = canvas.height;

  

  
  ctx = canvas.getContext('2d');

  ctx.strokeStyle = 'black'; 
  ctx.lineWidth = 5; 
  ctx.strokeRect(0, 0, w, h);
  
  players[0] = new Player("blue",10, 10);
  players[1] = new Player("red",15, 15);
  
  level1 = new Level(await loadLevel(),[]);
  //console.log("les obstacles ici",level1.obstacles);
  
  
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
  players[0].draw(ctx);
  players[1].draw(ctx);
  level1.draw(ctx);
}
function playersMovement(haut, bas, gauche, droite,player) {
  if (keys[haut] && keys[droite]) {
    player.y_axis -= 5 / Math.sqrt(2);
    player.x_axis += 5 / Math.sqrt(2);
  } else if (keys[haut] && keys[gauche]) {
    player.y_axis -= 5 / Math.sqrt(2);
    player.x_axis -= 5 / Math.sqrt(2);
  } else if (keys[bas] && keys[droite]) {
    player.y_axis += 5 / Math.sqrt(2);
    player.x_axis += 5 / Math.sqrt(2);
  } else if (keys[bas] && keys[gauche]) {
    player.y_axis += 5 / Math.sqrt(2);
    player.x_axis -= 5 / Math.sqrt(2);
  } else {
    if (keys[haut]) {
      player.y_axis -= 5;
    }
    if (keys[bas]) {
      player.y_axis += 5;
    }
    if (keys[droite]) {
      player.x_axis += 5;
    }
    if (keys[gauche]) {
      player.x_axis -= 5;
    }
  }
}

function movePlayer() {
  playersMovement('ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',players[0]);
  playersMovement('w', 's', 'a', 'd',players[1]);
  draw();
  requestAnimationFrame(movePlayer);
}

async function loadLevel() {
  let obstacles = [];
  try {
    const response = await fetch('./maps/map.json');
    const data = await response.json();
    console.log(data);
    console.log(data.data);
    data.data.forEach(obstacle => {
      obstacles.push(new Obstacle(obstacle.x, obstacle.y, obstacle.position, obstacle.color));
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du JSON:', error);
  }
  return obstacles;
}