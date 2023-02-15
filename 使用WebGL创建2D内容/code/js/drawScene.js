const { mat4 } = glMatrix;

/**
 * 绘制场景
 * @param {*} gl WebGL上下文
 * @param {*} programInfo 着色器程序信息
 * @param {*} buffers 缓冲区对象
 */
export default function drawScene(gl, programInfo, buffers) {
  // 预设值：颜色值
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // 预设值：深度清除值
  gl.clearDepth(1.0);
  // // 对该上下文开启某种特性 ---> 激活深度比较，并且更新深度缓冲区
  // gl.enable(gl.DEPTH_TEST);
  // // 指定将输入像素深度与当前深度缓冲区值进行比较的函数 ---> 如果传入值小于或等于深度缓冲区值，则通过
  // gl.depthFunc(gl.LEQUAL);

  // 使用预设值来清空缓冲
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // 创建摄像机透视矩阵
  // 视图角度：45度
  const fieldOfView = (45 * Math.PI) / 180;
  // 画布宽高比
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  // 最近可见距离
  const zNear = 0.1;
  // 最远可见距离
  const zFar = 100.0;

  // 投射矩阵
  const projectionMatrix = mat4.create();
  // 初始化
  mat4.perspective(
    projectionMatrix,
    fieldOfView, // 视图角度
    aspect, // 画布宽高比
    zNear, // 最近可见距离
    zFar // 最远可见距离
  );

  // 模型视图矩阵
  const modelViewMatrix = mat4.create();
  // 将绘图位置移动到绘制正方形的位置
  mat4.translate(
    modelViewMatrix, // 需要转换的矩阵单元格
    modelViewMatrix, // 转换矩阵
    [-0.0, 0.0, -6.0] // 移动的坐标位置
  );

  // 配置顶点数据
  {
    // 如何从缓冲区读取数据？
    const numComponents = 2; // 每次迭代提取的值的数量
    const type = gl.FLOAT; // 缓冲区的数据类型
    const normalize = false; // 是否应该将整数数值归一化到特定的范围
    const stride = 0; // 从一组值到下一组值需要多少字节
    const offset = 0; // 从缓冲区中的多少字节开始

    // 将buffer对象绑定到目标，允许从缓冲区读取数据。
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);

    // 告诉显卡从缓冲区中读取顶点数据。
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition, // 顶点属性的索引位置
      numComponents,
      type,
      normalize,
      stride,
      offset
    );

    // 激活上面配置的顶点属性数组
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }

  // 将定义好的“着色器程序”添加到当前的渲染状态中
  gl.useProgram(programInfo.program);

  // 把“投影矩阵”和“模型视图矩阵的值”的值传递给顶点着色器的 uniform 变量
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix, // 指定uniform变量的位置
    false, // 是否转置矩阵，必须为 false
    projectionMatrix // Float32Array 型或者是 GLfloat 序列值
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix
  );
  
  // 绘制
  {
    const offset = 0; // 从哪个点开始绘制
    const vertexCount = 4; // 执行绘制使用到多少个点
    // 从向量数组中绘制图元
    gl.drawArrays(
      gl.TRIANGLE_STRIP, // 绘制图元的方式
      offset,
      vertexCount
    );
  }
}
