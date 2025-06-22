import * as THREE from 'three';

export function addLighting(scene) {
    // Ambient light with a slight blue tint
    const ambientLight = new THREE.AmbientLight(0x4040ff, 0.3);
    scene.add(ambientLight);

    // Main directional light with shadows
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 5, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    // Fill light with warm color
    const fillLight = new THREE.DirectionalLight(0xffa500, 0.5);
    fillLight.position.set(-5, 3, -5);
    scene.add(fillLight);

    // Add point lights for more dynamic lighting
    const pointLight1 = new THREE.PointLight(0x00ff00, 0.5, 10);
    pointLight1.position.set(3, 2, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff0000, 0.5, 10);
    pointLight2.position.set(-3, 2, -3);
    scene.add(pointLight2);

    // Animate the point lights
    scene.userData.animateLights = (time) => {
        pointLight1.position.x = Math.sin(time * 0.5) * 3;
        pointLight1.position.z = Math.cos(time * 0.5) * 3;

        pointLight2.position.x = Math.cos(time * 0.3) * 3;
        pointLight2.position.z = Math.sin(time * 0.3) * 3;
    };
} 