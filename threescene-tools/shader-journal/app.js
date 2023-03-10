import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import shaders from './shaders/index';

class ShaderJournal {
  
  constructor(domEntryPoint) {
    // defaults set up here. 
    this.selectedFragmentShader = 'starTraveler';
    this.selectedVertexShader = 'standardVertex';
    this.selectedGeometry = 'cube';

    const geometryLookup = {
      'sphere': {type: 'native', value: new THREE.SphereGeometry(.8, 32, 16)},
      'cube': {type: 'native', value: new THREE.BoxGeometry(1, 1, 1)},
      'torus': {type: 'native', value: new THREE.TorusGeometry(.5, .47, 50, 30)},
      'torus-knot': {type: 'native', value: new THREE.TorusKnotGeometry(.5, .18, 50, 50)},
      'plane': {type: 'native', value: new THREE.PlaneGeometry(1, 1)},
      'cylinder': {type: 'native', value: new THREE.CylinderGeometry(.2, .2, 1, 32)},
      'cone': {type: 'native', value: new THREE.ConeGeometry(.2, .2, 32)},
      'capsule': { type: 'native', value: new THREE.CapsuleGeometry(.4, .4, 20, 20) },
      'strangeHead': { type: 'obj', value: '/models/strange-head.obj' },
      'skull': { type: 'obj', value: '/models/skull.obj' },
      'blenderMonkey': { type: 'obj', value: '/models/blender-monkey.obj' },
      
    };
    this.geometryLookup = geometryLookup;


    const width = domEntryPoint.offsetWidth;
    const height = domEntryPoint.offsetHeight;
    this.objFile = null;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);


    const loader = new OBJLoader();
    this.loader = loader;


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
      vertexShader: shaders[this.selectedVertexShader].content,
      fragmentShader: shaders[this.selectedFragmentShader].content,
      side: THREE.DoubleSide,
      wireframe: false
    });
    this.shaderMaterial = shaderMaterial;
    let that = this;
    const theMesh = new THREE.Mesh(geometryLookup[this.selectedGeometry].value, shaderMaterial);
    this.theMesh = theMesh;
    scene.add(theMesh);
    this.scene = scene;
    scene.background = 0xffffff;

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
    this.selectedGeometry = name;
    // native is what I am calling a geometry that is standard to the three.js library
    if (this.geometryLookup[name].type === 'native') {
      // remove current obj if it is there. 
      if (this.objFile) { 
        // remove from the scene. 
        this.scene.remove(this.objFile);
      }
      this.theMesh.geometry = this.geometryLookup[name].value;
      this.theMesh.visible = true;
    }

    if (this.geometryLookup[name].type === 'obj') {
      // remove current obj if it is there. 
      if (this.objFile) { 
        // remove from the scene. 
        this.scene.remove(this.objFile);
      }
      this.theMesh.visible = false; // hide the native mesh. 
      this.loadObjToScene(this.geometryLookup[name].value);
      //load the obj file. 
    }
    
  }

  loadObjToScene(path) {
    let that = this;
    this.loader.load(
      // resource URL
      path,
      // called when resource is loaded
      function (object) {
        that.scene.add(object);
        that.objFile = object;

        that.setShader(that.selectedFragmentShader, that.selectedVertexShader);
      },
      // called when loading is in progresses
      function ( xhr ) {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

      },
      // called when loading has errors
      function ( error ) {
        console.log(error);

      }
    );
  }

  setShader(fs, vs) {
    this.selectedFragmentShader = fs; 
    this.selectedVertexShader = vs; 
    
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: shaders[vs].content,
      fragmentShader: shaders[fs].content,
      side: THREE.DoubleSide,
      wireframe: false
    });
    this.theMesh.material = shaderMaterial;
    
    if (this.objFile) {
      this.objFile.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          // ...and we replace the material with our custom one
          child.material = shaderMaterial;
        }
      });
    } 


  }


}

export default ShaderJournal;