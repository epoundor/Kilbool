let canva= document.querySelector('canvas');
let ctx=canva.getContext('2d');
canva.width=innerWidth;
canva.height=innerHeight
class Player{
    
    constructor(x,y,radius,color){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.color=color
    }
    //Dessine le player
    draw() {
        ctx.beginPath()//Pour commencer a dessiner
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true)//Dessine le cercle
        ctx.fillStyle=this.color//Attribut la couleur
        ctx.fill()//Pour dessiner
    }
}

export default Player
export {canva,ctx} 