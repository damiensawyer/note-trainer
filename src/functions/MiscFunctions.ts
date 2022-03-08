﻿
class StaveNote
{
    clef:string
    keys:string[]
    duration:string
    
}

const MergeMaps = <TKey, TValue>(...maps: Map<TKey, TValue>[]) => {
    let result = new Map<TKey, TValue>();
    maps.forEach((m) => {
        m.forEach((value, key) => result.set(key, value));
    });
    return result;
}

const makeNote = (key: string, isSharp: boolean, isFlat: boolean):StaveNote => {
    return  {clef: 'treble', keys: [key], duration: 'q'}
}

const buildOctave = (octave: number): Map<number, StaveNote> => {
    /*https://computermusicresource.com/midikeys.html*/
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
    let sets = [...Array(6).keys()].map(x => buildOctave(x)) //?
    let result = MergeMaps(...sets)
    return result
}

