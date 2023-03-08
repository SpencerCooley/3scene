const shader = {
  'name': 'candyCane',
  'content': `
    #define PI 3.14159265359

    mat2 rotate2d(float _angle){
        return mat2(cos(_angle),-sin(_angle),
                    sin(_angle),cos(_angle));
    }

    uniform float u_time;

    varying vec2 vUv;


    void main() {

      vec2 multiplier = vec2(2., 2.);
      vec2 repeatedUv = fract(multiplier*vUv);
      vec2 uv = vUv;
      uv = rotate2d( PI/25. ) * uv;
      // calculate the colo based on the x-coordinate of the texture coordinate
      vec3 color = vec3(0.0);
      if (fract(uv.y* 16.0 + u_time) < 0.5) {
        color = vec3(.5, 0.0, 0.0); // red
      } else {
        // color -= vec3(.8,0.0, .1); // white
        color = vec3(1.0);
      }

      
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
}

export default shader;