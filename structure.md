# structure

## flat

```js
flat(data, filter = () => false)
```

将data展开成扁平的entry数组。第二个参数`filter(value, key, keyPath)`是一个过滤函数，它根据属性值，属性名称，以及路径确定节点是否是叶结点。keyPath不包括本属性的key。

```js
test('array as leaf', function () {
    let data = {
        a: {
            a: 0,
            b: 1,
        },
        b: [0, 1, 2]
    }

    let y = flat(data, (v, k, path) => Array.isArray(v))

    let e = [
        [['a', 'a'], 0],
        [['a', 'b'], 1],
        [['b'], [0, 1, 2]],
    ]

    expect(y).toEqual(e)
})
```

## erectObject

```js
erectObject(entries)
```

根据词条数组建立新对象。词条数组可以任意顺序。

```js
test('erectObject test', () => {
    let entries = [
        [['c', 1], 3],
        [['a'], 0],
        [['b', 'a'], 1],
        [['c', 0], 2],
    ]
    let y = erectObject(entries)
    let e = {
        a: 0,
        b: { a: 1 },
        c: [2, 3]
    }
    expect(y).toEqual(e)
})
```

输入的词条可以不排序，本例的这个词条用到`tojs`中将会使c丢失成员。

## tojs

```js
tojs(flatEntries)
```

根据词条数组建立新对象。词条数组必须顺序。

```js
    test('tojs test', () => {
        let entries = [
            [['a'], 0],
            [['b', 'a'], 1],
            [['c', 0], 2],
            [['c', 1], 3],
        ]
        let y = tojs(entries)
        let e = {
            a: 0,
            b: { a: 1 },
            c: [2, 3]
        }
        expect(y).toEqual(e)
    })
```

