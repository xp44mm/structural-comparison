# comparison

## defaultCompare

```js
defaultCompare(a, b)
```

默认比较函数。

## compareKey

```js
compareKey(a, b)
```

键比较函数。键是指正常整数，或字符串。整数小于字符串。

```js
test('number string compare', () => {
    expect(compareKey(1, 'x')).toEqual(-1)
    expect(compareKey('x', 1)).toEqual(1)
})
```

## compareKeyPath

```js
compareKeyPath(a, b)
```

比较函数，用于比较键路径，键路径是字符串或整数组成的数组。

```js
test('example compare', () => {
    expect(compareKeyPath(['key', 0], ['key', 1])).toEqual(-1)
})
```

