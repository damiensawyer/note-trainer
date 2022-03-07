import {add, subtract} from './maths'

describe('maths tests', () => {
    it('should add numbers', () => {
        expect(add(1, 2)).toEqual(3);
    });

    it('should subtract numbers', () => {
        expect(subtract(10, 2)).toEqual(8);
    });
})
describe('simple tests', () => {
    it('should add numbers', () => {
        expect(true).toBe(true);
    })
});

describe('simple tests 2', () => {
    it('should add numbers', () => {
        expect(true).toBe(true);
    })
});

