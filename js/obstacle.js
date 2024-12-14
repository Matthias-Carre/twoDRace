export default class Obstacle {
    constructor(x, y, position,color) {
      this.x = x; 
      this.y = y; 
      this.position = position; 
      this.color = color;
      this.move = false;
      this.path = [{...position}, {x:x+500,y:y+20}]; //[0] orginie [1] destination
      this.direction = 1; //1 vers la destiantion 0 vers l'origine
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
        if (this.move) {
            //console.log("moving",this.move,"x",this.position.x,"ax",this.path[0].x,"bx",this.path[1].x);
            if (this.direction) {
                this.position.x += 5;
                if (this.position.x >= this.path[1].x) {
                    this.direction = 0;
                }
            } else {
                this.position.x -= 10 ;
                if (this.position.x <= this.path[0].x) {
                    this.direction = 1;
                }
            }
        }
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.x, this.y);
        ctx.fill();
        ctx.closePath();

    }
}
