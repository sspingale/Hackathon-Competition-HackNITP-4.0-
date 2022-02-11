import Ball from "./Ball.js"

let ballsArray = []
export default class ElasticCollision{
    constructor(canvas,width=800,height=600){
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.canvas.width = width
        this.canvas.height = height
        this.coeffOfRestitution = 1
        this.ctx.fillStyle = "#CCCCCC"
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)
    }

    addBall(x,y,radius=18){
        let directions = [1,0,-1]
        let ball = new Ball(x,y,18)
        ball.direction = {x:directions[Math.floor(Math.random()*directions.length)],y:directions[Math.floor(Math.random()*directions.length)]}
      ballsArray.push(ball)
    }

    draw(){
        setInterval(()=>{
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
            this.ctx.fillStyle = "#CCCCCC"
            this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)
            ballsArray.forEach(item=>{
                item.x += item.velocity*item.direction.x
                item.y += item.velocity*item.direction.y

                if(item.x > this.canvas.width - item.radius || item.x<item.radius){
                    item.direction.x = -item.direction.x
                }
                if(item.y > this.canvas.height-item.radius || item.y<item.radius){
                    item.direction.y = -item.direction.y
                }

                item.draw(this.ctx)
            })
        })
    }

}


let e = new ElasticCollision(document.querySelector("canvas"))
e.addBall(30,60)
// e.addBall(60,80)
e.draw()
