import { tryNumber } from "./tryNumber"

test("tryNumber test", () => {
    let x = "12345"
    let y = tryNumber(x)
    expect(y).toEqual({ token: { NUMBER: 12345 }, restInput: "" })
})

