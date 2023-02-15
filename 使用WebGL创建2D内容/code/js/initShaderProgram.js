import loadShader from "./loadShader.js";

/**
 * 初始化着色器程序
 * @param {*} gl WebGL上下文
 * @param {*} vsSource 顶点着色器GLSL源码
 * @param {*} fsSource 片段着色器GLSL源码
 * @returns 着色器程序
 */
export default function initShaderProgram(gl, vsSource, fsSource) {
  // 加载顶点着色器
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  // 加载片段着色器
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // 创建着色器程序
  const shaderProgram = gl.createProgram();
  // 向着色器程序添加顶点着色器
  gl.attachShader(shaderProgram, vertexShader);
  // 向着色器程序添加片段着色器
  gl.attachShader(shaderProgram, fragmentShader);
  // 链接着色器程序，完成为着色器准备 GPU 代码的过程
  gl.linkProgram(shaderProgram);

  // 获取链接状态
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(
      "Unable to initialize the shader program: " +
        gl.getProgramInfoLog(shaderProgram)
    );
    return null;
  }

  // 返回着色器程序
  return shaderProgram;
}
