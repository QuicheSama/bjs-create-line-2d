<script lang="ts">
	import Pasture from './Pasture.svelte';
	let canvas: HTMLCanvasElement;
</script>

<div>
	<canvas bind:this={canvas} on:wheel={(e) => e.preventDefault()} />
</div>
{#if canvas}
	<Pasture {canvas}>
		<slot />
	</Pasture>
{/if}

<style>
	canvas {
		position: relative;
		display: block;
		width: 100%;
		height: auto;
		touch-action: none;
		user-select: none;
		outline: none;
	}
</style>
