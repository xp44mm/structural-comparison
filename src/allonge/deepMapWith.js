export const deepMapWith = (fn) =>
    function innerdeepMapWith(tree) {
        return [].map.call(tree, (element) =>
            Array.isArray(element)
                ? innerdeepMapWith(element)
                : fn(element)
        );
    };