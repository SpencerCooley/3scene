const shader = {
  name: 'newSpirit2',
  content: `
      uniform vec2 u_resolution;
      uniform float u_time;

      varying vec2 vUv;

  void main() {
  vec2 st = vUv;
  st -= 0.5;
    vec2 translate = vec2(cos(u_time*.5),sin(u_time*.5));

    st += translate*.35;
  float angle = atan(st.y, st.x);
  float radius = length(st) * 80.0;

  vec3 color = vec3(0.2, sin(u_time)*.03, st.y*.4);
  float spiralAngle = angle + u_time * 0.1;
  float spiralRadius = radius + sin(spiralAngle * 8.0) * 0.9;
  vec2 spiralPos = vec2(cos(u_time*st.x*.3), sin(u_time*.5)) * spiralRadius;
  float spiralLength = length(spiralPos*sin(u_time*st.y));

  float spiralThickness = smoothstep(0.4, 0.0, abs(spiralLength - u_time * .1));
  color += vec3(spiralThickness);

  gl_FragColor = vec4(color, 1.0);
  }
    `
}



export default shader;
