## 深拷贝和浅拷贝的定义

![img](/JavaScript/16ce894a1f1b5c32_tplv-t2oaga2asx-watermark.awebp)
::: tip 浅拷贝
创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。
:::
![img](/JavaScript/16ce893a54f6c13d_tplv-t2oaga2asx-watermark.awebp)
::: tip 深拷贝
将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象
:::

浅拷贝就不再多说，下面我们直入正题，看看实现深拷贝的几种方式

## 乞丐版

```js
JSON.parse(JSON.stringify());
```

这种写法非常简单，而且可以应对大部分的应用场景，但是它还是有很大缺陷的，比如拷贝其他引用类型、拷贝函数、循环引用等情况。

## 基础版本

```js
function clone(target) {
  let cloneTarget = {};
  for (const key in target) {
    cloneTarget[key] = target[key];
  }
  return cloneTarget;
}
```

考虑到我们要拷贝的对象是不知道有多少层深度的，我们可以用递归来解决问题，稍微改写上面的代码：

如果是原始类型，无需继续拷贝，直接返回
如果是引用类型，创建一个新的对象，遍历需要克隆的对象，将需要克隆对象的属性执行深拷贝后依次添加到新对象上。

```js
function clone(target) {
  if (typeof target === 'object') {
    let cloneTarget = {};
    for (const key in target) {
      cloneTarget[key] = clone(target[key]);
    }
    return cloneTarget;
  } else {
    return target;
  }
}
```

这是一个最基础版本的深拷贝，这段代码可以让你向面试官展示你可以用递归解决问题，但是显然，他还有非常多的缺陷，比如，还没有考虑数组。

[coding](https://github.com/amjanney/docs/blob/master/demo/javaScript/deepclone/src/clone_1.js)

## 考虑数组

在上面的版本中，我们的初始化结果只考虑了普通的 object，下面我们只需要把初始化代码稍微一变，就可以兼容数组了：

```js
module.exports = function clone(target) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {};
    for (const key in target) {
      cloneTarget[key] = clone(target[key]);
    }
    return cloneTarget;
  } else {
    return target;
  }
};
```

现在你的代码又向合格迈进了一小步。

[coding](https://github.com/amjanney/docs/blob/master/demo/javaScript/deepclone/src/clone_2.js)

## 循环引用

下面是一个测试案例

```js
const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child',
  },
  field4: [2, 4, 8],
};
target.target = target;
```

像上面的这种情况，递归进入死循环会导致栈内存溢出了。

原因就是上面的对象存在循环引用的情况，即对象的属性间接或直接的引用了自身的情况。

::: tip 解决方案
额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。
:::
这个存储空间，需要可以存储 key-value 形式的数据，且 key 可以是一个引用类型，我们可以选择 Map 这种数据结构：

- 检查 map 中有无克隆过的对象
- 有 - 直接返回
- 没有 - 将当前对象作为 key，克隆对象作为 value 进行存储
- 继续克隆

```js
function clone(target, map = new Map()) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {};
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);
    for (const key in target) {
      cloneTarget[key] = clone(target[key], map);
    }
    return cloneTarget;
  } else {
    return target;
  }
}
```

[coding](https://github.com/amjanney/docs/blob/master/demo/javaScript/deepclone/src/clone_3.js)

接下来，我们可以使用，[WakeMap](https://es6.ruanyifeng.com/?search=wakemap&x=0&y=0#docs/set-map#WeakMap) 提代 Map 来使代码达到画龙点睛的作用。

为什么使用 WeakMap 呢？

我们默认创建一个对象：const obj = {}，就默认创建了一个强引用的对象，我们只有手动将 obj = null，它才会被垃圾回收机制进行回收，如果是弱引用对象，垃圾回收机制会自动帮我们回收。

> WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。

WakeMap 的使用

```js
let obj = { name: 'ConardLi' };
const target = new WeakMap();
target.set(obj, 'code 秘密花园');
obj = null;
```

如果是 WeakMap 的话，target 和 obj 存在的就是弱引用关系，当下一次垃圾回收机制执行时，这块内存就会被释放掉。

设想一下，如果我们要拷贝的对象非常庞大时，使用 Map 会对内存造成非常大的额外消耗，而且我们需要手动清除 Map 的属性才能释放这块内存，而 WeakMap 会帮我们巧妙化解这个问题。

我也经常在某些代码中看到有人使用 WeakMap 来解决循环引用问题，但是解释都是模棱两可的，当你不太了解 WeakMap 的真正作用时。我建议你也不要在面试中写这样的代码，结果只能是给自己挖坑，即使是准备面试，你写的每一行代码也都是需要经过深思熟虑并且非常明白的。

能考虑到循环引用的问题，你已经向面试官展示了你考虑问题的全面性，如果还能用 WeakMap 解决问题，并很明确的向面试官解释这样做的目的，那么你的代码在面试官眼里应该算是合格了。

## 性能优化

在上面的代码中，我们遍历数组和对象都使用了 for in 这种方式，实际上 for in 在遍历时效率是非常低的，

常见的三种循环 for、while、for in 的执行效率中，while 是最快的。

用 while 实现一个 forEach 遍历

```js
function forEach(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
}
```

然后对 clone 函数进行改写

```js
function clone(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    const isArray = Array.isArray(target);
    let cloneTarget = isArray ? [] : {};

    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);

    const keys = isArray ? undefined : Object.keys(target);
    forEach(keys || target, (value, key) => {
      if (keys) {
        key = value;
      }
      cloneTarget[key] = clone2(target[key], map);
    });

    return cloneTarget;
  } else {
    return target;
  }
}
```

到这里，你已经向面试官展示了，在写代码的时候你会考虑程序的运行效率，并且你具有通用函数的抽象能力。

[coding](https://github.com/amjanney/docs/blob/master/demo/javaScript/deepclone/src/clone_4.js)
