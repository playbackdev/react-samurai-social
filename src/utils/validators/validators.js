export const required = value => {
    if(value) return undefined;
    return 'Field is required';
};

export const minLength = length => value => {
    if(value && value.length < length) return `Min length is ${length} chars`;
    return undefined;
};

export const maxLength = length => value => {
    if(value && value.length > length) return `Max length is ${length} chars`;
    return undefined;
};