﻿<script lang="ts">

    // from https://webmidi-examples.glitch.me/
    import {onMount, onDestroy} from "svelte";
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher(); // https://svelte.dev/tutorial/event-forwarding
    
    let midiIn = [];
    let midiOut = [];
    let notesOn = new Map<number,number>();

    function connect() {
        console.log('connecting to midi...');
        navigator.requestMIDIAccess()
            .then(
                (midi) => midiReady(midi),
                (err) => console.log('Something went wrong', err));
    }

    function midiReady(midi) {
        // Also react to device changes.
        console.log('connected to midi');
        
        initDevices(midi);
        midi.addEventListener('statechange', (event) => initDevices(event.target));
    }

    function initDevices(midi) {
        // Reset.
        midiIn = [];
        midiOut = [];

        // MIDI devices that send you data.
        const inputs = midi.inputs.values();
        for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
            midiIn.push(input.value);
        }

        // MIDI devices that you send data to.
        const outputs = midi.outputs.values();
        for (let output = outputs.next(); output && !output.done; output = outputs.next()) {
            midiOut.push(output.value);
        }
        console.log('midi in', midiIn)
        console.log('midi out', midiOut)
//    displayDevices();
        startListening();
    }


    // Start listening to MIDI messages.
    function startListening() {
        for (const input of midiIn) {
            input.addEventListener('midimessage', midiMessageReceived);
        }
    }

    function stopListening() {
        for (const input of midiIn) {
            input.removeEventListener('midimessage',midiMessageReceived);
        }
    }
    

    function midiMessageReceived(event) {
        // MIDI commands we care about. See
        // http://webaudio.github.io/web-midi-api/#a-simple-monophonic-sine-wave-midi-synthesizer.
        const NOTE_ON = 9;
        const NOTE_OFF = 8;
    console.log('eeeee',event);
        const cmd = event.data[0] >> 4;
        const pitch:number = event.data[1];
        const velocity:number = (event.data.length > 2) ? event.data[2] : 1;
        if (pitch < 24) return;
        // You can use the timestamp to figure out the duration of each note.
        const timestamp = Date.now();

        // Note that not all MIDI controllers send a separate NOTE_OFF command for every NOTE_ON.
        if (cmd === NOTE_OFF || (cmd === NOTE_ON && velocity === 0)) {
            //console.log(`🎧 from ${event.srcElement.name} note off: pitch:${pitch}, velocity: ${velocity}`);
            // Complete the note!
            const note = notesOn.get(pitch);
            if (note) {
                // console.log(`🎵 pitch:${pitch}, duration:${timestamp - note} ms.`);
                notesOn.delete(pitch);
            }
        } else if (cmd === NOTE_ON) {
            //console.log(`🎧 from ${event.srcElement.name} note on: pitch:${pitch}, velocity: {velocity}`);
            // One note can only be on at once.
            notesOn.set(pitch, timestamp);
        }
        dispatch('notesOn', notesOn)
    }

    onMount(() => {
        connect();

    })

    onDestroy(() => {
        stopListening()

    })
</script>



<style>

</style>
