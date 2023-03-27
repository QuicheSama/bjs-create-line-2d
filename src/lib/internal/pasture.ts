import {
	Engine,
	Scene,
	HemisphericLight,
	Vector3,
	ArcRotateCamera,
	CreateGround,
	StandardMaterial,
	Color3
} from '@babylonjs/core';

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

	const ground = CreateGround('ground', { width: 500, height: 500, updatable: false }, scene);
	ground.position.y = -0.05;

	const groundMat = new StandardMaterial('mat/ground', scene);
	groundMat.diffuseColor = Color3.Gray();
	groundMat.alpha = 0.2;
	ground.material = groundMat;

	engine.runRenderLoop(() => {
		scene.render();
	});

	const cleanup = () => {
		engine.stopRenderLoop();
		scene.dispose();
		engine.dispose();
	};

	return { engine, scene, ground, camera, light, cleanup };
};

type Pasture = ReturnType<typeof setup>;

export { setup };
export type { Pasture };
