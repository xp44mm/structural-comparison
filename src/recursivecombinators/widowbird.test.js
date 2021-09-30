import { widowbird } from './widowbird.js'

const _isEven =
    (myself, n, parity = 0) => {
        if (n === 0) {
            return parity === 0;
        } else {
            return myself(myself, n - 1, 1 - parity);
        }
    };

describe('widowbird', () => {
    test('normal', () => {
        let y = widowbird(_isEven)(1001)
        expect(y).toEqual(false)
    })

    test('broke the stack', () => {
        let y = widowbird(_isEven)(1000000)
        expect(y).toEqual(true)
    })


})

