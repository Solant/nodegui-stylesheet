import { toString, units } from '../src/units';

describe('units', function () {
    it('should create unit', () => {
        expect(units(12, 'px')).toEqual({ value: 12, units: 'px' });
    });

    it('should stringify', () => {
        expect(toString(units(12, 'px'))).toBe('12px');
    });
});