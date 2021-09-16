
const arr = [1, 3, 6, 7, 9, 12,  15, 17, 21, 33, 56, 74, 89, 101]
const fn = (arr, data)=>{
	// complete this function
}
console.log( fn(arr, 89) )  //return 12
console.log( fn(arr, 77) )  //return false



let obj = {}

  for(let i = 0; i < arr.length; i++) {
    obj[arr[i]] = i;
  }
  
  if(obj[data]) {
    return obj[data]
  } else {
    return false
  }

  
  基础知识的掌握能力：对象的方法 内存泄漏
  设计模式，算法
  codeing能力

  代码能力没法短时间去弥补，只能在平时多积累，多写


  题库生产管理平台的改进
  - webpack相关的优化
  - 建立报警监控为稳定性负责
  - UI组件库和文档平台

  qiankun项目相关的
  - 为什么要重构
  - 遇到什么难题
  - 登录系统
  - 沙箱优化
