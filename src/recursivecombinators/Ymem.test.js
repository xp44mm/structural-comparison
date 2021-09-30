import { Ymem } from './Ymem.js'


describe('Ymem', () => {

    test('Ymem', () => {
        let fib = Ymem((g) => (n) => {
            if (n == 0) return 0;
            if (n == 1) return 1;
            return g(n - 1) + g(n - 2);
        });

        let y = fib(100);
        expect(y).toEqual(354224848179262000000)

    })

})

