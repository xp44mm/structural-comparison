export class Stack extends Array {
    peek() {
        return this[this.length - 1]
    }
    pop(n = 1) {
        if (n === 0) {
            // noop
        } else if (n === 1) {
            let v = this.peek()
            this.length = this.length - 1
            return v
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
}