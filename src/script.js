import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')
window.addEventListener("load", init, false);

function init() {
    createScene();
    createLights();
    createRocket();
    createLaunch();

}
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')
const bgTexture = textureLoader.load('/textures/background/images1.jpg');
const launchColorTexture = textureLoader.load('/textures/launch/Wall_BaseColor.jpg');
const launchAmbientTexture = textureLoader.load('/textures/launch/Wall_Ambient.jpg');
const launchHeightTexture = textureLoader.load('/textures/launch/Wall_Height.png');
const launchNormalTexture = textureLoader.load('/textures/launch/Wall_Normal.jpg');
const launchRoughnessTexture = textureLoader.load('/textures/launch/Wall_Roughness.jpg');
const launchMetrialTexture = textureLoader.load('/textures/launch/Wall_metrial.jpg');
// Scene
const createScene = () => {


    scene.background = bgTexture;
    /**
     * Darw Grass
     */
    grassColorTexture.repeat.set(8, 8)
    grassAmbientOcclusionTexture.repeat.set(8, 8)
    grassNormalTexture.repeat.set(8, 8)
    grassRoughnessTexture.repeat.set(8, 8)

    grassColorTexture.wrapS = THREE.RepeatWrapping
    grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
    grassNormalTexture.wrapS = THREE.RepeatWrapping
    grassRoughnessTexture.wrapS = THREE.RepeatWrapping

    grassColorTexture.wrapT = THREE.RepeatWrapping
    grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
    grassNormalTexture.wrapT = THREE.RepeatWrapping
    grassRoughnessTexture.wrapT = THREE.RepeatWrapping

    // floor
    const floor = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(80, 80),
            new THREE.MeshStandardMaterial({
                map: grassColorTexture,
                aoMap: grassAmbientOcclusionTexture,
                normalMap: grassNormalTexture,
                roughnessMap: grassRoughnessTexture
            })
        )
        // plane.receiveShadow = true
    floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
    floor.rotation.x = -Math.PI * 0.5
    floor.position.y = -0.3


    scene.add(floor)

}

const createLights = () => {
    // Group
    const light = new THREE.Group()
    scene.add(light)



    /**
     * Lights
     */
    // Ambient light
    const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.3)
    light.add(ambientLight)

    // Directional light
    const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
    moonLight.castShadow = true
    moonLight.shadow.mapSize.width = 256
    moonLight.shadow.mapSize.height = 256
    moonLight.shadow.camera.far = 15
    moonLight.position.set(4, 5, -2)
    light.add(moonLight)


    const doorLight = new THREE.PointLight('#ff7d46', 1, 17)
    doorLight.castShadow = true
    doorLight.shadow.mapSize.width = 1256
    doorLight.shadow.mapSize.height = 1256
    doorLight.shadow.camera.far = 7

    doorLight.position.set(4, 2.2, -0.7)
    light.add(doorLight)


}

const createRocket = () => {
    // Group
    const rocket = new THREE.Group()
    scene.add(rocket)

    const cylinder1 = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.2, 0.2, 0.1, 50),
        new THREE.MeshBasicMaterial({ color: 0xff0000 }));

    const cylinder2 = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.25, 0.25, 0.15, 50),
        new THREE.MeshBasicMaterial({ color: 0xff6C6CA4 }));


    const cylinder3 = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.4, 0.4, 1.5, 50),
        new THREE.MeshBasicMaterial({ color: 0x212121 }));

    const cylinder4 = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.4, 0.4, 0.5, 50),
        new THREE.MeshBasicMaterial({ color: 0xD6D6D6 }));

    const cylinder5 = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.4, 0.4, 1, 50),
        new THREE.MeshBasicMaterial({ color: 0x212121 }));

    const cylinder6 = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.4, 0.4, 0.3, 50),
        new THREE.MeshBasicMaterial({ color: 0xD6D6D6 }));

    const cylinder7 = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.4, 0.4, 0.7, 50),
        new THREE.MeshBasicMaterial({ color: 0x212121 }));

    const cylinder8 = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.4, 0.4, 0.2, 50),
        new THREE.MeshBasicMaterial({ color: 0xD6D6D6 }));

    const geoCone = new THREE.Mesh(new THREE.SphereGeometry(0.38, 20, 12),
        new THREE.MeshBasicMaterial({ color: 0x212121 }));



    rocket.add(cylinder1);
    rocket.add(cylinder2);
    rocket.add(cylinder3);
    rocket.add(cylinder4);
    rocket.add(cylinder5);
    rocket.add(cylinder6);
    rocket.add(cylinder7);
    rocket.add(cylinder8);
    rocket.add(geoCone);

    cylinder1.position.y = -0.2;
    cylinder2.position.y = -0.1;
    cylinder3.position.y = 0.7;
    cylinder4.position.y = 1.7;
    cylinder5.position.y = 2.45;
    cylinder6.position.y = 3.1;
    cylinder7.position.y = 3.6;
    cylinder8.position.y = 4.06;
    geoCone.position.y = 4.2;

    rocket.position.y = 4;



}

const createLaunch = () => {

        // Group
        const lunch = new THREE.Group()
        scene.add(lunch);

        const base = new THREE.Mesh(new THREE.BoxBufferGeometry(3, 3, 5.5),
            new THREE.MeshStandardMaterial({
                map: launchColorTexture,
                normalMap: launchNormalTexture,
                metalnessMap: launchMetrialTexture,
                metalness: 0.1,
                displacementMap: launchHeightTexture,
                displacementScale: 0.002,
                roughnessMap: launchRoughnessTexture,
                roughness: 32



            }))

        const base1 = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 1, 4),
            new THREE.MeshBasicMaterial({ color: 0xD6D6D6 }));

        lunch.add(base);
        lunch.add(base1);

        base.position.y = 1.2;
        base1.position.z = 2.8;
        base1.position.y = 1.5;

    }
    /**
     * Sizes
     */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', init => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 12
camera.position.y = 4
camera.position.z = 0
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

document.onkeydown = function(e) {
    if (e.keyCode === 37) {
        rocket.position.y -= 1;
    }
    if (e.keyCode === 38) {
        rocket.position.y += 1;
    }

}

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
document.body.appendChild(renderer.domElement)

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    //renderer.setClearColor('#262837')

const clock = new THREE.Clock()

function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    renderer.render(scene, camera);
}
animate();

const tick = () => {
    const elapsedTime = clock.getElapsedTime()



    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


/*

    //Drawe Red cubee

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000})
    const mesh  = new THREE.Mesh(geometry , material)
    scene.add(mesh)

     To position and scale 

    mesh.position.set(0.7,-0.6,1)
    mesh.scale.set(2,0.5,0.5)



  

const ball = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.2, 32, 32),


    new THREE.MeshStandardMaterial({

        map: doorColorTexture,
        transparent: true,
        aoMap: doorAmbientOcclusionTexture,

        normalMap: doorNormalTexture,

    })
    //   

)
//scene.add(ball)

    /**
     * Animate

     let acceleration = 9.8;
     let bounce_distance = 9;
     let bottom_position_y = 0;
     let gravity = 0.2;
     let time_step = 0.02;
     let x = 0.5;
     let cy1 = 100;
     // time_counter is calculated to be the time the ball just reached the top position
     // this is simply calculated with the s = (1/2)gt*t formula, which is the case when ball is dropped from the top position
     let time_counter = Math.sqrt(bounce_distance * 2 / acceleration);
     let initial_speed = acceleration * time_counter;
     let sphere = scene.getObjectByName("my-sphere");
     // Animate the scene
     const animate = () => {
         requestAnimationFrame(animate);
         // reset time_counter back to the start of the bouncing sequence when sphere hits through the bottom position
         if (ball.position.y < bottom_position_y) {
             time_counter = 0;
     
         }
         // calculate sphere position with the s2 = s1 + ut + (1/2)gt*t formula
         // this formula assumes the ball to be bouncing off from the bottom position when time_counter is zero
         ball.position.y = bottom_position_y + initial_speed * time_counter - x * acceleration * time_counter * time_counter;
         // advance time
     
         time_counter += time_step;
         // acceleration += gravity;
         //S   acceleration += initial_speed
         //  bottom_position_y += acceleration;
         if (ball.position.y > -1) {
             initial_speed -= 0.01;
     
         }
     
     };
     animate();
     


*/