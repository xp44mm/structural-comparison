# Array

## arrayInsert

```js
import { arrayInsert } from 'structural-comparison'
arrayInsert(array, item, index = array.length)
```
向数组插入元素，返回空。

```js
test('arrayInsert test', () => {
    let array = [0, 1, 2, 3]
    arrayInsert(array, '1', 1)

    expect(array).toEqual([0, '1', 1, 2, 3])
    expect(array.length).toEqual(5)
})

```

## arrayRemove

```js
import { arrayRemove } from 'structural-comparison'
arrayRemove(array, index = array.length - 1)
```

移除索引位置的元素。

```js
test('arrayRemove test', () => {
    let array = [0, 1, 2, 3]
    arrayRemove(array, 1)
    expect(array.length).toEqual(3)
    expect(array).toEqual([0, 2, 3])

})
```

## differenceArray

```js
differenceArray(set1, set2, compare = defaultCompare)
```

集合之差，返回一个数组，其中元素在set1中，不在set2中。set1,set2元素必须升序排列，且不重复。

compare用于比较set1,set2中的元素。

```js
test('differenceArray test', () => {
    let set1 = ['A', 'B', 'C']
    let set2 = ['C', 'D', 'E']

    const diff = differenceArray(set1,set2) // a - b
    expect(diff).toEqual(['A', 'B'])
})
```

## distinctArray

数组去重，并保持元素的相对顺序。

```js
distinctArray(array, equals = (a, b) => a === b)
```

返回一个全新数组。

```js
test('distinctArray', () => {
    let x = ['B', 'C', 'B', 'A']
    let y = distinctArray(x)
    let e = ['B', 'C', 'A']
    expect(y).toEqual(e)
})
```

## findIndexFromSet

同`Array.findIndex`，返回元素在集合中的索引位置。

```js
findIndexFromSet(set, e, compare = defaultCompare)
```

set的元素必须升序排列，且不重复。

```js
test('find index', () => {
    let st = ['A', 'B', 'C'].sort()
    expect(findIndexFromSet(st, 'B')).toEqual(1)
    expect(findIndexFromSet(st, 'D')).toEqual(-1)
})
```

## groupArrayBy

```js
groupArrayBy(array, getKey, compareKey = defaultCompare)
```

`getKey`是一个函数，接受数组中的元素，返回这个元素的主键。

`compareKey`是一个函数，比较两个键的大小，相等为0，后大为-1，前大为1。

```js
test('group array by', function() {
    const students = [
        { name: 'Abby', score: 84 },
        { name: 'Brad', score: 73 },
        { name: 'Chris', score: 89 },
        { name: 'Eddy', score: 58 },
        { name: 'Gillian', score: 91 },
    ]
    let getKey = student => (student.score > 80 ? '录取' : '淘汰')
    const x = groupArrayBy(students, getKey)

    ///返回保留输入顺序。
    let y = [
        [
            '录取',
            [
                { name: 'Abby', score: 84 },
                { name: 'Chris', score: 89 },
                { name: 'Gillian', score: 91 },
            ],
        ],
        [
            '淘汰',
            [
                { name: 'Brad', score: 73 },
                { name: 'Eddy', score: 58 },
            ],
        ],
    ]
    expect(x).toEqual(y)
})
```

## intersectArray

```js
intersectArray(set1, set2, compare = defaultCompare)
```

两个集合的交集。set1,set2是两个集合。compare是元素的比较函数。返回新数组。

```js
test('intersectArray test', () => {
    let a = [1, 2]
    let b = [1, 3]
    let c = [1, 2, 3]

    expect(intersectArray(a, b)).toEqual([1])
    expect(intersectArray(a, c)).toEqual(a)
    expect(intersectArray(b, c)).toEqual(b)
})

```

## isEqualset

```js
isEqualset(set1, set2, compare = defaultCompare)
```

两个集合是否相等。set1,set2是两个集合。compare是元素的比较函数。

```js
test('isEqualset test', () => {
    let a = [1, 2]
    let b = [1, 3]
    let c = [1, 2, 3]

    expect(isEqualset(a, [...a])).toEqual(true)
    expect(isEqualset(a, b)).toEqual(false)
    expect(isEqualset(a, c)).toEqual(false)
    expect(isEqualset(b, c)).toEqual(false)
})
```

## isSubset

```js
isSubset(set1, set2, compare = defaultCompare)
```

判断set1是否是set2的子集。set1,set2是两个集合。compare是元素的比较函数。

```js
test('isSubset test', () => {
    let a = [1, 2]
    let b = [1, 3]
    let c = [1, 2, 3]

    expect(isSubset(a, [...a])).toEqual(true)
    expect(isSubset(a, b)).toEqual(false)
    expect(isSubset(a, c)).toEqual(true)
})
```

## isSuperset

```js
isSuperset(a, b, compare = defaultCompare)
```

判断set1是否是set2的超集。set1,set2是两个集合。compare是元素的比较函数。

```js
test('isSuperset test', () => {
    let a = [1, 2]
    let b = [1, 3]
    let c = [1, 2, 3]

    expect(isSuperset(a, [...a])).toEqual(true)
    expect(isSuperset(a, b)).toEqual(false)
    expect(isSuperset(c, a)).toEqual(true)
})
```

## rangeArray

```js
rangeArray(length)
```

创建自然数序列的数组。

```js
test('rangeArray', () => {
    let y = rangeArray(3)
    expect(y).toEqual([0,1,2])
})
```

## sortedArrayToSet

```js
sortedArrayToSet(sortedArray, compare = defaultCompare)
```

升序排列的数组去重，即转变成集合。`compare`是元素的比较函数。

```js
test('sortedArrayToSet', () => {
    let sortedArray = ['A', 'B', 'B', 'C']
    let y = sortedArrayToSet(sortedArray)
    expect(y).toEqual(['A', 'B', 'C'])
})
```

## unionArray

```js
unionArray(set1, set2, compare = defaultCompare)
```

两个集合的并集，返回一个数组。set1,set2元素必须升序排列，且不重复。

compare是元素的比较函数。

```js
test('unions two sets', () => {
    const set1 = ['a', 'b', 'c']
    const set2 = ['b', 'd', 'wow']
    const set3 = unionArray(set1, set2)
    expect(set3).toEqual(['a', 'b', 'c', 'd', 'wow'])
})
```

## zipArray

```js
zipArray(a, b)
```

两个数组，对应索引位置的元素组成一个元组。

```js
test('eq test', () => {
    let a = [1, 2, 3]
    let b = ['a', 'b', 'c']
    let e = [[1, 'a'], [2, 'b'], [3, 'c']]
    expect(zipArray(a, b)).toEqual(e)
})
```



