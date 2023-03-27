<script lang="ts">
	import { Layout, renamer, sorter } from '@nil-/doc';
	import { sveltekit } from '@nil-/doc/sveltekit';

	const { data, current, navigate, theme } = sveltekit(
		import.meta.glob(['./**/+page.svelte', './**/+page.mdsvelte'])
	);
	import { setContext } from 'svelte';
	setContext('urls', data);
</script>

<svelte:head>
	<title>bjs-create-line-2d</title>
</svelte:head>

<Layout {data} current={$current} on:navigate={navigate} {renamer} {sorter} bind:theme={$theme}>
	<div slot="title">bjs-create-line-2d</div>
	<div class="markdown-body">
		<slot />
	</div>
</Layout>

<style>
	.markdown-body {
		width: 100%;
		height: 100%;
		padding: 10px;
		min-width: 600px;
		margin-left: auto;
		margin-right: auto;
		transition: background-color 350ms, color 350ms;
	}
</style>
