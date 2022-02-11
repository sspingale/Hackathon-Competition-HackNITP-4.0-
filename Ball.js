export default class Ball{
    constructor(x,y,radius=10){
        this.x = x
        this.y =y
        this.radius=radius
        this.velocity = 2
        this.direction = {x:1,y:1}
        this.color = this.#randomColorGenerator()
    }

    #randomColorGenerator(){
        let colors = ["red","blue","lime",'green','gold','orange','goldenrod',"orangered"]

        return colors[Math.floor(Math.random()*colors.length)]
    }

    draw(ctx){
        // velocity vector
        let vectorLength =this.radius*3
        ctx.beginPath()
        ctx.fillStyle = "black"
        ctx.lineWidth = 2
        ctx.moveTo(this.x,this.y)
        ctx.lineTo(this.x + vectorLength*this.direction.x/Math.sqrt(2),this.y + vectorLength*this.direction.y/Math.sqrt(2))
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.fillStyle = "red"
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true)
        ctx.fill()
        ctx.closePath()
    }

    setCoordinates(x,y){
        this.x = x
        this.y=y
    }

    setDirection(x,y){
        this.direction = {x,y}
    }
}