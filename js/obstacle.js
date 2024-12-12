export default class Obstacle {
    constructor(x, y, position,color) {
      this.x = x; 
      this.y = y; 
      this.position = position; 
      this.color = color;
    }

    colisionPlayer(player) {
        if (player.x + player.width < this.position.x || player.x > this.position.x + this.x || player.y + player.height < this.position.y || player.y > this.position.y + this.y) {
            return false;
        }
        return true;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.x, this.y);
        ctx.fill();
        ctx.closePath();

    }
}