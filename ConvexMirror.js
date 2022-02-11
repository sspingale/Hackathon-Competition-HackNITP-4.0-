export default class ConvexMirror{
    #animationInterval = null
    constructor(canvas,width=800,height=600){
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.canvas.width = width
        this.canvas.height = height

        this.ctx.fillStyle = "#CCCCCC"
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)
        this.angle = Math.PI/4
        this.radius = this.canvas.width/4
        this.centerOfCuravature = {x:this.canvas.width*2/5,y:this.canvas.height/2}
    }

    /*
        * Case-1 -> object is at Infinity
        * Case-2 -> object is between Infinity and pole
    */

    #calculateImageParams(objectDistance,objectHeight){
        /*
            *Mirror Formula:
            *1/f = 1/v + 1/u
        */

        let u = -objectDistance
        let f = this.radius/2
        let v = (f*u)/(u-f)
        let m = (-v/u)
        let imageHeight = m*objectHeight
        return {imageDistance:v,imageHeight}
    }

    drawSetup({curvature=120,objectDistance=70,objectHeight = 60,radiusOfCuravture=this.canvas.width/4}){
        // this.ctx.scale(2,2)
        // this.ctx.transform(1,0,0,1,-this.canvas.width/4,-this.canvas.height/4)
        this.radius = radiusOfCuravture
        // *principal axis
        this.ctx.beginPath()
        this.ctx.moveTo(20,this.canvas.height/2)
        this.ctx.lineTo(this.canvas.width - 20,this.canvas.height/2)
        this.ctx.stroke()
        this.ctx.closePath()

        //* draw mirror
        this.ctx.beginPath();
        this.ctx.fillStyle = "black"
        this.ctx.lineWidth = 2
        this.ctx.arc(this.centerOfCuravature.x,this.centerOfCuravature.y,this.radius,-Math.PI*curvature/360,Math.PI*curvature/360,false)
        this.ctx.stroke()
        this.ctx.closePath();

        // *Center of curvature and focus
        this.ctx.beginPath()
        this.ctx.font = "20px monospace"
        this.ctx.arc(this.centerOfCuravature.x,this.centerOfCuravature.y,5,0,Math.PI*2,true) // *C
        this.ctx.arc(this.centerOfCuravature.x + this.radius,this.centerOfCuravature.y,5,0,Math.PI*2,true) // *P
        this.ctx.arc(this.centerOfCuravature.x + this.radius/2,this.centerOfCuravature.y,5,0,Math.PI*2,true) // *f

        this.ctx.fillText("C",this.centerOfCuravature.x-5,this.centerOfCuravature.y+25,10)
        this.ctx.fillText("F",this.centerOfCuravature.x+this.radius/2-5,this.centerOfCuravature.y+25,10)
        this.ctx.fillText("P",this.centerOfCuravature.x+this.radius+10,this.centerOfCuravature.y+25,10)
        
        this.ctx.fill()
        this.ctx.closePath()

        // *make object
        this.ctx.beginPath()
        this.ctx.lineWidth=2
        this.ctx.moveTo(objectDistance  + this.centerOfCuravature.x + this.radius,this.canvas.height/2-objectHeight)
        this.ctx.lineTo(objectDistance  + this.centerOfCuravature.x + this.radius,this.canvas.height/2)
        this.ctx.stroke()
        this.ctx.closePath() 

        //* make triangle at top of object
        let side = 10
        this.ctx.beginPath()
        this.ctx.moveTo(objectDistance  + this.centerOfCuravature.x + this.radius,this.canvas.height/2-objectHeight)
        if(objectHeight>0){
            this.ctx.lineTo(objectDistance  + this.centerOfCuravature.x + this.radius - side/2,this.canvas.height/2-objectHeight + side*Math.sqrt(3)/2)
            this.ctx.lineTo(objectDistance  + this.centerOfCuravature.x + this.radius + side/2,this.canvas.height/2-objectHeight + side*Math.sqrt(3)/2)
        }
        else if(objectHeight<0){
            this.ctx.lineTo(objectDistance  + this.centerOfCuravature.x + this.radius - side/2,this.canvas.height/2-objectHeight - side*Math.sqrt(3)/2)
            this.ctx.lineTo(objectDistance  + this.centerOfCuravature.x + this.radius + side/2,this.canvas.height/2-objectHeight - side*Math.sqrt(3)/2)
        }

        this.ctx.lineTo(objectDistance  + this.centerOfCuravature.x + this.radius,this.canvas.height/2-objectHeight)
        this.ctx.fill()
        this.ctx.stroke()
        this.ctx.closePath()

        // *make image
        let {imageHeight,imageDistance} = this.#calculateImageParams(objectDistance,objectHeight)
        this.ctx.beginPath()
        this.ctx.lineWidth=2
        this.ctx.setLineDash([5, 5]);
        this.ctx.moveTo(this.centerOfCuravature.x + this.radius-imageDistance,this.canvas.height/2)
        this.ctx.lineTo(this.centerOfCuravature.x + this.radius-imageDistance,this.canvas.height/2 - imageHeight)
        console.log(imageHeight,imageDistance,this.radius);
        this.ctx.stroke()
        this.ctx.closePath()

        //*make triangle at top of image
        this.ctx.beginPath()
        this.ctx.setLineDash([0,0]);
        this.ctx.moveTo(this.centerOfCuravature.x + this.radius-imageDistance,this.canvas.height/2 - imageHeight)

        if(imageHeight<0){
            this.ctx.lineTo(this.centerOfCuravature.x + this.radius-imageDistance - side/2,this.canvas.height/2 - imageHeight - side*Math.sqrt(3)/2)
            this.ctx.lineTo(this.centerOfCuravature.x + this.radius-imageDistance + side/2,this.canvas.height/2 - imageHeight - side*Math.sqrt(3)/2)
        }else if(imageHeight>0){
            this.ctx.lineTo(this.centerOfCuravature.x + this.radius-imageDistance - side/2,this.canvas.height/2 - imageHeight + side*Math.sqrt(3)/2)
            this.ctx.lineTo(this.centerOfCuravature.x + this.radius-imageDistance + side/2,this.canvas.height/2 - imageHeight + side*Math.sqrt(3)/2)
        }
            
        this.ctx.lineTo(this.centerOfCuravature.x + this.radius-imageDistance,this.canvas.height/2 - imageHeight)
        this.ctx.stroke()
        this.ctx.fill()
        this.ctx.closePath()
    }
}


let c = new ConvexMirror(document.querySelector("canvas"))
c.drawSetup({
    curvature:125,
    objectDistance:60,
    objectHeight:70,
    radiusOfCuravture:120
})