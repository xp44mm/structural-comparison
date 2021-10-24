import { tryEllipsis } from './tryEllipsis'

test('try Ellipsis test', () => {
    let x = '...rest'
    let y = tryEllipsis(x)
    expect(y).toEqual({ token: 'ELLIPSIS', restInput: 'rest' })
})
