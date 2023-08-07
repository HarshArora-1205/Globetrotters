const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const isEmail = val => emailRegex.test(val) ? undefined : "Enter proper email";
export const required = val => val ? undefined : "Required";
export const isNum = val => isNaN(val) ? "Must be a number" : undefined;
export const isGreater = min => (val) => val < min ? `Must be greater than ${min}` : undefined;
export const chainValidators = (...validators) => (value) => validators.reduce((error, validator) => error || validator(value), undefined);