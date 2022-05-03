import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

function windowResize() {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
}

document.body.onresize = windowResize;
windowResize();

// Torus (rings)

const torusTexture = new THREE.TextureLoader().load('venus.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const geometry = new THREE.TorusGeometry(10, 0.5, 16, 100);
const material = new THREE.MeshStandardMaterial({  roughness: 0.8, map: torusTexture, normalMap: normalTexture, color:"lightorange"});
const torus = new THREE.Mesh(geometry, material);

const geometryTop = new THREE.TorusGeometry(10, 0.33, 16, 100);
const materialTop = new THREE.MeshStandardMaterial({  roughness: 0.8, map: torusTexture, normalMap: normalTexture, color:"lightorange"});
const torusTop = new THREE.Mesh(geometryTop, materialTop);

torusTop.position.set(-2,1,1)

const geometryBottom = new THREE.TorusGeometry(10, 0.33, 16, 100);
const materialBottom = new THREE.MeshStandardMaterial({  roughness: 0.8, map: torusTexture, normalMap: normalTexture, color:"lightorange"});
const torusBottom = new THREE.Mesh(geometryBottom, materialBottom);

torusBottom.position.set(2,-2,-3)

scene.add(torus, torusTop, torusBottom);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh( geometry, material );

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));

    star.position.set(x, y, z);

    scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('deepspace.jpg');
scene.background = spaceTexture;

// Avatar

const saliTexture = new THREE.TextureLoader().load('me.png');

const sali = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial( { map: saliTexture })
);

scene.add(sali);

// Sun

const sunTexture = new THREE.TextureLoader().load('neptune.jpg');

const sun = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial( { 
        map: sunTexture
    })
);

scene.add(sun);

sun.position.z = 30;
sun.position.setX(-10);

sali.position.z = -5;
sali.position.x = 2;


function moveCamera() {
    const t = document.body.getBoundingClientRect().top;

    sun.rotation.z += 0.05;

    sali.rotation.y += 0.01;
    sali.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
    requestAnimationFrame( animate );

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    torusTop.rotation.x += 0.01;
    torusTop.rotation.y += 0.005;
    torusTop.rotation.z += 0.01;

    torusBottom.rotation.x += 0.01;
    torusBottom.rotation.y += 0.005;
    torusBottom.rotation.z += 0.01;

    sun.rotation.x += 0.005;

    // controls.update();

    renderer.render( scene, camera );
}

animate()