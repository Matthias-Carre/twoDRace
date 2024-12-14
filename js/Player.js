export default class Player {  
  constructor(color, x_axis, y_axis, width, height) {
    this.color = color;
    //this.life = life;
    //this.points = points;
    //this.speed = speed;
    this.x_axis = x_axis;
    this.y_axis = y_axis;
    this.width = width;
    this.height = height;
  }
  
  set_x_axis(posX){this.x_axis = posX;}
  set_y_axis(posY){this.y_axis = posY;}
  
  collidesWith(otherPlayer) {
    if(
      (this.x_axis + this.width) >= otherPlayer.x_axis && 
      this.x_axis < (otherPlayer.x_axis + otherPlayer.width) &&
      this.y_axis + (this.height >= otherPlayer.y_axis) &&
      this.y_axis < (otherPlayer.y_axis + otherPlayer.height)
    )
    {
      return true;
    }
  }
  
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.fillRect(this.x_axis, this.y_axis, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
};
