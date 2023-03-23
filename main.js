import * as THREE from 'three'
import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/orbitControls'
import { VertexNormalsHelper } from 'three/addons/helpers/VertexNormalsHelper.js';


let scene, camera, renderer, cube1, torus, plane;
let sphere, box, cylinder, light, ambient;
let geometry, material;
let ADD = 0.02, theta = 0;
let normals

let addLight = function() {
    ambient = new THREE.AmbientLight(0xffffff);
    //light = new THREE.HemisphereLight(0x00ff00,0x0000ff)
    //light = new THREE.DirectionalLight(0xffffff)
    light = new THREE.SpotLight(0xffffff, 2, 20, 2)
    light.position.y = 1
    light.position.z = 2
    light.position.x =0

    //const helper = new THREE.DirectionalLightHelper( light, 5, 0x000000 );

    scene.add(light);
    scene.add(ambient);
    //scene.add(helper);
}

let init = function() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 15;
    camera.position.x = 0;

    renderer = new THREE.WebGLRenderer();   
    renderer.setSize(window.innerWidth, window.innerHeight); 
    document.body.appendChild(renderer.domElement);
};

let addSphere = function() {
  geometry = new THREE.SphereGeometry(1, 30, 30)
  //material = new THREE.MeshBasicMaterial({color: 0xbbbbbb, wireframe: true});
  material = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    color: 0xff0000
});
  sphere = new THREE.Mesh(geometry, material)
  //normals = new VertexNormalsHelper( sphere, 5, 0xff0000 );
  
  sphere.position.y = 0.1
    sphere.position.z = 10
    sphere.position.x = 0

  scene.add(sphere)
  //sscene.add(normals)
}

let addTorus = function() {
    let geometry = new THREE.TorusGeometry(5, 2, 10, 12)
    let material = new THREE.MeshNormalMaterial();
    torus = new THREE.Mesh(geometry, material)
    //normals = new VertexNormalsHelper( torus, 5, 0xff0000 );
    
    scene.add(torus)
    //scene.add(normals)
}

let addBox = function() {
    material = new THREE.MeshDepthMaterial();
    geometry = new THREE.BoxGeometry(3, 2, 4)
    box  = new THREE.Mesh(geometry, material)
    box.position.z = -10
    box.position.x = -5
    scene.add(box)
}

let addCylinder = function(){
    //material = new THREE.LineDashedMaterial({color: 0xbbbbbb, linewidth: 1, dashSize: 1, gapSize:1});
    material = new THREE.PointsMaterial({color: 0xbbbbbb})
    geometry = new THREE.CylinderGeometry(3, 2, 4)
    cylinder  = new THREE.Points(geometry, material)
    cylinder.position.y = -5
    cylinder.position.x = -5
    cylinder.position.z = 0
    scene.add(cylinder)

}

let addCube = function() {
    geometry = new THREE.BoxGeometry(3,3,3);
   //  material = new THREE.MeshBasicMaterial({color: 0xbbbbbb, wireframe: true})
    material = new THREE.MeshDepthMaterial();
    // material = new THREE.MeshStandardMaterial({
    //     side: THREE.DoubleSide,
    //     color: 0X0f1d89,
    //     // emissive: 0x25673d,
    //     // emissiveIntensity: 0.4,
    //     // metalness: 1,
    //     // roughness: 1,
    //     shininess:100
    // });

    cube1 = new THREE.Mesh(geometry, material);
    cube1.position.z = -12;
    cube1.position.y = 0;
    cube1.position.x = 0;

    scene.add(cube1);
}

let addPlane = function () {
    geometry = new THREE.PlaneGeometry(1000, 1000, 50, 50)
    material = new THREE.MeshStandardMaterial({color: 0X693421, wireframe: true, shininess:100});

    plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / 2;
    plane.position.y = -100;

    scene.add(plane);
}

let addParticles = function() {
    material = new THREE.PointsMaterial({color: 0xbbbbbb, size:0.5})
    geometry = new THREE.BufferGeometry(3, 2, 4)
    
    //Math.random() * (max - min) + min;
    for (let i=0; i<=100; i++) {
        let x = Math.random() * (20 - 20) + 20;
        let y = Math.random() * (20 - 20) + 20;
        let z = Math.random() * (20 - 20) + 20;
        geometry.vertices.push(new THREE.Vector3(x, y, z));
    }

    // Not supported:
    // geometry.computeBoundingSphere()
    // particles = new THREE.Points(geometry, material)
    // scene.add(particles)

}

let addTriangle = function(){
    
    geometry = new THREE.BufferGeometry();

    const vertices = new Float32Array( [
        -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,
         1.0,  1.0,  1.0,
    ] );

 
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
 material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const mesh = new THREE.Mesh( geometry, material );

     scene.add(mesh);
}

let mainLoop = function() {
    //camera.lookAt(new THREE.Vector3(0, 0, 0))
    camera.position.x = 40 * Math.sin(theta)
    camera.position.z = 40 * Math.cos(theta)
    theta += ADD
    // camera.fov += 0.5
    // camera.updateProjectionMatrix ()
    // if(camera.fov > 100 || camera.fov < 50){
    //         ADD *=-1
  
    // }
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
};

init();
addLight()
//addCube()
//addTriangle()
// addPlane()
addSphere()
mainLoop();


   