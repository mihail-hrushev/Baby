import Point from "./Point";
import nPoint from "./nPoint";
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
     * 
     * @param {Point} start 
     * @param {Point} end 
     * @returns {UCS}
     */
    static newUcsByTwoPoint(start, end){

        const sv = start.toVector(); 
        const ev = end.toVector(); 
        const mx = ev.minus(sv).normalize();

        const vz = mx.cross(Vector.VY()); 
        const vy = vz.cross(mx);
        return new UCS(start, mx, vy, vz ); 
    }

        /**
     * 
     * @param {Vector} start 
     * @param {Vector} end 
     * @returns {UCS}
     */
    static newUcsByTwoVector(start, end){         
        const mx = end.minus(start).normalize();
        const vz = mx.cross(Vector.VY()).normalize(); 
        const vy = vz.cross(mx).normalize();
        return new UCS(start, mx, vy, vz ); 
    }

    /**
    * 
    * @param {Point} start 
    * @param {Vector} Vx 
    * @param {Vector} Vy 
    * @returns {UCS}
    */
    static newUcsByPointAndTwoVector(start, Vx, Vy){
        const vx = Vx.normalize();
        const vy = Vy.normalize();
        const vz = vx.cross(vy).normalize();
        return new UCS(start, mx, vy, vz );
    }
    
    /**
     * Return new Point in local Coordinates
     * @param {Point} globalPoint 
     * @returns {Point}
     */
    GlobalToLocal(globalPoint)
    {

        var dx = this.Point.toVector().vectorTo(globalPoint);
        var xx = this.vX.dot(dx);
        var yy = this.vY.dot(dx);
        var zz = this.vZ.dot(dx);
        return new Point(xx, yy, zz);
    }

    /**
     * 
     * @param {nPoint | nPoint[]} point 
     */
    GlobalToLocalNPoint(point){
        if (Array.isArray(point)) {return GlobalToLocalNPointArray(point)}
        
        
    }

    GlobalToLocalNPointArray(point){
        const result = []; 
        point.forEach(element => {
            result.push(element);            
        });
        return result; 
        
    }

    toVector(gp){
        const ty  = gp.constructor.name;
        if(ty==="Vector") return gp; 
        if(ty==="Point") return new Vector(gp.X, gp.Y,gp.Z); 

        throw new Error(`Point or vector required, but ${typeof(gp)} provided`);
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


        /**
     * Convert Local Point into new global space Point
     * @param {Point[]} p 
     * @returns {Point[]}
     */
    LocalToGlobalAligArray(pp)
    {
        const result = []; 
        pp.forEach(p => {        
        const xx = p.X * this.vX.X + p.Y * this.vY.X + p.Z * this.vZ.X;
        const yy = p.X * this.vX.Y + p.Y * this.vY.Y + p.Z * this.vZ.Y;
        const zz = p.X * this.vX.Z + p.Y * this.vY.Z + p.Z * this.vZ.Z;
        result.push(new Point(xx, yy, zz));
        });
        return result; 
    }

    static _tolerance = 1E-3;
    /// <summary>
    /// Tolerance based equality check
    /// </summary>
    static AlmostEqualNumbers(a, b, toler = 0)
    {
        if (toler == 0) { toler = this._tolerance; }
        var dot = Math.abs(a-b); 
        if (dot <= toler)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    static AlmostEqualPoints(Start, End, toler = 0)
    {
        if(toler == 0) { toler = this._tolerance; }
        if(Start == null && End == null ) return true; 
        if(Start == null ) throw new Exception("First point is null");
        if(End == null ) throw new Exception("Second point is null");

        if (AlmostEqualNumbers(Start.X, End.X, toler) &&
             AlmostEqualNumbers(Start.Y, End.Y, toler) &&
             AlmostEqualNumbers(Start.Z, End.Z, toler))
        {
            return true;
        }
        return false;
    }



}