import * as Babylon from "@babylonjs/core"

import Vector from "./Math/Vector";
import {newVector} from "./Math/Vector";
import Beam from "./Structures/Beam";
import _meshBuilder from "./Structures/MeshBuilder";
import PolyBeam from "./Structures/PolyBeam";
import Point from "./Math/Point";
import HalfArch from "./Structures/HalfArch";


/// base on this tutorial https://www.youtube.com/watch?v=e6EkrLr8g_o

const canvas = document.getElementById('renderCanvas');

const engine = new Babylon.Engine(canvas);

const createScene = async function() {
  const scene = new Babylon.Scene(engine);

  //const camera = new Babylon.ArcRotateCamera("Camera",0,10,20,new Babylon.Vector3(0,0,0), scene) ; 
  const camera = new Babylon.ArcRotateCamera("Camera", 1,1,20,new Babylon.Vector3(0,0,0), scene) ; 
  camera.attachControl(); 

  scene.createDefaultLight();
  

  //const box = new Babylon.MeshBuilder.CreateBox('myBox', {size:0.1}); 

  // const custom = CustomMesh(scene, newVector(0,0,0), newVector(3,0,0), 1,1);

  // const custom1=  CustomMesh(scene, newVector(2,1,2),  newVector(3,2,-10), 0.5,1);
  // const custom2 = CustomMesh(scene, newVector(-1,2,-3),newVector(3,1,1), 1,0.5);
  // const custom3 = CustomMesh(scene, newVector(7,0,-3), newVector(3,-1,-1), 0.1,0.5);
  // const custom4 = CustomMesh(scene, newVector(0,7,2),  newVector(3,2,-3), 1,1);
  
  //const beam = Beam(scene, newVector(0,0,0), newVector(10,0,0), 5, 5); 

  _meshBuilder.SetScene(scene);
 
  const poly = new PolyBeam([new Point(0,0,0), 
                            new  Point(0.4,4,0), 
                            new  Point(1,5,0), 
                            new  Point(4,6,0),
                            new  Point(4.8,5.5,0),
                            new  Point(5,5,0)]); 
  poly.profileString = "PL100*10"; 
  poly.position = new Point(1,0,1);
  poly.insert();

  poly.position = new Point(5,0,1);
  poly.insert();

  poly.position = new Point(8,0,1);
  poly.insert();

  const half = new HalfArch(newVector(0,0,0), newVector(5,7,0), 5); 
  half.insert(); 

  const beam = new Beam(new Vector(0,0,0), newVector(10,0,0));
  beam.profileString = "PL100*10"; 
  //beam.insert(); 

  scene.registerBeforeRender(function(){

    camera.alpha +=0.005;
    //_meshBuilder.MeshCollection[0].rotation.y+=0.01; 
    // custom.position.x+=0.01;
    // if(custom.position.x>10) custom.position.x = 0;
    //   custom.rotation.x +=0.01; 
    //   custom.rotation.y +=0.01; 
    //   custom.rotation.z +=0.01; 
  })
  return scene; 
}

const scene = await createScene(); 

engine.runRenderLoop(function() {
  scene.render(); 

})

window.addEventListener('resize', function(){
  engine.resize(); 
})