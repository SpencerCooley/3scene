
const shader = {
  name: 'starTraveler',
  content: `
      uniform vec2 u_resolution;
      uniform float u_time;

      varying vec2 vUv;

      void main() {
        vec3 color;
        float ww;
        vec2 uv = vUv;
        float multiplier = sin(u_time * 0.05*uv.x) * 20.0;
        vec2 m = fract(uv*multiplier);
        vec2 d = fract(uv*multiplier+0.5);
        

        //		first attempt
        // ww = float(m.x > .9 || m.y > .9 || abs(m.x+m.y-.9) > .6 || abs(m.x-m.y) > .6);
        //ww = float(m.x > .9 || m.x > abs(sin(u_time))*.9 || abs(m.y+m.y-.9) > .6 || abs(m.x-m.y) > .2);
        
        //		not octagons but interesting -- modified
        // ww = length(            
        //     max(1.-abs(sin(uv*2.))*6.,0.) + 
        //     max(1.-abs(sin(uv*mat2(sin(u_time* 0.05)*40.,cos(u_time* 0.05)*40.,-10,10)))*10.,0.)
        // );

        // //		not octagons but interesting
        ww = length(            
            max(1.-abs(sin(uv*20.))*10.,0.) + 
            max(1.-abs(sin(uv*mat2(sin(u_time* 0.35)*40.,cos(u_time* 0.05)*40.,-10,10)))*10.,0.)
        );


        //		the code that actually draws octagons
        // ww = length(
        //   max(1.0-abs(m-.5)*100.+2.,0.) +
        //   max(abs(d.x+vec2(d.y-1.,-d.y))*100.-65.,0.)
        // );
        vec2 uvsFromCenter = uv - 0.5; 
        // color original
        color = vec3(ww + sin(uvsFromCenter.x + u_time), ww + sin(uvsFromCenter.y + u_time), ww + sin(uv.x + u_time ));
        // color = vec3(ww + sin(uvsFromCenter.x - .001), ww + sin(uvsFromCenter.y - .001), ww + sin(uv.x - .001 ));
        //color = vec3(ww + m.y*.06, ww + m.y*.2 , ww + .2*uv.y );

        // output color to the screen
        gl_FragColor = vec4(color, 1.0);
      }
    `
}

export default shader;