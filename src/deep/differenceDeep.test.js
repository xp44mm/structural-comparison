import { differenceDeep } from './differenceDeep'

test('differenceDeep test', () => {
    let keys1 = [ [0], [1], ]
    let keys2 = [ [1], [2], ]
    let y = differenceDeep(keys1, keys2)
    let e = [[0]]
    expect(y).toEqual(e)
})



describe('differenceDeep block', () => {
    let a = [
        ['absOutlet', 'CO2'],
        ['absOutlet', 'H2O'],
        ['absOutlet', 'HCl'],
        ['absOutlet', 'HF'],
        ['absOutlet', 'N2'],
        ['absOutlet', 'O2'],
        ['absOutlet', 'SO2'],
        ['absOutlet', 'SO3'],
        ['absOutlet', 'ash'],
        //["absOutlet", "pressure"],
        ['absOutlet', 'temperature'],
        ['absOutletVolume'],
        ['ppmSO2'],
    ]

    let b = [
        ['absOutlet', 'CO2'],
        ['absOutlet', 'H2O'],
        ['absOutlet', 'N2'],
        ['absOutlet', 'O2'],
        ['absOutlet', 'pressure'],
        ['absOutlet', 'temperature'],
        ['absOutletVolume'],
    ]

    test('differenceDeep test', () => {
        let y = differenceDeep(a, b)

        let e = [['absOutlet', 'HCl'], ['absOutlet', 'HF'], ['absOutlet', 'SO2'], ['absOutlet', 'SO3'], ['absOutlet', 'ash'], ['ppmSO2']]

        expect(y).toEqual(e)
    })

    test('differenceDeep b a test', () => {
        let z = differenceDeep(b, a)

        let f = [['absOutlet', 'pressure']]

        expect(z).toEqual(f)
    })



})
