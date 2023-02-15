import vsSource from "./vsSource.js";
import fsSource from "./fsSource.js";
import initShaderProgram from "./initShaderProgram.js";
import initBuffers from "./initBuffers.js";
import drawScene from "./drawScene.js";

function main() {
  const canvas = document.getElementById("glcanvas");
  // 初始化WebGL上下文
  const gl = canvas.getContext("webgl");

  // 确认WebGL支持性
  if (!gl) {
    alert("无法初始化 WebGL，你的浏览器、操作系统或硬件等可能不支持 WebGL。");
    return;
  }

  // 初始化着色器程序
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // 初始化buffer对象
  const buffers = initBuffers(gl);

  // 着色器程序信息
  const programInfo = {
    program: shaderProgram,
    // 属性位置对象
    attribLocations: {
      // 着色器对象中某属性的下标指向位置
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"), // 顶点属性的索引位置
    },
    // uniform位置对象
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(
        shaderProgram,
        "uProjectionMatrix"
      ), // uniform变量的位置
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
    },
  };

  // 绘制场景
  drawScene(gl, programInfo, buffers);
}

main();
