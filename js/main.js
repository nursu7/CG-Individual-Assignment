import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { initScene } from './initScene.js';
import { createProduct } from './createProduct.js';
import { addLighting } from './addLighting.js';
import { setupInteraction } from './interaction.js';
import { setupCameraAnimation } from './cameraAnimation.js';

// Initialize the scene
const { scene, camera, renderer, controls } = initScene();

// Create the product
const product = createProduct();
scene.add(product);

// Add lighting
addLighting(scene);

// Setup interaction
setupInteraction(scene, camera, renderer, product);

// Setup camera animation
setupCameraAnimation(camera, controls);

// Animation loop
function animate(time) {
    requestAnimationFrame(animate);

    // Update product animations
    if (product.userData.animate) {
        product.userData.animate(time * 0.001);
    }

    // Update lighting animations
    if (scene.userData.animateLights) {
        scene.userData.animateLights(time * 0.001);
    }

    // Update controls
    controls.update();

    // Render scene
    renderer.render(scene, camera);
}

animate(); 