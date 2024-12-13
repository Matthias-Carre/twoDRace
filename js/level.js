export default class Level {
  constructor(obstacles, boost) {
    this.obstacles = obstacles;
    this.boost = boost;
  }

  draw(ctx) {
    console.log("les obstacles:", this.obstacles.length);
    this.obstacles.forEach(obstacle => {
      obstacle.draw(ctx);
    });
    this.boost.forEach(boost => {
      boost.draw(ctx);
    });
  }
}