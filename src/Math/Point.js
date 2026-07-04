import { newVector } from "./Vector";

export default class Point{

    constructor(x,y,z){
        this.X = x; 
        this.Y = y; 
        this.Z = z; 
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

    /**
     * convert to Vector
     * @returns {Vector}
     */
    toVector(){
        return newVector(this.X, this.Y, this.Z);
    }
}