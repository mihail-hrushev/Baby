import Vector, { newVector } from "./Vector";

export default class nPoint{

    /**
     * 
     * @param {Point} point 
     * @param {Vector} normal 
     */
    constructor(point, normal){
        this.point = point; 
        this.normal = normal;
    }

    /**
     * 
     * @param {Point[]} array 
     */
    inArray(array){

        // console.log(this)
        // console.log(array)
        array.push(this.X);
        array.push(this.Y);
        array.push(this.Z);
        //console.log(array);
    }

    toPoint(){
        return this; 
    }

    AlmoustEqual(p){

        return Vector.AlmostEqual(this, p); 
    }
    /**
     * convert to Vector
     * @returns {Vector}
     */
    toVector(){
        return newVector(this.X, this.Y, this.Z);
    }
}