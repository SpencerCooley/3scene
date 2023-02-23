const shader = {
  name: 'shaderGPT',
  content: `
  
uniform float u_time; // Time uniform

varying vec2 vUv; // Fragment coordinates (normalized)
varying vec3 vColor; // Output color

const float CELL_SIZE = 0.05; // Size of each cell
const float ANGLE_SPEED = 1.0; // Speed of rotation

void main()
{
    // Compute the position of the cell in the grid
    vec2 cellPos = floor(vUv / CELL_SIZE);

    // Compute the position of the center of the cell
    vec2 center = (cellPos + 0.5) * CELL_SIZE;

    // Compute the offset of the fragment from the center
    vec2 offset = vUv - center;

    // Compute the angle of rotation based on time
    float angle = u_time * ANGLE_SPEED + (cellPos.x + cellPos.y) * 0.1;

    // Rotate the offset around the Y axis
    float s = sin(angle);
    float c = cos(angle);
    mat2 rot = mat2(c, s, -s, c);
    offset = rot * offset;

    // Determine if the cell should be a square or a triangle
    bool isSquare = int(cellPos.x + cellPos.y) % 2 == 0;

    // Compute the color of the cell based on its position
    vec3 color = mix(vec3(0.1, 0.9*vUv.y, 0.2 * sin(u_time)), vec3(0.7* vUv.x, 0.8* sin(u_time), 0.2), mod(cellPos.x + cellPos.y, 2.0));

    // Compute the final shape by selecting between a square and a triangle
    float shape = isSquare ? step(abs(offset.x), CELL_SIZE * 0.5) * step(abs(offset.y), CELL_SIZE * 0.5) : step(offset.y, -offset.x) * step(offset.y, offset.x);

    // Set the color of the fragment
    gl_FragColor = vec4(shape * color, 1.0);
}
  `
}

export default shader;