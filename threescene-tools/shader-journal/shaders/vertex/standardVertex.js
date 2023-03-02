// you should probably add a type "vertex attribute for clarity."
// I have somewere to be. Will do it later. 
const shader = {
  name: 'standardVertex',
  content: `
    uniform float u_time;
    varying vec2 vUv; // varyings are variables that let you send values from the vertex to the fragment shader

    void main() {
      vUv = uv; 
      vec3 pos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos , 1.0);
    }
    `
}



export default shader;
