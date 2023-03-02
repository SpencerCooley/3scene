const shader = {
  name: 'mysticalDarkPond',
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
      vec2 uv = vUv; // uvs where the origin is located in the bottom - left corner
      
      //vec2 multiplier = vec2(sin(u_time* uv.x)*20.0, sin(u_time* uv.x*uv.y)*20.0);
      // vec2 multiplier = vec2(sin(u_time* uv.x*uv.y)*20.0, cos(u_time* uv.x/uv.y)*20.0);
      vec2 multiplier = vec2(1.0,1.0);
      
      // vec2 uvMouse = uPosition/uResolution;
      // vec2 uvMouseFrozen = vec2(0.9, 0.7); looks excellent with these values
      vec2 uvMouseFrozen = vec2(0.2, 0.4); 
      vec2 uvCenter = uv - 0.5;
      vec2 uvOffsetLeft = vec2(uv.x- 0.2, uv.y-0.5);
      vec2 uvOffsetRight = vec2(uv.x- 0.8, uv.y-0.5);
      vec2 uvsAsGrid = fract(uv * multiplier);
      // vec2 uvsAsGrid = fract(uvCenter * multiplier);
      vec3 color = vec3(0.2, 0.3, 0.0);
      
      float radius = cos(length(uv - 0.8) * 10.0 + u_time * 5.0) * 0.5 + 0.5; 
      
      radius *= 0.3; // strenght of circle
      float radius2 = cos(length(uv - 0.2) * 20.0 + u_time * 5.0) * 0.5 + 0.5; 
      
      radius2 *= cos(u_time)*.7; // strenght of circle
      float radius3 = sin(length(uv - uvMouseFrozen.x/uvMouseFrozen.y) * 10.0 + u_time * 5.0); 
      
      radius2 *= 0.9; // strenght of circle
      float c = circle(uvsAsGrid, radius); // make circle
      float c2 = circle(uvCenter + u_time, radius2); // make circle
      float c3 = circle(uvMouseFrozen, radius3); // make circle

      // color palette values
      vec3 brightness = vec3(1.0, 0.5, 0.4);
      vec3 contrast = vec3(0.9, noise(uv), 0.9);
      vec3 oscillation = vec3(1.0, 1.0, 1.0);
      vec3 phase = vec3(0.0, 10.0, 0.0);

      // make a gradient based on the circle value
      color += palette(
        c,
        brightness,
        contrast,
        oscillation,
        phase
      );
      color -= palette(
        c2,
        brightness,
        contrast,
        oscillation,
        phase
      );

      color -= palette(
          c3,
          brightness,
          contrast,
          oscillation,
          phase
        );

      gl_FragColor = vec4(color, 1);
    }
    `
}



export default shader;
