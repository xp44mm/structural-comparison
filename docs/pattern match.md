# JavaScript中的模式匹配

模式是用于转换输入数据的规则。 以将数据与一个或多个逻辑结构进行比较，将数据分解为各个构成部分，或以各种方式从数据中提取信息。

## 安装

JavaScript已经实现模式匹配解构功能，没有实现模式匹配过滤功能。用模式来控制程序流，可以编写更加声明性，更加模块化的代码，请安装`structural-comparison`以支持此功能。

```bash
npm i structural-comparison
```

用法：

```typescript
import { match } from 'structural-comparison'

match: (pattern:string) -> (input:any) -> boolean
```

`match`是一个柯里函数，模式参数是一个字符串，输入参数可以是任何值，当匹配成功返回真，否则返回假。

## 示例

模式匹配分为字面量模式，类型测试模式，标识符模式，数组模式，对象模式，OR模式，以及它们的组合嵌套模式。

### 字面量模式

测试原子值。模式是基元值字面量，支持JSON中的所有字面量。包括`null`，布尔值，数字值，字符串值。字符串是JSON的双引号格式。不支持`undefined`，`NaN`，`Infinity`等非JSON值。

```js
test("value NULL", () => {
    let y = match('null')
    expect(y(null)).toEqual(true)
    expect(y(3)).toEqual(false)
})
```

这里`y`函数等价于：

```js
let y = input => input === null
```

输入对象相等（`===`）于模式。

其他字面量模式的示例：

```js
test("value boolean", () => {
    let y = match('false')
    let v = y(false)
    let w = y(3)
    expect(v).toEqual(true)
    expect(w).toEqual(false)
})

test("value number", () => {
    let y = match('123')
    let v = y(123)
    let w = y(3)
    expect(v).toEqual(true)
    expect(w).toEqual(false)
})

test("value quote", () => {
    let y = match('""')
    let v = y('')
    let w = y(3)
    expect(v).toEqual(true)
    expect(w).toEqual(false)
})
```

### 类型模式

测试数据的数据类型。模式是数据类型的名称，不带双引号。包括`boolean`,`string`,`number`,`function`。

```js
test("value TYPE", () => {
    let y = match('number')
    let v = y(5)
    let w = y(true)
    expect(v).toEqual(true)
    expect(w).toEqual(false)
})
```

这里`y`函数等价于：

```js
let y = input => typeof input === 'number'
```

输入对象`typeof`值等于模式中的数据类型名称。

### 标识符模式

是一个合法的JavaScript标识符，除了标识符不包括`$`字符，但是不能是类型名称。模式中的标识符和类型名都是区分大小写的，这和JavaScript语法一致。标识符模式始终成功匹配任何一个值。

```js
test("value ID", () => {
    let y = match('x')
    let v = y(5)
    let w = y({})
    expect(v).toEqual(true)
    expect(w).toEqual(true)
})
```

通配模式虽然是标识符，但实际上，是一个弃元（discard），弃元表示一个我们完全用不上的数值。仅用于占位。相同的名称不会引起名称冲突。

### 数组模式

匹配一个数组。数组匹配根据数组元素长度分为长度严格匹配，和最短长度匹配。严格匹配示例：

```js
test("value array", () => {
    let y = match('[]')
    let v = y([])
    let w = y({})
    expect(v).toEqual(true)
    expect(w).toEqual(false)
})

test("array elements", () => {
    let input = '[1]'
    let y = match(input)
    let v = y([1])
    let w = y([{ x: 0 }])
    expect(v).toEqual(true)
    expect(w).toEqual(false)
})

test("elements elements value", () => {
    let input = '[1, 2]'
    let y = match(input)
    let v = y([1, 2])
    let w = y([null, 1])
    expect(v).toEqual(true)
    expect(w).toEqual(false)
})
```

如果有省略号表示可以匹配任何更多的数组元素。最短长度匹配：

```js
test("array ELLIPSIS", () => {
    let input = '[...]'
    let y = match(input)
    let v = y([1])
    let w = y({})
    expect(v).toEqual(true)
    expect(w).toEqual(false)
})
test("array elements ELLIPSIS", () => {
    let input = '[null, ...]'
    let y = match(input)
    let v = y([null])
    let w = y([null, 0])
    let p = y([0])

    expect(v).toEqual(true)
    expect(w).toEqual(true)
    expect(p).toEqual(false)
})
test("array ELLIPSIS elements", () => {
    let input = '[ ..., null]'
    let y = match(input)
    let v = y([null])
    let w = y([0, null])
    let p = y([null, 0])

    expect(v).toEqual(true)
    expect(w).toEqual(true)
    expect(p).toEqual(false)
})

test("array elements ELLIPSIS elements", () => {
    let y = match('[1,2,...,4,5]')
    let v = y([1,2,3,4,5])
    let w = y([1,2,3])
    expect(v).toEqual(true)
    expect(w).toEqual(false)
})
```

数组语法不支持洞（连续逗号），不支持尾逗号。不支持迭代器。

数组模式大致编译成如下：

```js
let y = input => Array.isArray(input) && every elements matched
```

### 对象模式

匹配一个对象。如果有省略号表示对象可以有任何更多的属性。只检测自有属性，忽略原型中的属性。对象语法支持特殊标识属性，快捷属性，属性不支持尾逗号。

```js
test("value object", () => {
    let input = '{}'
    let y = match(input)
    let v = y({})
    let w = y({ x: 0 })
    
    expect(v).toEqual(true)
    expect(w).toEqual(false)
})

test("object ELLIPSIS", () => {
    let input = '{...}'
    let y = match(input)
    let v = y({})
    let w = y({ x: 0 })
    let p = y([])

    expect(v).toEqual(true)
    expect(w).toEqual(true)
    expect(p).toEqual(false)

})

test("object properties", () => {
    let input = '{x}'
    let y = match(input)
    let v = y({ x: 0 })
    let w = y([null, 1])
    
    expect(v).toEqual(true)
    expect(w).toEqual(false)
})

test("object properties ELLIPSIS", () => {
    let input = '{x,...}'
    let y = match(input)
    let v = y({ x: 0, y: 1 })
    let w = y({})
    
    expect(v).toEqual(true)
    expect(w).toEqual(false)
})
test("properties properties prop", () => {
    let input = '{x,y}'
    let y = match(input)
    let v = y({ x: 0, y: 1 })
    let w = y({})
    
    expect(v).toEqual(true)
    expect(w).toEqual(false)
})

test("prop key value", () => {
    let input = '{x:null}'
    let y = match(input)
    let v = y({ x: null })
    let w = y([null, 1])
    
    expect(v).toEqual(true)
    expect(w).toEqual(false)

})

test("key QUOTE", () => {
    let input = '{"1":null}'
    let y = match(input)
    let v = y({ '1': null })
    let w = y([null, 1])
    
    expect(v).toEqual(true)
    expect(w).toEqual(false)
})
```

对象模式编译成：

```js
let y = obj => typeof obj === 'object' && obj && !Array.isArray(obj) && every props matched
```



### OR模式

或模式，用一个竖杠符号连接两个模式，两个模式中任何一个模式成功即整体匹配成功。

```js
test("OR", () => {
    let y = match('string|{...}')
    let a = y('')
    let b = y({})
    let c = y([])
    let d = y(x => x)
    expect(a).toEqual(true)
    expect(b).toEqual(true)
    expect(c).toEqual(false)
    expect(d).toEqual(false)
})
```

OR模式编译成：

```js
let y = obj => pat1 matched || pat2 matched
```

嵌套模式。匹配任意深度数据结构。

### memoize解析的结果

上面的代码示例都用`match(pattern)`来缓存，但是实际上，我们常用`if else`条件选择语句来和模式匹配连用。

```js
    let y = x => {
        if (match('[...]')(x)) console.log('[]')
        else if (match('{...}')(x)) console.log('{}')
        else if (match('string')(x)) console.log('string')
    }
    y([1]) // print []
```

这个是没有缓存的程序，每次调用y函数都会重新解析模式，对性能造成负面冲击。所以，我们需要缓存。

```js
    let arr = match('[...]')
    let obj = match('{...}')
    let str = match('string')
    let y = x => {
        if (arr(x)) console.log('[]')
        else if (obj(x)) console.log('{}')
        else if (str(x)) console.log('string')
    }
    y([1]) // print []
```

上面程序成功解决了性能问题，避免重复解析，但是引入中间变量导致代码复杂难懂。我们使用另一种解决方案。

```js
import { match, cond } from 'structural-comparison'

let y = cond([
        [match('[...]'), x => { console.log('[]') }],
        [match('{...}'), x => { console.log('{}') }],
        [match('string'), x => { console.log('string') }],
        x => {
            console.log('no matched!')
        }
    ])

    y([1]) // print []
    y({})  // print {}
    y(1)   // print no matched!
```

`cond`函数是一个返回函数的组合子，用来模拟`if else`语句。它接受一个数组，数组的每个元素代表条件语句的一个分支。分支分为两种形式，第一种是断言函数，和行为函数组成的数组，当断言为真时，执行并返回行为，断言为假时跳过行为函数，执行下一分支。第二种是一个函数，当函数为真时，返回函数的返回值，当函数为假时，丢弃函数返回值，执行下一分支。`cond`函数依次执行每个分支，返回第一个为真的分支结果为整体的结果。忽略其后所有分支。
