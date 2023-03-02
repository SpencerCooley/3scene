// you should probably add a type "vertex attribute for clarity."
// I have somewere to be. Will do it later. 
const shader = {
  name: 'simpleWavy',
  content: `
  
    uniform float u_time;
    varying vec2 vUv; // varyings are variables that let you send values from the vertex to the fragment shader

    void main() {
      vUv = uv; 
      vec3 pos = position;
      pos.x += sin(pos.y * 10.0 + u_time) * 0.1;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos , 1.0);
    }
    `
}



export default shader;
