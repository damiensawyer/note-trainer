import {sveltePreprocess} from "svelte-preprocess/dist/autoProcess.js";
import adapter from '@sveltejs/adapter-static';
 export default {preprocess: sveltePreprocess(),
     kit: {
         adapter: adapter({
             // default options are shown
             pages: 'build',
             assets: 'build',
             fallback: null,
             precompress: false,
             paths: {
                 // change below to your repo name
                 base: "/notes-trainer"
             },
         })
     }}

