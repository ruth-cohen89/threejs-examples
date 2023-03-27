import * as THREE from 'three'
import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/orbitControls'

let scene, camera, renderer, cube1, torus, plane;
let sphere, box, cylinder, light, ambient, rayCast, mouse;
let geometry, material, texture;
let spotLight1, spotLight2, target1, target2;
let ADD = 0.02, theta = 0;
let target, helper;
const RADIUS = 5, BASE_X = -20, BASE_Y = -20;
let balloons = []
let cubes = []


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

let addSphere = function() {
    //let texture = new THREE.TextureLoader().load('https://images.pexels.com/photos/64296/pexels-photo-64296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')
    material = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        color: 0X0f1d89,
        shininess:100
    });

    // texture.wrapS = THREE.RepeatWrapping
    // texture.wrapT = THREE.RepeatWrapping

    // texture.repeat.set(4, 4)

    // material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide})

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

            //sphere.castShadow = true
           // balloons.push(sphere)
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

let createCube = function() {
  let w = Math.random() * (8 - 5) + 5;
  let h = Math.random() * (8 - 5) + 5;
  let d = Math.random() * (8 - 5) + 5;

    geometry = new THREE.BoxGeometry(w, h, d);
    material = new THREE.MeshPhongMaterial(
                                { color: Math.random() * 0xffffff });

    let cube = new THREE.Mesh( geometry, material );
    cube.position.x = Math.random() * (20 - -20) + -20;
    cube.position.z = Math.random() * (20 - -20) + -20;
 
    cubes.push(cube);
};

let addCubes = function() {
    geometry = new THREE.BoxGeometry(5, 5, 5);
    //let texture = new THREE.TextureLoader().load('https://thumbs.dreamstime.com/z/aster-flowers-art-design-26968847.jpg')
    //material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide})    

    material = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        color: 0Xdff913,
        shininess:100, 
        side:THREE.DoubleSide
    });

    cube1 = new THREE.Mesh(geometry, material);
    cube1.position.z = -13;
    cube1.position.y = -2;
    cube1.position.x = -5;
    
    //cube1.castShadow = true 

    geometry = new THREE.BoxGeometry(5, 6, 4);
    let cube2 = new THREE.Mesh(geometry, material);
        cube2.position.set(5, 2, -13);
        cube2.castShadow = false;
    scene.add(cube1);
    scene.add(cube2);
}

let addPlane = function () {
    geometry = new THREE.PlaneGeometry(1000, 1,1000)
    //geometry = new THREE.PlaneGeometry(10, 10);
    let texture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/3/3b/Tuff_ohyaishi02.jpg');
    material = new THREE.MeshBasicMaterial({color: 0X693421, wireframe: true, side: THREE.DoubleSide});
    //material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide})    
    plane = new THREE.Mesh(geometry, material);
    //plane.rotation.x = 2;
    plane.position.y = -2;
    plane.castShadow = false;
	plane.receiveShadow = true;

    scene.add(plane);
}

let createPyramid = function(x, y, z, width, height) {
    // image courtesy of By ​Japanese Wikipedia user Miya.m, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=281620
    let texture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/3/3b/Tuff_ohyaishi02.jpg');
    let geometry = new THREE.CylinderGeometry(0, width, height, 4);
    let material = new THREE.MeshLambertMaterial({map: texture});
    let p = new THREE.Mesh(geometry, material);
    p.position.set(x, y, z);
    p.castShadow = true;
    p.receiveShadow = true;
    return p;
};

let createDesert = function() {
  // Create the plane
    // Image courtousy to By Ji-Elle - Own work, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=9429566
    let texture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Adrar_sands.JPG/1280px-Adrar_sands.JPG');
    let material = new THREE.MeshLambertMaterial({map: texture});
    let geometry = new THREE.BoxGeometry(1000, 1, 1000);
    plane = new THREE.Mesh(geometry, material);
    plane.position.y = -1;
    plane.receiveShadow = true;
    

    scene.add(plane);
    
    scene.add(createPyramid(0, 0, 0, 20, 25));
    scene.add(createPyramid(10, 0, -20, 30, 40));
    scene.add(createPyramid(30, 0, -30, 25, 35));
    scene.add(createPyramid(-15, 0, -15, 10, 10));
    
};

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

let addLight = function() {
    light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( 0,10, 0 ); //default; light shining from top
    light.castShadow = true; // default false
    scene.add( light );

    //Set up shadow properties for the light
    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default
    light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 500; // default

    //helper = new THREE.DirectionalLightHelper( light, 5 ); 

    scene.add(light);
    //scene.add(helper);
}


let addLights = function() {
    spotLight1 = new THREE.SpotLight(0xffffff, 1);
    spotLight1.position.set(15, 20, 10);
    spotLight1.angle = Math.PI / 20;
    spotLight1.penumbra = 0.05;
    spotLight1.decay = 2;
    spotLight1.distance = 200;
    
    scene.add(spotLight1);  
    
    target1 = new THREE.Object3D();
    target1.position.set(20, 0, 0);
    spotLight1.target = target1;
    
    scene.add(target1);
    
    spotLight2 = new THREE.SpotLight(0xffffff, 1);
    spotLight2.position.set(-15, 20, 10);
    spotLight2.angle = Math.PI / 20;
    spotLight2.penumbra = 0.05;
    spotLight2.decay = 2;
    spotLight2.distance = 200;
    
    scene.add(spotLight2);
    
    target2 = new THREE.Object3D();
    target1.position.set(-10, 0, 0);
    spotLight2.target = target2;
    
    scene.add(target2);
}

let init = function() {
    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0xffffff);
    scene.background = new THREE.Color(0x000000);
    // scene.fog = new THREE.Fog( 0x000000);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 10, 40);

    addLights()
    addPlane()
    for(let i = 1; i <= 10; i++)
    createCube();

    cubes.forEach(cube => scene.add(cube));
    // rayCast = new THREE.Raycaster() 
    // mouse = new THREE.Vector2();
    // mouse.x = mouse.y = -1 

    renderer = new THREE.WebGLRenderer();   
    renderer.setSize(window.innerWidth, window.innerHeight); 
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap

    document.body.appendChild(renderer.domElement);    
};

let mainLoop = function() {
    // light.position.x = 10 * Math.sin(theta);
    //     light.position.z = 10 * Math.cos(theta);
    //     theta += ADD;

    target1.position.x -= ADD;
    target2.position.x += ADD;
    if(target1.position.x < -20 || target1.position.x > 20)
        ADD *= -1;
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
};

init();
mainLoop();


   