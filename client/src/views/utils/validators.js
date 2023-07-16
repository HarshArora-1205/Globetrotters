export const required = val => val ? undefined : "Required";
export const isNum = val => isNaN(val) ? "Must be a number" : undefined;
export const isGreater = min => (val) => val < min ? `Must be greater than ${min}` : undefined;
export const chainValidators = (...validators) => (value) => validators.reduce((error, validator) => error || validator(value), undefined);