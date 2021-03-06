import { canva, ctx } from "./Player.js";
import Player from './Player.js';
import Projectile from './Projectile.js';
import Enemy from './Enemy.js';
import Particles from "./Particle.js";
// Desiner le joueur
const player=new Player(canva.width/2,canva.height/2,20,'white')
//Modal
let button =document.querySelector('button'),
    modal=document.querySelector(".modal"),
    sc=document.querySelector(".sc"),
    autoplay=document.getElementById("autoplay")
//Tableau d'éléments
let projectiles=[]
let enemies=[]
let particules=[]
let score=0
let t=5
let onGame;
//Initialise le jeu
function init() {
    projectiles=[]
    enemies=[]
    particules=[]
    score=0
    t=5
    onGame;

}
setInterval(() => {
    t += 0.5
    console.log(t);
}, 30000);
//Dessiner les projectiles au click
addEventListener('click',(e)=>{
    let angle= Math.atan2(e.clientY-canva.height/2,e.clientX-canva.width/2)
    shoot(angle)
})

//Fait apparaitre les enemies
//avec une position aléatoire 
//et une taille et couleur aléatoire
function spawnEnemy() {
    setInterval(()=>{
        const enemy = new Enemy(t-4);
        // console.log(enemy.velocity);
        // setTimeout(()=>{console.log(enemies[0].velocity.y);})
        enemies.push(enemy)
    },900)
}

function animate() {
    onGame=requestAnimationFrame(animate)
    ctx.fillStyle='rgba(0,0,0,.1)'
    ctx.fillRect(0,0,canva.width,canva.height) // Update du canva
    player.draw() //Redesinner le player
    projectiles.forEach((projec,i)=>{
        projec.update()
        if (projec.x+projec.radius<0 || projec.y + projec.radius<0 || projec.x-projec.radius>canva.width || projec.y - projec.radius>canva.height ) {
            projectiles.splice(i,1)

        }
    })



    enemies.forEach((enemy,j)=>{
        enemy.update()
        //Détecteer une collision entre le player et un ennemie 
        //en discutant suivant les valeurs de la distance projectile-player
        if(getDist(player.x-enemy.x,player.y-enemy.y)-player.radius- enemy.radius < 1){
            cancelAnimationFrame(onGame)
            modal.style.display="flex"
            sc.innerHTML=score

        }
        //Détecteer une collision entre un projectile et un ennemie 
        //en discutant suivant les valeurs de la distance projectile-enemie
        projectiles.forEach((projec,i)=>{
            if(getDist(projec.x-enemy.x,projec.y-enemy.y)-projec.radius-enemy.radius < 1){
                //Créer des projectiles
                for (let index = 0; index < enemy.radius/2 ; index++) {
                    let particle=new Particles(enemy.x,enemy.y,enemy.color)
                    particules.push(particle)
                }
                if (enemy.radius<10) {
                    addScore(600)
                }
                else if (enemy.radius<20){
                    addScore(300)
                }  
                else{
                    addScore(100)
                }
               projectiles.splice(i,1)
               enemies.splice(j,1)
            }
        })
    })


    particules.forEach((particule,i)=>{
        if (particule.alpha <= 0.1) {
            particules.splice(i,1)
        }
        particule.update()
    })
    // console.log(enemies);
}
function getDist(x,y) {
    return Math.hypot(x,y)
}


//Tirer automatiquement
function autoKill() {
    //Boucler "enemies" pour voir qui est le plus proche de "player"
    enemies.forEach((enemy,i)=>{
        let nearestEnemy,index,dist= getDist(canva.width,canva.height)
        if (getDist(player.x-enemy.x,player.y-enemy.y)-player.radius-enemy.radius < dist) {
            dist=getDist(player.x-enemy.x,player.y-enemy.y)-player.radius-enemy.radius
            nearestEnemy=enemy
            index=i
        }
        let angle= Math.atan2(nearestEnemy.y-canva.height/2,nearestEnemy.x-canva.width/2)
       shoot(angle)
    })

  
}
//Tirer
function shoot(angle) {
    const projec= new Projectile(canva.width/2,canva.height/2,5,'white',{x:Math.cos(angle)*(t+1),y:Math.sin(angle)*(t+1)})
    projectiles.push(projec)
}


//Scorer
function addScore(point) {
     score += point
    document.querySelector('.score').innerHTML=score

}
  
  


button.addEventListener('click',()=>{
    sc.innerHTML=score
    init()
    //Lancer l'animation
    animate()
    spawnEnemy()
    document.querySelector('.score').innerHTML=score
    modal.style.display="none"
})
autoplay.addEventListener('click',()=>{
    if (autoplay.checked==true) {
        setInterval(()=>{
            autoKill()
        },900)
    }
})