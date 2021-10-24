# structural-comparison

`structural-comparison`是一个函数库。包括函数式编程的常用函数。开源于GitHub，见xp44mm/structural-comparison仓库。

## 安装

```bash
npm i structural-comparison
```

下面是库中的一些函数总结。开源仓库的docs文件夹下有各函数用法的详细解释。

## JavaScript Allongé

本节的函数是从著名图书JavaScript Allongé (Reg “Raganwald” Braithwaite) 中提取的用于函数式编程的函数。

```js
export { callFirst, callLast, callLeft, callRight } from './call'
export { compose } from './compose'
export { Dictionary } from './Dictionary'
export { flip } from './flip'
export { getAllConstructorNames } from './getAllConstructorNames'
export { getWith } from './getWith'
export { instanceEval } from './instanceEval'
export { invoke } from './invoke'
export { isClass } from './isClass'
export { IterableDictionary } from './IterableDictionary'
export { leftGather, leftVariadic } from './leftVariadic'
export { longtailed } from './longtailed.js'
export { mapWith } from './mapWith'
export { maybe } from './maybe.js'
export { memoized } from './memoized.js'
export { mockingbird } from './mockingbird.js'
export { once } from './once.js'
export { original } from './original'
export { pipeline } from './pipeline.js'
export { pluckWith } from './pluckWith'
export { send } from './send'
export { tap } from './tap.js'
export { thunk } from './thunk'
export { trampoline } from './trampoline'
export { unary } from './unary.js'
export { why } from './why.js'
export { widowbird } from './widowbird.js'
export { wrapWith } from './wrapWith.js'
export { Y } from './Y.js'
export { Ymem } from './Ymem.js'
```

## 实用Array函数

```js
export { advance } from './advance'
export { arrayInsert } from './arrayInsert'
export { arrayRemove } from './arrayRemove'
export { distinctArray } from './distinctArray'
export { groupArrayBy } from './groupArrayBy'
export { rangeArray } from './rangeArray'
export { sortedArrayToSet } from './sortedArrayToSet'
export { zipArray } from './zipArray'
```

## 比较函数

JavaScript的对象比较是引用比较，为了补充不足，这个库的目的就是对象值比较。首先定义了一些比较函数。

```js
defaultCompare(a, b)
compareKey(a, b)
compareKeyPath(a, b)
```

比较函数可以用于数组的去重，分组，排序。

```js
distinctArray(array, equals = (a, b) => a === b)
groupArrayBy(array, getKey, compareKey = defaultCompare)
sortedArrayToSet(sortedArray, compare = defaultCompare)
```

比较函数可以用于集合运算。

```js
differenceSet(set1, set2, compare = defaultCompare)
findIndexInSet(set, e, compare = defaultCompare)
intersectSet(set1, set2, compare = defaultCompare)
isEqualset(set1, set2, compare = defaultCompare)
isSubset(set1, set2, compare = defaultCompare)
isSuperset(a, b, compare = defaultCompare)
unionSet(set1, set2, compare = defaultCompare)
```

## 编译器函数

```js
export { ParserConfig } from './ParserConfig'
export { isProd, prod, rightside, token } from './parseTree'
export { tryFirstChar } from "./tryFirstChar"
export { tryNumber } from './tryNumber'
export { tryQuote } from './tryQuote'
export { trySymbol } from './trySymbol'
export { tryToken } from './tryToken'
export { tryWhitespace } from './tryWhitespace'
export { tryWord } from './tryWord'
```

## Deep

Deep是一个类。表示复杂嵌套对象的展平结构。保存嵌套属性路径与其值的词条数组。这个类定义了本质属性。

```js
get keys()
getValues()
toObject()
findIndex(searchKeyPath)
structuralEqual(keys)
structuralSubset(keys)
structuralSuperset(keys)
```

生成Deep的函数有

```js
objectToDeep(obj, filter)
unionDeep(deeps)
```

其他独立的操作函数设计成流式管道函数

```js
differenceDeep(keys)(deep)
freshValueDeep(obj)(deep)
intersectDeep(keys)(deep)
replaceValueDeep(values)(deep)
zipValueDeep(values)(deep)
```

## 模式匹配函数

```js
match: (pattern:string) -> (input:any) -> boolean
```

## 实用Object函数

```js
export { pluckProperty } from './pluckProperty'
export { intersectObject } from './intersectObject'
export { isEmptyObject } from './isEmptyObject'
```

## 控制流函数

```js
export { cond } from './cond'
export { fold } from './fold.js'
export { unfold } from './unfold.js'
```

## 集合运算函数

```js
export { differenceSet } from './differenceSet'
export { findIndexInSet } from './findIndexInSet'
export { intersectSet } from './intersectSet'
export { isEqualset } from './isEqualset'
export { isSubset } from './isSubset'
export { isSuperset } from './isSuperset'
export { unionSet } from './unionSet'
```

## 结构函数

```js
export { erectObject, tojs } from './erectObject'
export { flat } from './flat'
```

## 实用函数

```js
rangeArray(length)
// zipArray(a, b)
intersectObject(obj, keys)
pluckProperty(obj, keyPath)
```
