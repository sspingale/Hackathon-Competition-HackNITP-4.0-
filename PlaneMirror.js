export default class PlaneMirror{
    #animationInterval = null
    constructor(canvas,width,height){
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.canvas.width = width
        this.canvas.height = height
        this.ctx.fillStyle = "#CCCCCC"
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)
        this.angle = Math.PI/4
    }
    
    draw(planeMirrorHeight = this.canvas.height*2/3 ,platformLength = 2*this.canvas.width/3,pointCoordinate = 350,textLength = 200,radius=5){
        this.point = {x:this.canvas.width/2 +pointCoordinate,y:this.canvas.height/2 }
        this.ctx.beginPath()
        this.ctx.fillStyle = "black"
        let y = (this.canvas.height-planeMirrorHeight)/2
        this.ctx.font = "40px monospace"
        this.ctx.fillText("Plane Mirror",this.canvas.width/2-textLength/2,y/2+textLength/30,textLength)
        this.ctx.lineCap = "round"
        this.ctx.lineWidth = 2
        
        // mirror
        this.ctx.moveTo(this.canvas.width/2,y)
        this.ctx.lineTo(this.canvas.width/2,planeMirrorHeight+y)
        this.ctx.stroke()
        
        // mirror silvering
        for(let i=0;i<planeMirrorHeight;i+=10){
            this.ctx.beginPath()
            this.ctx.fillStyle="skyblue"
            this.ctx.globalAlpha = 0.35
            this.ctx.moveTo(this.canvas.width/2-2,i+y)
            this.ctx.lineTo(this.canvas.width/2-2-5,i+5+y)
            this.ctx.stroke()
            this.ctx.closePath()
        }
        
        // platform
        this.ctx.fillStyle="black"
        this.ctx.globalAlpha = 1
        this.ctx.moveTo((this.canvas.width-platformLength)/2,this.canvas.height/2)
        this.ctx.lineTo((this.canvas.width+platformLength)/2,this.canvas.height/2)
        
        // axis names
        this.ctx.font = "18px monospace"
        this.ctx.fillText("Real Axis",this.canvas.width-textLength/2,this.canvas.height/2+20,textLength)
        this.ctx.fillText("Virtual Axis",10,this.canvas.height/2+20,textLength)
        this.ctx.fillText("(0,0)",this.canvas.width/2,this.canvas.height/2+25,textLength)
        
        // draw point
        this.ctx.arc(this.point.x,this.point.y,radius,0,Math.PI*2,true)
        this.ctx.arc(this.canvas.width/2,this.canvas.height/2,radius,0,Math.PI*2,true)
        this.ctx.fill()
        this.ctx.fillText(`(${pointCoordinate},0)`,this.point.x-textLength/6,this.point.y+25,textLength)

        this.ctx.stroke()
        this.ctx.closePath()
    }

    animate(delta){
        let yCoordinate = this.point.x*Math.tan(this.angle)
        // let distance = Math.sqrt(yCoordinate**2 + this.point.x**2)




    }
}


let canvas = document.querySelector("canvas")
let mirror = new PlaneMirror(canvas,1000,700)
// mirror.draw(mirror.canvas.height/1.3,mirror.canvas.width/1.1)
mirror.draw()
