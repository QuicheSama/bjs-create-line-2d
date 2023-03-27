<script lang="ts">
	import { setup, type Pasture } from '$lib/internal/pasture';

	import { setContext, onDestroy } from 'svelte';

	export let canvas: HTMLCanvasElement;
	const pasture = setup(canvas);
	setContext<Pasture>('pasture', pasture);
	onDestroy(() => {
		pasture.cleanup();
	});
</script>

<slot />
