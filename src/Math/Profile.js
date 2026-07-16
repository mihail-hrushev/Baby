import Point from "./Point"; 

export default class Profile{


/**
 * 
 * @param {string} profileString 
 * @returns 
 */
    constructor(profileString){

        if(profileString[0]==="H"){
            const p = profileString.split("*"); 
            this.profile = getProfileH(p[0],p[1],p[2],p[3]); 
            return;
        }
        this.profile = [];
    }



    static genProfileH(width, height, flangeThick, webThick){

        const hwidth = width/2;
        const hheight = height/2;

        var p1 = new Point(hwidth, hheight, 0); 
        var p2 = new Point(-hwidth, hheight, 0); 
        var p3 = new Point(-hwidth, hheight-flangeThick, 0); 
        var p4 = new Point(-webThick/2, hheight-flangeThick, 0); 
        var p5 = new Point(-webThick/2, -hheight+flangeThick, 0); 
        var p6 = new Point(-hwidth, -hheight+flangeThick, 0); 
        var p7 = new Point(-hwidth, -hheight, 0); 
        var p8 = new Point(hwidth, -hheight, 0); 
        var p9 = new Point(hwidth, -hheight+flangeThick, 0); 
        var p10 = new Point(webThick/2, -hheight+flangeThick, 0); 
        var p11 = new Point(webThick/2, hheight-flangeThick, 0); 
        var p12 = new Point(hwidth, hheight-flangeThick, 0); 

        const result = 
        [
            // p1,p2,p3,p4,p5,p6,p7,p8,p9,
            // p10,p11,p12
            p12,p11,p10,p9,p8,p7,p6,p5,p4,
            p3,p2,p1
        ]; 

        //TODO  - Implement Profile Angle
        // if(profileArg5_rotate!=0){
        //     var cs = new CoordinateSystem(); 
        //     result = result.Select(p=>{
        //         return cs.RotatePointAroundZ(p,profileArg5_rotate); 
        //     }).ToList();
        // }

        
        return result; 
    }
}