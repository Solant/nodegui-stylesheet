import { create, units } from './index';

describe('index', function () {
    it('should create stylesheet', () => {
        const style = create({
            message: {
                fontSize: units(12, 'px'),
                marginTop: 12,
                fontFamily: 'Times New Roman'
            }
        });
        expect(style.message).toContain(`"Times New Roman"`);
        expect(style.message).toContain(`font-size: 12px`);
    });

    it('should end with semicolon', () => {
        const style = create({
            test: {
                fontSize: 14,
                alignItems: 'center',
            }
        });

        expect(style.test).toMatch(/;$/);
    });

    it('should add units to font size', () => {
        const style = create({
            test: {
                fontSize: 14,
            }
        });

        expect(style.test).toContain('14px');
    });

    it('should handle arrays', () => {
        const style = create({
            test: {
                borderWidth: [1, units(2, 'px'), 3, 4],
            }
        });

        expect(style.test).toContain('1 2px 3 4');
    });
});