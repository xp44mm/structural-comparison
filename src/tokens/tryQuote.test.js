import { tryQuote } from "./tryQuote"

test("tryQuote test", () => {
    let x = '"xyz"'
    let y = tryQuote(x)
    expect(y).toEqual({ token: { QUOTE: "xyz" }, restInput: "" })
})



