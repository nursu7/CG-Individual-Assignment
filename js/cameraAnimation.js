export function setupCameraAnimation(camera, controls) {
    let isAutoRotating = true;
    let rotationSpeed = 0.5;
    let lastTime = 0;

    // Toggle auto-rotation when user interacts with controls
    controls.addEventListener('start', () => {
        isAutoRotating = false;
    });

    controls.addEventListener('end', () => {
        isAutoRotating = true;
    });

    // Animation function
    function animateCamera(time) {
        if (!lastTime) lastTime = time;
        const delta = (time - lastTime) / 1000;
        lastTime = time;

        if (isAutoRotating) {
            // Calculate new camera position using polar coordinates
            const radius = Math.sqrt(
                camera.position.x * camera.position.x +
                camera.position.z * camera.position.z
            );
            const angle = Math.atan2(camera.position.z, camera.position.x) + rotationSpeed * delta;

            camera.position.x = radius * Math.cos(angle);
            camera.position.z = radius * Math.sin(angle);
            camera.lookAt(0, 0, 0);
        }

        requestAnimationFrame(animateCamera);
    }

    // Start animation
    requestAnimationFrame(animateCamera);
} 