/**
 * 顶点着色器的 GLSL 程序代码
 */
export default `
  attribute vec4 aVertexPosition;
  
  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;
  
  void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  }
`;
