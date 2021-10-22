import json from './parseTable.json'
import { ParserConfig } from './ParserConfig'

test.skip('convert to Map test', () => {
    //: Map<int,string list>,
    const rules = new Map(json.rules)
    //: Map<int,Map<string,int>>,
    const actions = new Map(json.actions.map(([k, v]) => [k, new Map(v)]))
    //: Map<int,string>
    const kernelSymbols = new Map(json.kernelSymbols)

    console.log(rules)
    console.log(actions)
    console.log(kernelSymbols)
});

test('peek', () => {
    let config = new ParserConfig(json)
    config.setGetTag(token => typeof token === 'string' ? token : Object.keys(token)[0])
    let parse = config.parse.bind(config)

    let tokens = [{ num: 0 }, '*', { num: 1 }, '+', { num: 2 }]
    let result = parse(tokens[Symbol.iterator]())
    let y = {
        "leftside": "E", "children": [{
            "leftside": "E", "children": [{
                "leftside": "T", "children": [{
                    "leftside": "T", "children": [{ "leftside": "F", "children": [{ "token": { "num": 0 } }] }]
                }, { "token": "*" }, {
                    "leftside": "F", "children": [{ "token": { "num": 1 } }]
                }]
            }]
        }, { "token": "+" }, {
            "leftside": "T", "children": [{
                "leftside": "F", "children": [{ "token": { "num": 2 } }]
            }]
        }]
    }

    expect(y).toEqual(result)
});

