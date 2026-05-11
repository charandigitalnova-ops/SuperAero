// Initialize Three.js scene
let scene, camera, renderer, airplane;

function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // Sky blue background

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(400, 400);
    document.getElementById('airplane-3d').appendChild(renderer.domElement);

    // Create airplane
    createAirplane();

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Start animation loop
    animate();
}

function createAirplane() {
    airplane = new THREE.Group();

    // Fuselage
    const fuselageGeometry = new THREE.CylinderGeometry(0.1, 0.15, 2, 8);
    const fuselageMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const fuselage = new THREE.Mesh(fuselageGeometry, fuselageMaterial);
    fuselage.rotation.z = Math.PI / 2;
    airplane.add(fuselage);

    // Wings
    const wingGeometry = new THREE.BoxGeometry(1.5, 0.05, 0.3);
    const wingMaterial = new THREE.MeshPhongMaterial({ color: 0x007bff });
    const wings = new THREE.Mesh(wingGeometry, wingMaterial);
    wings.position.y = 0.1;
    airplane.add(wings);

    // Tail
    const tailGeometry = new THREE.BoxGeometry(0.3, 0.8, 0.05);
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.position.set(-0.8, 0.3, 0);
    airplane.add(tail);

    // Propeller
    const propellerGeometry = new THREE.BoxGeometry(0.05, 0.8, 0.05);
    const propellerMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const propeller = new THREE.Mesh(propellerGeometry, propellerMaterial);
    propeller.position.x = 1;
    airplane.add(propeller);

    // Store propeller for animation
    airplane.propeller = propeller;

    scene.add(airplane);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate airplane slowly
    airplane.rotation.y += 0.01;

    // Rotate propeller fast
    if (airplane.propeller) {
        airplane.propeller.rotation.z += 0.5;
    }

    // Gentle floating motion
    airplane.position.y = Math.sin(Date.now() * 0.001) * 0.1;

    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .about p').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);