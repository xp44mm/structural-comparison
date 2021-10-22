import { tryFirstChar } from "./tryFirstChar"

test("tryFirstChar test", () => {
    let tryRBRACE = tryFirstChar("}","RBRACE")
    let x = "}"
    let y = tryRBRACE(x)
    expect(y).toEqual({ token: "RBRACE", restInput: "" })
})





