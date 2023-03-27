import * as THREE from 'three'
import { AddEquation } from 'three';
import './style.css'

const LEFT = 37, RIGHT = 39, UP = 38, DOWN = 40;
let scene, camera, renderer, light;
let particles = [];
let ADD = 0.3;
//Math.random() * (max - min + 1) + min;

class Particle {
    constructor() {
        let geometry = new THREE.SphereGeometry(0.5, 30, 30)
        let material = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide,
            color: 0Xffffff,
            shininess: 100,
            specular: 0xafeeee
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.x = (Math.random() * 15) + 0;
        this.mesh.position.x *= Math.round(Math.random()) ? 1 : -1;

        this.mesh.position.y = (Math.random() * 5) + 0;
        this.mesh.position.y *= Math.round(Math.random()) ? 1 : -1;

        this.mesh.position.z = (Math.random() * 10) + 0;
        this.mesh.position.z *= Math.round(Math.random()) ? 1 : -1;

        this.radius = this.mesh.position.x;
        
        this.theta = 0;
        this.dTheta = (2 * Math.PI) / (Math.random() * (200 - 150 + 1) + 150);
        this.yFactor = Math.random() * (Math.PI) + 0;
    }

    move() {
        this.mesh.position.y = this.radius * Math.sin(this.theta + this.yFactor);
        this.mesh.position.x = this.radius * Math.sin(this.theta);
        this.mesh.position.z = this.radius * Math.cos(this.theta);
        this.theta += this.dTheta
    }
}

let onKeyDown = function(e) {
    
  if (e.keyCode == UP)
    camera.position.z -= ADD;
  else if (e.keyCode == DOWN)
    camera.position.z += ADD;
}

let createGeometry = function() {
    for(let i=0; i<=40; i++) {
        let particle = new Particle();
        particles.push(particle);
        scene.add(particle.mesh) 
    }
}

let addPointLights = function() {
  let light1 = new THREE.PointLight(0xffffff, 2, 30, 2)
  let light2 = new THREE.PointLight(0xffffff, 2, 30, 2)
  let light3 = new THREE.PointLight(0xffffff, 2, 30, 2)

  light2.position.y = 10
  light3.position.y = -10

  scene.add(light1)

  scene.add(light2)
  scene.add(light3)
}

let init = function() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 20;

    renderer = new THREE.WebGLRenderer();   
    renderer.setSize(window.innerWidth, window.innerHeight); 
    document.addEventListener('keydown', onKeyDown, false)
    document.body.appendChild(renderer.domElement);   
    
}

let mainLoop = function () {
    particles.forEach(p => p.move());

    
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

init();
addPointLights()
createGeometry()
mainLoop();