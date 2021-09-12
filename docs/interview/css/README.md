## 盒模型

- 标准盒子模型：一个块的总宽度= width + margin(左右) + padding(左右) + border(左右)
- IE 盒子模型（怪异盒模型）： 一个块的总宽度= width + margin(左右)（即 width 已经包含了 padding 和 border 值）
- box-sizing：border-box 告诉浏览器：你想要设置的边框和内边距的值是包含在 width 内的

## BFC(块级格式化上下文)

块级格式化上下文，是一个独立的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。

- 触发条件:
  - 根元素
  - position: absolute/fixed
  - display: inline-block / table
  - float 元素
  - ovevflow !== visible
- 规则:
  - 属于同一个 BFC 的两个相邻 Box 垂直排列
  - 属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠
  - BFC 中子元素的 margin box 的左边， 与包含块 (BFC) border box 的左边相接触 (子元素 absolute 除外)
  - BFC 的区域不会与 float 的元素区域重叠
  - 计算 BFC 的高度时，浮动子元素也参与计算
  - 文字层不会被浮动层覆盖，环绕于周围
- 应用
  - 阻止 margin 重叠
  - 可以包含浮动元素 —— 清除内部浮动(清除浮动的原理是两个 div 都位于同一个 BFC 区域之中)
  - 自适应两栏布局
  - 可以阻止元素被浮动元素覆盖

## 清除浮动

- 浮动的缺陷：影响它的兄弟元素的位置和父元素产生高度塌陷
- 清除浮动的常见方法
  - clear: both；clear 会为元素添加足够的空白空间，使到该元素的位置会放置在它前一个浮动元素之下，这跟增加元素外边距使到元素占据满行而强制换行的效果是一样的，但是，clear 只是清除了对兄弟元素的影响，并没有解决父元素高度塌陷的问题，我们需要更高级的清除浮动——闭合浮动
  - 闭合浮动法：
    - 空 div 方法：在浮动元素的后面加一个空的 div
    - overflow 方法：在浮动元素的父元素上设置了 overflow 的值为 hidden 或 auto ，可以闭合浮动。另外在 IE6 中还需要触发 hasLayout ，例如为父元素设置容器宽高或设置 zoom：1
    - 使用 :after 伪元素的方法：

```html
<style>
  .clearfix {
    /* 触发 hasLayout */
    zoom: 1;
  }
  .clearfix:after {
    content: '';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
</style>
<div class="box clearfix">
  <div class="main left">我设置了左浮动float: left</div>
  <div class="aside left">我是页脚，但是我也设置了左浮动。</div>
</div>
```

## 剧中布局

- 水平居中

```css
行内元素: text-align: center

块级元素: margin: 0 auto

absolute + transform

flex + justify-content: center
```

- 垂直居中

```css
line-height: height
absolute + transform
flex + align-items: center
table
```

- 水平垂直居中

```css
absolute + transform
flex + justify-content + align-items
```

解决方案：

- flex 布局实现 （元素已知宽度）
- position （元素已知宽度）
- position transform （元素未知宽度）
- position（元素已知宽度）（left，right，top，bottom 为 0，maigin：auto ）

## 定位

position 属性的五个值：static、relative、fixed、absolute、sticky

- static 定位

  - HTML 元素的默认值，即没有定位，遵循正常的文档流对象。
  - 静态定位的元素不会受到 top, bottom, left, right 影响。

- fixed 定位

  - 元素的位置相对于浏览器窗口是固定位置；
  - 即使窗口是滚动的它也不会移动；

  - Fixed 定位使元素的位置与文档流无关，因此不占据空间；
  - Fixed 定位的元素和其他元素重叠。

- relative 定位

  - 相对定位元素的定位是相对其正常位置。
  - 移动相对定位元素，但它原本所占的空间不会改变。

  - 相对定位元素经常被用来作为绝对定位元素的容器块。

- absolute 定位

  - 绝对定位的元素的位置相对于 static 定位以外的第一个父元素进行定位；
  - absolute 定位使元素的位置与文档流无关，因此不占据空间。
  - absolute 定位的元素和其他元素重叠。

- sticky 定位

  - sticky 英文字面意思是粘，粘贴，所以可以把它称之为粘性定位
  - position: sticky; 基于用户的滚动位置来定位

  - 粘性定位的元素是依赖于用户的滚动，在 position:relative 与 position:fixed 定位之间切换。
  - 而当页面滚动超出目标区域时，它的行为就像 position:relative; 它的表现就像 position:fixed;，它会固定在目标位置。

  - Internet Explorer, Edge 15 及更早 IE 版本不支持 sticky 定位。 Safari 需要使用 -webkit- prefix

## flex

**容器的属性：**

- flex-direction 属性决定主轴的方向（即项目的排列方向）。
- flex-wrap 默认情况下，项目都排在一条线（又称"轴线"）上。`flex-wrap`属性定义，如果一条轴线排不下，如何换行

- flex-flow 属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`。
- justify-content 属性定义了项目在主轴上的对齐方式。

- align-items 属性定义项目在交叉轴上如何对齐
- align-content 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用

**项目的属性：**

- `order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0。
- `flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。

- `flex-shrink`属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。
- `flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

- `flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。
- `align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

## CSS 性能优化

```txt
1. 合并css文件，如果页面加载10个css文件,每个文件1k，那么也要比只加载一个100k的css文件慢。
2. 减少css嵌套，最好不要嵌套三层以上。
3. 不要在ID选择器前面进行嵌套，ID本来就是唯一的而且权限值大，嵌套完全是浪费性能。
4. 建立公共样式类，把相同样式提取出来作为公共类使用。
5. 减少通配符*或者类似[hidden="true"]这类选择器的使用，挨个查找所有...这性能能好吗？
6. 巧妙运用css的继承机制，如果父节点定义了，子节点就无需定义。
7. 拆分出公共css文件，对于比较大的项目可以将大部分页面的公共结构样式提取出来放到单独css文件里，这样一次下载 后就放到缓存里，当然这种做法会增加请求，具体做法应以实际情况而定。
8. 不用css表达式，表达式只是让你的代码显得更加酷炫，但是对性能的浪费可能是超乎你想象的。
9. 少用css rest，可能会觉得重置样式是规范，但是其实其中有很多操作是不必要不友好的，有需求有兴趣，可以选择normolize.css。
10. cssSprite，合成所有icon图片，用宽高加上background-position的背景图方式显现icon图，这样很实用，减少了http请求。
11. 善后工作，css压缩(在线压缩工具 YUI Compressor)
12. GZIP压缩，是一种流行的文件压缩算法。
```

发生 reflow 的情况

```txt
1. 改变窗口的大小
 2. 改变文字的大小
 3. 添加 删除样式表
 4. 内容的改变 输入框输入内容也会
 5. 伪类的激活
 6. 操作class属性
 7. 脚本操作dom js改变css类
 8. 计算offsetWidth和offsetHeight
 9. 设置style属性
 10.改变元素的内外边
```

常见的重排元素

```txt
 1. 大小有关的 width,height,padding,margin,border-width,border,min-height
 2. 布局有关的 display,top,position,float,left,right,bottom
 3. 字体有关的 font-size,text-align,font-weight,font-family,line-height,white-space,vertical-align
 4. 隐藏有关的 overflow,overflow-x,overflow-y

```

减少 reflow 对性能的影响的建议

```txt
 1. 不要一条条的修改dom的样式，预先定义好class，然后修改dom的classname
 2. 不要修改影响范围较大的dom
 3. 为动画元素使用绝对定位
 4. 不要table布局，因为一个很小的改动会造成整个table重新布局
 5. 避免设置大量的style属性，通过设置style属性改变节点样式的话，每一次设置都会触发一次reflow，所以最好使用class属性
 6. 如果css里面有计算表达式，每次都会重新计算一遍，触发一次reflow
```

css 的规范

```txt
/* 块即是通常所说的 Web 应用开发中的组件或模块。每个块在逻辑上和功能上都是相互独立的。 */
.block { }
/* 元素是块中的组成部分。元素不能离开块来使用。BEM 不推荐在元素中嵌套其他元素。 */
.block__element { }
/* 修饰符用来定义块或元素的外观和行为。同样的块在应用不同的修饰符之后，会有不同的外观 */
.block--modifier { }
```

## 左右布局

### float

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* 第一种：float */
      .wrapper {
        border: 1px solid #000;
      }
      .left {
        width: 200px;
        float: left;
        height: 400px;
        background-color: red;
      }
      .right {
        height: 400px;
        background-color: green;
        margin-left: 200px;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="left">left</div>
      <div class="right">right</div>
    </div>
  </body>
</html>
```

### 定位

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .wrapper {
        border: 1px solid #000;
        position: relative;
      }
      .left {
        width: 200px;
        height: 400px;
        position: absolute;
        background-color: red;
      }
      .right {
        height: 400px;
        background-color: green;
        margin-left: 200px;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="left">left</div>
      <div class="right">right</div>
    </div>
  </body>
</html>
```

### float 和 overflow

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .wrapper {
        border: 1px solid #000;
      }
      .left {
        width: 200px;
        height: 400px;
        float: left;
        background-color: red;
      }
      .right {
        height: 400px;
        background-color: green;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="left">left</div>
      <div class="right">right</div>
    </div>
  </body>
</html>
```

### flex

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .wrapper {
        border: 1px solid #000;
        display: flex;
      }
      .left {
        width: 200px;
        height: 400px;
        background-color: red;
      }
      .right {
        height: 400px;
        background-color: green;
        flex: 1;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="left">left</div>
      <div class="right">right</div>
    </div>
  </body>
</html>
```
