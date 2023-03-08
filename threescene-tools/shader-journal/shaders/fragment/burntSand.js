const shader = {
  name: 'burntSand',
  content: `
    uniform float u_time;

    varying vec2 vUv;

    void main() {
      vec2 p = vUv;
      vec2 uv = vUv;
      float t = u_time * 0.5;
      float c = 0.0;
      float inten = 0.50;
      for (int i = 0; i < 20; i++)
      {
        float ti = float(i) / 10.0;
        float fi = float(i);
        vec2 rp = vec2(p.x + sin(p.y * 30.0 + cos(t + ti)) * (0.1 + sin(t + ti) * 0.05), p.y + cos(p.x * 3.0 + sin(t / 3.0 + ti)) * (0.1 + sin(t + ti) * 0.05));
        float pa = sin(fi * rp.x * sin(t / 100.0 + rp.y) + rp.y * sin(t / 100.0 + rp.x) + t);
        c += sin(fi * pa * inten);
      }
      c /= 10.0;
      c = sin(c * 1.0);
      gl_FragColor = vec4(vec3((c * 0.5 + 0.5)*.8, (sin(c*p.x) * 0.5 + 0.5)*.2, .3), 1.0);
    }

  `
}



export default shader;



