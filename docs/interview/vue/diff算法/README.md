## 前言

## 什么是虚拟 DOM

虚拟 DOM 是一个用来表示真实 DOM 的对象。举个例子，请看以下真实 DOM：

```html
<ul id="list">
  <li class="item">哈哈</li>
  <li class="item">呵呵</li>
  <li class="item">嘿嘿</li>
</ul>
```

这段 DOM 对应的虚拟 DOM 为：

```js
let oldVDOM = {
  // 旧虚拟DOM
  tagName: 'ul', // 标签名
  props: {
    // 标签属性
    id: 'list',
  },
  children: [
    // 标签子节点
    {
      tagName: 'li',
      props: { class: 'item' },
      children: ['哈哈'],
    },
    {
      tagName: 'li',
      props: { class: 'item' },
      children: ['呵呵'],
    },
    {
      tagName: 'li',
      props: { class: 'item' },
      children: ['嘿嘿'],
    },
  ],
};
```

这时候，我修改一个 li 标签的文本：

```html
<ul id="list">
  <li class="item">哈哈</li>
  <li class="item">呵呵</li>
  <li class="item">林三心哈哈哈哈哈</li>
  // 修改
</ul>
```

这时候生成的新的虚拟 DOM 为：

```js
let newVDOM = {
  // 新虚拟DOM
  tagName: 'ul', // 标签名
  props: {
    // 标签属性
    id: 'list',
  },
  children: [
    // 标签子节点
    {
      tagName: 'li',
      props: { class: 'item' },
      children: ['哈哈'],
    },
    {
      tagName: 'li',
      props: { class: 'item' },
      children: ['呵呵'],
    },
    {
      tagName: 'li',
      props: { class: 'item' },
      children: ['林三心哈哈哈哈哈'],
    },
  ],
};
```

这就是咱们平常说的新旧两个虚拟 DOM，这个时候的新虚拟 DOM 是数据的最新状态，那么我们直接拿新虚拟 DOM 去渲染成真实 DOM 的话，效率真的会比直接操作真实 DOM 高吗？那肯定是不会的，看下图：

![img]('/vue/0089a781a80244308472447b86cad21e_tplv-k3u1fbpfcp-watermark.awebp')

## 什么是 diff 算法

## diff 算法的原理

### Diff 同层对比

深度优先遍历算法，时间复杂度 O(n)

当数据改变时，会触发 setter，并且通过 Dep.notify 去通知所有订阅者 Watcher，订阅者们就会调用 patch 方法，给真实 DOM 打补丁，更新相应的视图

### patch

同级比较，判断是不是同一个节点，

- 不是同一个节点，没必要比对了，直接整个节点替换成新虚拟节点

- 是同一个节点：继续执行 patchVnode 方法进行深层比对

```js
function patch(oldVnode, newVnode) {
  // 比较是否为一个类型的节点
  if (sameVnode(oldVnode, newVnode)) {
    // 是：继续进行深层比较
    patchVnode(oldVnode, newVnode);
  } else {
    // 否
    const oldEl = oldVnode.el; // 旧虚拟节点的真实DOM节点
    const parentEle = api.parentNode(oldEl); // 获取父节点
    createEle(newVnode); // 创建新虚拟节点对应的真实DOM节点
    if (parentEle !== null) {
      api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl)); // 将新元素添加进父元素
      api.removeChild(parentEle, oldVnode.el); // 移除以前的旧元素节点
      // 设置null，释放内存
      oldVnode = null;
    }
  }

  return newVnode;
}
```

### isSameNode

是同一个节点，怎么判断是否是同一个节点

```js
function sameVnode(oldVnode, newVnode) {
  return (
    oldVnode.key === newVnode.key && // key值是否一样
    oldVnode.tagName === newVnode.tagName && // 标签名是否一样
    oldVnode.isComment === newVnode.isComment && // 是否都为注释节点
    isDef(oldVnode.data) === isDef(newVnode.data) && // 是否都定义了data
    sameInputType(oldVnode, newVnode) // 当标签为input时，type必须是否相同
  );
}
```

### patchVnode

是同一个节点的时候，进行深层遍历

- 找到对应的真实 DOM，称为 el
- 判断 newVnode 和 oldVnode 是否指向同一个对象，如果是，那么直接 return
- 如果他们都有文本节点并且不相等，那么将 el 的文本节点设置为 newVnode 的文本节点。
- 如果 oldVnode 有子节点而 newVnode 没有，则删除 el 的子节点
- 如果 oldVnode 没有子节点而 newVnode 有，则将 newVnode 的子节点真实化之后添加到 el
- 如果两者都有子节点，则执行 updateChildren 函数比较子节点，这一步很重要

```js
function patchVnode(oldVnode, newVnode) {
  const el = (newVnode.el = oldVnode.el); // 获取真实DOM对象
  // 获取新旧虚拟节点的子节点数组
  const oldCh = oldVnode.children,
    newCh = newVnode.children;
  // 如果新旧虚拟节点是同一个对象，则终止
  if (oldVnode === newVnode) return;
  // 如果新旧虚拟节点是文本节点，且文本不一样
  if (
    oldVnode.text !== null &&
    newVnode.text !== null &&
    oldVnode.text !== newVnode.text
  ) {
    // 则直接将真实DOM中文本更新为新虚拟节点的文本
    api.setTextContent(el, newVnode.text);
  } else {
    // 否则

    if (oldCh && newCh && oldCh !== newCh) {
      // 新旧虚拟节点都有子节点，且子节点不一样

      // 对比子节点，并更新
      updateChildren(el, oldCh, newCh);
    } else if (newCh) {
      // 新虚拟节点有子节点，旧虚拟节点没有

      // 创建新虚拟节点的子节点，并更新到真实DOM上去
      createEle(newVnode);
    } else if (oldCh) {
      // 旧虚拟节点有子节点，新虚拟节点没有

      //直接删除真实DOM里对应的子节点
      api.removeChild(el);
    }
  }
}
```

### updateChildren

这是 patchVnode 里最重要的一个方法，新旧虚拟节点的子节点对比，就是发生在 updateChildren 方法中.
是怎么样一个对比方法呢？就是首尾指针法，新的子节点集合和旧的子节点集合，各有首尾两个指针，举个例子：

```html
<ul>
  <li>a</li>
  <li>b</li>
  <li>c</li>
</ul>

修改数据后

<ul>
  <li>b</li>
  <li>c</li>
  <li>e</li>
  <li>a</li>
</ul>
```

然后会进行互相进行比较，总共有五种比较情况：

1、oldS 和 newS 使用 sameVnode 方法进行比较，sameVnode(oldS, newS)

2、oldS 和 newE 使用 sameVnode 方法进行比较，sameVnode(oldS, newE)

3、oldE 和 newS 使用 sameVnode 方法进行比较，sameVnode(oldE, newS)

4、oldE 和 newE 使用 sameVnode 方法进行比较，sameVnode(oldE, newE)

5、如果以上逻辑都匹配不到，再把所有旧子节点的  key  做一个映射到旧节点下标的  key -> index  表，然后用新  vnode  的  key  去找出在旧节点中可以复用的位置。

对比过程分析

- 第一步：

```js
(oldS = a), (oldE = c);
(newS = b), (newE = a);
```

比较结果：oldS 和 newE 相等，需要把节点 a 移动到 newE 所对应的位置，也就是末尾，同时 oldS++，newE--

- 第二步：

```js
(oldS = a), (oldE = c);
(newS = b), (newE = a);
```

比较结果：oldS 和 newS 相等，需要把节点 b 移动到 newS 所对应的位置，同时 oldS++,newS++

- 第三步：

```js
(oldS = c), (oldE = c);
(newS = c), (newE = e);
```

比较结果：oldS、oldE 和 newS 相等，需要把节点 c 移动到 newS 所对应的位置，同时 oldS++,newS++

- 第四步

oldS > oldE，则 oldCh 先遍历完成了，而 newCh 还没遍历完，说明 newCh 比 oldCh 多，所以需要将多出来的节点，插入到真实 DOM 上对应的位置上。

如果是 oldCh 比 newCh 多的话，那就是 newCh 先走完循环，然后 oldCh 会有多出的节点，结果会在真实 DOM 里进行删除这些旧节点。

updateChildren 核心源代码

```js
function updateChildren(parentElm, oldCh, newCh) {
  let oldStartIdx = 0,
    newStartIdx = 0;
  let oldEndIdx = oldCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newEndIdx = newCh.length - 1;
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];
  let oldKeyToIdx;
  let idxInOld;
  let elmToMove;
  let before;
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode == null) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      patchVnode(oldStartVnode, newEndVnode);
      api.insertBefore(
        parentElm,
        oldStartVnode.el,
        api.nextSibling(oldEndVnode.el)
      );
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      patchVnode(oldEndVnode, newStartVnode);
      api.insertBefore(parentElm, oldEndVnode.el, oldStartVnode.el);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      // 使用key时的比较
      if (oldKeyToIdx === undefined) {
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); // 有key生成index表
      }
      idxInOld = oldKeyToIdx[newStartVnode.key];
      if (!idxInOld) {
        api.insertBefore(
          parentElm,
          createEle(newStartVnode).el,
          oldStartVnode.el
        );
        newStartVnode = newCh[++newStartIdx];
      } else {
        elmToMove = oldCh[idxInOld];
        if (elmToMove.sel !== newStartVnode.sel) {
          api.insertBefore(
            parentElm,
            createEle(newStartVnode).el,
            oldStartVnode.el
          );
        } else {
          patchVnode(elmToMove, newStartVnode);
          oldCh[idxInOld] = null;
          api.insertBefore(parentElm, elmToMove.el, oldStartVnode.el);
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
  }
  if (oldStartIdx > oldEndIdx) {
    before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].el;
    addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx);
  } else if (newStartIdx > newEndIdx) {
    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
  }
}
```

[参考链接](https://juejin.cn/post/6994959998283907102#heading-1)
