# js库structural-comparison

`structural-comparison`是一个深比较库。是`deep-rxjs`库的依赖库。A js library of structural comparison.

## 安装

```js
npm i structural-comparison
```

下面是库中的一些函数总结。

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

## 实用函数

```js
rangeArray(length)
zipArray(a, b)
intersectObject(obj, keys)
pluckProperty(obj, keyPath)
```

## 参考

`structural-comparison`开源于GitHub，见xp44mm/structural-comparison仓库。位于其中的docs文件夹下有各函数用法的详细解释。

