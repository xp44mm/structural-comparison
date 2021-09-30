/**
 * Returns an iterable that filters the input sequence
 * of words and only yields those that are numbers.
 */
export function* extractNumbers(words) {
    for (const word of words) {
        if (/^[0-9]+$/.test(word)) {
            yield Number(word);
        }
    }
}