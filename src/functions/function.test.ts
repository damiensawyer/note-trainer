import {MidiNumberToNote} from './MiscFunctions'
//import {MidiNumberToNote} from './MiscFunctions'
describe('maths tests', () => {
    it('should add numbers', () => {
        let m = MidiNumberToNote() //? 
        expect(m.size).toEqual(9*12);
    });
})
export {}