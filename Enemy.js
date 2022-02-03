import Projectile from '/Projectile.js';
import { canva } from "./Player.js";

class Enemy extends Projectile{
    
    constructor(t){
        super()
        this.radius=Math.random() * (40-6) +6;
        if (Math.random()<0.5) {
            this.x=Math.random()< 0.5?0-this.radius:canva.width+this.radius;
            this.y=Math.random()*canva.height
        }else{
            this.x=Math.random()*canva.width
            this.y=Math.random()< 0.5?0-this.radius:canva.height+this.radius;
        }
        this.color=`hsl(${Math.random()*360},50%,50%)`
        this.velocity={
            x:t*Math.cos(Math.atan2((canva.height/2)-this.y,(canva.width/2)-this.x)),
            y:t*Math.sin(Math.atan2((canva.height/2)-this.y,(canva.width/2)-this.x))
        }
    }
  
}
export default Enemy