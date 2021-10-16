import { why } from './why.js'

// Ymem takes a functional and an (optional) cache of answers.

// It returns the fixed point of the functional that caches intermediate results.

export const Ymem = why((myself, F, cache) => {
    if (!cache)
        cache = {}; // Create a new cache.

    return (arg) => {
        if (cache[arg])
            return cache[arg]; // Answer in cache.

        let answer =
            (
                F(
                    (n) => (
                        myself(F, cache)
                    )(n)
                )
            )(arg); // Compute the answer.

        cache[arg] = answer; // Cache the answer.
        return answer;
    };
})


// export function Ymem(F, cache) {
//     if (!cache)
//         cache = {}; // Create a new cache.

//     return (arg) => {
//         if (cache[arg])
//             return cache[arg]; // Answer in cache.

//         let answer =
//             (
//                 F(
//                     (n) => (
//                         Ymem(F, cache)
//                     )(n)
//                 )
//             )(arg); // Compute the answer.

//         cache[arg] = answer; // Cache the answer.
//         return answer;
//     };
// }

