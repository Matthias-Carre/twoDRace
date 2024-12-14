export default class Obstacle {
    constructor(x, y, position,color) {
      this.x = x; 
      this.y = y; 
      this.position = position; 
      this.color = color;
      this.move = false;
    }

    colisionPlayer(player) {
        return !(
          player.x_axis + player.width < this.position.x || 
          player.x_axis > this.position.x + this.x || 
          player.y_axis + player.height < this.position.y || 
          player.y_axis > this.position.y + this.y
        );
      }

    setMove(canMove) {
        this.move = canMove;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.x, this.y);
        ctx.fill();
        ctx.closePath();

    }
}
