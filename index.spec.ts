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
        expect(style.message[style.message.length - 1]).toBe(';');
    });
});