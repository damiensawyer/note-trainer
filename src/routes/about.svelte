<script context="module">
	import { browser, dev } from '$app/env';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="content">
	<h1>About Note Trainer</h1>

	<p>Note training tool for my kids. Inspired by:</p>
	<ul>
		<li><a href='https://ourcodeworld.com/articles/read/293/rendering-music-notation-music-sheet-in-javascript-with-vexflow-2'>https://ourcodeworld.com/articles/read/293/rendering-music-notation-music-sheet-in-javascript-with-vexflow-2</a></li>
		<li><a href='https://webmidi-examples.glitch.me'>https://webmidi-examples.glitch.me</a></li>
		<li><a href='https://www.youtube.com/watch?v=iamRkSsnIS'>https://www.youtube.com/watch?v=iamRkSsnIS0</a></li>
		<li><a href='https://jankleinert.com/blog/2020/01/22/learning-to-read-music-with-the-web-midi-api.htm'>https://jankleinert.com/blog/2020/01/22/learning-to-read-music-with-the-web-midi-api.html</a></li>
	</ul>
</div>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}
</style>
