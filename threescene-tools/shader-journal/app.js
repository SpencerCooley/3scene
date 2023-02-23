import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import shaders from './shaders/index';

class ShaderJournal {
  
  constructor(domEntryPoint) {
    const width = domEntryPoint.offsetWidth;
    const height = domEntryPoint.offsetHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);



    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    domEntryPoint.appendChild(renderer.domElement);


    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });


    const vShader = `
    uniform float u_time;
    varying vec2 vUv; // varyings are variables that let you send values from the vertex to the fragment shader

    void main() {
      vUv = uv; // these contain the texture coordinates of the shsape
      vec3 pos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos , 1.0);
    }
    `
    this.vShader = vShader; 

    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: { value: { x: 0, y: 0 } },
    }
    this.uniforms = uniforms; 

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms, 
      vertexShader: vShader,
      fragmentShader: shaders.starTraveler.content,
      side: THREE.DoubleSide,
      wireframe: false
    });

    const theMesh = new THREE.Mesh(geometry, shaderMaterial);
    this.theMesh = theMesh;
    scene.add(theMesh);

    camera.position.z = 1.5;
    console.log(domEntryPoint);

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

    const geometryLookup = {
      'sphere': new THREE.SphereGeometry(.8, 32, 16),
      'cube': new THREE.BoxGeometry(1, 1, 1),
      'torus': new THREE.TorusGeometry(.5, .47, 50, 30),
      'torus-knot': new THREE.TorusKnotGeometry(.5, .18, 50, 50),
      'plane': new THREE.PlaneGeometry(1, 1)
    }
    this.geometryLookup = geometryLookup;


    window.addEventListener('resize', handleResize);
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      uniforms.u_time.value = clock.getElapsedTime();

      controls.update();
    }
    animate();
  }

  setGeometry(name) {
    this.theMesh.geometry = this.geometryLookup[name];
  }



  setFragmentShader(name) {
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: this.vShader,
      fragmentShader: shaders[name].content,
      side: THREE.DoubleSide,
      wireframe: false
    });
    this.theMesh.material = shaderMaterial;

  }
}

export default ShaderJournal;