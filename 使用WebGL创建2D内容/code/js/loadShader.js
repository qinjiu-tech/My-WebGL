/**
 * 加载着色器
 * @param {*} gl WebGL上下文
 * @param {*} type 着色器类型：gl.VERTEX_SHADER || gl.FRAGMENT_SHADER
 * @param {*} source GLSL源码
 * @returns 着色器
 */
export default function loadShader(gl, type, source) {
  // 创建着色器
  const shader = gl.createShader(type);

  // 设置着色器的GLSL源码
  gl.shaderSource(shader, source);

  // 编译GLSL着色器
  gl.compileShader(shader);

  // 获取编译状态
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      "An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader)
    );
    // 删除着色器
    gl.deleteShader(shader);
    return null;
  }

  // 返回着色器
  return shader;
}
