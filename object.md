# object

## extractProperty

```js
extractProperty(obj, keyPath)
```

从obj提取一个属性组成新对象。keyPath是字符串或整数的数组。

```js
test('nested test', () => {
    let obj = { a: [1, 2] }
    let keyPath = ['a', 0]
    let y = extractProperty(obj, keyPath)
    expect(y).toEqual(1)
})
```

## intersectObject

```js
intersectObject(obj, keys)
```

用keys中指定的属性从obj中提取一个新对象。keys是字符串数组。

```js
test('pickObject test', () => {
    let obj = { a: 1, b: 2, c: 3, d: 4, e: 5 }
    let keys = ['a', 'd', 'e']
    let y = intersectObject(obj, keys)
    expect(y).toEqual({ a: 1, d: 4, e: 5 })
})
```



