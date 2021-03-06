# Deep

`Deep`是一个类，表示一个对象的嵌套属性列表。这个类是不可变的，所有改变都只会创建新实例。

## 实例成员

其成员包括：

```js
constructor(entries)
entries
get keys()
getValues()
toObject()
findIndex(searchKeyPath)
structuralEqual(keys)
structuralSubset(keys)
structuralSuperset(keys)
map()
filter()
forEach()
```

### constructor

```js
constructor(entries)
```

输入的entries是必须字段，在构造时就有了，必须按keypath排序。否则会得到不完整的结果。

例如数据模型data和它的词条数组分别为：

```js
        let data = {
            a: {
                a: 0,
                b: 1,
            },
            b: [2,3]
        }

        let entries = [
            [['a', 'a'], 0],
            [['a', 'b'], 1],
            [['b',0]   , 2],
            [['b',1]   , 3],
        ]
```

我们可以用词条数组生成`Deep`实例：

```js
test('constructor entries', () => {
    let entries = [
        [['a', 'a'], 0],
        [['a', 'b'], 1],
        [['b', 0], 2],
        [['b', 1], 3],
    ]
    let deep = new Deep(entries)
    expect(deep.entries).toEqual(entries)
})
```

### entries

词条实例字段只是构造函数中输入的entries。用法见`constructor`的代码。

### keys

表示数据模型的KeyPath数组，是一个缓存属性，多次调用只计算第一次。

```js
test('deep keys', () => {
    let entries = [
        [['a', 'a'], 0],
        [['a', 'b'], 1],
        [['b', 0], 2],
        [['b', 1], 3],
    ]
    let deep = new Deep(entries)
    let keys = [
        ['a', 'a'],
        ['a', 'b'],
        ['b', 0],
        ['b', 1],
    ]
    expect(deep.keys).toEqual(keys)
})
```

### getValues()

获取每个词条的值。返回数组。

```js
test('deep getValues', () => {
    let entries = [
        [['a', 'a'], 0],
        [['a', 'b'], 1],
        [['b', 0], 2],
        [['b', 1], 3],
    ]
    let deep = new Deep(entries)
    let values = [0, 1, 2, 3]
    expect(deep.getValues()).toEqual(values)
})
```

### toObject()

返回Deep所代表的数据模型。

```js
test('deep toObject', () => {
    let entries = [
        [['a', 'a'], 0],
        [['a', 'b'], 1],
        [['b', 0], 2],
        [['b', 1], 3],
    ]
    let deep = new Deep(entries)
    let data = {
        a: {
            a: 0,
            b: 1,
        },
        b: [2, 3]
    }
    let y = deep.toObject()
    expect(y).toEqual(data)
})
```

### findIndex()

```js
findIndex(searchKeyPath)
```

返回一个整数，根据给定的`searchKeyPath`查找路径所在的索引。

```js
test('deep findIndex', () => {
    let entries = [
        [['a', 'a'], 0],
        [['a', 'b'], 1],
        [['b', 0], 2],
        [['b', 1], 3],
    ]
    let deep = new Deep(entries)
    let keyPath = ['a', 'b']
    let y = deep.findIndex(keyPath)
    expect(y).toEqual(1)
})
```

### structuralEqual()

```js
structuralEqual(keys)
```

返回一个布尔值。判断`deep.keys`是否等于参数给定的`keys`

```js
test('structuralEqual', () => {
    let deep = new Deep([[['a'], 0], [['b'], 1], [['c', 0], 2], [['c', 1], 3], [['c', 2, 'e'], 4]])
    let keys = [
        ['a'],
        ['b'],
        ['c', 0],
        ['c', 1],
        ['c', 2, 'e'],
    ]
    let y = deep.structuralEqual(keys)
    expect(y).toEqual(true)
})
```

### structuralSubset(keys)

```js
structuralSubset(keys)
```

返回一个布尔值。判断`deep.keys`是否是参数给定的`keys`的子集。

```js
test('structuralSubset', () => {
    let deep = new Deep([
        [['a'], 0], [['c', 0], 2], [['c', 1], 3], [['c', 2, 'e'], 4]
        ])
    let keys = [
        ['a'],
        ['b'], //*
        ['c', 0],
        ['c', 1],
        ['c', 2, 'e'],
    ]
    let y = deep.structuralSubset(keys)
    expect(y).toEqual(true)
})
```

### structuralSuperset(keys)

```js
structuralSuperset(keys)
```

返回一个布尔值。判断`deep.keys`是否是参数给定的`keys`超集。

```js
test('structuralSuperset', () => {
    let deep = new Deep([
        [['a'], 0], [['b'], 1], [['c', 0], 2], [['c', 1], 3], [['c', 2, 'e'], 4]
        ])
    let keys = [
        ['a'],
        //['b'],
        ['c', 0],
        ['c', 1],
        ['c', 2, 'e'],
    ]
    let y = deep.structuralSuperset(keys)
    expect(y).toEqual(true)
})
```

## Deep工厂函数

下面是Deep工厂函数

### objectToDeep

```js
objectToDeep(obj, filter)
```

扁平化obj模型构造`Deep`对象。`filter(value,key,path)`是一个函数，判断obj嵌套属性节点是否为叶节点。叶节点将不再继续展开成员。

```js
test('test objectToDeep', () => {
    let observables = {
        a: new BehaviorSubject(0),
        c: [
            new BehaviorSubject(0),
            {
                e: new BehaviorSubject(0),
            },
        ],
    }
    let deep = objectToDeep(observables, (v, k, p) => v instanceof BehaviorSubject)

    let keys = [
        ['a'],
        ['c', 0],
        ['c', 1, 'e'],
    ]

    expect(deep.keys).toEqual(keys)

    let entries = keys.map(k => [k, extractProperty(observables, k)])
    expect(deep.entries).toEqual(entries)

})
```

`BehaviorSubject`是`rxjs`库的一个类。根据`filter`的指示，`objectToDeep`遇到这样类型的节点，不再继续分解对象。

### unionDeep

```js
unionDeep(deeps)
```

deeps是Deep数组，把deeps中的entries收集展开到一个新的entries中，并返回新Deep。注意各deeps中的路径最好不要重复。

```js
test('unionDeep test', () => {
    let deep1 = [
        [["a", "b"], 0],
        [["a", "c"], 1], //*
    ]

    let deep2 = [
        [["a", "c"], 'x'], //*
        [["a", "d"], 2],
        [["a", "e"], 3],
        [["f"], 4],
    ]

    //a,b中的键不能重复
    let y = unionDeep([deep1, deep2])
    let e = [
        [["a", "b"], 0],
        [["a", "c"], 1], //*
        [["a", "c"], 'x'], //*
        [["a", "d"], 2],
        [["a", "e"], 3],
        [["f"], 4],
    ]
    expect(y.entries).toEqual(e)
})
```

## 管道函数

### differenceDeep

```js
differenceDeep(keys)(deep)
```

返回一个新Deep实例，其词条既是输入deep的词条，且词条的键不能在keys中。

```js
import { differenceDeep } from './differenceDeep'
import { Deep } from './Deep'

test('differenceDeep test', () => {
    let dp = new Deep([
        [[0], 0], 
        [[1], 1]
        ])
    let keys = [[1], [2]]
    let y = dp |> differenceDeep(keys)
    expect(y.entries).toEqual([[[0], 0]])
})
```

### intersectDeep

```js
intersectDeep(keys)(deep)
```

返回一个新的Deep实例。其词条既是输入deep的词条，且词条的键亦在keys中。

```js
test('test intersectDeep', () => {
    let entries = [
        [[0, 0], 0], //*
        [[0, 1], 1], 
        [[1, 0], 2], 
        [[1, 1], 3], //*
        ]
    let deep = new Deep(entries)
    let keys = [
        [0, 0],
        [1, 1],
        ]
    let y = deep |> intersectDeep(keys)
    let e = [
        [[0, 0], 0], 
        [[1, 1], 3],
        ]
    expect(y.entries).toEqual(e)
})
```



### freshValueDeep

```js
freshValueDeep(obj)(deep)
```

用obj中对应路径的属性值更换deep实例中的值，返回新Deep。

```js
test('freshValueDeep', () => {
    let entries = [
        [['a'], 0], 
        [['b'], 1], 
        [['c', 0], 2], [['c', 1], 3], [['c', 2, 'e'], 4]]

    let deep = new Deep(entries)
    let obj = {
        a: 5,
        b: 6,
        c: [
            7,
            8,
            {
                e: 9,
            },
        ],
    }

    let y = deep |> freshValueDeep(obj)
    let e = [[['a'], 5], [['b'], 6], [['c', 0], 7], [['c', 1], 8], [['c', 2, 'e'], 9]]

    expect(y.entries).toEqual(e)
})
```

### replaceValueDeep

```js
replaceValueDeep(values)(deep)
```

用数组values中对应索引元素更换deep实例中的值，返回新Deep。

```js
test('replaceValueDeep', () => {
    let entries = [
        [['a'], 0], 
        [['b'], 1], 
        [['c', 0], 2], [['c', 1], 3], [['c', 2, 'e'], 4]]

    let deep = new Deep(entries)

    let values = [5,6,7,8,9]

    let y = deep |> replaceValueDeep(values)
    let e = [
        [['a'], 5], 
        [['b'], 6], 
        [['c', 0], 7], [['c', 1], 8], [['c', 2, 'e'], 9]]

    expect(y.entries).toEqual(e)
})
```

### zipValueDeep

```js
zipValueDeep(values)(deep)
```

用数组values中对应索引元素，和deep实例中的值，组合成对，构成新的值，返回新Deep。

```js
test('zipValueDeep', () => {
    let entries = [
        [['a'], 0], 
        [['b'], 1], 
        [['c', 0], 2], 
        [['c', 1], 3], 
        [['c', 2, 'e'], 4]]
    let deep = new Deep(entries)
    let values = [5, 6, 7, 8, 9]
    let y = deep |> zipValueDeep(values)
    let e = [
        [['a'], [0, 5]], 
        [['b'], [1, 6]], 
        [['c', 0], [2, 7]], 
        [['c', 1], [3, 8]], 
        [['c', 2, 'e'], [4, 9]]]
    expect(y.entries).toEqual(e)
})
```

## 参考

`structural-comparison`开源于GitHub，见xp44mm/structural-comparison仓库。位于其中的docs文件夹下有各函数用法的详细解释。

`deep-rxjs`进一步应用`Deep`，开源于GitHub，见xp44mm/deep-rxjs仓库。
