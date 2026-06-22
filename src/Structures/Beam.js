import Point from '../Math/Point';

export default class Beam {

    /**
     * 
     * @param {*} start 
     * @param {*} end 
     */
    constructor(start, end){
    
        this.name = "Beam";
        this.start = start; 
        this.end = end; 
        this.profileString = "H*5*5*1*1"
    }



    insert(){
        
        MeshBuilder
    }

    /**
     * 
     * @returns {Point[]}
     */
    GetProfile(){

        const dx = 1; 
        const dy = 1
        const result = []; 
        result.push(new Point( dx, dy,0));
        result.push(new Point(-dx, dy,0));
        result.push(new Point(-dx,-dy,0));
        result.push(new Point( dx,-dy,0));
        this.profile = result; 
        return this; 
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