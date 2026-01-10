import { divide } from '../src/calculator.js';

describe('divide', () => {
    it('divides two positive numbers', () => {
        expect(divide(2, 1)).toBe(2);
    });

    it('throws if first argument is not a number', () => {
        expect(() => divide('2', 1)).toThrow("Both arguments must be numbers");
    });

    it('throws if second argument is not a number', () => {
        expect(() => divide(2, '1')).toThrow("Both arguments must be numbers");
    });

    it('throws if first argument is NaN', () => {
        expect(() => divide(NaN, 1)).toThrow("Arguments cannot be NaN");
    })

    it('throws if second argument is NaN', () => {
        expect(() => divide(2, NaN)).toThrow("Arguments cannot be NaN");
    })

    it('throws if division by zero is attempted', () => {
        expect(() => divide(2, 0)).toThrow("Division by zero is not allowed");
    })


})