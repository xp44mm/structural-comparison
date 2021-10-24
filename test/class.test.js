class Bork {
    // 属性初始化器语法
    instanceProperty = "bork";
    boundFunction = () => {
        return this.instanceProperty;
    };

    // 静态类属性
    static staticProperty = "babelIsCool";
    static staticFunction = function () {
        return Bork.staticProperty;
    };
}

test("", () => {
    let myBork = new Bork();

    // 属性初始化器设定的值不在原型上
    console.log(myBork.__proto__.boundFunction); // > undefined

    expect(myBork.hasOwnProperty('boundFunction')).toBe(true)

    // 绑定函数绑定到类实例上
    console.log(myBork.boundFunction.call(undefined)); // > "bork"

    // 类上包含静态函数
    console.log(Bork.staticFunction()); // > "babelIsCool"
})
