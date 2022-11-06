import debounce from 'lodash.debounce';

function debounceCancellable(func) {
    const functionDebounced = debounce((param, cancel) => {
        if (!cancel) {
            func(param)
        }
    }, 1000)
    return {
        functionDebounced: functionDebounced,
        functionImmediate: (param) => {
            func(param);
            functionDebounced('', true);
        }
    }
}

export default debounceCancellable;