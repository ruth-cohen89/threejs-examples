import * as THREE from 'three'
import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/orbitControls'
import { VertexNormalsHelper } from 'three/addons/helpers/VertexNormalsHelper.js';


let scene, camera, renderer, cube1, torus, plane;
let sphere, box, cylinder;
let geometry, material;
let ADD = 0.02;
let normals

let addCube = function() {
    geometry = new THREE.BoxGeometry(5, 5, 5);
    // material = new THREE.MeshNormalMaterial();
    // material = new THREE.MeshLambertMaterial({
    //     side: THREE.DoubleSide,
    //     color: 0x7fc5f9,
    //     emissive: 0x25673d,
    //     emissiveIntensity: 0.8
    // });
    material = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        color: 0x7fc5f9,
        emissive: 0x25673d,
        emissiveIntensity: 0.4,
        metalness: 1,
        roughness: 1
        // shininess:
        // specular:
    });

    cube1 = new THREE.Mesh(geometry, material);
    cube1.position.z = -3;
    cube1.position.y = -5;

    let directionalLight = new THREE.DirectionalLight(0xffffff)
    scene.add(directionalLight);
    scene.add(cube1);
}

let addPlane = function () {
    geometry = new THREE.PlaneGeometry(1000, 1000, 50, 50)
    material = new THREE.MeshBasicMaterial({color: 0Xa6f995, wireframe: true});

    plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / 2;
    plane.position.y = -100;

    scene.add(plane);
}

let addGeometries = function() {
  // scene.add(normals)
};

let init = function() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 15;
    
    addGeometries();
    
    renderer = new THREE.WebGLRenderer();   
    renderer.setSize(window.innerWidth, window.innerHeight); 
    document.body.appendChild(renderer.domElement);
};

let addSphere = function() {
  let geometry = new THREE.SphereGeometry(5, 30, 30)
  let material = new THREE.MeshBasicMaterial({color: 0xbbbbbb, wireframe: true});
  sphere = new THREE.Mesh(geometry, material)
  normals = new VertexNormalsHelper( sphere, 5, 0xff0000 );
  
  scene.add(sphere)
  scene.add(normals)
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

let mainLoop = function() {
    cube1.rotation.x += ADD;
    // box.position.z -= ADD;
    // if(box.position.z > 6 || box.position.z < -16)
    //     ADD *= -1;
    
    //normals.update()
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
};

init();
addCube()
//addParticles()
//addSphere() 
mainLoop();


   