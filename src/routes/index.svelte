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
        
        if (n.length === 0) return undefined

        let notes = n.map(x => {
            let b = MidiNumberToNote().get(x)
            return b
        })

        let f = notes.flatMap(x => x.keys);
        console.log('nnnnn', f)
        return new VF.StaveNote({clef: 'treble', keys: f, duration: 'q'})

    }
    // https://svelte.dev/docs#component-format-script-3-$-marks-a-statement-as-reactive
    $: voice = f(pressedNotes())
        
    

    function f(n:VF.StaveNote) {
        console.log('xxxxxxxxxxxxx',n)
        if (!n || !n.keys || n.keys.length === 0) {
            var v1 = new VF.Voice({num_beats: 1, beat_value: 4});
            
            v1.addTickables([new VF.StaveNote({clef: 'treble', keys: ['c/4','d/4','e/4'], duration: 'q'})])
            return v1
        }
        else
        {
            console.log('zzz',n.keys)
            var v2 = new VF.Voice({num_beats: 1, beat_value: 4});
            v2.addTickable(new VF.StaveNote({clef: 'treble', keys: n.keys, duration: 'q'}))
            //v.addTickable(new VF.StaveNote({clef: 'treble', keys: n.keys, duration: 'q'}))
            return v2
        }
        
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
    <!--{@debug voice}-->
    <!--{#key voice}-->
        <Staff bind:voice={voice}/>
    <!--{/key}-->

    <ul>
        {#each n as note}
            <li>{note}</li>
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

