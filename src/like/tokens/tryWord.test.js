import { tryWord } from "./tryWord"

test("ascii test", () => {
    let x = "xyze'"
    let y = tryWord(x)
    expect(y).toEqual({ token: { WORD: "xyze" }, restInput: "'" })
})

test("标识符 test", () => {
    let x = "标识符"
    let y = tryWord(x)
    expect(y).toEqual({ token: { WORD: "标识符" }, restInput: "" })
})

