import { MeshBuilder } from "@babylonjs/core";
import Vector, { newVector } from "../Math/Vector";
import _meshBuilder from "./MeshBuilder";
import UCS from "../Math/UCS";
import Point from "../Math/Point";
import PolyBeam from "./PolyBeam";
import nPoint from "../Math/nPoint";

export default class HalfArch{



    /**@type {Point[]} */
    points
    /**@type {nPoint[]} */
    nPoints; 

    /**@type {number} */
    segmentLength;

    /**
     * 
     * @param {Vector} start 
     * @param {Vector} end 
     * @param {Vector} angle 
     */
    constructor(start, end, tangentVector){

        this.points = []; 
        this.nPoints = []; 
        this.start = start; 
        this.end = end;

        const mv = start.vectorTo(end);
        const vy = tangentVector.normalize();
        const vz = mv.crossN(vy); 
        const vx = vy.crossN(vz); 
        this.cs  = new UCS(start.toPoint(), vx, vy, vz);


        //this.points.push(start.toPoint()); 
        //this.points.push(end.toPoint()); 
    }

    /**
     * 
     * @returns {Point[]}
     */
    getPoints(){
        
        const pe = this.cs.GlobalToLocal(this.end.toPoint());

        this.flatPoints = this.vertical(pe,this.segmentLength, 0);

        this.position = this.start.toPoint(); ;

        const result = this.cs.LocalToGlobalPointArray(this.flatPoints);
        return result; 
    }

    insert(){

        const pe = this.cs.GlobalToLocal(this.end.toPoint());

        this.flatPoints = this.vertical(pe,this.segmentLength, 0);

        this.position = this.start.toPoint();

        this.points = this.cs.LocalToGlobalAligArray(this.flatPoints);

        const pp = new PolyBeam(this.points)
        pp.position = this.position; 
        _meshBuilder.PolyBeamToMesh(pp);
    }

     vHalfArch(start,  end, length, startOffset)
    {
        startPoint = start;
        endPoint = end;
        vertical(length, startOffset);

    }

    InitializeVariables()
    {
        this.flatPoints = [];
        this.segPointList = []; 
        this.segPointListReverse = []; 
        this.segPointNorm = [];
    }


    /**
     * 
     * @param {Vector} start 
     * @param {Vector} end 
     * @returns {{radius:number, arcAngle:number}}
     */
    CalculateArchRadius(start, end)
    {
        //we consider that Start and end already suited for tangent (0,0,1) 
        const mainV = end.minus(start);
        const gp = mainV.length(); 
        const cosa = mainV.Y / gp;

        //angle of arch is equal double angle of tangent triangles. 
        const AngleOfEntireArch = Math.acos(cosa) * 2;

        //special case wen angle is 180
        if (UCS.AlmostEqualNumbers(AngleOfEntireArch, Math.PI))
            return {radius:gp / 2, arcAngle:AngleOfEntireArch};
        
        //usual case, cause gp*sin = MainV.Z, we can divide to get GP, which is radius
        return {radius:mainV.Y / Math.sin(AngleOfEntireArch), arcAngle:AngleOfEntireArch};
    }

    vertical(endp, segmentLength, startOffset)
    {
        //this.InitializeVariables();
        const {radius, arcAngle} = this.CalculateArchRadius(new Vector(0,0,0), endp.toVector());

        let startAngle = 0;

        if (startOffset > 0)
        {
            const sinOfHalfOffsetSegmentAngle = (startOffset / 2) / radius;
            startAngle = Math.asin(sinOfHalfOffsetSegmentAngle) * 2;
        }

        const sinOfHalfSegmentByLenghtAngle = (segmentLength / 2) / radius;
        const SegmentAngle = Math.asin(sinOfHalfSegmentByLenghtAngle) * 2;
    
        const realCenterPoint = new Point(radius,0,0);
    
        this.points.push(new Point(0,0,0)); 
        this.nPoints.push(new nPoint(new Point(0,0,0), newVector(1,0,0)));
        let i = 0;
        while (true)
        {
            i++;
            const enAng = startAngle + SegmentAngle * (i);
          
            if (enAng > arcAngle)
            {
                this.points.push(endp.toPoint());
                this.nPoints.push(endp.toPoint(),);
                return this.points;
            }

            const enCos = -Math.cos(enAng); 
            const enSin = Math.sin(enAng); 

            const ex = radius * enCos+radius;
            const ey = radius * enSin;
            const ez = 0;

            //const sp = new Point(sx, sy, sz);
            const ep = new Point(ex, ey, ez);
            this.points.push(ep); 
            this.nPoints.push(new nPoint(ep, new Vector(enCos, enSin,0)));
        }
    }
}