import { sum } from '../src/js/index';
describe('Test the index.js', () => {
    it('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    })
});