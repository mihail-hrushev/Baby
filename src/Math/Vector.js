
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

    static VZ(){
        return newVector(0,0,1);
    }

    constructor(){
        this.X = 0; 
        this.Y = 0; 
        this.Z = 0; 
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
     * @param {Vector} Vector 
     * @returns {Vector}
     */
    minus(Vector){
        const x = this.X-Vector.X; 
        const y = this.Y-Vector.Y; 
        const z = this.Z-Vector.Z; 
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

        console.log("Cross this:")
        console.log(this);
        console.log("Cross with that:");
        console.log(v2);
        const dx = this.Y * v2.Z - v2.Y * this.Z;
        const dy = (this.X * v2.Z - v2.X * this.Z) * -1;
        const dz = this.X * v2.Y - this.Y * v2.X;
        const vec = newVector(dx, dy, dz)

        console.log("Cross product")
        console.log(vec);
        return vec;
    }

    dot(vector)
    {
        const xx = X * vector.X;
        const yy = Y * vector.Y;
        const zz = Z * vector.Z;

        return xx + yy + zz;
    }

    /**
     * 
     * @returns {Vector}
     */
    normalize()
    {
        var gp = this.X * this.X + this.Y * this.Y + this.Z * this.Z;

        console.log(this);
        console.log(gp);

        if (gp === 1) return newVector(this.X,this.Y,this.Z);
        var gp = Math.sqrt(gp);
        const x = this.X / gp;
        const y = this.Y / gp;
        const z = this.Z / gp;

        const vec = newVector(x,y,z);

        console.log("normalize result");
        console.log(vec);
        return vec;
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

}