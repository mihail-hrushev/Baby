import Point from "./Point";

export function newVector(x,y,z){

    const vec = new Vector(); 

    vec.X = x; 
    vec.Y = y; 
    vec.Z = z; 

    return vec;
}

export default class Vector{

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns 
     */
    static newVector(x, y, z){
        const vec = new Vector(); 
        vec.X = x; 
        vec.Y = y; 
        vec.Z = z; 
        return vec;       

    }


    vectorTo(otherV){
        return otherV.toVector().minus(this);
    }

    static VZ(){
        return newVector(0,0,1);
    }
    
    static VY(){
        return newVector(0,1,0);
    }

    static VX(){
        return newVector(1,0,0);
    }

    constructor(x=0,y=0,z=0){

        
        this.X = x; 
        this.Y = y; 
        this.Z = z; 
    }

    /**
     * 
     * @param {Vector} Vector 
     * @returns {Vector}
     */
    plus(Vector){
        const x = this.X+Vector.X; 
        const y = this.Y+Vector.Y; 
        const z = this.Z+Vector.Z; 
        return newVector(x,y,z);
    }

    toArray(){
        return [this.X, this.Y, this.Z];
    }

    inArray(pp){
        pp.push(this.X);
        pp.push(this.Y);
        pp.push(this.Z);
    }

    /**
     * 
     * @param {Vector} vector 
     * @returns {Vector}
     */
    minus(vector){
        const x = this.X-vector.X; 
        const y = this.Y-vector.Y; 
        const z = this.Z-vector.Z; 
        return newVector(x,y,z);
    }

    /**
     * 
     * @param {Point} point 
     * @returns {Vector}
     */
    minusP(point){
        const x = this.X-point.X; 
        const y = this.Y-point.Y; 
        const z = this.Z-point.Z; 
        return newVector(x,y,z);
    }

    scale(dx){
        const x = this.X*dx;
        const y = this.Y*dx;
        const z = this.Z*dx;
        return newVector(x,y,z);
    }
    /**
     * 
     * @param {Vector} v2 
     * @returns {Vector}
     */
    cross(v2){
        if(v2==null) throw new Error("Vector required, provided undefined")

        const dx = this.Y * v2.Z - v2.Y * this.Z;
        const dy = (this.X * v2.Z - v2.X * this.Z) * -1;
        const dz = this.X * v2.Y - this.Y * v2.X;
        const vec = newVector(dx, dy, dz)

        return vec;
    }

    /**
     * Vector output is normalized;
     * @param {Vector} v2 
     * @returns {Vector}
     */
    crossN(v2){
        if(v2==null) throw new Error("Vector required, provided undefined")

        const dx = this.Y * v2.Z - v2.Y * this.Z;
        const dy = (this.X * v2.Z - v2.X * this.Z) * -1;
        const dz = this.X * v2.Y - this.Y * v2.X;
        const vec = newVector(dx, dy, dz).normalize(); 

        return vec;
    }

    dot(vector)
    {
        const xx = this.X * vector.X;
        const yy = this.Y * vector.Y;
        const zz = this.Z * vector.Z;

        return xx + yy + zz;
    }

    /**
     * 
     * @returns {Vector}
     */
    normalize()
    {
        var gp = this.X * this.X + this.Y * this.Y + this.Z * this.Z;
        if (gp === 1) return newVector(this.X,this.Y,this.Z);
        var gp = Math.sqrt(gp);
        const x = this.X / gp;
        const y = this.Y / gp;
        const z = this.Z / gp;
        const vec = newVector(x,y,z);
        return vec;
    }

    length(){
        const gp = this.X*this.X+this.Y*this.Y+this.Z*this.Z; 
        return Math.sqrt(gp);
    }

    clone(){
        return newVector(this.X, this.Y, this.Z);
    }

    static _tolerance = 1E-3;

    static AlmostEqual(Start, End, toler = 0)
    {        
        if (toler == 0) { toler = _tolerance; }

        if (AlmostEqual(Start.X, End.X, toler) &&
             AlmostEqual(Start.Y, End.Y, toler) &&
             AlmostEqual(Start.Z, End.Z, toler))
        {
            return true;
        }
        return false;
    }

    /**
     * 
     * 
     * @returns {Point}
     */
    toPoint(){
        return new Point(this.X, this.Y, this.Z);
    }

    toVector(){
        return this;
    }

}