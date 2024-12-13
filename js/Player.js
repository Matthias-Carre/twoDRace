export default class Player {  
  constructor(color, x_axis, y_axis){
    this.color = color;
    //this.life = life;
    //this.points = points;
    //this.speed = speed;
    this.x_axis = x_axis;
    this.y_axis = y_axis;
  }
  
  set_x_axis(posX){this.x_axis = posX;}
  set_y_axis(posY){this.y_axis = posY;}
  
  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.fillRect(this.x_axis, this.y_axis, 25, 25);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
};
