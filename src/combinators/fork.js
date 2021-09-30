import {seq} from './seq'

export const fork = function (join, ...funcs) {
    return function (val) {
        let x = seq(funcs)
        return join(...x(val));
    };
};