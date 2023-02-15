/**
 * 初始化buffer对象（储存顶点数据或着色数据）
 * @param {*} gl WebGL上下文
 * @returns {object} { position: 位置buffer对象 }
 */
export default function initBuffers(gl) {
  // 创建buffer对象
  const positionBuffer = gl.createBuffer();

  // 将buffer对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // 顶点坐标数组
  const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];

  // 创建并初始化buffer对象的数据存储区
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  return {
    position: positionBuffer, // 位置buffer对象
  };
}
