import { MeshBuilder } from "@babylonjs/core";
import Vector from "../Math/Vector";
import _meshBuilder from "./MeshBuilder";
import UCS from "../Math/UCS";
import Point from "../Math/Point";

export default class HalfArch{

    /**
     * 
     * @param {Vector} start 
     * @param {Vector} end 
     * @param {number} angle 
     */
    constructor(start, end, angle){

    }

    insert(){
        _meshBuilder.PolyBeamToMesh()
    }

    /**
     * 
     * @param {Point} startP 
     * @param {Vector} tangentVector 
     * @param {Point} endP 
     * @param {number} length 
     * @param {number} startOffset 
     */
    freeHalf(startP, tangentVector, endP, length, startOffset){      

        const eend = endP.toVector().minusP(startP).normalize();

        const vZ = tangentVector.normalize();
        const vY = eend.cross(vZ).normalize();
        const vx = vY.cross(vZ).normalize();
        const css = new UCS(start,vx,vZ, vx.cross(vZ).normalize()); 


        const localFinalPosition = css.GlobalToLocalPoint(endP);
        //const localFin = css.GlobalToLocal(end); 
        const tempha = new HalfArch(new Point(0, 0, 0), localFin, length, startOffset);
         radius = tempha.radius;
         realCenterPoint = css.LocalToGlobal(tempha.realCenterPoint);
         segPointList = css.LocalToGlobal(tempha.segPointList);
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
     * @param {Point} start 
     * @param {Point} end 
     * @returns {{radius:number, arcAngle:number}}
     */
    CalculateArchRadius(start, end)
    {
        //we consider that Start and end already suited for tangent (0,0,1) 
        const mainV = end.toVector().minus(start.toVector());
        const gp = mainV.length(); 
        const cosa = mainV.Z / gp;

        //angle of arch is equal double angle of tangent triangles. 
        const AngleOfEntireArch = Math.Acos(cosa) * 2;

        //special case wen angle is 180
        if (UCS.AlmostEqual(AngleOfEntireArch, Math.PI))
            return {radius:gp / 2, arcAngle:AngleOfEntireArch};
        
        //usual case, cause gp*sin = MainV.Z, we can divide to get GP, which is radius
        return {radius:mainV.Z / Math.Sin(AngleOfEntireArch), arcAngle:AngleOfEntireArch};
    }

    vertical(segmentLength, startOffset)
    {
        this.InitializeVariables();
        const {radius, arcAngle} = this.CalculateArchRadius(this.startP, this.endP);

        let startAngle = 0;

        if (startOffset > 0)
        {
            const sinOfHalfOffsetSegmentAngle = (startOffset / 2) / radius;
            startAngle = Math.Asin(sinOfHalfOffsetSegmentAngle) * 2;
        }

        const sinOfHalfSegmentByLenghtAngle = (segmentLength / 2) / radius;

        const SegmentAngle = Math.Asin(sinOfHalfSegmentByLenghtAngle) * 2;

        //double ang = AngleOfEntireArch / segments; //entire arch divide by segments

        directionXY = ucs.VectorXY;
        realCenterPoint = new Point(startPoint.X + radius * directionXY.X,
                                    startPoint.Y + radius * directionXY.Y,
                                    startPoint.Z);
        flatCenterPoint = new Point(-radius, 0, 0);
        //double ang = startAngle;
        const generate = true;
        let i = 0;
        while (true)
        {
            const stAng = 0;
            const enAng = 0;

            if (createFirstSegment && i == 0)
            {
                stAng = 0;
                enAng = startAngle;
                i++;
            }
            else
            {
                stAng = startAngle + SegmentAngle * i - 1;
                enAng = startAngle + SegmentAngle * (i);
                i++;
            }

            if (enAng > AngleOfEntireArch)
            {
                segPointList.Add(this.endPoint);
                segPointNorm.Add(UCS.PWN(startPoint, ucs.vZ.Opposit()));

                var tfe = new Point(radius * Math.Cos(AngleOfEntireArch) - radius,
                                        0,
                                        radius * Math.Sin(AngleOfEntireArch));
                flatPoints.Add(tfe);

                segPointListReverse.Add(this.endPoint);
                break;
            }

            const sx = ucs.nVectorXY.X * radius * Math.Cos(stAng) + startPoint.X + ucs.VectorXY.X * radius;
            const sy = ucs.nVectorXY.Y * radius * Math.Cos(stAng) + startPoint.Y + ucs.VectorXY.Y * radius;
            const sz = Math.Sin(stAng) * radius + startPoint.Z;

            const ex = ucs.nVectorXY.X * radius * Math.Cos(enAng) + startPoint.X + ucs.VectorXY.X * radius;
            const ey = ucs.nVectorXY.Y * radius * Math.Cos(enAng) + startPoint.Y + ucs.VectorXY.Y * radius;
            const ez = Math.Sin(enAng) * radius + startPoint.Z;

            const sp = new Point(sx, sy, sz);
            const ep = new Point(ex, ey, ez);
            segPointList.Add(ep);
            segPointListReverse.Add(ep);
            segPointNorm.Add(UCS.PWN(ep, new Vector(realCenterPoint, ep)));
            //TODO - FIX FLAT POINTS

            const fx = ucs.nVectorXY.X * radius * Math.Cos(enAng) + ucs.VectorXY.X * radius;

            const fse = new Point(radius * Math.Cos(enAng) - radius, 0, radius * Math.Sin(enAng));
            flatPoints.Add(fse);
        }

        segPointListReverse.Reverse();

    }
}