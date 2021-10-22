export class Stack extends Array {
    peek() {
        return this[this.length - 1]
    }
    
    popMany(n) {
        if (n === 0) {
            return []
        } else {
            let arr = []
            let i = n
            let j = this.length
            while (true) {
                i--
                j--
                arr[i] = this[j]
                if (i === 0) break;
            }
            this.length = j
            return arr
        }
    }

    drop(n) {
        this.length = this.length - n
    }
}