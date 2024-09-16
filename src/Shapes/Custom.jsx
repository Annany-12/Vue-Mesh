import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

function Custom() {

    const canvasRef = useRef();
    const sceneRef = useRef(new THREE.Scene());
    const [aRotate, setARotate] = useState(true);
    const cameraRef = useRef();
    const rendererRef = useRef();
    const lightRefs = useRef([]);

    function handleAutoRotation(event) {
        setARotate(event.target.checked);
    }

    
    function handleInputFile(event) {
        const file = event.target.files[0];

        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            const contents = e.target.result;
            const gltfLoader = new GLTFLoader();

            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
            gltfLoader.setDRACOLoader(dracoLoader);

            gltfLoader.parse(contents, '', (gltfScene) => {
                const scene = sceneRef.current;
                scene.clear();
                scene.add(gltfScene.scene);
            });
        };

        reader.readAsArrayBuffer(file);
    }

    const removeLights = () => {
        const scene = sceneRef.current;
        lightRefs.current.forEach(light => {
            scene.remove(light);
        });
        lightRefs.current = [];
    };

    const addLights = () => {
        const scene = sceneRef.current;

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);
        lightRefs.current.push(ambientLight);

        const directionalLight1 = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight1.position.set(10, 10, 10);
        scene.add(directionalLight1);
        lightRefs.current.push(directionalLight1);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight2.position.set(-10, 10, -10);
        scene.add(directionalLight2);
        lightRefs.current.push(directionalLight2);
    };

    useEffect(() => {
        const scene = sceneRef.current;

        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        };

        if (!cameraRef.current) {
            const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);
            camera.position.set(5, 5, 5);
            cameraRef.current = camera;
            scene.add(camera);

            const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(window.devicePixelRatio);
            rendererRef.current = renderer;
        }

        const camera = cameraRef.current;
        const renderer = rendererRef.current;

        removeLights();
        addLights();

        // OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = false;
        controls.enableZoom = true;
        controls.enablePan = true;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Handle resizing
        const handleResize = () => {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            controls.dispose();
        };

    }, [aRotate]);

    return (
        <>
            <div className="input-container-2">
                <label className="custom-file-upload-2">
                    <input type="file" className='inputfile-2' onChange={handleInputFile} accept=".glb,.gltf" />
                    Click to Upload File
                </label>
            </div>

            <div className="a-rotate-container">
                Fix Render
                <input
                    className='a-rotate-check'
                    type="checkbox"
                    checked={aRotate}
                    onChange={handleAutoRotation}
                />
            </div>
            <h5 className="note">If your textures are not loaded, just toggle the Fix Render Switch</h5>

            <canvas className='view-area' ref={canvasRef} style={{ display: 'block', width: '100%', height: '100vh' }}></canvas>
        </>
    );
}

export default Custom;
