class Obstacle {
    constructor(x, y, position) {
      this.x = x; // Largeur de l'obstacle
      this.y = y; // Hauteur de l'obstacle
      this.position = position; // Position sous forme d'objet {x: ..., y: ...}
    }

    colisionPlayer(player) {
        if (player.x + player.width < this.position.x || player.x > this.position.x + this.x || player.y + player.height < this.position.y || player.y > this.position.y + this.y) {
            return false;
        }
        return true;
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.x, this.y);
    }
}