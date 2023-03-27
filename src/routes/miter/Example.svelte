<script lang="ts">
	import { naivePathArray } from '$lib/internal/naive';
	import type { Pasture } from '$lib/internal/pasture';
	import { sineWave, type SineWaveOptions } from '$lib/internal/sinewave';
	import { miter, miteredPathArray } from '$lib/miter';
	import {
		Color3,
		CreateIcoSphere,
		CreateLines,
		CreateRibbon,
		StandardMaterial,
		Vector3,
		type Mesh
	} from '@babylonjs/core';
	import { getContext, onDestroy } from 'svelte';
	const pasture = getContext<Pasture>('pasture');

	const camera = pasture.scene.activeCamera as typeof pasture.camera;
	if (camera) {
		camera.alpha = Math.PI / 2;
		camera.beta = 0;
		camera.target.x = 12.5;
		camera.radius = 15;
	}

	export let waveOptions: SineWaveOptions;
	export let width: number;
	export let debug: boolean;

	let meshes: Array<Mesh> = [];
	const disposeAndClearMeshes = () => {
		meshes.forEach((m) => m.dispose());
		meshes = [];
	};
	const matMiter = new StandardMaterial('mat/miter', pasture.scene);
	matMiter.alpha = 0.2;
	matMiter.diffuseColor = Color3.White();
	matMiter.specularColor = Color3.White().scale(0.2);

	const matNaive = new StandardMaterial('mat/naive', pasture.scene);
	matNaive.alpha = 0.2;
	matNaive.diffuseColor = Color3.Yellow();
	matNaive.specularColor = Color3.White().scale(0.2);

	const render = (points: Array<Vector3>, width: number) => {
		disposeAndClearMeshes();
		const details = miter(points, width);
		const pathArray = miteredPathArray(points, width, details);
		const ribbon = CreateRibbon('ribbon', { pathArray }, pasture.scene);
		ribbon.material = matMiter;
		meshes.push(ribbon);

		const naivePathArrayPoints = naivePathArray(points, width);
		const naiveRibbon = CreateRibbon('naive', { pathArray: naivePathArrayPoints });
		naiveRibbon.material = matNaive;
		naiveRibbon.material.wireframe = true;
		meshes.push(naiveRibbon);
		naiveRibbon.position.z = 10;
		if (!debug) {
			matMiter.alpha = 1;
			matNaive.alpha = 1;
			naiveRibbon.material.wireframe = false;
			return;
		}
		matMiter.alpha = 0.2;
		const line = CreateLines('line', { points }, pasture.scene);
		line.color = Color3.Black();
		meshes.push(line);
		pathArray.forEach((arr, idx) =>
			arr.forEach((position, jdx) => {
				const sphere = CreateIcoSphere(`sphere-${idx}${jdx}`, { radius: 0.05 }, pasture.scene);
				sphere.position = position;
				meshes.push(sphere);
			})
		);
		naivePathArrayPoints.forEach((arr, idx) =>
			arr.forEach((position, jdx) => {
				const sphere = CreateIcoSphere(`sphere-${idx}${jdx}`, { radius: 0.05 }, pasture.scene);
				sphere.position = position;
				sphere.parent = naiveRibbon;
				meshes.push(sphere);
			})
		);
		const { miters, halfLengths: miterLengths, trends, normals } = details;
		points.forEach((_, idx: number) => {
			const miter = CreateLines(`miter-${idx}`, {
				points: [points[idx], points[idx].add(miters[idx].scale(miterLengths[idx]))]
			});
			miter.color = Color3.Magenta();
			meshes.push(miter);
			const trend = CreateLines(`trend-${idx}`, {
				points: [points[idx], points[idx].add(trends[idx])]
			});
			trend.color = Color3.Teal();
			meshes.push(trend);
			const normal = CreateLines(`normal-${idx}`, {
				points: [points[idx], points[idx].add(normals[idx])]
			});
			normal.color = Color3.Red();
			meshes.push(normal);
		});
	};

	$: render(sineWave(waveOptions.amplitude, waveOptions.period, waveOptions.stepSize), width);

	onDestroy(() => {
		disposeAndClearMeshes();
	});
</script>
