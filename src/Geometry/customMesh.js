import * as BABYLON from "@babylonjs/core"
import Vector from "../Math/Vector";


/**
 * 
 * @param {Vector} start 
 * @param {Vector} end 
 * @returns 
 */
export default function CustomMesh(scene, start, end, width, height){

    var customMesh = new BABYLON.Mesh("custom", scene);

    const vx = end.minus(start).normalize(); 
    const vy = Vector.VZ().cross(vx).normalize(); 
    const vz = vx.cross(vy).normalize(); 

    var p1 =  start.plus(vy.scale(width/2))
                   .plus(vz.scale(height/2)); 
    console.log("p1", p1);

    var p2 =  start.plus(vy.scale(-width/2))
                   .plus(vz.scale(height/2)); 
    var p3 =  start.plus(vy.scale(-width/2))
                   .plus(vz.scale(-height/2)); 
    var p4 =  start.plus(vy.scale(width/2))
                   .plus(vz.scale(-height/2)); 
    var p5 =  end.plus(vy.scale(width/2))
                   .plus(vz.scale(height/2)); 
    var p6 =  end.plus(vy.scale(-width/2))
                   .plus(vz.scale(height/2)); 
    var p7 =  end.plus(vy.scale(-width/2))
                   .plus(vz.scale(-height/2)); 
    var p8 =  end.plus(vy.scale(width/2))
                   .plus(vz.scale(-height/2));

    const pp = [];
    p1.inArray(pp); p2.inArray(pp); p3.inArray(pp); p4.inArray(pp);//front
    p1.inArray(pp); p5.inArray(pp); p6.inArray(pp); p2.inArray(pp);
    p4.inArray(pp); p8.inArray(pp); p5.inArray(pp); p1.inArray(pp);
    p3.inArray(pp); p7.inArray(pp); p8.inArray(pp); p4.inArray(pp);
    p2.inArray(pp); p6.inArray(pp); p7.inArray(pp); p3.inArray(pp);
    p5.inArray(pp); p8.inArray(pp); p7.inArray(pp); p6.inArray(pp);//back
    
    var indices = [ 0,1,2, 
                    0,2,3, 
                    4,5,6,
                    4,6,7,

                    8,9,10,
                    8,10,11,

                    12,13,14,
                    12,14,15,

                    16,17,18,
                    16,18,19,

                    20,21,22,
                    20,22,23
                ];
    var normals = [];
    //var uvs = [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0];    

    const pres = pp; 

    BABYLON.VertexData.ComputeNormals(pres, indices, normals);
    var vertexData = new BABYLON.VertexData();
    vertexData.positions = pres;
    vertexData.indices = indices;
    vertexData.normals = normals;
    //vertexData.uvs = uvs;

    var customMat  = new BABYLON.StandardMaterial(); 
    customMesh.material = customMat; 
    vertexData.applyToMesh(customMesh);

    return customMesh;
}