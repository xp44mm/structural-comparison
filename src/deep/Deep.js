import { findIndexFromSet, isEqualset, isSubset, isSuperset } from '../array'
import { compareKeyPath } from '../comparison'
import { tojs } from '../structures'

/**
 * entries是必须字段，在构造时就有了，已经按keypath排序。
 * */
export class Deep {
    constructor(entries) {
        this.entries = entries
    }

    ///基本數據屬性

    ///
    get keys() {
        if (!this._keys) {
            this._keys = this.entries.map(([k]) => k)
        }
        return this._keys
    }

    getValues() {
        return this.entries.map(([k, v]) => v)
    }

    ///构造正常数据对象
    toObject() {
        return tojs(this.entries)
    }

    ///單個讀取

    ///
    findIndex(searchKeyPath) {
        return findIndexFromSet(this.keys, searchKeyPath, compareKeyPath)
    }

    ///集合判断

    /// keys: KeyPath[], KeyPath:(string|number)[]
    structuralEqual(keys) {
        return isEqualset(this.keys, keys, compareKeyPath)
    }

    /// keys: KeyPath[], KeyPath:(string|number)[]
    structuralSubset(keys) {
        return isSubset(this.keys, keys, compareKeyPath)
    }

    /// keys: KeyPath[], KeyPath:(string|number)[]
    structuralSuperset(keys) {
        return isSuperset(this.keys, keys, compareKeyPath)
    }

    /// 序列操作符

    map(...args) {
        let entries = this.entries.map(...args)
        return new Deep(entries)
    }

    filter(...args) {
        let entries = this.entries.filter(...args)
        return new Deep(entries)
    }

    forEach(...args) {
        this.entries.forEach(...args)
    }

}
