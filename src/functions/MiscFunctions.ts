
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
            [i++, makeNote(`c/${octave}`, false, false)],
            [i++, makeNote(`c/${octave}`, true, false)],
            [i++, makeNote(`d/${octave}`, false, false)],
            [i++, makeNote(`d/${octave}`, true, false)],
            [i++, makeNote(`e/${octave}`, false, false)],
            [i++, makeNote(`f/${octave}`, false, false)],
            [i++, makeNote(`f/${octave}`, true, false)],
            [i++, makeNote(`g/${octave}`, false, false)],
            [i++, makeNote(`g/${octave}`, true, false)],
            [i++, makeNote(`a/${octave}`, false, false)],
            [i++, makeNote(`a/${octave}`, true, false)],
            [i++, makeNote(`b/${octave}`, false, false)]
        ]
    )

    return result
}

export const MidiNumberToNote = (): Map<number, StaveNote> => {
    let sets = [...Array(6).keys()].map(x => buildOctave(x)) //?
    let result = MergeMaps(...sets)
    return result
}

