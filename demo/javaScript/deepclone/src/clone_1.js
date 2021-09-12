// 基础版本 只考虑对象的拷贝
module.exports = function clone(target) {
  if (typeof target === 'object') {
    let cloneTarget = {};
    for (const key in target) {
      cloneTarget[key] = clone(target[key]);
    }
    return cloneTarget;
  } else {
    return target;
  }
};
