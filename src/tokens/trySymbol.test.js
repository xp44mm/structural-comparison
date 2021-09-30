import { trySymbol } from "./trySymbol"

test("trySymbol test", () => {
    let x = "!!!"
    let y = trySymbol(x)
    expect(y).toEqual({ token: { SYMBOL: "!" }, restInput: "!!" })
})
