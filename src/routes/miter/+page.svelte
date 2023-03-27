<script lang="ts">
	import { Block, Instance, Controls } from '@nil-/doc';
	import type { Prop } from '@nil-/doc';
	import Canvas from '../Canvas.svelte';
	import Example from './Example.svelte';
	const twoPI = Math.PI * 2;
	const defaults = {
		waveOptions: {
			amplitude: 0.5,
			period: Math.PI,
			stepSize: 0.5
		},
		width: 0.5,
		debug: false
	};
	const sinwave: Prop = [
		'waveOptions',
		'object',
		[
			['amplitude', 'range', 0, 10, 0.1],
			['period', 'range', 0, twoPI, twoPI / 360],
			['stepSize', 'range', 0.05, 1, 0.05]
		]
	];
	const width: Prop = ['width', 'range', 0.05, 3, 0.05];
	const debug: Prop = ['debug', 'toggle'];
</script>

<Block>
	<Instance {defaults} let:props noreset>
		<Canvas>
			<Example {...props} />
		</Canvas>
	</Instance>
	<Controls props={[sinwave, width, debug]} position="right" />
</Block>
