<script lang="ts">
	import Staff from '../Staff/staff.svelte';
	import Hoverable from '../Hoverable.svelte';
	import Vex from 'vexflow';
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
</script>

<svelte:head>
	<title>Trainer</title>
</svelte:head>

<section>
	<Hoverable let:hovering={active}>
		<div>
			{#if active}
				<Staff notes={notes1} title={'showing...'} />
			{:else}
				<Staff notes={notes2}  title={'Hover to change notes'} />
			{/if}
		</div>
	</Hoverable>
	<Staff notes={notes1} />
	<Staff notes={undefined} />
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
