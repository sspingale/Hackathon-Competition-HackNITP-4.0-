export default class ConcaveMirror{
    #animationInterval = null
    constructor(canvas,width=800,height=600){
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.canvas.width = width
        this.canvas.height = height

        this.ctx.fillStyle = "rgba(0,0,0,0.1)"
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)
        this.angle = Math.PI/4
        this.radius = this.canvas.width/4
        this.centerOfCuravature = {x:this.canvas.width*3/5,y:this.canvas.height/2}
    }

    /*
        * Case-1 -> object is between pole and focus
        * Case-2 -> object is at focus
        * Case-3 -> object is between focus and center of curvature
        * Case-4 -> object is at center of curvature
        * Case-5 -> object is between center of curvature and Infinity
        * Case-6 -> object is at Infinity
    */

    calculateImageParams(objectDistance,objectHeight){
        /*
            *Mirror Formula:
            *1/f = 1/v + 1/u
        */
        let u = -objectDistance
        let f = -this.radius/2
        let v = (f*u)/(u-f)
        let m = (-v/u)
        let imageHeight = m*objectHeight
        return {imageDistance:v,imageHeight,magnification:m}
    }

    drawSetup({curvature=120,objectDistance=70,objectHeight = 60,radiusOfCurvature=this.canvas.width/4}){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.ctx.fillStyle = "rgba(0,0,0,0.1)"
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)
        this.radius = radiusOfCurvature
        //* draw mirror
        this.ctx.beginPath();
        this.ctx.fillStyle = "black"
        this.ctx.lineWidth = 2
        this.ctx.arc(this.centerOfCuravature.x,this.centerOfCuravature.y,this.radius,Math.PI-Math.PI*curvature/360,Math.PI+Math.PI*curvature/360,false)
        this.ctx.stroke()
        this.ctx.closePath();

        
        //* draw principal axis
        this.ctx.beginPath()
        this.ctx.lineWidth = 1
        this.ctx.moveTo(20,this.canvas.height/2)
        this.ctx.lineTo(this.canvas.width - 20,this.canvas.height/2)
        this.ctx.stroke()
        this.ctx.closePath()
        
        
        // *Center of curvature and focus
        this.ctx.beginPath()
        this.ctx.font = "20px monospace"
        this.ctx.arc(this.centerOfCuravature.x,this.centerOfCuravature.y,5,0,Math.PI*2,true) // *C
        this.ctx.arc(this.centerOfCuravature.x - this.radius,this.centerOfCuravature.y,5,0,Math.PI*2,true) // *P
        this.ctx.arc(this.centerOfCuravature.x - this.radius/2,this.centerOfCuravature.y,5,0,Math.PI*2,true) // *f

        this.ctx.fillText("C",this.centerOfCuravature.x-5,this.centerOfCuravature.y+25,10)
        this.ctx.fillText("F",this.centerOfCuravature.x-this.radius/2-5,this.centerOfCuravature.y+25,10)
        this.ctx.fillText("P",this.centerOfCuravature.x-this.radius+10,this.centerOfCuravature.y+25,10)
        
        this.ctx.fill()
        this.ctx.closePath()

        // *make object
        this.ctx.beginPath()
        this.ctx.lineWidth=2
        this.ctx.moveTo(objectDistance  + this.centerOfCuravature.x - this.radius,this.canvas.height/2-objectHeight)
        this.ctx.lineTo(objectDistance  + this.centerOfCuravature.x - this.radius,this.canvas.height/2)
        this.ctx.stroke()
        this.ctx.closePath() 

        //* make triangle at top of object
        let side = 10
        this.ctx.beginPath()
        this.ctx.moveTo(objectDistance  + this.centerOfCuravature.x - this.radius,this.canvas.height/2-objectHeight)

        if(objectHeight>0){
            this.ctx.lineTo(objectDistance  + this.centerOfCuravature.x - this.radius - side/2,this.canvas.height/2-objectHeight + side*Math.sqrt(3)/2)
            this.ctx.lineTo(objectDistance  + this.centerOfCuravature.x - this.radius + side/2,this.canvas.height/2-objectHeight + side*Math.sqrt(3)/2)
        }
        else if(objectHeight<0){
            this.ctx.lineTo(objectDistance  + this.centerOfCuravature.x - this.radius - side/2,this.canvas.height/2-objectHeight - side*Math.sqrt(3)/2)
            this.ctx.lineTo(objectDistance  + this.centerOfCuravature.x - this.radius + side/2,this.canvas.height/2-objectHeight - side*Math.sqrt(3)/2)
            
        }
            
        this.ctx.lineTo(objectDistance  + this.centerOfCuravature.x - this.radius,this.canvas.height/2-objectHeight)
        this.ctx.fill()
        this.ctx.stroke()
        this.ctx.closePath()

        // *make image
        let {imageHeight,imageDistance,magnification} = this.calculateImageParams(objectDistance,objectHeight)
        this.ctx.beginPath()
        this.ctx.lineWidth=2
        this.ctx.setLineDash([5, 5]);
        this.ctx.moveTo(this.centerOfCuravature.x - this.radius-imageDistance,this.canvas.height/2)
        this.ctx.lineTo(this.centerOfCuravature.x - this.radius-imageDistance,this.canvas.height/2 - imageHeight)
        this.ctx.stroke()
        this.ctx.closePath()
        
        //*make triangle at top of image
        this.ctx.beginPath()
        this.ctx.setLineDash([0,0]);
        this.ctx.moveTo(this.centerOfCuravature.x - this.radius-imageDistance,this.canvas.height/2 - imageHeight)

        if(imageHeight<0){
            this.ctx.lineTo(this.centerOfCuravature.x - this.radius-imageDistance - side/2,this.canvas.height/2 - imageHeight - side*Math.sqrt(3)/2)
            this.ctx.lineTo(this.centerOfCuravature.x - this.radius-imageDistance + side/2,this.canvas.height/2 - imageHeight - side*Math.sqrt(3)/2)
        }else if(imageHeight>0){
            this.ctx.lineTo(this.centerOfCuravature.x - this.radius-imageDistance - side/2,this.canvas.height/2 - imageHeight + side*Math.sqrt(3)/2)
            this.ctx.lineTo(this.centerOfCuravature.x - this.radius-imageDistance + side/2,this.canvas.height/2 - imageHeight + side*Math.sqrt(3)/2)
        }
            
        this.ctx.lineTo(this.centerOfCuravature.x - this.radius-imageDistance,this.canvas.height/2 - imageHeight)
        this.ctx.stroke()
        this.ctx.fill()
        this.ctx.closePath()
    }
}

let c = new ConcaveMirror(document.querySelector("#mainCanvas"),window.innerWidth/2,window.innerHeight/1.5)
const objectDistance = document.getElementById("objectDistance")
const objectHeight = document.getElementById("objectHeight")
const visualizeBtn = document.getElementById("visualizeBtn")
const imageDistance = document.getElementById("imageDistance")
const imageHeight = document.getElementById("imageHeight")
const radius = document.getElementById("radius")
radius.value = '200'
c.drawSetup({
    objectDistance:40,
    objectHeight:0,
    radiusOfCurvature:Number(radius.value)
})

visualizeBtn.addEventListener("click",()=>{
    c.drawSetup({
        objectDistance:Number(objectDistance.value),
        objectHeight:Number(objectHeight.value),
        radiusOfCurvature:Number(radius.value)
    })
    imageDistance.value = c.calculateImageParams(Number(objectDistance.value),Number(objectHeight.value)).imageDistance.toFixed(2)

    imageHeight.value = c.calculateImageParams(Number(objectDistance.value),Number(objectHeight.value)).imageHeight.toFixed(2)
})

const caseCanvas1 = document.getElementById("case1")
const caseCanvas2 = document.getElementById("case2")
const caseCanvas3 = document.getElementById("case3")
const caseCanvas4 = document.getElementById("case4")
const caseCanvas5 = document.getElementById("case5")
const caseCanvas6 = document.getElementById("case6")

let w=350,h=350
let c1 = new ConcaveMirror(caseCanvas1,w,h)
c1.drawSetup({
    objectDistance:c1.radius/4,
    objectHeight:40
})
c1.ctx.fillText("Case-1",w/2-50,50,100)

let c2 = new ConcaveMirror(caseCanvas2,w,h)
c2.drawSetup({
    objectDistance:c2.radius/2,
    objectHeight:70
})
c2.ctx.fillText("Case-2",w/2-50,50,100)

let c3 = new ConcaveMirror(caseCanvas3,w,h)
c3.drawSetup({
    objectDistance:1.5*c3.radius/2,
    objectHeight:70
})
c3.ctx.fillText("Case-3",w/2-50,50,100)

let c4 = new ConcaveMirror(caseCanvas4,w,h)
c4.drawSetup({
    objectDistance:c4.radius,
    objectHeight:70
})
c4.ctx.fillText("Case-4",w/2-50,50,100)

let c5 = new ConcaveMirror(caseCanvas5,w,h)
c5.drawSetup({
    objectDistance:1.5*c5.radius,
    objectHeight:70
})
c5.ctx.fillText("Case-5",w/2-50,50,100)

let c6 = new ConcaveMirror(caseCanvas6,w,h)
c6.drawSetup({
    objectDistance:Infinity,
    objectHeight:70
})
c6.ctx.fillText("Case-6",w/2-50,50,100)
