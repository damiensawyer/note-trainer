<script lang="ts">
	
	import Staff from '../Staff/staff.svelte';
	import Hoverable from '../Hoverable.svelte';
	import Vex from 'vexflow';
import TwoVoiceStaff from '../TwoVoiceStaff/TwoVoiceStaff.svelte';
	let VF = Vex.Flow;
	const notes1 = [
		// A quarter-note C.
		new VF.StaveNote({ clef: 'treble', keys: ['c/4'], duration: 'q' }),

		// A quarter-note D.
		new VF.StaveNote({ clef: 'treble', keys: ['d/4'], duration: 'q' }),

		// A quarter-note rest. Note that the key (b/4) specifies the vertical
		// position of the rest.

		new VF.StaveNote({ clef: 'treble', keys: ['b/4'], duration: 'qr' }),

		// A C-Major chord.
		new VF.StaveNote({ clef: 'treble', keys: ['c/4', 'e/4', 'g/4', 'b/5'], duration: 'q' })
	];

	notes1[3].setStyle({ fillStyle: 'blue', strokeStyle: 'blue' }); // https://github.com/0xfe/vexflow/wiki/Coloring-%26-Styling-Notes
	notes1[1].setStyle({ fillStyle: 'red', strokeStyle: 'red' });

	const notes2 = [
		// A quarter-note C.
		new VF.StaveNote({ clef: 'treble', keys: ['E/4'], duration: 'q' }),

		// A quarter-note rest. Note that the key (b/4) specifies the vertical
		new VF.StaveNote({ clef: 'treble', keys: ['b/4'], duration: 'qr' }),

		// A quarter-note D.
		new VF.StaveNote({ clef: 'treble', keys: ['e/4'], duration: 'q' }),

		// A C-Major chord.
		new VF.StaveNote({ clef: 'treble', keys: ['c/4'], duration: 'q' })
	];

	var voice1 = new VF.Voice({ num_beats: 4, beat_value: 4 });
	voice1.addTickables(notes1);

	var voice2 = new VF.Voice({ num_beats: 4, beat_value: 4 });
	voice2.addTickables(notes2);

	var voice3 = new VF.Voice({ num_beats: 4, beat_value: 4 });
	voice3.addTickable(new VF.StaveNote({ clef: 'treble', keys: ['b/4'], duration: 'w' }));

	var voice3b = new VF.Voice({ num_beats: 4, beat_value: 4 });
	var voice3c = new VF.Voice({ num_beats: 0, beat_value: 4 });
	let n3 = new VF.StaveNote({ clef: 'treble', keys: ['c/4'], duration: 'w' });
	let n4 = new VF.StaveNote({ clef: 'treble', keys: ['b/4'], duration: 'w' });
	n4.setStyle({ fillStyle: 'red', strokeStyle: 'red' }); // https://github.com/0xfe/vexflow/wiki/Coloring-%26-Styling-Notes
	voice3b.addTickables([n4]);

	const notes4 = [
		new VF.StaveNote({ clef: 'treble', keys: ['E/4'], duration: '8' }),
		new VF.StaveNote({ clef: 'treble', keys: ['b/4'], duration: '8r' }),
		new VF.StaveNote({ clef: 'treble', keys: ['e/4'], duration: '8' }),
		new VF.StaveNote({ clef: 'treble', keys: ['c/4'], duration: '8' }),
		new VF.StaveNote({ clef: 'treble', keys: ['c/4'], duration: '8' }),
		new VF.StaveNote({ clef: 'treble', keys: ['c/4'], duration: '8' }),
		new VF.StaveNote({ clef: 'treble', keys: ['c/4'], duration: '8' }),
		new VF.StaveNote({ clef: 'treble', keys: ['c/4'], duration: '8' })
	];
	var voice4 = new VF.Voice({ num_beats: 4, beat_value: 4 });
	voice4.addTickables(notes4);
</script>

<svelte:head>
	<title>Trainer</title>
</svelte:head>

<section>


	<Hoverable let:hovering={active}>
		<div>
			{#if active}
				<Staff voice={voice1} title={'showing...'} />
			{:else}
				<Staff voice={voice2} title={'Hover to change notes'} />
			{/if}
		</div>
	</Hoverable>

	<Hoverable let:hovering={active}>
		<div>
			{#if !active}
				<Staff voice={voice3} title={'Hover to change notes'} />
			{:else}
				<Staff voice={voice3b} title={'showing...'} />
			{/if}
		</div>
	</Hoverable>

	<Staff voice={voice1} />
	<Staff voice={voice3} />
	<Staff voice={voice4} />

	

	
	<Staff voice={undefined} />
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
