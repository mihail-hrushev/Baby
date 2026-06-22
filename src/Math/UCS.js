import Point from "./Point";
import Vector from "./Vector";

/** UCS - User Defined Coordinate System */
export default class UCS{


    /**
     * 
     * @param {Point} point 
     * @param {Vector} vx 
     * @param {Vector} vy 
     * @param {Vector} vz 
     */
    constructor(point, vx, vy, vz){

        this.Point = point; 
        this.vX = vx; 
        this.vY = vy; 
        this.vZ = vz; 
    }
    
    /**
     * Return new Point in local Coordinates
     * @param {Point} globalPoint 
     * @returns {Point}
     */
    GlobalToLocalPoint(globalPoint)
    {
        var dx = globalPoint.X - this.Point.X;
        var dy = globalPoint.Y - this.Point.Y;
        var dz = globalPoint.Z - this.Point.Z;
        var vectorToPoint = new Point(dx, dy, dz).ToVector();
        var xx = this.vX.dot(vectorToPoint);
        var yy = this.vY.dot(vectorToPoint);
        var zz = this.vZ.dot(vectorToPoint);
        return new Point(xx, yy, zz);
    }

    /**
     * Convert Local Point into new global space Point
     * @param {Point} p 
     * @returns {Point}
     */
    LocalToGlobalPoint(p)
    {
        const xx = this.Point.X + p.X * this.vX.X + p.Y * this.vY.X + p.Z * this.vZ.X;
        const yy = this.Point.Y + p.X * this.vX.Y + p.Y * this.vY.Y + p.Z * this.vZ.Y;
        const zz = this.Point.Z + p.X * this.vX.Z + p.Y * this.vY.Z + p.Z * this.vZ.Z;
        return new Point(xx, yy, zz);
    }


        /**
     * Return new Point in local Coordinates
     * @param {Point[]} globalPoint 
     * @returns {Point[]}
     */
    GlobalToLocalPointArray(globalPoint)
    {
        const result = []; 
        globalPoint.forEach(
            pp => {
        var dx = pp.X - this.Point.X;
        var dy = pp.Y - this.Point.Y;
        var dz = pp.Z - this.Point.Z;
        var vectorToPoint = new Point(dx, dy, dz).ToVector();
        var xx = this.vX.dot(vectorToPoint);
        var yy = this.vY.dot(vectorToPoint);
        var zz = this.vZ.dot(vectorToPoint);
        result.push( new Point(xx, yy, zz));            
        });

        return result;

    }

    /**
     * Convert Local Point into new global space Point
     * @param {Point[]} p 
     * @returns {Point[]}
     */
    LocalToGlobalPointArray(pp)
    {
        const result = []; 
        pp.forEach(p => {
        
        const xx = this.Point.X + p.X * this.vX.X + p.Y * this.vY.X + p.Z * this.vZ.X;
        const yy = this.Point.Y + p.X * this.vX.Y + p.Y * this.vY.Y + p.Z * this.vZ.Y;
        const zz = this.Point.Z + p.X * this.vX.Z + p.Y * this.vY.Z + p.Z * this.vZ.Z;
        result.push(new Point(xx, yy, zz));
        });

        return result; 

    }


}