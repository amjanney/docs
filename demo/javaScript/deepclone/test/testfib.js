var fib = function(n) {
  n = n && parseInt(n);
  if (n == 1 || n == 2) {
    return 1;
  }
  // 使用arguments.callee实现递归
  return arguments.callee(n - 2) + arguments.callee(n - 1);
};

console.log(fib(3));
