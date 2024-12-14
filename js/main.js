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
  
  players[0] = new Player("red",10, 10, 25, 25);
  players[1] = new Player("blue",40, 10, 25, 25);
  players[2] = new Player("lightgreen",70, 10, 25, 25);
  players[3] = new Player("yellow",100, 10, 25, 25);
  
  //level1 = new Level(await loadLevel(),[]);
  //console.log("les obstacles ici",level1.obstacles);
  let obs1 = new Obstacle(100, 100, {x:100,y:100},"red");
  obs1.setMove(true);
  level1 = new Level([obs1],[]);
  
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
  players[2].draw(ctx);
  players[3].draw(ctx);
  level1.draw(ctx);

  // Collision entre les joueurs
  players.forEach(player => {
    if (players.length >= 1 && player.collidesWith(players[0])) {
      players[0].color = 'cyan';
    }
    else {
      players[0].color = 'red';
    }
  });

  players.forEach(player => {
    if (players.length > 2 && player.collidesWith(players[1])) {
      players[1].color = 'orange';
    }
    else {
      players[1].color = 'lightblue';
    }
  });

  players.forEach(player => {
    if (players.length > 3 && player.collidesWith(players[2])) {
      players[2].color = 'magenta';
    }
    else {
      players[2].color = 'lightgreen';
    }
  });

  players.forEach(player => { 
    if (players.length > 4 && player.collidesWith(players[3])) {
      players[3].color = 'purple';
    }
    else {
      players[3].color = 'yellow';
    }
  });

  // Collision entre un joueur et un obstacle
  /*level1.getObstacles().forEach(obstacle => {
    if (obstacle.colisionPlayer(players[0])) {
      console.log('Player1 est entré en collision avec l’obstacle');
    }
  });*/
  
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
  playersMovement('z', 's', 'q', 'd',players[1]);
  draw();
  requestAnimationFrame(movePlayer);
}

async function loadLevel() {
  let obstacles = [];
  try {
    const response = await fetch('./maps/map3.json');
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
