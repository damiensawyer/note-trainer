<script context="module" lang="ts">
    export const prerender = true;
</script>

<script lang="ts">
    import Midi from "$lib/Midi.svelte";
    import Staff from './Staff/staff.svelte'
    import {MidiNumberToNote} from '../functions/MiscFunctions'


    import Hoverable from './Hoverable.svelte';
    import Vex from 'vexflow';

    let VF = Vex.Flow;
    let n: number[] = []

    function handleMessage(event) {
        //console.log(event.detail)
        let r = [...event.detail.keys()];
        //console.log(r)
        n = r;
    }

    $: pressedNotes = () => {
        console.log('nnnnn',n)
        if (n.length === 0 ) return []

        let notes = n.map(x => {
            let b = MidiNumberToNote().get(x)
            return b
        })
        
        let f = notes.flatMap(x => x.keys);
        console.log('ffff',f)
            return new VF.StaveNote({clef: 'treble',keys:f, duration:'q' })
            
     }
    
    $: voice = () => {
        let b = pressedNotes()
        console.log('pressed!!!', b)
        if (b.length === 0) return new undefined;
         var v = new VF.Voice({ num_beats: 1, beat_value: 4 }); 
        v.addTickables(b)
        return v
    }
        



    // var voice3c = new VF.Voice({ num_beats: 0, beat_value: 4 });
    // let n3 = new VF.StaveNote({ clef: 'treble', keys: ['c/4'], duration: 'w' });
    // let n4 = new VF.StaveNote({ clef: 'treble', keys: ['b/4'], duration: 'w' });
    // n4.setStyle({ fillStyle: 'red', strokeStyle: 'red' }); // https://github.com/0xfe/vexflow/wiki/Coloring-%26-Styling-Notes
    // voice3b.addTickables([n4]);
    
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<section>
    <h3>Insert midi keyboard and play notes</h3>
    <Midi on:notesOn={handleMessage}/>
    <Staff voice={pressedNotes().length ==0 ? undefined : voice} />
    

    <ul>
        {#each n as note}
            <li>{note.clef}</li>
        {/each}
    </ul>
    
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
    }

    h1 {
        width: 100%;
    }

    .welcome {
        position: relative;
        width: 100%;
        height: 0;
        padding: 0 0 calc(100% * 495 / 2048) 0;
    }

    .welcome img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        display: block;
    }
</style>

