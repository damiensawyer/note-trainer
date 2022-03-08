import Vex from 'vexflow';
/*https://computermusicresource.com/midikeys.html*/

class MyModule {
 
}

let VF = Vex.Flow;
type  StaveNote = Vex.Flow.StaveNote;

function MergeMaps<TKey, TValue>(...maps: Map<TKey, TValue>[]) {
    let result = new Map<TKey, TValue>();
    maps.forEach((m) => {
        m.forEach((value, key) => result.set(key, value));
    });
    return result;
}

function makeNote(key: string, isSharp: boolean, isFlat: boolean) {
    return new VF.StaveNote({clef: 'treble', keys: [key], duration: 'q'})
}

function buildOctave(octave: number): Map<number, StaveNote> {

    let i = (12 * octave) + 24;
    let result = new Map<number, StaveNote>(
        [
            [i++, makeNote(`C/${octave}`, false, false)],
            [i++, makeNote(`C/${octave}`, true, false)],
            [i++, makeNote(`D/${octave}`, false, false)],
            [i++, makeNote(`D/${octave}`, true, false)],
            [i++, makeNote(`E/${octave}`, false, false)],
            [i++, makeNote(`F/${octave}`, false, false)],
            [i++, makeNote(`F/${octave}`, true, false)],
            [i++, makeNote(`G/${octave}`, false, false)],
            [i++, makeNote(`G/${octave}`, true, false)],
            [i++, makeNote(`A/${octave}`, false, false)],
            [i++, makeNote(`A/${octave}`, true, false)],
            [i++, makeNote(`B/${octave}`, false, false)]
        ]
    )

    return result
}

export const MidiNumberToNote = (): Map<number, StaveNote> => {

    let sets = [...Array(4).keys()].map(x => buildOctave(x)) //?
    let result = MergeMaps(...sets)
    return result;

}
