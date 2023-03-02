const shader = {
  name: 'watercolorWorld',
  content: `
      uniform vec2 u_resolution;
      uniform float u_time;

      varying vec2 vUv;

void main() {
    vec2 uv = vUv *200.0; // Scale the UV coordinates

    vec2 multiplier = vec2(10.0, 10.0*uv.x);
    vec2 uvGrid = fract(uv*multiplier);
    vec3 color = vec3(0.0);
    // Generate the red, green, and blue color channels using sine waves
    color.r = 0.5 + 0.5 * sin(uv.x + u_time * 2.0);
    color.g = 0.5 + 0.5 * sin(uv.y + u_time * 3.0);
    color.b = 0.5 + 0.5 * sin((uv.x + uv.y) * 0.5 + u_time * 1.0);
    float edge = step(u_time, 1.0);
    color = mix(color, vec3(1.0), edge);
    gl_FragColor = vec4(color, .3);
}
    `
}



export default shader;
