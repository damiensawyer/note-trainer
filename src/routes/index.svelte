<script context="module" lang="ts">
    export const prerender = true;
</script>

<script lang="ts">
    import Midi from "$lib/Midi.svelte";
    import Staff from './Staff/staff.svelte'
    import {MidiNumberToNote} from '../functions/MiscFunctions'
    import Switch from "svelte-switch";

    import Hoverable from './Hoverable.svelte';
    import Vex from 'vexflow';

    let VF = Vex.Flow;
    let n: number[] = []

    $: checkedValue = true;

    function handleClefChange(e) {
        const { checked } = e.detail;
        checkedValue = checked;
        
    }

    function handleMessage(event) {
        //console.log(event.detail)
        let r = [...event.detail.keys()];
        //console.log(r)
        n = r;
    }
    //$: clef = 'treble';
    $: clef = checkedValue ? 'treble' : 'bass';
    $: items = [1];
    $: pressedNotes = () => {

        if (n.length === 0) return undefined

        let notes = n.map(x => {
            let b = MidiNumberToNote().get(x) ?? ['']
            return b
        })

        let f = notes.flatMap(x => x.keys);
        console.log('nnnnn', f)
        return new VF.StaveNote({clef:'treble', keys: f, duration: 'q'})

    }
    // https://svelte.dev/docs#component-format-script-3-$-marks-a-statement-as-reactive
    $: voice = f(pressedNotes(), clef)

    function f(n: VF.StaveNote, clef:string) {
        if (!(n?.keys)) return undefined;
        var v1 = new VF.Voice({num_beats: 1, beat_value: 4});
        v1.addTickable(new VF.StaveNote({clef: clef, keys: n?.keys ?? [], duration: 'q'}))
        return v1;
    }

</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<section>
    <h3>Insert midi keyboard and play notes</h3>
    Select Staff: <Switch on:change={handleClefChange} checked={checkedValue}>
    <div
    style=" display: flex; justify-content: center; align-items: center; height:
    100%; font-size: 10px; color: black; padding-right: 2px; "
    slot="unCheckedIcon">
    Bass
  </div>
  <div
  style=" display: flex; justify-content: center; align-items: center; height:
  100%; font-size: 10px; color: yellow; padding-right: 2px; "
  slot="checkedIcon">
  Treb
</div>

</Switch>
    
    
    <Midi on:notesOn={handleMessage}/>

    {#if checkedValue}
	    <Staff bind:voice={voice} clef={'treble'}/>
    {:else}
        <Staff bind:voice={voice} clef={'bass'}/>
    {/if}


    
    
    
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

