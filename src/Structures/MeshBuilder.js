import * as BABYLON from "@babylonjs/core";
import Beam from "./Beam";
import Vector from "../Math/Vector";
import UCS from "../Math/UCS";
import PolyBeam from "./PolyBeam";


export class MeshBuilder{


    constructor(){
        
    }

    SetScene(scene){
        this.scene = scene; 
    }


    Build(){

    }
   

    /**
     * 
     * @param {PolyBeam} polyBeam 
     * @returns 
     */
    PolyBeamToMesh(polyBeam){
    
        var customMesh = new BABYLON.Mesh(Beam.name, this.scene);

        this.MeshCollection = []; 
        this.MeshCollection.push(customMesh);

        const profile = Beam.genProfileH(1,1,0.1,0.1); 

        const ppos = [];
        const indices = [];
        const normals = [];

            let k = 0; 
        polyBeam.ForeEachSectionWithPlanes((start, end, pln1, pln2)=>{

            console.log("PolyBeam Section 1")
            const len = end.toVector().minus(start).length();

            const vx = end.toVector().minus(start).normalize();
            const vy = Vector.VZ().cross(vx).normalize();
            const vz = vx.cross(vy).normalize();

            console.log(vx, vy, vz);
            const cs = new UCS(start, vx, vy, vz); 
            const cs2 = new UCS(end, vx, vy, vz); 
            
            var ps = cs.LocalToGlobalPointArray(profile); 
            var pe = cs2.LocalToGlobalPointArray(profile);

            this.foreachQuad(ps, pe, (p1, p2, p3, p4)=>{        

                console.log(ps, pe);
                console.log([p1, p2, p3, p4])

                pln1.ProjectPointOnPlaneByVector(p1,vx).inArray(ppos); 
                pln1.ProjectPointOnPlaneByVector(p2,vx).inArray(ppos); 
                pln2.ProjectPointOnPlaneByVector(p3,vx).inArray(ppos); 
                pln2.ProjectPointOnPlaneByVector(p4,vx).inArray(ppos); 

                //p1.inArray(ppos); p2.inArray(ppos); p3.inArray(ppos); p4.inArray(ppos);
                indices.push(k, k+2, k+1); 
                indices.push(k, k+3, k+2); 
                k+=4;
            })
            
            console.log("PPOS:", ppos);
            console.log("Ind:", indices);
            //var uvs = [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0];    

        });
    
        BABYLON.VertexData.ComputeNormals(ppos, indices, normals);
        var vertexData = new BABYLON.VertexData();
        vertexData.positions = ppos;
        vertexData.indices = indices;
        vertexData.normals = normals;
        //vertexData.uvs = uvs;
    
        var customMat  = new BABYLON.StandardMaterial(); 
        customMesh.material = customMat; 
        vertexData.applyToMesh(customMesh);
    
        customMesh.position.x = polyBeam.position.X; 
        customMesh.position.y = polyBeam.position.Y; 
        customMesh.position.z = polyBeam.position.Z; 
        return customMesh;
    }

    /**
     * 
     * @param {Beam} Beam 
     * @returns 
     */
    CustomMesh(beam){
    
        var customMesh = new BABYLON.Mesh(beam.name, this.scene);
    
        const start = beam.start; 
        const end = beam.end;

        const profile = Beam.genProfileH(1,1,0.1,0.1); 

        console.log("prof",profile);
        const len = end.minus(start).length();
        const vx = end.minus(start).normalize();
        const vy = Vector.VZ().cross(vx).normalize();
        const vz = vx.cross(vy).normalize();

        const cs = new UCS(start, vx, vy, vz); 
        const cs2 = new UCS(end, vx, vy, vz); 
        
        var ps = cs.LocalToGlobalPointArray(profile); 
        var pe = cs2.LocalToGlobalPointArray(profile);
            console.log("ps",ps);

        const ppos = [];
        const indices = [];
        let k = 0; 
        this.foreachQuad(ps, pe, (p1, p2, p3, p4)=>{        
            p1.inArray(ppos); p2.inArray(ppos); p3.inArray(ppos); p4.inArray(ppos);
            indices.push(k, k+2, k+1); 
            indices.push(k, k+3, k+2); 
            k+=4;
        })
        
        var normals = [];
        //var uvs = [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0];    
    
    
        BABYLON.VertexData.ComputeNormals(ppos, indices, normals);
        var vertexData = new BABYLON.VertexData();
        vertexData.positions = ppos;
        vertexData.indices = indices;
        vertexData.normals = normals;
        //vertexData.uvs = uvs;
    
        var customMat  = new BABYLON.StandardMaterial(); 
        customMesh.material = customMat; 
        vertexData.applyToMesh(customMesh);
    
        return customMesh;
    }

    /**
     * 
     * @param {Point[]} profStart 
     * @param {Point[]} profEnd 
     * @param {(p1:Point, p2:Point, p3:Point, p4:Point)=>void} action 
     */
    foreachQuad(profStart, profEnd, action){

        const k = profStart.length-1;
        for(let i =0; i<k; i++){

            action(profStart[i], profStart[i+1], profEnd[i+1], profEnd[i]); 
        }
        action(profStart[k], profStart[0], profEnd[0], profEnd[k]); 

    }
}

const _meshBuilder = new MeshBuilder(); 

export default _meshBuilder; 