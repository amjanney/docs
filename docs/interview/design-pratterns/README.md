## 一、理解工厂模式

工厂模式类似于现实生活中的工厂可以产生大量相似的商品，去做同样的事情，实现同样的效果;这时候需要使用工厂模式。

简单的工厂模式可以理解为解决多个相似的问题;这也是她的优点;比如如下代码：

```js
function CreatePerson(name, age, sex) {
  var obj = new Object();
  obj.name = name;
  obj.age = age;
  obj.sex = sex;
  obj.sayName = function() {
    return this.name;
  };
  return obj;
}
var p1 = new CreatePerson('longen', '28', '男');
var p2 = new CreatePerson('tugenhua', '27', '女');
console.log(p1.name); // longen
console.log(p1.age); // 28
console.log(p1.sex); // 男
console.log(p1.sayName()); // longen

console.log(p2.name); // tugenhua
console.log(p2.age); // 27
console.log(p2.sex); // 女
console.log(p2.sayName()); // tugenhua

// 返回都是object 无法识别对象的类型 不知道他们是哪个对象的实列
console.log(typeof p1); // object
console.log(typeof p2); // object
console.log(p1 instanceof Object); // true
```

## 二：理解单体模式

## 三：理解模块模式

## 四：理解代理模式

## 五：理解职责链模式

## 六：命令模式的理解

## 七：模板方法模式

## 八：理解 javascript 中的策略模式

## 九：Javascript 中理解发布--订阅模式

## 十：理解中介者模式
