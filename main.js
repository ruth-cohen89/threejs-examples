import * as THREE from 'three'
import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/orbitControls'
import { VertexNormalsHelper } from 'three/addons/helpers/VertexNormalsHelper.js';


let scene, camera, renderer, cube1, torus, plane;
let sphere, box, cylinder, light, ambient, rayCast, mouse;
let geometry, material;
let ADD = 0.02, theta = 0;
let target
const RADIUS = 5, BASE_X = -20, BASE_Y = -20;
let balloons = []


let addLight = function() {
    ambient = new THREE.AmbientLight(0xffffff);
    //light = new THREE.HemisphereLight(0x00ff00,0x0000ff)
    //light = new THREE.DirectionalLight(0xffffff)
    light = new THREE.SpotLight(0xffffff, 2, 20, 2)
    light.position.y = 1
    light.position.z = 2
    light.position.x =0

    scene.add(light);
    scene.add(ambient);
    //scene.add(helper);
}

let onMouseClick = function(e) {
    // normalizing
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
    mouse.z = 1

    rayCast.setFromCamera(mouse, camera);
    //console.log(rayCast.ray.at(40))
    let intersects = rayCast.intersectObjects(scene.children);

    
    if(intersects.length == 0)
            return;

        // Take the first baloon only
        let hit = intersects[0].object;
    console.log(intersects)
    // if hitting a baloon
    balloons.forEach((b,ind) => {
        if(b == hit) {
            console.log('hit')
            balloons.splice(ind, 1);
            scene.remove(b);
        }
    });

    
}

let init = function() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    //camera.position.set(0, 0, 40);
    target = new THREE.Object3D()
    camera.lookAt(target.position)

    addSphere()
    rayCast = new THREE.Raycaster() 
    mouse = new THREE.Vector2();
    mouse.x = mouse.y = -1 

    renderer = new THREE.WebGLRenderer();   
    renderer.setSize(window.innerWidth, window.innerHeight); 

    document.body.appendChild(renderer.domElement);
    //document.addEventListener('click', onMouseClick, false)
    
};

let addSphere = function() {
    let texture = new THREE.TextureLoader().load('https://images.pexels.com/photos/64296/pexels-photo-64296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')
    // material = new THREE.MeshStandardMaterial({
    //     side: THREE.DoubleSide,
    //     color: 0X0f1d89,
    //     shininess:100
    // });

    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping

    texture.repeat.set(4, 4)

    material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide})

    geometry = new THREE.SphereGeometry(60,50,50)
    // material = new THREE.MeshStandardMaterial({
    //     shininess: 100, side: THREE.DoubleSide,
    //     color: 0X0450fb
    // });

    // for(let i = 0; i < 4; i++)
    //     for(let j = 0; j < 4; j++) {
            
            sphere = new THREE.Mesh(geometry, material);
            // sphere.position.x = BASE_X + j * 2 * (RADIUS+0.5);
            // sphere.position.z = -2*RADIUS * i;
            // sphere.position.y = BASE_Y + i * RADIUS;
            sphere.position.x = Math.random() * (30 - -20) + -20;
            sphere.position.y = Math.random() * (20 - -30) + -20;
            sphere.position.z = Math.random() * (20 - -2) + -20;
            scene.add(sphere);
            balloons.push(sphere)
        //}  
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
    geometry = new THREE.BoxGeometry(60,60,60);
    let texture = new THREE.TextureLoader().load('https://thumbs.dreamstime.com/z/aster-flowers-art-design-26968847.jpg')
    // material = new THREE.MeshStandardMaterial({
    //     side: THREE.DoubleSide,
    //     color: 0X0f1d89,
    //     shininess:100
    // });

    material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide})
    cube1 = new THREE.Mesh(geometry, material);
    cube1.position.z = -13;
    cube1.position.y = -2;
    cube1.position.x = 2;

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
        let x = Math.random() * (30 - -20) + -20;
        let y = Math.random() * (20 - -20) + -20;
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
    // cube1.rotation.x +=ADD
    // cube1.rotation.y +=ADD
    target.position.x = 10 * Math.sin(theta)
    target.position.z = 10 * Math.cos(theta)
    theta +=ADD
    camera.lookAt(target.position)
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
};

init();
addLight()
// addCube()
//addTriangle()
// addPlane()
// addSphere()
mainLoop();


   