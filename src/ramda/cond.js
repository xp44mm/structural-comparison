/**
 * `cond`函数是一个返回函数的组合子，用来模拟`if else`语句。
 * 它接受一个数组，数组的每个元素代表条件语句的一个分支。
 * 分支分为两种形式，第一种是断言函数，和行为函数组成的数组，当断言为真时，执行并返回行为，断言为假时跳过行为函数，执行下一分支。
 * 第二种是一个函数，当函数为真时，返回函数的返回值，当函数为假时，丢弃函数返回值，执行下一分支。
 * `cond`函数依次执行每个分支，返回第一个为真的分支结果为整体的结果。忽略其后所有分支。
 *
 * @type [[predicate,action]|tryaction] -> (any -> any)
 * @param {Array} branches A list of [predicate, action] or tryAction
 * @return {function}
 */
export let cond = function cond(branches) {
  return function () {
    for (const branch of branches) {
      if (typeof branch === 'function') {
        let tryAction = branch.apply(this, arguments)
        if (tryAction) {
          return tryAction;
        }
      } else if (Array.isArray(branch)) {
        let predicate = branch[0].apply(this, arguments)
        if (predicate) {
          let args = Array.from(arguments)
          args[args.length] = predicate // transformer(...arguments, predicate(...arguments))          
          return branch[1].apply(this, args);
        }
      }
    }
  }
}
