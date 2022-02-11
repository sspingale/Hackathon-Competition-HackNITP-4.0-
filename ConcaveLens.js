export default class ConcaveLens{
    constructor(canvas,width=800,height=600){
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.canvas.width = width
        this.canvas.height = height

        this.ctx.fillStyle = "#CCCCCC"
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)
        this.angle = Math.PI/4
        this.radius = this.canvas.width/5
        this.lensGap = canvas.width/10
        this.virtualCenterOfCurvature = {x:this.canvas.width*2/5,y:this.canvas.height/2}
        this.realCenterOfCurvature = {x:this.virtualCenterOfCurvature.x+2*this.radius-this.lensGap,y:this.canvas.height/2}
    }

    #calculateImageParams(objectDistance,objectHeight){
        /*
            *Mirror Formula:
            *1/f = 1/v - 1/u
        */
        let u = -objectDistance
        let f = -this.radius/2
        let v = (f*u)/(u+f)
        let m = (v/u)
        let imageHeight = m*objectHeight
        return {imageDistance:v,imageHeight}
    }

    drawSetup({curvature=120,objectDistance=70,objectHeight = 60}){
        // *make principal axis
        this.ctx.fillStyle = "black"
        this.ctx.beginPath()
        this.ctx.lineWidth = 1
        this.ctx.moveTo(20,this.canvas.height/2)
        this.ctx.lineTo(this.canvas.width - 20,this.canvas.height/2)
        this.ctx.stroke()
        this.ctx.closePath()
        
        //* make lens
        // ?arc from real COC
        this.ctx.lineWidth = 2
        this.ctx.beginPath()

        // ! TODO : explain Math

        let apparentCurvature = 360*Math.acos(((this.radius-this.lensGap/2)/(this.radius-this.lensGap))*Math.cos(Math.PI*curvature/360))/Math.PI

        this.ctx.arc(this.realCenterOfCurvature.x,this.realCenterOfCurvature.y,this.radius,Math.PI-Math.PI*apparentCurvature/360,Math.PI+Math.PI*apparentCurvature/360,false)
        this.ctx.stroke()
        this.ctx.closePath()
        
        // ?arc from virtual COC
        this.ctx.beginPath()
        this.ctx.arc(this.virtualCenterOfCurvature.x,this.virtualCenterOfCurvature.y,this.radius,-Math.PI*apparentCurvature/360,Math.PI*apparentCurvature/360,false)
        this.ctx.stroke()
        this.ctx.closePath()
        
        //* make center of curvature and focus
        //? on real axis
        this.ctx.beginPath()
        this.ctx.arc(this.realCenterOfCurvature.x,this.realCenterOfCurvature.y,5,0,Math.PI*2,true)
        this.ctx.fill()
        this.ctx.closePath()

        this.ctx.beginPath()
        this.ctx.arc(this.realCenterOfCurvature.x-this.radius/2,this.realCenterOfCurvature.y,5,0,Math.PI*2,true)
        this.ctx.fill()
        this.ctx.closePath()

        
        //? on virtual axis
        this.ctx.beginPath()
        this.ctx.arc(this.virtualCenterOfCurvature.x,this.virtualCenterOfCurvature.y,5,0,Math.PI*2,true)
        this.ctx.fill()
        this.ctx.closePath()

        this.ctx.beginPath()
        this.ctx.arc(this.virtualCenterOfCurvature.x+this.radius/2,this.virtualCenterOfCurvature.y,5,0,Math.PI*2,true)
        this.ctx.fill()
        this.ctx.closePath()
        
    }
}


let c = new ConcaveLens(document.querySelector("canvas"))
c.drawSetup({
    curvature:120
})