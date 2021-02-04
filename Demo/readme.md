### 20210204
1. render()方法的渲染时机:
+ 组件初始化时
+ state或props值发生变化时
+ 组件内调用forceUpdate()方法
2. 若class中只包含render()方法, 则将该类转化为方法更为合适, 如:
```
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button >
  );
}
```
3. 子组件通过props值从父组件中获取数据
4. setState()方法中对属性值的操作是异步执行(批量执行),但可以利用第二参数添加回调函数起到同步作用, 如:
```
this.setState(
    {
        squares: squares,
        step: this.state.step + 1
    }, () => this.setBoards(i, type)
);
```
5. let、const、var区别
+ var: 作用于当前作用域, 且有默认值undefined
+ let: 作用于当前块级作用域, 无法重复声明
+ const: 作用于当前块级作用域, 无法重复声明且是常量, 当声明的是基础类型（String,Number,boolean,null,undefined）时,该变量无法改变，且声明时必须初始化，否则会报错。但是声明引用类型时，则只有指向的地址无法改变，该变量可以改变
6. 井字棋完成的功能如下:
+ 交替下棋
+ 判断胜负及提前预判平局
+ 若棋局结束则重置棋局