    /**
     * @Description 比较两个对象键值全等
     * @param {Object} objOne 对象1
     * @param {Object} objTwo 对象2
     * @return {Boolean} 是否键值全等
     **/
     function objKeyValueIsSame(objOne, objTwo) {
        let keysOne = Object.keys(objOne); // 获取对象1所有键数组
        let keysTwo = Object.keys(objTwo); // 获取对象1所有键数组
        if (keysOne.length !== keysTwo.length) return false; // 对比一下键得长度是否相等，如果不等则直接返回true
        // 开始遍历键去获取对象值对比，我们思路是值不匹配则返回false，但是如果匹配则则什么都不要，继续循环，直到循环结束，没有返回false就行了
        for (let key of keysOne) {
            if (typeof objOne[key] === 'object' && objOne[key] !== null) {  
                // 如果是对象，则再递归对比，如果递归返回false，则直接方法也直接返回false
                if (!objKeyValueIsSame(objOne[key], objTwo[key])) return false;
            } else if (typeof objOne[key] === 'function' || typeof objOne[key] === 'symbol') { 
                // 如果是function或symbol，转字符串再对比，不匹配则直接返回false
                if (String(objOne[key]) !== String(objTwo[key])) return false;
            } else {  
                // 最后其他类型用es6得Object.is()来比较，不匹配直接返回false
                if (!Object.is(objOne[key], objTwo[key])) return false;
            }
        }
        return true;  // 遍历结束了没有返回false，说明没有问题，这里直接返回true，表示键值全等了
    }

    let aa = {
        age: 24,
        blank: null,
        what: undefined,
        fun: function () {
            return 'test';
        },
        strange: NaN,
        newType: Symbol('symbol')
    }
    let bb = {
        age: 24,
        blank: null,
        what: undefined,
        fun: function () {
            return 'test';
        },
        strange: NaN,
        newType: Symbol('symbol')
    }

    console.log(objKeyValueIsSame(aa, bb))
