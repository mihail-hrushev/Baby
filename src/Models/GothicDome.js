import HalfArch from "../Structures/HalfArch";
import Vector, { newVector } from "../Math/Vector";
import Point from "../Math/Point";
import PolyBeam from "../Structures/PolyBeam";
import Plane from "../Math/Plane";
import Beam from "../Structures/Beam";

export class GothicDome{

    constructor(){

    }

    insert(){
        
        const dx = 12; 
        const dy = 12; 
        const dz = 30;
        const seglen = 0.5;

        const beam = new Beam(newVector(0,0,0), newVector(0,15,0));
        beam.insert(); 

        const half = new HalfArch( newVector(dy,0,dx), 
                                     newVector(0,dz,dx), newVector(-0.5,1,0).normalize()); 
        half.segmentLength = seglen;
        half.insert();

        const half2 = new HalfArch( newVector(-dy,0,dx), 
                                     newVector(0,dz,dx), 
                                     newVector(1,1,1).normalize()); 
        half2.segmentLength = seglen;
        half2.insert(); 

        const pp = PolyBeam.MergePoints(half.getPoints(), half2.getPoints());
        pp.position = new Point(0,0,0);
        //pp.insert(); 

        const pln = new Plane(new Point(0,0,0), new Vector(1,0,1).normalize());
        const p3 = pln.ProjectPointOnPlaneByVector(pp.points, new Vector(0,0,1));
        const p2 = new PolyBeam(p3);
        p2.position = new Point(0,0,0);
        //p2.insert(); 
        
        const pln2 = new Plane(new Point(0,0,0), new Vector(1,0,-1).normalize());
        const p4 = pln2.ProjectPointOnPlaneByVector(pp.points, new Vector(0,0,1));
        const p5 = new PolyBeam(p4);
        p5.position = new Point(0,0,0);
        //p5.insert(); 

        // const half3 = new HalfArch( newVector(dy,0,-dx), 
        //                              newVector(0,dz,-dx), newVector(0,1,0)); 
        // half3.segmentLength = seglen;
        // half3.insert();

        // const half4 = new HalfArch( newVector(-dy,0,-dx), 
        //                              newVector(0,dz,-dx), newVector(0,1,0)); 
        // half4.segmentLength = seglen;
        //   half4.insert();

        // const half5 = new HalfArch( newVector(dx,0,dy), 
        //                              newVector(dx,dz,0), newVector(0,1,0)); 
        //   half5.segmentLength = seglen;
        //                              half5.insert();

        // const half6 = new HalfArch( newVector(dx,0,-dy), 
        //                              newVector(dx,dz,0), newVector(0,1,0)); 
        //   half6.segmentLength = seglen;
        //                              half6.insert();

        // const half7 = new HalfArch( newVector(-dx,0,dy), 
        //                              newVector(-dx,dz,0), newVector(0,1,0)); 
        //   half7.segmentLength = seglen;
        //                              half7.insert();

        // const half8 = new HalfArch( newVector(-dx,0,-dy), 
        //                              newVector(-dx,dz,0), newVector(0,1,0)); 
        //   half8.segmentLength = seglen;
        //                              half8.insert();
//=====================
        
        // const half9 = new HalfArch( newVector(dx,0,dy), 
        //                              newVector(0,dz,0), newVector(0,1,0)); 
        //   half9.segmentLength = seglen;
        //                              half9.insert();

        // const half10 = new HalfArch( newVector(-dx,0,dy), 
        //                              newVector(0,dz,0), newVector(0,1,0)); 
        //   half10.segmentLength = seglen;
        //                              half10.insert();
        // const half11 = new HalfArch( newVector(-dx,0,-dy), 
        //                              newVector(0,dz,0), newVector(0,1,0)); 
        //   half11.segmentLength = seglen;
        //                              half11.insert();

        // const half12 = new HalfArch( newVector(dx,0,-dy), 
        //                              newVector(0,dz,0), newVector(0,1,0)); 
        //   half12.segmentLength = seglen;
        //                              half12.insert();
    }
}