import Point from '../Math/Point';
import _meshBuilder from './MeshBuilder';
import Plane from '../Math/Plane';

export default class PolyBeam {

    /**@type {Point[]} */
    points;
    /**@type {Plane} */
    _plane;

    /**@type {Point} */
    position;
    
    /**
     * 
     * @param {Point[]} Points 
     */
    constructor(points){    

        this.points = points;
        this.name = "Beam";
        this.profileString = "H*5*5*1*1"
    }



    insert(){
        
        _meshBuilder.PolyBeamToMesh(this);
    }

    /**
     * 
     * @returns {Point[]}
     */
    GetProfile(){
        const dx = 1; 
        const dy = 1
        const result = []; 
        result.push(new Point(0,  dx, dy));
        result.push(new Point(0, -dx, dy));
        result.push(new Point(0, -dx,-dy));
        result.push(new Point(0,  dx,-dy));
        this.profile = result; 
        return result; 
    }

    /**
     * 
     * @param {(start:Point, end:Point, pln1:Plane, pln2:Plane)=>void} func 
     */
    ForeEachSectionWithPlanes(func){        

        let currentPlane;
        let nextPlane;


        for(let i = 0 ; i< this.points.length-1; i++){

            const curPoint = this.points[i].toVector();
            const nPoint = this.points[i+1].toVector();
            const vX = nPoint.minus(curPoint).normalize();

            if(i==0) {
                currentPlane = new Plane(this.points[i], vX);
            }

            const nnPoint = this.points[i+2]==null?undefined:this.points[i+2].toVector(); 

            if(typeof(nnPoint)!=="undefined"){
                const nVX = nnPoint.minus(nPoint).normalize(); 
                const midNorm = vX.plus(nVX).normalize();
                nextPlane = new Plane(this.points[i+1], midNorm); 
            } else {
                nextPlane = new Plane(this.points[i+1], vX); 
            }

            func(this.points[i], this.points[i+1], currentPlane, nextPlane )
            currentPlane = nextPlane; 
        }
    }


    

    genProfileH(width, height, flangeThick, webThick){
    
            const hwidth = width/2;
            const hheight = height/2;
    
            var p1 =  new Point(0, hheight,  hwidth);
            var p2 =  new Point(0, hheight, -hwidth);
            var p3 =  new Point(0, hheight-flangeThick, -hwidth);
            var p4 =  new Point(0, hheight-flangeThick, -webThick/2);
            var p5 =  new Point(0,-hheight+flangeThick, -webThick/2);
            var p6 =  new Point(0,-hheight+flangeThick, -hwidth);
            var p7 =  new Point(0,-hheight, -hwidth);
            var p8 =  new Point(0,-hheight,  hwidth);
            var p9 =  new Point(0,-hheight+flangeThick,  hwidth);
            var p10 = new Point(0,-hheight+flangeThick,  webThick/2);
            var p11 = new Point(0, hheight-flangeThick,  webThick/2);
            var p12 = new Point(0, hheight-flangeThick,  hwidth);
    
            const result = 
            [
                // p1,p2,p3,p4,p5,p6,p7,p8,p9,
                // p10,p11,p12
                p12,p11,p10,p9,p8,p7,p6,p5,p4,
                p3,p2,p1
            ]; 
    
            //TODO  - Implement Profile Angle
            // if(profileArg5_rotate!=0){
            //     var cs = new CoordinateSystem(); 
            //     result = result.Select(p=>{
            //         return cs.RotatePointAroundZ(p,profileArg5_rotate); 
            //     }).ToList();
            // }
    
            
            return result; 
        }

    /**
     * 
     * @param {(point:Point)=>void}} func 
     */
    ForeachPoint(func){
        for (let i = 0; i < this.profile.length; i++) {
            func(this.profile[i]);
        }
    }

    ForeachQuad(profile1, profile2){


    }


}