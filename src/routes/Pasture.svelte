<script lang="ts">
	import {
		Engine,
		Scene,
		HemisphericLight,
		Vector3,
		ArcRotateCamera,
		CreateGround
	} from '@babylonjs/core';
	import { setContext, onDestroy } from 'svelte';

	export let canvas: HTMLCanvasElement;

	const setup = (canvas: HTMLCanvasElement) => {
		const engine = new Engine(canvas);
		const scene = new Scene(engine);
		const light = new HemisphericLight('light', Vector3.Up(), scene);

		const camera = new ArcRotateCamera(
			'camera',
			Math.PI * 0.5,
			Math.PI * 0.333,
			20,
			Vector3.Zero(),
			scene
		);
		camera.mapPanning = true;
		camera.panningInertia = 0.8;
		camera.panningSensibility = 20;
		camera.wheelPrecision = 10;
		camera.zoomToMouseLocation = true;
		camera.attachControl(true, false, 0);

		const ground = CreateGround('ground', { width: 100, height: 100, updatable: false }, scene);
		ground.position.y = -0.0;
		engine.runRenderLoop(() => {
			scene.render();
		});

		const cleanup = () => {
			engine.stopRenderLoop();
			scene.dispose();
			engine.dispose();
		};

		return { engine, scene, ground, light, cleanup };
	};

	const pasture = setup(canvas);
	setContext('pasture', pasture);
	onDestroy(() => {
		pasture.cleanup();
	});
</script>

<slot />
