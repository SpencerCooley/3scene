const shader = {
  name: 'newSpirit',
  content: `
      uniform vec2 u_resolution;
      uniform float u_time;

      varying vec2 vUv;

  void main() {
  vec2 st = vUv;
  st -= 0.5;

  float angle = atan(st.y, st.x);
  float radius = length(st) * 100.0;

  vec3 color = vec3(0.0);
  float spiralAngle = angle + u_time * 0.1;
  float spiralRadius = radius + sin(spiralAngle * 8.0) * 0.9;
  vec2 spiralPos = vec2(cos(u_time*st.x), sin(u_time)) * spiralRadius;
  float spiralLength = length(spiralPos*sin(u_time*st.y));

  float spiralThickness = smoothstep(0.4, 0.0, abs(spiralLength - u_time * .1));
  color += vec3(spiralThickness);

  gl_FragColor = vec4(color, 1.0);
  }
    `
}



export default shader;
