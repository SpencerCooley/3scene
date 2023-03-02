const shader = {
  name: 'drippingPond',
  content: `
      uniform vec2 u_resolution;
      uniform float u_time;

      varying vec2 vUv;

    float circle(vec2 uv, float r) {
      return length(uv) - r;
    }

    vec3 palette(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
      return a + b*cos( 6.28318*(c*t+d) );
    }


    float rand(vec2 n) { 
      return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
    }

    float noise(vec2 p){
      vec2 ip = floor(p);
      vec2 u = fract(p);
      u = u*u*(3.0-2.0*u);
      
      float res = mix(
        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
      return res*res;
    }
    
    void main() {
      // uvs ranges from 0 to 1, left to right and bottom to top (or top to bottom in sometimes)
      vec2 uv = vUv; // uvs where the origin is located in the bottom - left corner
      vec2 uvsFromCenter = uv - 0.5; // uvs where the origin is in the middle of the space

      // fract takes the fractional part of a value
      // fract(1.13) = 0.13
      // fract(3.46) = 0.46
      // fract(5.30) = 0.30
      // etc...
      // taking the fractional part of the uvs (0.0 - 1.0) 
      // multiplied by some scalar N will make the uvs repeat from 0.0 - 1.0 N times
      vec2 multiplier = vec2(.03*uv.x, .01*abs(sin(u_time)));
      vec2 repeatedUvs = fract(uv * multiplier);

      // oscilate radius based on the length of the uvs from the middle (or a circle)
      float radius = cos(length(uv - 0.5) * 110.0 + u_time * 5.0) * 0.5 + 0.5; // -1.0 to 1.0 -> 0.0 - 1.0
      radius *= 0.35; // strenght of circle
      float c = circle(repeatedUvs, radius); // make circle

      // color palette values
      vec3 brightness = vec3(0.5, 0.5, 0.5);
      vec3 contrast = vec3(0.5, 0.5, 0.5);
      vec3 oscillation = vec3(2.0, 3.0, 3.0);
      vec3 phase = vec3(0.20, 0.10, 0.15);

      // make a gradient based on the circle value
      vec3 color = palette(
        c,
        brightness,
        contrast,
        oscillation,
        phase
      );

      // output color to the screen
      gl_FragColor = vec4(color, 1.0);
    }
    `
}



export default shader;
