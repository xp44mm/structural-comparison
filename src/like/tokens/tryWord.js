import { tryToken } from '../../compiler'

export const tryWord = tryToken(/^[\p{L}\p{Mn}\p{Mc}\p{Nl}\p{Nd}\p{Pc}\p{Cf}]+/u, 'WORD')

