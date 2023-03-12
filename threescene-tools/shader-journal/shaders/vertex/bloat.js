// you should probably add a type "vertex attribute for clarity."
// I have somewere to be. Will do it later. 
const shader = {
  name: 'bloat',
  content: `
    uniform float u_time;
    varying vec2 vUv; // varyings are variables that let you send values from the vertex to the fragment shader
    varying vec3 vertexNormal;
    
    void main() {
      vertexNormal = normalize(normalMatrix * normal);
      vUv = uv; 
      vec3 pos = position;
      // pos.x += cos(pos.y * 4.0 + u_time) * .4*sin(sin(uv.x*uv.y*u_time));
      // pos.x += sin(vertexNormal.y * 10.0 + u_time) * 0.4;
      pos.z += sin(u_time)*vertexNormal.z*vertexNormal.y;
      // pos.x += sin(u_time)*vertexNormal.x;
      // pos.y += sin(u_time)*vertexNormal.y;
      // pos.y += sin(u_time)*vertexNormal.z;
      // pos.y += sin(vertexNormal.x * vertexNormal.y* 40.0 + u_time) * 0.1;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos , 1.0);
    }
    `
}



export default shader;
