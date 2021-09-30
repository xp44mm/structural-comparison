/**
 * Returns an iterable that transforms the input sequence
 * of characters into an output sequence of words.
 */
export function* tokenize(chars) {
    const iterator = chars[Symbol.iterator]();
    let ch;
    do {
        ch = getNextItem(iterator); // (A)
        if (isWordChar(ch)) {
            let word = '';
            do {
                word += ch;
                ch = getNextItem(iterator); // (B)
            } while (isWordChar(ch));
            yield word; // (C)
        }
        // Ignore all other characters
    } while (ch !== END_OF_SEQUENCE);
}

const END_OF_SEQUENCE = Symbol();

function getNextItem(iterator) {
    const {value,done} = iterator.next();
    return done ? END_OF_SEQUENCE : value;
}

function isWordChar(ch) {
    return typeof ch === 'string' && /^[A-Za-z0-9]$/.test(ch);
}