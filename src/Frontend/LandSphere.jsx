import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import '../index.css';

const LandSphere = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Creating Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(`#141414`);

    // Creating an Object (Sphere)
    const geometry = new THREE.SphereGeometry(4, 64, 64);
    const material = new THREE.MeshStandardMaterial({ color: '#00ff83' });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Size
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Lights
    const light = new THREE.PointLight(0xffffff, 30, 1000);
    light.position.set(9, 4, 5);
    light.intensity = 25;
    scene.add(light);

    const light2 = new THREE.PointLight(0xffffff, 30, 1000);
    light2.position.set(-9, -4, -5);
    light2.intensity = 5;
    scene.add(light2);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
    camera.position.z = 20;
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(2);
    renderer.render(scene, camera);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;

    // Resize
    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.render(scene, camera);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const loop = () => {
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(loop);
    };
    loop();

    // GSAP Animations
    const tLine = gsap.timeline({ defaults: { duration: 0.5 } });
    tLine.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
    tLine.fromTo('nav', { y: '-100%' }, { y: '0%' });
    tLine.fromTo('.title', { opacity: 0 }, { opacity: 1 });
    tLine.fromTo('.input-container-2', 
        {y: 200, opacity: 0}, {y: 0, opacity: 1});
    tLine.fromTo('.title2', { opacity: 0 }, { opacity: 1 });

    // Mouse Animation Color
    let mouseDown = false;
    let rgb = [];
    const handleMouseDown = () => (mouseDown = true);
    const handleMouseUp = () => (mouseDown = false);

    const handleMouseMove = (event) => {
      if (mouseDown) {
        rgb = [
          Math.round((event.pageX / sizes.width) * 255),
          Math.round((event.pageY / sizes.height) * 255),
          150,
        ];
        // Animate Color (Mesh Material)
        const newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
        gsap.to(mesh.material.color, {
          r: newColor.r,
          g: newColor.g,
          b: newColor.b,
        });
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
    };
  }, []);

  return (
    <div>
      <canvas className="webgl" ref={canvasRef}></canvas>
    </div>
  );
};

export default LandSphere;
