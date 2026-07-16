import nPoint from '../Math/nPoint';
import _meshBuilder from './MeshBuilder';
import Plane from '../Math/Plane';
import UCS from '../Math/UCS';

export default class nPolyBeam {

    /**@type {nPoint[]} */
    points;
    /**@type {Plane} */
    _plane;

    /**@type {Point} */
    position;
    
    /**
     * 
     * @param {nPoint[]} points 
     */
    constructor(points){    

        this.points = points;
        this.name = "Beam";
        this.profileString = "H*5*5*1*1"
    }


    /**
     * 
     * @param {Point[]} point1 
     * @param {Point[]} point2 
     * @returns {PolyBeam}
     */
    static MergePoints(point1, point2){

        const st1 = point1[0];
        const st2 = point1[point1.length-1];

        const en1 = point2[0];
        const en2 = point2[point2.length-1];

        if(st2.AlmoustEqual(en2)){
            point2.pop();
            point1.push(...point2.reverse() );
            return new PolyBeam(point1);
        }

        return new PolyBeam([]);
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
     * @param {(start:nPoint, end:nPoint, pln1:UCS, pln2:UCS)=>void} func 
     */
    ForeEachSectionWithPlanes(func){        

        for(let i = 0 ; i< this.points.length-1; i++){
            const curPoint = this.points[i];
            const nextPoint = this.points[i+1];
            const vX = nextPoint.point.toVector().minus(curPoint.point.toVector()).normalize();

            const vy1 = curPoint.normal;
            const vz1 = vX.cross(vy1);
            const vx1 = vy1.normal.cross(vz1);
            const ucs1 = new UCS(curPoint.point, vx1, vy1, vz1); 

            const vy2 = nextPoint.normal;
            const vz2 = vX.cross(vy1);
            const vx2 = vy1.normal.cross(vz1);
            const ucs2 = new UCS(nextPoint.point, vx2, vy2, vz2);
            func(curPoint, nextPoint, ucs1, ucs2); 
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