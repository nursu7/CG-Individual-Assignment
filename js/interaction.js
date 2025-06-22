import * as THREE from 'three';

export function setupInteraction(scene, camera, renderer, product) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const infoPanel = document.getElementById('part-name');
    let selectedObject = null;

    // Handle mouse move
    window.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Handle click
    window.addEventListener('click', () => {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(product.children, true);

        if (intersects.length > 0) {
            const object = intersects[0].object;

            // Reset previous selection
            if (selectedObject) {
                selectedObject.material.emissive.setHex(0x000000);
            }

            // Update selection
            selectedObject = object;
            object.material.emissive.setHex(0x333333);

            // Update info panel
            if (object.userData.name) {
                infoPanel.textContent = object.userData.name;
            }
        }
    });

    // Handle hover
    window.addEventListener('mousemove', () => {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(product.children, true);

        if (intersects.length > 0) {
            document.body.style.cursor = 'pointer';
        } else {
            document.body.style.cursor = 'default';
        }
    });
} 