import { ctx } from './Player.js';
import Projectile from '/Projectile.js';

class Particles extends Projectile{
    constructor(x,y,color){
        super()
        this.x=x;
        this.y=y;
        this.radius=Math.random()*3;
        this.color=color
        this.velocity={
            x:(Math.random()-0.5)*Math.random()*4 *0.99,
            y:(Math.random()-0.5)*Math.random()*4 *0.99
        }
        this.alpha=1
    }

     //Dessine la particule
     draw() {
        ctx.save()
        ctx.globalAlpha=this.alpha
        ctx.beginPath()//Pour commencer a dessiner
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true)//Dessine le cercle
        ctx.fillStyle=this.color//Attribut la couleur
        ctx.fill()//Pour dessiner
        ctx.restore()
    }

    update(){
        this.draw()
        this.x+=this.velocity.x;
        this.y+=this.velocity.y;
        this.alpha -=0.01
    }
}
export default Particles