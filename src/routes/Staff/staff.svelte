<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import Vex from 'vexflow';

	//let  StaveNote = Vex.Flow.StaveNote;
	let VF = Vex.Flow;
	export const prerender = true;
	export let title = '';
	export let voice: Vex.Flow.Voice;
	function buildStaff(node, voice: Vex.Flow.Voice) {
		var WorkspaceInformation = {
			// The div in which you're going to work
			div: node, //document.getElementById('some-div-id'),
			// Vex creates a svg with specific dimensions
			canvasWidth: 700,
			canvasHeight: 200
		};
		// Create a renderer with SVG
		var renderer = new VF.Renderer(WorkspaceInformation.div, VF.Renderer.Backends.SVG);

		// Use the renderer to give the dimensions to the SVG
		renderer.resize(WorkspaceInformation.canvasWidth, WorkspaceInformation.canvasHeight);

		// Expose the context of the renderer
		var context = renderer.getContext();

		// And give some style to our SVG
		context.setFont('Arial', 10).setBackgroundFillStyle('#eed');
		context.scale(2, 2);
		/**
		 * Creating a new stave
		 */
		// Create a stave of width 400 at position x0, y0 on the SVG.
		var stave = new VF.Stave(0, 0, 350);
		// Add a clef and time signature.
		stave.addClef('treble').addTimeSignature('4/4');
		// Set the context of the stave our previous exposed context and execute the method draw !
		//stave.options = { ...stave.options };
		//console.log('options', stave.options);
		context.clear();
		stave.setContext(context).draw();

		// Create a voice in 4/4 and add above notes
		if (!!voice) {

			// Format and justify the notes to 400 pixels.
			var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 200);

			// Render voice
			voice.draw(context, stave);
		}
		return {
			update(notes) {
				console.log('updating....', notes);
			}
		};
	}
</script>

<section>
	<h2>{title}</h2>
	<div use:buildStaff={voice} />
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
