function sleep(fn, wait = 1000) {
  return function() {
    setTimeout(() => {
      fn.apply(this, arguments);
    }, wait);
  };
}

function test(name) {
  console.log(name);
}

sleep(test, test2, 2000)('guojianli');
