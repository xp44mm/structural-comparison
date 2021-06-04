# comparison

首先我们要知道的是比较函数的概念。比较函数典型可用在`Array.prototype.sort()`中，可以查阅MDN此文档。这里重复一下伪代码。

the compare function has the following form:

```js
function compare(a, b) {
  if (a is less than b by some ordering criterion) {
    return -1;
  }
  if (a is greater than b by the ordering criterion) {
    return 1;
  }
  // a must be equal to b
  return 0;
}
```

这是常用的比较函数。

## defaultCompare

```js
defaultCompare(a, b)
```

javascript默认的比较函数。a,b是任意类型。

## compareKey

键比较函数。键是指对象的属性名，可能是字符串，或者是整数，不包括`Symbol`。语法

```js
compareKey(a, b)
```

示例

```js
test('number string compare', () => {
    expect(compareKey(1, 'x')).toEqual(-1)
    expect(compareKey('x', 1)).toEqual(1)
})
```

## compareKeyPath

比较键路径。键路径是展开对象属性的索引，是键数组，如上所述，键是整数或字符串。

```js
compareKeyPath(a, b)
```

示例：

```js
test('example compare', () => {
    expect(compareKeyPath(['key', 0], ['key', 1])).toEqual(-1)
})
```

