import Player from '/Player.js';
class Projectile extends Player{
    constructor(x,y,radius,color,velocity){
        super()
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.color=color
        this.velocity=velocity
    }

    update(){
        this.draw()
        this.x+=this.velocity.x;
        this.y+=this.velocity.y;
    }
}

export default Projectile