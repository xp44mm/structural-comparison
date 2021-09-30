/**
 * Returns an iterable that contains, for each number in
 * `numbers`, the total sum of numbers encountered so far.
 * For example: 7, 4, -1 --> 7, 11, 10
 */
export function* addNumbers(numbers) {
    let result = 0;
    for (const n of numbers) {
        result += n;
        yield result;
    }
}