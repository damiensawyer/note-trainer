import {MidiNumberToNote} from './MiscFunctions'
describe('maths tests', () => {
    it('should add numbers', () => {
        let m = MidiNumberToNote() 
        expect(m.size).toBeGreaterThan(0);

    });
})
