import * as THREE from 'three';

export function createProduct() {
    // Create a group to hold all chair parts
    const chair = new THREE.Group();

    // Enhanced materials
    const material = new THREE.MeshPhysicalMaterial({
        color: 0x4a90e2,
        metalness: 0.6,
        roughness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 1.0
    });

    // Chair seat
    const seat = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.2, 2),
        material
    );
    seat.position.y = 1;
    seat.userData.name = "Chair Seat";
    chair.add(seat);

    // Chair back
    const back = new THREE.Mesh(
        new THREE.BoxGeometry(2, 1.5, 0.2),
        material
    );
    back.position.set(0, 1.75, -0.9);
    back.userData.name = "Chair Back";
    chair.add(back);

    // Chair legs with rounded edges
    const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 16);
    const legPositions = [
        [-0.8, 0.5, -0.8],
        [0.8, 0.5, -0.8],
        [-0.8, 0.5, 0.8],
        [0.8, 0.5, 0.8]
    ];

    legPositions.forEach((pos, index) => {
        const leg = new THREE.Mesh(legGeometry, material);
        leg.position.set(...pos);
        leg.userData.name = `Chair Leg ${index + 1}`;
        chair.add(leg);
    });

    // Add subtle floating animation
    chair.userData.animate = (time) => {
        chair.position.y = -0.5 + Math.sin(time * 0.5) * 0.05;
        chair.rotation.y = Math.sin(time * 0.2) * 0.05;
    };

    return chair;
} 