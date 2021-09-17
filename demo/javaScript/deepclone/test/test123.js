const arr = [1, 3, 6, 7, 9, 12, 15, 17, 21, 33, 56, 74, 89, 101];
const fn = (arr, data) => {
  // complete this function
};
console.log(fn(arr, 89)); //return 12
console.log(fn(arr, 77)); //return false

let obj = {};

for (let i = 0; i < arr.length; i++) {
  obj[arr[i]] = i;
}

if (obj[data]) {
  return obj[data];
} else {
  return false;
}
