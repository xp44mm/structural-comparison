import { longtailed } from './longtailed.js'

const isEven =
    longtailed(
        (myself, n) => {
            if (n === 0)
                return true;
            else if (n === 1)
                return false;
            else return myself(n - 2);
        }
    );

describe('longtailed', () => {
    test('normal', () => {
        let y = isEven(1001)
        expect(y).toEqual(false)
    })

    test('broke the stack', () => {
        let y = isEven(1000000)
        expect(y).toEqual(true)
    })


})

