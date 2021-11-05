import {
    rules,
    actions,
    kernelSymbols,
    semantics
} from './exprParseTable'
import { ParserWithSemantic } from './ParserWithSemantic'


test('peek', () => {
    let config = new ParserWithSemantic({
        rules,
        actions,
        kernelSymbols,
        semantics
    })

    config.setGetTag(token => typeof token === 'string' ? token : Object.keys(token)[0])
    config.setGetLexeme(token => typeof token === 'string' ? token : Object.values(token)[0])

    let parse = config.parse.bind(config)

    let tokens = ['(', { DIGIT: 7 }, '+', { DIGIT: 3 }, ')', '*', { DIGIT: 2 },]

    let result = parse(tokens[Symbol.iterator]())
    // let y = 
    console.log(result)
    expect(result).toEqual(20)
});

