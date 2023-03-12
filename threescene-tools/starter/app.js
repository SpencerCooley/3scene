import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import shaders from '../shader-journal/shaders/index';

class Starter {
  constructor(domEntryPoint) {
    // defaults set up here. 
    const width = domEntryPoint.offsetWidth;
    const height = domEntryPoint.offsetHeight;
    this.objFile = null;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    domEntryPoint.appendChild(renderer.domElement);

    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: { value: { x: 0, y: 0 } },
    }
    this.uniforms = uniforms; 

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms, 
      vertexShader: shaders.standardVertex.content,
      fragmentShader: shaders.burntSand.content,
      side: THREE.DoubleSide,
      wireframe: false
    });
    this.shaderMaterial = shaderMaterial;
    // let that = this;
    let geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const theMesh = new THREE.Mesh(geometry, shaderMaterial);
    this.theMesh = theMesh;
    scene.add(theMesh);
    this.scene = scene;

    camera.position.z = 1.5;

    const controls = new OrbitControls(camera, renderer.domElement);

    const handleResize = () => {
      const className = '.'+domEntryPoint.attributes.class.nodeValue;
      const newWidth = document.querySelector(className).offsetWidth;
      const newHeight = document.querySelector(className).offsetHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      
      console.log(newWidth);
      console.log(newHeight);
    }

    const clock = new THREE.Clock();
    uniforms.u_time.value = clock.getElapsedTime();
    window.addEventListener('resize', handleResize);

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      uniforms.u_time.value = clock.getElapsedTime();
      controls.update();
    }
    animate();
  }


}

export default Starter;