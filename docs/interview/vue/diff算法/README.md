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

### Diff 对比流程

### patch 方法

### sameVnode 方法

### patchVnode 方法

### updateChildren 方法

## 用 index 做 key
