import Player from './Player.js';
import Obstacle from './Obstacle.js';
import Level from './Level.js';
window.onload = init;

let canvas, ctx, w, h;
let players = [];
let level;
let numLevel = 1;
let keys = {};


let pause=false;
let arrivee = [];

let isQwerty = true;

function init() {
  console.log("page chargée");

  canvas = document.querySelector("#gameCanvas");
  let depart = document.querySelector("#auazard");
  depart.addEventListener("click", startGame);
  w = canvas.width;
  h = canvas.height;

  ctx = canvas.getContext('2d');

  ctx.strokeStyle = 'black';
  ctx.lineWidth = 5;
  ctx.strokeRect(0, 0, w, h);
  players[0] = new Player("red", 10, 45, 25, 25);

  //level1 = new Level(await loadLevel(), []);
  //console.log("les obstacles ici",level1.obstacles);
  //let obs1 = new Obstacle(100, 100, { x: 100, y: 100 }, "red");
  //obs1.setMove(true);

  level = new Level([], []);

  window.addEventListener("keydown", function (e) {
    keys[e.key] = true;
  });
  window.addEventListener("keyup", function (e) {
    keys[e.key] = false;
  });
  //move();
}

async function startGame(){
  let nbjoueur = document.querySelector('input[name="numPlayers"]:checked').value;
 
  //gestion du type de clavier
  if(document.querySelector('input[name="keyLayout"]:checked').value == 1){
    isQwerty = false;
  }
  if(nbjoueur >= 1){
    players[0] = new Player("red", 10, 5, 25, 25);
  }
  if(nbjoueur >= 2){
    players[1] = new Player("blue", 10, 40, 25, 25);
  }
  if(nbjoueur >= 3){
    players[2] = new Player("lightgreen", 10, 75, 25, 25);

  }
  if(nbjoueur >= 4){
    players[3] = new Player("yellow", 10, 110, 25, 25);

  }
  document.querySelector('#gameForm').style.display = 'none';
  document.querySelector('#layout').style.display = 'none';
  document.querySelector('#gameCanvas').hidden = false;
  //level = new Level(await loadLevel(1), []);

  let BoostSpeed = new Obstacle(100, 100, { x: 100, y: 100 }, "#00FFFF");
  BoostSpeed.isBonnus = true;
  level = new Level(await loadLevel(20), []);

  numLevel = 1; 
  draw();
  countdown(5);
}
 
function countdown(dcpt)
{
  if(dcpt < 0){
    movePlayer();
    return 0;
  }else{
    var affiche = 'Timer : '+dcpt+'s';
    document.getElementById('timer').innerHTML = affiche;
    return setTimeout(() => {countdown(dcpt-1);}, 1000);
  }
}
 


function draw() {

  ctx.clearRect(0, 0, w, h);
  
  playersCollision();
  obstacleCollision();

  level.draw(ctx);

  players.forEach(player => {
    if (arrivee.includes(player)) {
      return;
    }
    player.draw(ctx);
  });
  
  
}

function playersCollision() {
  players.forEach(playerA => {
    if (arrivee.includes(playerA)) {
      return;
    }
    players.forEach(playerB => {
      if (arrivee.includes(playerB)) {
        return;
      }
      //colision au bourd du canvas
      if (playerA.x_axis < 0) {
        playerA.setXaxis(0);
      }else if (playerA.x_axis > w - playerA.width) {
        playerA.setXaxis(w - playerA.width);
      }
      if (playerA.y_axis < 0) {
        playerA.setYaxis(0);
      }else if (playerA.y_axis > h - playerA.height) {
        playerA.setYaxis(h - playerA.height);
      }
      if (playerA !== playerB && playerA.collidesWith(playerB)) {
        //playerA.rollback();
        if (Math.abs(playerA.x_axis - playerB.x_axis) > Math.abs(playerA.y_axis - playerB.y_axis)) {

          if (playerA.x_axis > playerB.x_axis) {
            //playerB.isCloinding = true;
            playerB.setXaxis(playerB.x_axis - 5);
            playerA.setXaxis(playerA.x_axis + 5);
          } else if (playerA.x_axis < playerB.x_axis) {
            //playerB.isCloinding = true;
            playerB.setXaxis(playerB.x_axis + 5);
            playerA.setXaxis(playerA.x_axis - 5);
          }
        } else {
          if (playerA.y_axis > playerB.y_axis) {
            //playerB.isCloinding = true;
            playerB.setYaxis(playerB.y_axis - 5);
            playerA.setYaxis(playerA.y_axis + 5);
          } else if (playerA.y_axis < playerB.y_axis) {
            //playerB.isCloinding = true;
            playerB.setYaxis(playerB.y_axis + 5);
            playerA.setYaxis(playerA.y_axis - 5);
          }
        }
      } else {
        //player.rollback();
      }
    });
  });
}
function obstacleCollision() {
  level.obstacles.forEach(obstacle => {
    players.forEach(player => {
      if (arrivee.includes(player)) {
        return;
      }
      if (obstacle.colisionPlayer(player)) {
        if(obstacle.color=='#FFFFFF'){return;}
        if (obstacle.color === '#FF0000'){ // rouge
          player.setXaxis(player.origine.x);
          player.setYaxis(player.origine.y);
          return;
        }

        if(obstacle.color === '#FF00FF'){ // violet
          player.setPlayerSpeed(2);
          obstacle.color = '#FFFFFF';
          setTimeout(() => {
            player.setPlayerSpeed(5);
          }, 1000);
          return;
        }

        if(obstacle.color === '#00FFFF'){ // cyan
          obstacle.color = '#FFFFFF';
          players.forEach(p => {
            if(p !== player){
              p.reverse = true;
            }
          }); 
          setTimeout(() => {
            players.forEach(p => {
              p.reverse = false;
            });
          }, 4000); 
        }

        if (obstacle.color === '#00FF00'){ // vert
          arrivee.push(player);
          player.points += 5 - arrivee.length ;
          document.getElementById('score'+player.color).innerHTML = player.points;

          if(arrivee.length === players.length){

            nextLevel();
          }
          //nextLevel();
        }

        if(obstacle.color === '#FFFF00'){ // jaune
          player.setPlayerSpeed(8);
          obstacle.color = '#FFFFFF';
          setTimeout(() => {
            player.setPlayerSpeed(5);
          }, 1000);
          return;
        }
        //on peut check la direct pour pousser comme il faut tkt
        if (obstacle.move) {
          if(obstacle.UpDown){
            if (obstacle.position.y > player.y_axis) {
              player.isCloinding = true;
              player.setYaxis(player.y_axis - 6);
            } else {
              player.isCloinding = true;
              player.setYaxis(player.y_axis + 6);
            }
          }else{
            if (obstacle.position.x > player.x_axis) {
              player.isCloinding = true;
              player.setXaxis(player.x_axis - 6);
            } else {
              player.isCloinding = true;
              player.setXaxis(player.x_axis + 6);
            }
          }
          
        } else {
          player.rollback();
        }
      }
    });
  });
}

function playersMovement(haut, bas, gauche, droite, player) {


  if (player.isCloinding) {
    player.isCloinding = false;
    return;
  }
  if(player.reverse){
    let tmp = haut;
    haut = bas;
    bas = tmp;

    tmp = gauche;
    gauche = droite;
    droite = tmp;

  }
  if (keys[haut] && keys[droite]) {
    player.setXaxis(player.x_axis + player.speed / Math.sqrt(2));
    player.setYaxis(player.y_axis - player.speed / Math.sqrt(2));
  } else if (keys[haut] && keys[gauche]) {
    player.setYaxis(player.y_axis - player.speed / Math.sqrt(2));
    player.setXaxis(player.x_axis - player.speed / Math.sqrt(2));
  } else if (keys[bas] && keys[droite]) {
    player.setYaxis(player.y_axis + player.speed / Math.sqrt(2));
    player.setXaxis(player.x_axis + player.speed / Math.sqrt(2));

  } else if (keys[bas] && keys[gauche]) {
    player.setYaxis(player.y_axis + player.speed / Math.sqrt(2));
    player.setXaxis(player.x_axis - player.speed / Math.sqrt(2));

  } else {
    if (keys[haut]) {
      player.setYaxis(player.y_axis - player.speed);
    }
    if (keys[bas]) {
      player.setYaxis(player.y_axis + player.speed);

    }
    if (keys[droite]) {
      player.setXaxis(player.x_axis + player.speed);
    }
    if (keys[gauche]) {
      player.setXaxis(player.x_axis - player.speed);
    }
  }
}

function movePlayer() {
  if(pause){
    pause = false;
    return;
  }
  if(players.length >= 1){
    playersMovement('ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', players[0]);
  }
  if(players.length >= 2){
    if(isQwerty){
      playersMovement('w', 's', 'a', 'd', players[1]);
    }else{
      playersMovement('z', 's', 'q', 'd', players[1]);
    }
  }
  if(players.length >= 3){
    playersMovement('i', 'k', 'j', 'l', players[2]);
  }
  if(players.length >= 4){
    playersMovement('t', 'g', 'f', 'h', players[3]);
  }
  draw();
  requestAnimationFrame(movePlayer);
}

async function loadLevel(num) {
  let obstacles = [];
  try {
    let path = './maps/map'+num+'.json';
    const response = await fetch(path);
    const data = await response.json();
    data.data.forEach(obstacle => {
      obstacles.push(new Obstacle(obstacle.x, obstacle.y, obstacle.position, obstacle.color));
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du JSON:', error);
  }
  let mur1;
  let mur2;
  let mur3;
  switch(num){
    
    case 6:
      mur1 = new Obstacle(120, 50, { x: 0, y: 100 }, "#000000");
      mur1.setMove(true, { x: 200, y: 300 });
      obstacles.push(mur1);
      mur2 = new Obstacle(25, 85, { x: 250 , y: 475 }, "#000000");
      mur2.setMove(false, { x: 400, y: 400 });
      obstacles.push(mur2);
      return obstacles;
    case 7:
      mur1 = new Obstacle(320,25,{x:80,y:450},"#000000");
      mur1.setMove(true,{x:320,y:800});
      obstacles.push(mur1);
      mur2 = new Obstacle(215,25,{x:430,y:180},"#000000");
      mur2.setMove(true,{x:645,y:460});
      obstacles.push(mur2);
      return obstacles;
    case 8:
      mur1 = new Obstacle(25, 260, { x: 360, y: 0 }, "#000000");
      mur1.setMove(false, { x: 560, y: 260 });
      obstacles.push(mur1);
      mur2 = new Obstacle(25, 200, { x: 380, y: 490 }, "#000000");
      mur2.setMove(false, { x: 580, y: 200 });
      obstacles.push(mur2);
      return obstacles;
    case 9:
      mur1 = new Obstacle(25,160,{x:160,y:540},"#000000");
      mur1.setMove(false,{x:440,y:160});
      obstacles.push(mur1);
      mur2 = new Obstacle(25,160,{x:440,y:540},"#000000");
      mur2.setMove(false,{x:720,y:160});
      obstacles.push(mur2);
      return obstacles;
    case 15:
      mur1 = new Obstacle(25, 300, { x: 0, y: 200 }, "#FF0000");
      mur1.setMove(false, { x: 800, y: 200 });
      obstacles.push(mur1);
      return obstacles;
    case 16:
      mur1 = new Obstacle(120,20,{x:360,y:240},"#FF0000");
      mur1.setMove(true,{x:360,y:485});
      obstacles.push(mur1);
      mur2 = new Obstacle(120,20,{x:360,y:485},"#FF0000");
      mur2.setMove(true,{x:360,y:730});
      obstacles.push(mur2);
      return obstacles;
    case 17:
      mur1 = new Obstacle(20,235,{x:75,y:285},"#FF0000");
      mur1.setMove(false,{x:680,y:285});
      obstacles.push(mur1);
      mur2 = new Obstacle(155,20,{x:325,y:160},"#FF0000");
      mur2.setMove(true,{x:325,y:640});
      obstacles.push(mur2);
      return obstacles;
    case 18:
      mur1 = new Obstacle(40, 40, { x: 0, y: 200 }, "#FF0000");
      mur1.setMove(false, { x: 800, y: 200 });
      obstacles.push(mur1);
      mur2 = new Obstacle(40, 40, { x: 0, y: 400 }, "#FF0000");
      mur2.setMove(false, { x: 800, y: 400 });
      obstacles.push(mur2);
      mur3 = new Obstacle(40, 40, { x: 0, y: 680 }, "#FF0000");
      mur3.setMove(false, { x: 800, y: 680 });
      obstacles.push(mur3);
      return obstacles;
    case 19:
      mur1 = new Obstacle(80, 40 , { x: 0, y: 600 }, "#FF0000");
      mur1.setMove(true, { x: 0, y: 780 });
      obstacles.push(mur1);
      return obstacles;
    case 20:
      mur1 = new Obstacle(80, 80, { x: 0, y: 240 }, "#FF0000");
      mur1.setMove(false, { x: 760, y: 240 });
      obstacles.push(mur1);
      return obstacles;
    }
   

  return obstacles;
}

async function nextLevel(){
  
  arrivee = [];
  numLevel++;
  if(numLevel > 20){
    pause = true;
    let gg="";
    let max = 0;
    players.forEach(p => {
      if(p.points > max){
        max = p.points;
        gg = p.color;
      }
    });
    alert(gg+" a gagné le jeu");
    return;
  }
  console.log("niveau suivant",numLevel);
  //reset la possition de tous pour eviter de spazn syr la fin bolos
  //on le fait deux fois pour vider le buffer 
  players.forEach(p => {
    p.resetPos();
  });
  pause = true;
  level = new Level(await loadLevel(numLevel), []);
  countdown(3);
  draw();
}
