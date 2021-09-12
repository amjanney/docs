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

## 循环引用
